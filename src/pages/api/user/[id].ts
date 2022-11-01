import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../../lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  if (req.method === "GET") {
    const user = await client.user.findUnique({
      where: { id: id as string },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    res.status(200).json(user);
  }
  if (req.method === "PUT") {
    const user = await client.user.update({
      where: { id: id as string },
      data: {
        ...req.body,
      },
    });
    res.status(200).json(user);
  }
  if (req.method === "DELETE") {
    const user = await client.user.delete({
      where: { id: id as string },
    });
    res.status(200).json(user);
  }
}
