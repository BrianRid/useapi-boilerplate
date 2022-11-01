import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../../lib/prismadb";
import { hash } from "argon2";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, email, password } = req.body;
    const securedPassword = await hash(password);
    const user = await client.user.create({
      data: {
        name,
        email,
        password: securedPassword,
      },
    });
    res.status(200).json(user);
  }
}
