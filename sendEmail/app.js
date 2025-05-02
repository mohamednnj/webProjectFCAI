require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const Mailjet = require('node-mailjet');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Mailjet API keys
const mailjet = Mailjet.apiConnect(
    process.env.MJ_APIKEY_PUBLIC,
    process.env.MJ_APIKEY_PRIVATE
);

// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: true }));

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Route to the form page
app.get('/', (req, res) => {
    res.render('emailForm', { message: null });
});

// Route to handle the email sending
app.post('/send-email', async (req, res) => {
    const { toEmail, toName, subject, textContent, htmlContent } = req.body;

    try {
        const result = await mailjet.post('send', { version: 'v3.1' })
            .request({
                Messages: [
                    {
                        From: {
                            Email: process.env.FROM_EMAIL,
                            Name: 'Your Name or App',
                        },
                        To: [
                            {
                                Email: toEmail,
                                Name: toName,
                            },
                        ],
                        Subject: subject,
                        TextPart: textContent,
                        HTMLPart: htmlContent,
                    },
                ],
            });

        console.log('Email sent successfully:', result.body);
        res.render('emailForm', { message: 'Email sent successfully!' });
    } catch (err) {
        console.error('Failed to send email:', err.statusCode, err.response?.data || err.message);
        res.render('emailForm', { message: 'Failed to send email. Please try again.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
