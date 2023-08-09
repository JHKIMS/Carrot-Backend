import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "../../../libs/server/withHandler";
import client from "../../../libs/server/client";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { phone, email } = req.body;
  let user;
  if (email) {
    user = await client.user.findUnique({
      where: {
        email: email,
      },
    });
    if (user) console.log("found it User.");
    if (!user) {
      console.log("Did not find user");
      user = await client.user.create({
        data: {
          name: "Tester",
          email: email,
        },
      });
    }
  }

  if (phone) {
    user = await client.user.findUnique({
      where: {
        phone: +phone,
      },
    });
    if (user) console.log("found it User.");
    if (!user) {
      console.log("Did not find user");
      user = await client.user.create({
        data: {
          name: "Tester",
          phone: +phone,
        },
      });
    }
  }
  console.log(user);

  return res.status(200).end();
}

export default withHandler("POST", handler);
