import nodemailer from "nodemailer";

/**
 * Get or create the Nodemailer Gmail transporter
 */
const getTransporter = () => {
  const user = process.env.EMAIL_USER || "prashantkrjha12@gmail.com";
  const pass = (process.env.EMAIL_PASS || "").replace(/\s+/g, "");

  if (!user || !pass) {
    console.warn("⚠️ Email credentials missing in environment variables (EMAIL_USER / EMAIL_PASS).");
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: user,
      pass: pass
    }
  });
};

/**
 * Send an email notification when a new enquiry or quote request is submitted
 * @param {Object} enquiry
 * @param {string} enquiry.name
 * @param {string} enquiry.company
 * @param {string} enquiry.email
 * @param {string} enquiry.phone
 * @param {string} enquiry.subject
 * @param {string} enquiry.message
 * @param {Date|string} [enquiry.createdAt]
 */
export const sendEnquiryEmail = async (enquiry) => {
  try {
    const user = process.env.EMAIL_USER || "prashantkrjha12@gmail.com";
    const rawTo = process.env.EMAIL_TO || "sales.imagetechindustries@gmail.com, prashantkrjha1233@gmail.com";
    const recipients = rawTo
      .split(",")
      .map(e => e.trim())
      .filter(Boolean);

    if (recipients.length === 0) {
      console.warn("⚠️ No recipients configured for enquiry emails.");
      return;
    }

    const transporter = getTransporter();

    const formattedDate = new Date(enquiry.createdAt || Date.now()).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "short"
    });

    const cleanPhone = (enquiry.phone || "").replace(/[^\d+]/g, "");
    const waPhone = cleanPhone.startsWith("+") ? cleanPhone.replace("+", "") : (cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone);

    const subject = `🔔 New Enquiry: ${enquiry.subject || "Website Quote Request"} - ${enquiry.name} (${enquiry.company || "Direct"})`;

    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Website Enquiry</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 24px; color: #1e293b; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border: 1px solid #e2e8f0; }
        .header { background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); padding: 32px 24px; text-align: center; color: #ffffff; }
        .header h1 { margin: 0 0 6px 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px; }
        .header p { margin: 0; font-size: 14px; opacity: 0.9; }
        .badge { display: inline-block; background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
        .content { padding: 32px 28px; }
        .info-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 24px; }
        .info-row { display: flex; padding: 8px 0; border-bottom: 1px solid #f1f5f9; }
        .info-row:last-child { border-bottom: none; }
        .info-label { width: 120px; font-weight: 600; color: #64748b; font-size: 13px; text-transform: uppercase; }
        .info-value { flex: 1; color: #0f172a; font-weight: 500; font-size: 14px; word-break: break-word; }
        .message-section { margin-bottom: 28px; }
        .message-section h3 { margin: 0 0 10px 0; font-size: 15px; color: #334155; }
        .message-box { background: #eff6ff; border-left: 4px solid #0284c7; padding: 16px 20px; border-radius: 0 8px 8px 0; font-size: 14px; line-height: 1.6; color: #1e3a8a; white-space: pre-wrap; }
        .actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-bottom: 16px; }
        .btn { display: inline-block; padding: 12px 20px; border-radius: 8px; font-size: 13px; font-weight: 600; text-decoration: none; text-align: center; }
        .btn-primary { background: #0284c7; color: #ffffff !important; }
        .btn-success { background: #16a34a; color: #ffffff !important; }
        .btn-outline { background: #ffffff; color: #0284c7 !important; border: 1px solid #0284c7; }
        .footer { background: #f8fafc; padding: 20px 24px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="badge">New Lead Notification</div>
          <h1>ImageTech Industries</h1>
          <p>A new customer inquiry has arrived from your website</p>
        </div>
        
        <div class="content">
          <div class="info-card">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 13px; font-weight: 600; width: 35%;">CUSTOMER NAME:</td>
                <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: 700;">${enquiry.name || "N/A"}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 13px; font-weight: 600;">COMPANY NAME:</td>
                <td style="padding: 8px 0; color: #0f172a; font-size: 14px;">${enquiry.company || "Not provided"}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 13px; font-weight: 600;">EMAIL:</td>
                <td style="padding: 8px 0; color: #0284c7; font-size: 14px; font-weight: 600;">
                  <a href="mailto:${enquiry.email}" style="color: #0284c7; text-decoration: none;">${enquiry.email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 13px; font-weight: 600;">PHONE:</td>
                <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: 600;">
                  <a href="tel:${cleanPhone}" style="color: #0f172a; text-decoration: none;">${enquiry.phone || "N/A"}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 13px; font-weight: 600;">REQUIREMENT / SUBJECT:</td>
                <td style="padding: 8px 0; color: #0284c7; font-size: 14px; font-weight: 600;">${enquiry.subject || "Quote / Product Inquiry"}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 13px; font-weight: 600;">RECEIVED AT:</td>
                <td style="padding: 8px 0; color: #64748b; font-size: 13px;">${formattedDate}</td>
              </tr>
            </table>
          </div>

          <div class="message-section">
            <h3 style="margin-bottom: 8px;">Customer Requirement / Message:</h3>
            <div class="message-box">
              ${(enquiry.message || "No additional message provided.").replace(/</g, "&lt;").replace(/>/g, "&gt;")}
            </div>
          </div>

          <div style="text-align: center; margin-top: 28px; padding-top: 20px; border-top: 1px dashed #cbd5e1;">
            <p style="margin-bottom: 14px; font-size: 13px; color: #64748b;">Quick Responses:</p>
            <div class="actions">
              <a href="mailto:${enquiry.email}?subject=Re: ${encodeURIComponent(enquiry.subject || "Enquiry from ImageTech Industries")}" class="btn btn-primary" style="margin: 0 4px;">✉️ Reply via Email</a>
              <a href="tel:${cleanPhone}" class="btn btn-outline" style="margin: 0 4px;">📞 Call Customer</a>
              ${cleanPhone ? `<a href="https://wa.me/${waPhone}" class="btn btn-success" style="margin: 0 4px;">💬 WhatsApp</a>` : ""}
            </div>
          </div>
        </div>

        <div class="footer">
          <p style="margin: 0 0 4px 0;">This notification was sent automatically by <strong>ImageTech Industries</strong> website portal.</p>
          <p style="margin: 0;">Sent to: ${recipients.join(", ")}</p>
        </div>
      </div>
    </body>
    </html>
    `;

    const textContent = `
New Website Enquiry - ImageTech Industries
=========================================
Customer Name: ${enquiry.name}
Company: ${enquiry.company || "N/A"}
Email: ${enquiry.email}
Phone: ${enquiry.phone}
Subject: ${enquiry.subject}
Received: ${formattedDate}

Message / Requirement:
----------------------
${enquiry.message}

Reply to: ${enquiry.email}
Call: ${enquiry.phone}
    `.trim();

    const mailOptions = {
      from: `"ImageTech Enquiries" <${user}>`,
      to: recipients,
      replyTo: enquiry.email,
      subject: subject,
      text: textContent,
      html: htmlContent
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Enquiry email sent successfully! MessageId: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error("❌ Failed to send enquiry email notification:", error);
    // Don't throw so that enquiry submission API doesn't fail
    return null;
  }
};
