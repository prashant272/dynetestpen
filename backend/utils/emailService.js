import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const EMAIL_USER = process.env.EMAIL_USER || 'enquiry.imagetechindustries@gmail.com';
const EMAIL_PASS = process.env.EMAIL_PASS || 'svbjvordlunftpwx';
const EMAIL_TO = process.env.EMAIL_TO || 'sales.imagetechindustries@gmail.com, imagetechindustries@gmail.com';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    },
});

const FROM_HEADER = `"ImageTech Industries Portal" <${EMAIL_USER}>`;

const formatPrice = (price) => `₹${Number(price || 0).toFixed(2)}`;

/**
 * Base email layout wrapper
 */
const getEmailLayout = (title, content) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F5F8FC; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    <div style="max-width: 620px; margin: 0 auto; padding: 25px 15px;">
        <div style="background-color: #ffffff; border-radius: 16px; border: 1px solid #DCE5EF; padding: 32px 28px; box-shadow: 0 4px 20px rgba(13, 110, 253, 0.05);">
            
            <!-- Header -->
            <div style="text-align: center; padding-bottom: 18px; border-bottom: 2px solid #F0F4F8; margin-bottom: 24px;">
                <h1 style="margin: 0; color: #172B4D; font-size: 22px; font-weight: 800; letter-spacing: 0.5px;">IMAGETECH INDUSTRIES</h1>
                <p style="margin: 4px 0 0 0; color: #0D6EFD; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;">Surface Energy Testing & Industrial Solutions</p>
            </div>
            
            <!-- Body -->
            <div style="color: #172B4D; font-size: 14px; line-height: 1.6;">
                ${content}
            </div>
            
            <!-- Footer -->
            <div style="margin-top: 32px; padding-top: 18px; border-top: 1px solid #E5EAF2; text-align: center;">
                <p style="margin: 0 0 4px 0; color: #64748B; font-size: 11px;">
                    <strong>ImageTech Industries</strong> • RZ-I-13, 2nd Floor, Nanda Block, Mahavir Enclave, New Delhi - 110045
                </p>
                <p style="margin: 0; color: #64748B; font-size: 11px;">
                    Phone: +91 8448336036, +91 8851016580 | Email: sales.imagetechindustries@gmail.com
                </p>
            </div>
            
        </div>
    </div>
