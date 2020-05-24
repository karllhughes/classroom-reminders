const Nexmo = require("nexmo");
const PNF = require("google-libphonenumber").PhoneNumberFormat;
const phoneUtil = require("google-libphonenumber").PhoneNumberUtil.getInstance();

const nexmo = new Nexmo({
  apiKey: process.env.NEXMO_API_KEY,
  apiSecret: process.env.NEXMO_API_SECRET,
  applicationId: process.env.NEXMO_APP_ID,
  privateKey: process.env.NEXMO_PRIVATE_KEY_PATH,
});

module.exports.sendSms = (telephone, message, callback) => {
  const formattedPhoneNumber = phoneUtil.format(
    phoneUtil.parseAndKeepRawInput(telephone, "US"),
    PNF.E164
  );
  nexmo.channel.send(
    { type: "sms", number: formattedPhoneNumber },
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
