import { prisma } from "../../server/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  var slugify = require("slugify");
  switch (req.method) {
    case "POST":
      const { name, status } = req.body;
      const category = await prisma.category.create({
        data: {
          name,
          status,
          slug: `c/${slugify(`${name.toLowerCase()}`)}`,
        },
      });
      res.status(201).json(category);
      break;
    case "PUT":
      const categoryUpdate = await prisma.category.update({
        where: {
          id: req.body.id,
        },
        data: {
          name: req.body.name,
          status: req.body.status,
          slug: `c/${slugify(`${req.body.name.toLowerCase()}`)}`,
        },
      });
      res.status(201).json(categoryUpdate);
      break;
    case "DELETE":
      const categoryDelete = await prisma.category.delete({
        where: {
          id: req.body.id,
        },
      });
      res.status(201).json(categoryDelete);
      break;
    default:
      res.setHeader("Allow", ["POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
