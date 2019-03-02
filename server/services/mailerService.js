const nodemailer = require("nodemailer");
process.env.NODE_ENV === "production" ? null : require("dotenv").config()
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAILUSERNAME,
        pass: process.env.EMAILPASSWORD
    },
    logger: true
});
mailerService = {
    sendCampaign: (campaignId, airline, mongoDb) => {
        let campaignPromise = new Promise((resolve, reject) => {
            mongoDb.collection("campaigns").findOne({ name: campaignId }, (err, campaignInfo) => {
                if (!err && campaignInfo !== null) {
                    resolve(campaignInfo)
                } else {
                    reject("Error finding campaign. Cannot send emails")
                }
            });
        });
        let airlinePromise = new Promise((resolve, reject) => {
            mongoDb.collection("airlines").findOne({ iataCode: airline }, (err, airlineInfo) => {
                if (!err && airlineInfo !== null) {
                    resolve(airlineInfo)
                } else {
                    reject("Error finding airline. Cannot send emails")
                }
            });
        });
        let recipientsPromise = new Promise((resolve, reject) => {
            mongoDb.collection("mailingList").find({ iata: airline }).toArray((err, recipients) => {
                if (!err && recipients !== null) {
                    resolve(recipients)
                } else {
                    reject("Error finding recipients. Cannot send emails")
                }
            });
        });
        Promise.all([campaignPromise, airlinePromise, recipientsPromise]).then(results => {
            results[2].forEach(reciptient => {
                const loyaltyNumber = reciptient.loyalty ? `Loyalty Number: ${reciptient.loyalty}` : ""
                const html = results[0].markup.replace(/{{{loyalty number}}}/gi, loyaltyNumber)
                let mailOptions = {
                    from: `"${results[1].airlineName}" <${results[1].airlineEmail}>`,
                    to: reciptient.email,
                    subject: results[0].subject,
                    text: html,
                    html: html
                };
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log('Error sending mail');
                        console.log(error.message);
                    }
                    console.log(`Message sent successfully! ${JSON.stringify(info)}`);
                })
            });
        }).catch(error => {
            console.log(`Could not send emails: ${error}`)
        });
    }
}

module.exports = mailerService;