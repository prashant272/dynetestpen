import FacebookConfig from '../models/FacebookConfig.js';
import crypto from 'crypto';

const FB_GRAPH_URL = 'https://graph.facebook.com/v19.0';

// In-memory store for states and short-lived tokens (for simplicity)
const stateStore = new Set();
let tempUserTokens = {}; // Maps session/ip to user token during setup

// @desc    Get Facebook Login URL
// @route   GET /api/facebook/auth-url
// @access  Private (Admin)
export const getFacebookAuthUrl = async (req, res) => {
    try {
        const state = crypto.randomBytes(20).toString('hex');
        stateStore.add(state);

        const params = new URLSearchParams({
            client_id: process.env.FACEBOOK_APP_ID,
            redirect_uri: process.env.FACEBOOK_CALLBACK_URL,
            state: state,
            scope: 'pages_show_list,pages_read_engagement,pages_manage_posts',
            response_type: 'code'
        });

        res.json({ url: `https://www.facebook.com/v19.0/dialog/oauth?${params.toString()}` });
    } catch (error) {
        console.error('FB Auth URL error', error);
        res.status(500).json({ message: 'Failed to generate auth url' });
    }
};

// @desc    Handle OAuth Callback
// @route   GET /api/facebook/callback
// @access  Public (Callback from FB)
export const handleFacebookCallback = async (req, res) => {
    const { code, state, error } = req.query;

    if (error) {
        return res.redirect(`${process.env.FRONTEND_URL}/admin/dashboard?fb_error=${error}`);
    }

    if (!stateStore.has(state)) {
        return res.status(400).send('Invalid state parameter');
    }
    stateStore.delete(state);

    try {
        // Exchange code for short-lived access token
        const tokenResponse = await fetch(`${FB_GRAPH_URL}/oauth/access_token?client_id=${process.env.FACEBOOK_APP_ID}&redirect_uri=${process.env.FACEBOOK_CALLBACK_URL}&client_secret=${process.env.FACEBOOK_APP_SECRET}&code=${code}`);
        const tokenData = await tokenResponse.json();

        if (tokenData.error) {
            throw new Error(tokenData.error.message);
        }

        const shortLivedToken = tokenData.access_token;

        // Exchange for long-lived user token
        const longTokenResponse = await fetch(`${FB_GRAPH_URL}/oauth/access_token?grant_type=fb_exchange_token&client_id=${process.env.FACEBOOK_APP_ID}&client_secret=${process.env.FACEBOOK_APP_SECRET}&fb_exchange_token=${shortLivedToken}`);
        const longTokenData = await longTokenResponse.json();
        
        let userAccessToken = longTokenData.access_token || shortLivedToken;

        // Redirect back to frontend with a temporary "setup" session token
        const setupToken = crypto.randomBytes(10).toString('hex');
        tempUserTokens[setupToken] = userAccessToken;

        // Clear out old tokens periodically or just rely on manual clears
        res.redirect(`${process.env.FRONTEND_URL}/admin/dashboard?fb_setup=${setupToken}`);
    } catch (error) {
        console.error('Callback Exchange Error:', error);
        res.redirect(`${process.env.FRONTEND_URL}/admin/dashboard?fb_error=exchange_failed`);
    }
};

// @desc    Get Facebook Pages managed by user
// @route   GET /api/facebook/pages
// @access  Private (Admin)
export const getManagedPages = async (req, res) => {
    const { setupToken } = req.query;
    const userToken = tempUserTokens[setupToken];

    if (!userToken) {
        return res.status(400).json({ message: 'Invalid or expired setup token. Please connect again.' });
    }

    try {
        // Fetch pages user has access to
        const pagesResponse = await fetch(`${FB_GRAPH_URL}/me/accounts?access_token=${userToken}`);
        const pagesData = await pagesResponse.json();

        if (pagesData.error) {
            throw new Error(pagesData.error.message);
        }

        res.json(pagesData.data.map(page => ({
            id: page.id,
            name: page.name,
            access_token: page.access_token // This is a Page Access Token!
        })));
    } catch (error) {
        console.error('Fetch Pages Error:', error);
        res.status(500).json({ message: 'Failed to fetch pages' });
    }
};

// @desc    Save selected Page config
// @route   POST /api/facebook/save-page
// @access  Private (Admin)
export const savePageConfig = async (req, res) => {
    const { setupToken, pageId, pageName, pageAccessToken } = req.body;

    if (!setupToken || !tempUserTokens[setupToken]) {
        return res.status(400).json({ message: 'Invalid setup session.' });
    }

    try {
        // Clear old config, we only allow 1 connected page in this design
        await FacebookConfig.deleteMany({});

        // Because we used a Long-Lived User Token to request /me/accounts, 
        // the resulting Page Access Token is a "Never-Expiring" token.
        const config = new FacebookConfig({
            pageId,
            pageName,
            pageAccessToken
        });
        await config.save();

        // Clear the temp user token from memory
        delete tempUserTokens[setupToken];

        res.json({ message: 'Facebook Page successfully linked! Posts will now auto-publish.' });
    } catch (error) {
        console.error('Save Page Error:', error);
        res.status(500).json({ message: 'Failed to link page' });
    }
};

// @desc    Get current Facebook connection status
// @route   GET /api/facebook/status
// @access  Private (Admin)
export const getFacebookStatus = async (req, res) => {
    try {
        const config = await FacebookConfig.findOne();
        if (config) {
            return res.json({ connected: true, pageName: config.pageName });
        }
        res.json({ connected: false });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch status' });
    }
};
