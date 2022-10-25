import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import client from "../../lib/prismadb";

export async function createContext(ctx: trpcNext.CreateNextContextOptions) {
  const { req, res } = ctx;

  return {
    req,
    res,
    client,
  };
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
