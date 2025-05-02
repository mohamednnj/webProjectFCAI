//
// const Mailjet = require('node-mailjet');
//
// const mailjet = new Mailjet({
//   apiKey: '8d1b9ec35a2caad968e9b59c2f306cfa',
//   apiSecret: 'dd5d44ca5c062381b176e0907c929774',
// });
//
// mailjet
//     .post('send', { version: 'v3.1' })
//     .request({
//       Messages: [
//         {
//           From: {
//             Email: 'mohamedelsary960@gmail.com',
//             Name: 'mohamedelsary'
//           },
//           To: [
//             {
//               Email: 'cotiva.usc@gmail.com',
//               Name: 'cotiva'
//             }
//           ],
//           Subject: 'Hello from Mailjet and Node.js!',
//           TextPart: 'This is a plain text email body.',
//           HTMLPart: '<h3>This is an HTML email body.</h3>'
//         }
//       ]
//     })
//     .then(result => {
//       console.log('✅ Email sent successfully:', result.body);
//     })
//     .catch(err => {
//       console.error('❌ Error sending email:', err.statusCode, err.response?.data || err.message);
//     });
/**
 *
 * This call sends a message to one recipient.
 *
 */
// const mailjet = require ('node-mailjet')
//     .connect("8d1b9ec35a2caad968e9b59c2f306cfa", "dd5d44ca5c062381b176e0907c929774")
// const request = mailjet
//     .post("send", {'version': 'v3.1'})
//     .request({
//         "Messages":[
//             {
//                 "From": {
//                     Email: 'mohamedelsary960@gmail.com',
//                     Name: 'mohamedelsary'
//                 },
//                 "To": [
//                     {
//                         Email: 'cotiva.usc@gmail.com',
//                         Name: 'cotiva'
//                     }
//                 ],
//                 "Subject": "Your email flight plan!",
//                 "TextPart": "Dear passenger 1, welcome to Mailjet! May the delivery force be with you!",
//                 "HTMLPart": "<h3>Dear passenger 1, welcome to <a href=\"https://www.mailjet.com/\">Mailjet</a>!</h3><br />May the delivery force be with you!"
//             }
//         ]
//     })
// request
//     .then((result) => {
//         console.log(result.body)
//     })
//     .catch((err) => {
//         console.log(err.statusCode)
//     })
const Mailjet = require('node-mailjet');
const mailjet = Mailjet.apiConnect(
    process.env.MJ_APIKEY_PUBLIC,
    process.env.MJ_APIKEY_PRIVATE,
);

const request = mailjet
    .post('send', { version: 'v3.1' })
    .request({
        Messages: [
            {
                From: {
                    Email: "pilot@mailjet.com",
                    Name: "Mailjet Pilot"
                },
                To: [
                    {
                        Email: "passenger1@mailjet.com",
                        Name: "passenger 1"
                    }
                ],
                Subject: "Your email flight plan!",
                TextPart: "Dear passenger 1, welcome to Mailjet! May the delivery force be with you!",
                HTMLPart: "<h3>Dear passenger 1, welcome to <a href=\"https://www.mailjet.com/\">Mailjet</a>!</h3><br />May the delivery force be with you!"
            }
        ]
    })

request
    .then((result) => {
        console.log(result.body)
    })
    .catch((err) => {
        console.log(err.statusCode)
    })
