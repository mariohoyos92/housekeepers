import { NextApiRequest, NextApiResponse } from "next";
import Twilio from "twilio";

const MessagingResponse = Twilio.twiml.MessagingResponse;

type TwilioMessageBody = {
  ToCountry: string;
  ToState: string;
  SmsMessageSid: string;
  NumMedia: string;
  ToCity: string;
  FromZip: string;
  SmsSid: string;
  FromState: string;
  SmsStatus: string;
  FromCity: string;
  Body: string;
  FromCountry: string;
  To: string;
  ToZip: string;
  NumSegments: string;
  MessageSid: string;
  AccountSid: string;
  From: string;
  ApiVersion: string;
};

export default async (
  req: Omit<NextApiRequest, "body"> & {
    body: TwilioMessageBody;
  },
  res: NextApiResponse
) => {
  const twiml = new MessagingResponse();
  twiml.message("The Robots are coming! Head for the hills!");
  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
};
