import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "../../../server/db";
const argon2 = require("argon2");

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { name, email, password } = req.body;

    try {
      const hash = await argon2.hash(password, 0);
      await prisma.user.create({
        data: {
          name: name ? name : null,
          email: email ? email : null,
          password: hash ? password : null,
        },
      });

      return res.status(200).end();
    } catch (e) {
      return res.status(503).json({ error: e.code });
    }
  } else {
    return res
      .status(405)
      .json({ error: "This request only supports POST requests" });
  }
};

export default register;
