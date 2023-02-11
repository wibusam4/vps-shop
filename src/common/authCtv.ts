import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";

import { authOptions } from "../pages/api/auth/[...nextauth]";

export const requireCtv =
  (func: GetServerSideProps) => async (ctx: GetServerSidePropsContext) => {
    const session = await unstable_getServerSession(
      ctx.req,
      ctx.res,
      authOptions
    );
    if (!session) {
      return {
        redirect: {
          destination: "/auth/login",
          permanent: false,
        },
      };
    }
    if (session.user.role != "CTV" && session.user.role != "ADMIN") {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
    return await func(ctx);
  };
