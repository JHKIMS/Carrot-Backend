import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "../../../libs/server/withHandler";
import client from "../../../libs/server/client";
import twilio from "twilio";

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { phone, email } = req.body;
  const uniqueKey = Math.floor(100000 + Math.random() * 900000) + "";
  const user = phone ? { phone: +phone } : email ? { email } : null;
  if (!user) return res.status(400).json({ ok: false });
  const token = await client.token.create({
    data: {
      uniqueKey: uniqueKey,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: "Tester-Token",
            ...user,
          },
        },
      },
    },
  });
  if (phone) {
    const message = await twilioClient.messages.create({
      messagingServiceSid: process.env.TWILIO_SERVICE,
      to: process.env.MY_PHONE!,
      body: `Your login token is ${uniqueKey}`,
    });
    console.log(message);
  }
  console.log(token);
  return res.json({
    ok: true,
  });
}

export default withHandler("POST", handler);