</body>
</html>
`;

/**
 * 1. Sends Lead Notification when someone fills Contact / RFQ Form
 * Delivered to: sales.imagetechindustries@gmail.com & imagetechindustries@gmail.com
 */
export const sendEnquiryNotificationEmail = async (enquiry) => {
    try {
        const subject = `🔔 [NEW LEAD INQUIRY] ${enquiry.name || 'Client'} - ${enquiry.phone || 'Phone'}`;

        const content = `
            <div style="background-color: #EFF6FF; border-left: 4px solid #0D6EFD; padding: 14px 16px; border-radius: 8px; margin-bottom: 20px;">
                <h2 style="color: #0D6EFD; font-size: 16px; margin: 0 0 4px 0; font-weight: 700;">New RFQ Lead / Inquiry Received</h2>
                <p style="margin: 0; color: #475569; font-size: 12.5px;">A new customer inquiry has arrived from the ImageTech Industries website.</p>
            </div>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 13.5px;">
                <tr>
                    <td style="padding: 9px 0; border-bottom: 1px solid #F1F5F9; color: #64748B; width: 140px; font-weight: 600;">Customer Name:</td>
                    <td style="padding: 9px 0; border-bottom: 1px solid #F1F5F9; color: #172B4D; font-weight: 700;">${enquiry.name || 'N/A'}</td>
                </tr>
                <tr>
                    <td style="padding: 9px 0; border-bottom: 1px solid #F1F5F9; color: #64748B; font-weight: 600;">Mobile / Phone:</td>
                    <td style="padding: 9px 0; border-bottom: 1px solid #F1F5F9; color: #0D6EFD; font-weight: 700;">
                        <a href="tel:${enquiry.phone}" style="color: #0D6EFD; text-decoration: none;">${enquiry.phone || 'N/A'}</a>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 9px 0; border-bottom: 1px solid #F1F5F9; color: #64748B; font-weight: 600;">Email Address:</td>
                    <td style="padding: 9px 0; border-bottom: 1px solid #F1F5F9; color: #172B4D; font-weight: 600;">
                        <a href="mailto:${enquiry.email}" style="color: #172B4D; text-decoration: none;">${enquiry.email || 'N/A'}</a>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 9px 0; border-bottom: 1px solid #F1F5F9; color: #64748B; font-weight: 600;">Company / Firm:</td>
                    <td style="padding: 9px 0; border-bottom: 1px solid #F1F5F9; color: #172B4D; font-weight: 600;">${enquiry.company || 'Not Specified'}</td>
                </tr>
                ${enquiry.subject ? `
                <tr>
                    <td style="padding: 9px 0; border-bottom: 1px solid #F1F5F9; color: #64748B; font-weight: 600;">Subject / Product:</td>
                    <td style="padding: 9px 0; border-bottom: 1px solid #F1F5F9; color: #172B4D; font-weight: 700;">${enquiry.subject}</td>
                </tr>` : ''}
            </table>

            <div style="margin-bottom: 22px;">
                <label style="display: block; color: #64748B; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">Customer Inquiry Message:</label>
                <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 14px; color: #1E293B; font-size: 13.5px; white-space: pre-wrap; line-height: 1.5;">
                    ${enquiry.message || 'No additional message provided.'}
                </div>
            </div>

            <div style="text-align: center; margin-top: 24px;">
                <a href="${process.env.CLIENT_URL || 'http://localhost:5173'}/admin" style="display: inline-block; background-color: #0D6EFD; color: #ffffff; text-decoration: none; padding: 11px 26px; border-radius: 8px; font-weight: 700; font-size: 13px;">Open Admin Leads Panel</a>
            </div>
        `;

        await transporter.sendMail({
            from: FROM_HEADER,
            to: EMAIL_TO,
            replyTo: enquiry.email,
            subject,
            html: getEmailLayout(subject, content),
        });

        console.log(`✅ RFQ Lead notification sent to ${EMAIL_TO}`);
    } catch (error) {
        console.error('❌ Failed to send RFQ notification email:', error);
    }
};

/**
 * 2. Sends Order Notification when a customer places an order
 * Sent to: sales.imagetechindustries@gmail.com, imagetechindustries@gmail.com & Customer
 */
export const sendOrderPlacedEmail = async (user, order, invoiceBuffer = null) => {
    try {
        const items = order.orderItems || [];
        const itemRows = items.map((item, idx) => `
            <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #F1F5F9; vertical-align: middle;">
                    <div style="font-weight: 700; color: #172B4D; font-size: 13.5px;">${idx + 1}. ${item.name || 'Dyne Test Item'}</div>
                    <div style="color: #64748B; font-size: 11.5px; margin-top: 2px;">
                        Qty: <strong>${item.qty || 1}</strong> × ${formatPrice(item.price)}
                        ${item.size ? ` | Spec: ${item.size}` : ''}
                    </div>
                </td>
                <td style="padding: 10px 0; border-bottom: 1px solid #F1F5F9; text-align: right; vertical-align: middle; font-weight: 700; color: #172B4D; font-size: 13.5px;">
                    ${formatPrice((item.price || 0) * (item.qty || 1))}
                </td>
            </tr>
        `).join('');

        const orderIdStr = order._id.toString().slice(-8).toUpperCase();
        const clientName = order.shippingAddress?.name || user?.name || 'Customer';
        const clientPhone = order.shippingAddress?.phone || user?.phone || 'N/A';
        const clientEmail = order.shippingAddress?.email || user?.email || 'N/A';

        const content = `
            <div style="background-color: #EFF6FF; border-left: 4px solid #0D6EFD; padding: 14px 16px; border-radius: 8px; margin-bottom: 20px;">
                <h2 style="color: #0D6EFD; font-size: 16px; margin: 0 0 4px 0; font-weight: 700;">📦 New Procurement Order Placed (#${orderIdStr})</h2>
                <p style="margin: 0; color: #475569; font-size: 12.5px;">A new order has been logged on ImageTech Industries Portal.</p>
            </div>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 13.5px;">
                <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #F1F5F9; color: #64748B; width: 140px; font-weight: 600;">Customer Name:</td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #F1F5F9; color: #172B4D; font-weight: 700;">${clientName}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #F1F5F9; color: #64748B; font-weight: 600;">Mobile Number:</td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #F1F5F9; color: #0D6EFD; font-weight: 700;">
                        <a href="tel:${clientPhone}" style="color: #0D6EFD; text-decoration: none;">${clientPhone}</a>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #F1F5F9; color: #64748B; font-weight: 600;">Email:</td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #F1F5F9; color: #172B4D; font-weight: 600;">
                        <a href="mailto:${clientEmail}" style="color: #172B4D; text-decoration: none;">${clientEmail}</a>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #F1F5F9; color: #64748B; font-weight: 600;">Delivery Address:</td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #F1F5F9; color: #172B4D;">
                        ${order.shippingAddress?.address || 'N/A'}, ${order.shippingAddress?.city || ''} - ${order.shippingAddress?.postalCode || ''}
                    </td>
                </tr>
                ${order.notes ? `
                <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #F1F5F9; color: #64748B; font-weight: 600;">Order / GST Notes:</td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #F1F5F9; color: #172B4D;">${order.notes}</td>
                </tr>` : ''}
            </table>
            
            <h3 style="color: #172B4D; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px; padding-bottom: 4px; border-bottom: 2px solid #E2E8F0;">Ordered Products List</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <tbody>
                    ${itemRows}
                </tbody>
                <tfoot>
                    <tr>
                        <td style="padding: 12px 0 0 0; text-align: right; font-weight: 700; font-size: 15px; color: #172B4D;">Total Order Value:</td>
                        <td style="padding: 12px 0 0 0; text-align: right; font-weight: 800; font-size: 17px; color: #0D6EFD;">${formatPrice(order.totalPrice)}</td>
                    </tr>
                </tfoot>
            </table>

            <div style="text-align: center; margin-top: 24px;">
                <a href="${process.env.CLIENT_URL || 'http://localhost:5173'}/admin" style="display: inline-block; background-color: #0D6EFD; color: #ffffff; text-decoration: none; padding: 11px 26px; border-radius: 8px; font-weight: 700; font-size: 13px;">Manage Order in Admin</a>
            </div>
        `;

        const mailOptions = {
            from: FROM_HEADER,
            to: EMAIL_TO, // Both imagetech admin emails receive full notification
            cc: clientEmail !== 'N/A' ? clientEmail : undefined,
            subject: `📦 [NEW ORDER] #${orderIdStr} - ${clientName} (${clientPhone}) - ₹${order.totalPrice}`,
            html: getEmailLayout(`Order Confirmation`, content),
        };

        if (invoiceBuffer) {
            mailOptions.attachments = [
                {
                    filename: `Invoice-${order.invoiceNumber || orderIdStr}.pdf`,
                    content: invoiceBuffer,
                    contentType: 'application/pdf'
                }
            ];
        }

        await transporter.sendMail(mailOptions);
        console.log(`✅ Order notification sent to ImageTech team (${EMAIL_TO}) and client (${clientEmail})`);
    } catch (error) {
        console.error(`❌ Failed to send Order Placed Email:`, error.message);
    }
};

export const sendOrderShippedEmail = async (user, order) => {};
export const sendOrderDeliveredEmail = async (user, order) => {};

export default {
    sendEnquiryNotificationEmail,
    sendOrderPlacedEmail,
    sendOrderShippedEmail,
    sendOrderDeliveredEmail
};
