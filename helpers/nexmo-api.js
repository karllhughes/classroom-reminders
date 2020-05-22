const Nexmo = require("nexmo");

const nexmo = new Nexmo({
  apiKey: process.env.NEXMO_API_KEY,
  apiSecret: process.env.NEXMO_API_SECRET,
  applicationId: process.env.NEXMO_APP_ID,
  privateKey: process.env.NEXMO_PRIVATE_KEY_PATH,
});

module.exports.sendSms = (telephone, message, callback) => {
  nexmo.channel.send(
    { type: "sms", number: telephone },
    { type: "sms", number: process.env.NEXMO_PHONE_NUMBER },
    {
      content: {
        type: "text",
        text: message,
      },
    },
    callback,
    { useBasicAuth: true }
  );
};
