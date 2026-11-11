import axios from 'axios';
import { API_BASE_URL } from '../api';

/**
 * Check if user is authenticated as admin
 * @returns {boolean}
 */
export const isAdminAuthenticated = () => {
    return !!localStorage.getItem('adminToken');
};

/**
 * Get admin token from localStorage
 * @returns {string|null}
 */
export const getAdminToken = () => {
    return localStorage.getItem('adminToken') || localStorage.getItem('userToken');
};

/**
 * Verify admin token with backend
 * @returns {Promise<boolean>}
 */
export const verifyAdminToken = async () => {
    const token = getAdminToken();

    if (!token) {
        return false;
    }

    try {
        const response = await axios.post(`${API_BASE_URL}/admin/verify`, {
            token
        });
        return !!response.data.valid;
    } catch (error) {
        console.warn('Backend admin token verification failed:', error?.response?.data || error.message);
        return false;
    }
};

/**
 * Logout admin (clear token)
 */
export const logoutAdmin = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminInfo');
};

/**
 * Logout user (clear token and storage)
 */
export const logoutUser = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userInfo');
};
