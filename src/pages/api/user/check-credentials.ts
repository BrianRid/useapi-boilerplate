import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../../lib/prismadb";
import { hash } from "argon2";
import { omit } from "lodash";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const user = await client.user.findUnique({
      where: { email: req.body.email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });
    if (user && user.password == (await hash(req.body.password))) {
      res.status(200).json(omit(user, "password"));
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  }
}
