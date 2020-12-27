import Twilio from "twilio";
import { MessageInstance } from "twilio/lib/rest/api/v2010/account/message";
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const twilioClient = Twilio(accountSid, authToken);

export const sendTextMessage = (phoneNumber: string, body: string, callback: (message: MessageInstance) => void) =>
  twilioClient.messages
    .create({
      body,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    })
    .then(callback);
