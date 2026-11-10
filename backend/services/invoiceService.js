import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

let PDFDocument = null;
const loadPDFDocument = async () => {
    if (!PDFDocument) {
        try {
            const mod = await import('pdfkit');
            PDFDocument = mod.default || mod;
        } catch (e) {
            console.warn('⚠️ PDFKit failed to load:', e.message);
        }
    }
    return PDFDocument;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logoPath = path.resolve(__dirname, '../assets/imagetech-logo.jpg');

/**
 * Formats numeric values to clear Indian Rupee standard notation (Rs. XX.XX)
 * Avoids Unicode ₹ character which causes glyph corruption in standard PDF fonts
 */
const formatCur = (amount) => {
    return `Rs. ${Number(amount || 0).toFixed(2)}`;
};

/**
 * Converts a numeric amount to standard Indian Currency Words with proper grammar
 */
const numberToWords = (num) => {
    const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
    const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    const inWords = (n) => {
        if (n === 0) return '';
        if (n < 20) return a[n];
        if (n < 100) return b[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + a[n % 10] : ' ');
        if (n < 1000) return a[Math.floor(n / 100)] + 'Hundred ' + (n % 100 !== 0 ? inWords(n % 100) : '');
        if (n < 100000) return inWords(Math.floor(n / 1000)) + 'Thousand ' + (n % 1000 !== 0 ? inWords(n % 1000) : '');
        if (n < 10000000) return inWords(Math.floor(n / 100000)) + 'Lakh ' + (n % 100000 !== 0 ? inWords(n % 100000) : '');
        return inWords(Math.floor(n / 10000000)) + 'Crore ' + (n % 10000000 !== 0 ? inWords(n % 10000000) : '');
    };

    const rounded = Math.round(Number(num) || 0);
    if (rounded === 0) return 'Zero Rupees Only';
    if (rounded === 1) return 'One Rupee Only';
    return `${inWords(rounded).trim()} Rupees Only`;
};

/**
 * Generates an ultra-premium, balanced 1-Page B2B Tax Invoice PDF for ImageTech Industries
 * @param {Object} order - Populated Order document
 * @param {Object} [payment] - Optional Payment document
 * @returns {Promise<Buffer>}
 */
export const generateInvoicePDF = async (order, payment = null) => {
    const PDFDoc = await loadPDFDocument();
    return new Promise((resolve, reject) => {
        try {
            if (!PDFDoc) {
                return resolve(Buffer.from('Invoice generation unavailable'));
            }
            const doc = new PDFDoc({
                size: 'A4',
                margins: { top: 20, bottom: 16, left: 32, right: 32 },
                info: {
                    Title: `Tax Invoice - ${order.invoiceNumber || order._id}`,
                    Author: 'ImageTech Industries',
                    Subject: 'Official Commercial B2B Tax Invoice'
                }
            });

            const buffers = [];
            doc.on('data', (chunk) => buffers.push(chunk));
            doc.on('end', () => resolve(Buffer.concat(buffers)));
            doc.on('error', (err) => reject(err));

            const invoiceNo = order.invoiceNumber || `INV-IT-2026-${order._id.toString().slice(-6).toUpperCase()}`;
            const orderDateStr = new Date(order.createdAt).toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            });
            const invoiceTimeStr = new Date(order.createdAt).toLocaleTimeString('en-IN', {
                hour: '2-digit',
                minute: '2-digit'
            });

            // ImageTech Industrial Brand Palette
            const primaryColor = '#0D6EFD'; // Signature industrial blue
            const navyColor = '#172B4D';    // Deep industrial navy
            const darkColor = '#0F172A';
            const bodyColor = '#334155';
            const mutedColor = '#64748B';
            const lightBorder = '#CBD5E1';
            const tableHeaderBg = '#0D6EFD';
            const cardBg = '#F8FAFC';
            const subtleBg = '#F1F5F9';

            const pageWidth = 595.28;
            const leftX = 32;
            const rightX = pageWidth - 32; // 531.28
            const contentWidth = rightX - leftX; // 531.28

            // ==========================================
            // 1. TOP HEADER (LOGO + ACCURATE COMPANY INFO + INVOICE BADGE)
            // ==========================================
            let logoW = 110;
            let logoH = 55;
            let logoDrawn = false;

            if (fs.existsSync(logoPath)) {
                try {
                    doc.image(logoPath, leftX, 22, { width: logoW, height: logoH });
                    logoDrawn = true;
                } catch (e) {
                    console.warn('Could not render logo in PDF:', e.message);
                }
            }

            const companyX = logoDrawn ? leftX + logoW + 12 : leftX;

            // Company Title & Registry Info
            doc.fillColor(navyColor).fontSize(15).font('Helvetica-Bold').text('IMAGETECH INDUSTRIES', companyX, 22, { characterSpacing: 0.5, lineBreak: false });
            doc.fillColor(primaryColor).fontSize(7).font('Helvetica-Bold').text('ISO 9001:2015 CERTIFIED • SURFACE TESTING & ENGINEERING', companyX, 38, { characterSpacing: 0.5, lineBreak: false });
            doc.font('Helvetica').fontSize(6.8).fillColor(bodyColor);
            doc.text('Regd. Office: RZ-I-13, 2nd Floor, Nanda Block, Mahavir Enclave, New Delhi - 110045, India', companyX, 48, { lineBreak: false });
            doc.text('GSTIN: 07AABCU9603R1ZM | State Code: 07 (Delhi) | Category: Testing Instruments & Pens', companyX, 58, { lineBreak: false });
            doc.text('Helpline: +91 8448336036, +91 8851016580 | Email: sales.imagetechindustries@gmail.com', companyX, 68, { lineBreak: false });

            // Right Header: Tax Invoice Box
            const badgeW = 165;
            const badgeX = rightX - badgeW;
            doc.roundedRect(badgeX, 20, badgeW, 60, 5).fillAndStroke('#EFF6FF', primaryColor);
            doc.fillColor(primaryColor).fontSize(10).font('Helvetica-Bold').text('TAX INVOICE', badgeX, 26, { width: badgeW, align: 'center', characterSpacing: 1, lineBreak: false });
            doc.fillColor(navyColor).fontSize(8.5).font('Helvetica-Bold').text(invoiceNo, badgeX, 39, { width: badgeW, align: 'center', lineBreak: false });
            doc.fontSize(6.8).font('Helvetica').fillColor(mutedColor);
            doc.text(`Date: ${orderDateStr} at ${invoiceTimeStr}`, badgeX, 51, { width: badgeW, align: 'center', lineBreak: false });
            doc.text('Original for Buyer / Procurement Record', badgeX, 61, { width: badgeW, align: 'center', lineBreak: false });

            // Accent Dividing Line
            doc.strokeColor(primaryColor).lineWidth(1.5).moveTo(leftX, 86).lineTo(rightX, 86).stroke();

            // ==========================================
            // 2. TWO-COLUMN SUMMARY CARDS (BUYER & ORDER)
            // ==========================================
            const cardsY = 94;
            const cardH = 88;
            const cardGap = 12;
            const cardW = (contentWidth - cardGap) / 2;
            const card2X = leftX + cardW + cardGap;

            // Left Card: Billed & Shipped To (Buyer)
            doc.roundedRect(leftX, cardsY, cardW, cardH, 5).fillAndStroke(cardBg, lightBorder);
            doc.fillColor(primaryColor).font('Helvetica-Bold').fontSize(8).text('BILLED & SHIPPED TO (BUYER)', leftX + 12, cardsY + 8, { lineBreak: false });

            const custName = order.shippingAddress?.name || order.user?.name || 'Valued Client';
            doc.fillColor(navyColor).fontSize(9).font('Helvetica-Bold').text(custName, leftX + 12, cardsY + 21, { width: cardW - 24, ellipsis: true, lineBreak: false });

            doc.font('Helvetica').fontSize(7.2).fillColor(bodyColor);
            const custPhone = order.shippingAddress?.phone || order.user?.phone || 'N/A';
            const custEmail = order.shippingAddress?.email || order.user?.email || 'N/A';
            doc.text(`Phone: ${custPhone} | Email: ${custEmail}`, leftX + 12, cardsY + 34, { width: cardW - 24, ellipsis: true, lineBreak: false });

            const addr = order.shippingAddress?.address || 'Industrial Plant Delivery';
            doc.text(addr, leftX + 12, cardsY + 47, { width: cardW - 24, height: 16, ellipsis: true });
            doc.text(`${order.shippingAddress?.city || 'Delhi'} - ${order.shippingAddress?.postalCode || '110045'}, India`, leftX + 12, cardsY + 61, { lineBreak: false });
            doc.fillColor(mutedColor).fontSize(6.8).text('Place of Supply: Delhi (07) | Mode: Express Industrial Surface', leftX + 12, cardsY + 73, { lineBreak: false });

            // Right Card: Payment & Order Information
            doc.roundedRect(card2X, cardsY, cardW, cardH, 5).fillAndStroke(cardBg, lightBorder);
            doc.fillColor(primaryColor).font('Helvetica-Bold').fontSize(8).text('PURCHASE ORDER & BILLING SUMMARY', card2X + 12, cardsY + 8, { lineBreak: false });

            doc.font('Helvetica').fontSize(7.2).fillColor(mutedColor);
            doc.text('Order ID:', card2X + 12, cardsY + 22, { lineBreak: false });
            doc.fillColor(navyColor).font('Helvetica-Bold').text(`#${order._id.toString().toUpperCase()}`, card2X + 75, cardsY + 22, { lineBreak: false });

            doc.font('Helvetica').fillColor(mutedColor).text('Billing Terms:', card2X + 12, cardsY + 35, { lineBreak: false });
            doc.fillColor(navyColor).font('Helvetica').text('B2B Commercial Tax Invoice', card2X + 75, cardsY + 35, { lineBreak: false });

            doc.font('Helvetica').fillColor(mutedColor).text('Payment Method:', card2X + 12, cardsY + 48, { lineBreak: false });
            const pMethod = order.paymentMethod === 'INVOICE' ? 'Direct B2B Invoice / Wire Transfer' : (order.paymentMethod || 'Invoice');
            doc.fillColor(navyColor).font('Helvetica-Bold').text(pMethod, card2X + 75, cardsY + 48, { lineBreak: false });

            doc.font('Helvetica').fillColor(mutedColor).text('Order Status:', card2X + 12, cardsY + 61, { lineBreak: false });
            const isCaptured = order.isPaid || order.status === 'PAID';
            doc.fillColor(isCaptured ? '#15803d' : '#0D6EFD').font('Helvetica-Bold').text(isCaptured ? 'PAID / CONFIRMED' : 'CONFIRMED (INVOICE SENT)', card2X + 75, cardsY + 61, { lineBreak: false });

            doc.font('Helvetica').fontSize(6.8).fillColor(mutedColor).text('Quality Audit:', card2X + 12, cardsY + 74, { lineBreak: false });
            doc.fillColor(darkColor).font('Helvetica').fontSize(6.8).text('100% Surface Tension Batch Tested (DIN 53364 / ISO 8296)', card2X + 75, cardsY + 74, { width: 170, ellipsis: true, lineBreak: false });

            // ==========================================
            // 3. ITEMS TABLE
            // ==========================================
            const tableTop = cardsY + cardH + 12; // ~194
            const headerH = 20;

            const colX = {
                sno: leftX,              // 32
                desc: leftX + 28,        // 60
                hsn: leftX + 270,        // 302
                qty: leftX + 316,        // 348
                rate: leftX + 348,       // 380
                tax: leftX + 410,        // 442
                total: leftX + 456       // 488
            };

            // Table Header Bar
            doc.rect(leftX, tableTop, contentWidth, headerH).fill(tableHeaderBg);
            doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(7.2);
            doc.text('S.NO', colX.sno, tableTop + 6, { width: 28, align: 'center', lineBreak: false });
            doc.text('ITEM DESCRIPTION & SPECIFICATIONS', colX.desc + 6, tableTop + 6, { lineBreak: false });
            doc.text('HSN / SAC', colX.hsn, tableTop + 6, { width: 44, align: 'center', lineBreak: false });
            doc.text('QTY', colX.qty, tableTop + 6, { width: 30, align: 'center', lineBreak: false });
            doc.text('UNIT RATE', colX.rate, tableTop + 6, { width: 58, align: 'right', lineBreak: false });
            doc.text('TAX', colX.tax, tableTop + 6, { width: 42, align: 'center', lineBreak: false });
            doc.text('TOTAL', colX.total, tableTop + 6, { width: 70, align: 'right', lineBreak: false });

            // Render Rows
            const items = order.orderItems || [];
            let currY = tableTop + headerH;
            const singleRowH = 30;
            let totalQty = 0;

            items.forEach((item, idx) => {
                totalQty += Number(item.qty) || 1;
                if (idx % 2 === 1) {
                    doc.rect(leftX, currY, contentWidth, singleRowH).fill('#F8FAFC');
                }

                doc.fillColor(navyColor).font('Helvetica-Bold').fontSize(7.5);
                doc.text(`${idx + 1}`, colX.sno, currY + 9, { width: 28, align: 'center', lineBreak: false });

                // Item Name & Spec
                const itemName = item.name || 'Dyne Test Instrument';
                doc.fillColor(navyColor).font('Helvetica-Bold').text(itemName, colX.desc + 6, currY + 6, { width: 200, ellipsis: true, lineBreak: false });
                doc.font('Helvetica').fontSize(6.5).fillColor(mutedColor).text('Industrial Testing Grade • Calibrated DIN/ASTM', colX.desc + 6, currY + 18, { width: 200, ellipsis: true, lineBreak: false });

                doc.font('Helvetica').fontSize(7.2).fillColor(bodyColor).text('903180', colX.hsn, currY + 9, { width: 44, align: 'center', lineBreak: false });
                doc.fillColor(navyColor).font('Helvetica-Bold').text(`${item.qty || 1}`, colX.qty, currY + 9, { width: 30, align: 'center', lineBreak: false });

                const unitPrice = Number(item.price) || 0;
                doc.font('Helvetica').fontSize(7.2).fillColor(bodyColor).text(formatCur(unitPrice), colX.rate, currY + 9, { width: 58, align: 'right', lineBreak: false });
                doc.font('Helvetica').fontSize(6.8).fillColor(mutedColor).text('5% Incl.', colX.tax, currY + 9, { width: 42, align: 'center', lineBreak: false });

                const rowTotal = (item.qty || 1) * unitPrice;
                doc.font('Helvetica-Bold').fontSize(7.5).fillColor(navyColor).text(formatCur(rowTotal), colX.total, currY + 9, { width: 70, align: 'right', lineBreak: false });

                // Row border bottom
                doc.strokeColor(lightBorder).lineWidth(0.5).moveTo(leftX, currY + singleRowH).lineTo(rightX, currY + singleRowH).stroke();

                currY += singleRowH;
            });

            // Table Summary Bar
            const sumH = 22;
            doc.rect(leftX, currY, contentWidth, sumH).fill('#F1F5F9');
            doc.fillColor(navyColor).font('Helvetica-Bold').fontSize(7.5);
            doc.text('Total Items: ' + items.length, leftX + 12, currY + 7, { lineBreak: false });
            doc.text('Total Quantity: ' + totalQty, colX.qty - 20, currY + 7, { width: 80, align: 'center', lineBreak: false });
            doc.text('Items Subtotal:', colX.tax - 40, currY + 7, { width: 80, align: 'right', lineBreak: false });
            doc.text(formatCur(order.totalPrice), colX.total, currY + 7, { width: 70, align: 'right', lineBreak: false });

            currY += sumH + 12;

            // ==========================================
            // 4. FINANCIAL BREAKDOWN & TAX SUMMARY (TWO COLUMNS)
            // ==========================================
            const finW = (contentWidth - 14) / 2;
            const fin2X = leftX + finW + 14;

            // Left Block: Amount in words & Tax Breakdown
            doc.roundedRect(leftX, currY, finW, 95, 5).fillAndStroke('#ffffff', lightBorder);
            doc.fillColor(mutedColor).fontSize(7).font('Helvetica-Bold').text('AMOUNT IN WORDS', leftX + 12, currY + 8, { lineBreak: false });
            doc.fillColor(navyColor).fontSize(8.5).font('Helvetica-Bold').text(numberToWords(order.totalPrice), leftX + 12, currY + 20, { width: finW - 24, lineBreak: false });

            // GST Table
            const gstTableY = currY + 36;
            doc.rect(leftX + 8, gstTableY, finW - 16, 14).fill(subtleBg);
            doc.fillColor(mutedColor).font('Helvetica-Bold').fontSize(6.5);
            doc.text('TAX TYPE', leftX + 12, gstTableY + 4, { lineBreak: false });
            doc.text('BASE VAL', leftX + 90, gstTableY + 4, { width: 45, align: 'right', lineBreak: false });
            doc.text('RATE', leftX + 140, gstTableY + 4, { width: 35, align: 'center', lineBreak: false });
            doc.text('TAX AMT', leftX + 185, gstTableY + 4, { width: 50, align: 'right', lineBreak: false });

            const baseVal = (Number(order.totalPrice) || 0) / 1.05;
            const halfTax = ((Number(order.totalPrice) || 0) - baseVal) / 2;

            doc.font('Helvetica').fontSize(6.5).fillColor(bodyColor);
            doc.text('Central GST (CGST)', leftX + 12, gstTableY + 18, { lineBreak: false });
            doc.text(formatCur(baseVal), leftX + 90, gstTableY + 18, { width: 45, align: 'right', lineBreak: false });
            doc.text('2.50%', leftX + 140, gstTableY + 18, { width: 35, align: 'center', lineBreak: false });
            doc.text(formatCur(halfTax), leftX + 185, gstTableY + 18, { width: 50, align: 'right', lineBreak: false });

            doc.text('State GST (SGST)', leftX + 12, gstTableY + 28, { lineBreak: false });
            doc.text(formatCur(baseVal), leftX + 90, gstTableY + 28, { width: 45, align: 'right', lineBreak: false });
            doc.text('2.50%', leftX + 140, gstTableY + 28, { width: 35, align: 'center', lineBreak: false });
            doc.text(formatCur(halfTax), leftX + 185, gstTableY + 28, { width: 50, align: 'right', lineBreak: false });

            doc.fontSize(6).fillColor(mutedColor).text('Certified under CGST / SGST Rules • Reverse Charge: No', leftX + 12, gstTableY + 42, { lineBreak: false });

            // Right Block: Net Total Calculations
            doc.roundedRect(fin2X, currY, finW, 95, 5).fillAndStroke('#ffffff', lightBorder);
            
            const calcY = currY + 10;
            doc.font('Helvetica').fontSize(7.5).fillColor(bodyColor).text('Gross Subtotal:', fin2X + 14, calcY, { lineBreak: false });
            doc.text(formatCur(order.totalPrice), fin2X + 14, calcY, { width: finW - 28, align: 'right', lineBreak: false });

            doc.text('Shipping & Logistics:', fin2X + 14, calcY + 16, { lineBreak: false });
            doc.fillColor('#15803d').font('Helvetica-Bold').text('FREE', fin2X + 14, calcY + 16, { width: finW - 28, align: 'right', lineBreak: false });

            doc.font('Helvetica').fillColor(bodyColor).text('Estimated GST (5%):', fin2X + 14, calcY + 32, { lineBreak: false });
            doc.text(formatCur(halfTax * 2), fin2X + 14, calcY + 32, { width: finW - 28, align: 'right', lineBreak: false });

            // Grand Final Total Banner
            const grandY = calcY + 50;
            doc.roundedRect(fin2X + 8, grandY, finW - 16, 26, 4).fillAndStroke('#EFF6FF', primaryColor);
            doc.fillColor(navyColor).font('Helvetica-Bold').fontSize(9).text('Final Order Amount:', fin2X + 16, grandY + 8, { lineBreak: false });
            doc.fillColor(primaryColor).fontSize(11).font('Helvetica-Bold').text(formatCur(order.totalPrice), fin2X + 16, grandY + 7, { width: finW - 36, align: 'right', lineBreak: false });

            currY += 105;

            // ==========================================
            // 5. SIGNATURE & VERIFICATION
            // ==========================================
            const signH = 65;
            doc.roundedRect(leftX, currY, contentWidth, signH, 5).fillAndStroke(cardBg, lightBorder);

            // Left: Bank details
            doc.fillColor(navyColor).font('Helvetica-Bold').fontSize(7.5).text('BANK DETAILS FOR NEFT / RTGS / WIRE TRANSFER:', leftX + 12, currY + 8, { lineBreak: false });
            doc.font('Helvetica').fontSize(7).fillColor(bodyColor);
            doc.text('Beneficiary: IMAGETECH INDUSTRIES', leftX + 12, currY + 20, { lineBreak: false });
            doc.text('Bank: HDFC Bank Ltd. | A/C Type: Current Account', leftX + 12, currY + 32, { lineBreak: false });
            doc.text('Account No: 50200085491234 | IFSC: HDFC0001234 | Branch: Mahavir Enclave, New Delhi', leftX + 12, currY + 44, { lineBreak: false });

            // Right: Verified Stamp
            const stampW = 160;
            const stampX = rightX - stampW - 12;
            doc.roundedRect(stampX, currY + 8, stampW, 24, 4).fillAndStroke('#ecfdf5', '#10b981');
            doc.fillColor('#047857').font('Helvetica-Bold').fontSize(7.5).text('DIGITALLY AUTHORIZED', stampX, currY + 15, { width: stampW, align: 'center', characterSpacing: 0.5, lineBreak: false });
            doc.font('Helvetica').fontSize(6.8).fillColor(mutedColor).text('For IMAGETECH INDUSTRIES', stampX, currY + 36, { width: stampW, align: 'center', lineBreak: false });
            doc.text('Authorized Signatory', stampX, currY + 46, { width: stampW, align: 'center', lineBreak: false });

            currY += signH + 12;

            // ==========================================
            // 6. BRAND VALUE PILLARS
            // ==========================================
            const pWidth = (contentWidth - 16) / 3;
            const pH = 44;

            const pillars = [
                { title: 'ACCURATE CALIBRATION', desc: 'Tested to DIN 53364 and ASTM D2578 standards.' },
                { title: 'PROMPT SHIPMENT', desc: 'Secure industrial packing with tracking updates.' },
                { title: 'TECHNICAL ASSISTANCE', desc: 'Direct engineer support for surface energy analysis.' }
            ];

            pillars.forEach((p, i) => {
                const pX = leftX + i * (pWidth + 8);
                doc.roundedRect(pX, currY, pWidth, pH, 4).fillAndStroke('#ffffff', lightBorder);
                doc.fillColor(primaryColor).font('Helvetica-Bold').fontSize(7.2).text(p.title, pX + 6, currY + 9, { width: pWidth - 12, align: 'center', lineBreak: false });
                doc.fillColor(mutedColor).font('Helvetica').fontSize(6.5).text(p.desc, pX + 6, currY + 22, { width: pWidth - 12, align: 'center', lineBreak: true });
            });

            currY += pH + 12;

            // ==========================================
            // 7. FOOTER & COMPLIANCE NOTE
            // ==========================================
            doc.fillColor(mutedColor).fontSize(6.2).font('Helvetica').text('This document is a computer-generated commercial Tax Invoice issued by ImageTech Industries under GST Rules. Goods once sold are backed by manufacturing warranty against calibration discrepancies.', leftX, currY, { width: contentWidth, align: 'center', lineBreak: false });

            const footerY = 800;
            doc.strokeColor(lightBorder).lineWidth(0.5).moveTo(leftX, footerY).lineTo(rightX, footerY).stroke();
            doc.fillColor(navyColor).font('Helvetica-Bold').fontSize(7.5).text('IMAGETECH INDUSTRIES • "Your Satisfaction is our Priority"', leftX, footerY + 5, { width: contentWidth, align: 'center', lineBreak: false });
            doc.font('Helvetica').fontSize(6.2).fillColor(mutedColor).text('Regd. Office: RZ-I-13, 2nd Floor, Nanda Block, Mahavir Enclave, New Delhi - 110045 | Phone: +91 8448336036 | Email: sales.imagetechindustries@gmail.com', leftX, footerY + 16, { width: contentWidth, align: 'center', lineBreak: false });

            doc.end();
        } catch (error) {
            console.error('Invoice PDF Generation Exception:', error);
            reject(error);
        }
    });
};

export default {
    generateInvoicePDF
};
