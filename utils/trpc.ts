import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import { GetInferenceHelpers } from "@trpc/server";
import { NextPageContext } from "next";
import type { AppRouter } from "../src/server/routers/_app";

function getBaseUrl() {
  if (typeof window !== "undefined") {
    return "";
  }
  return `http://localhost:3000`;
}

export interface SSRContext extends NextPageContext {
  /**
   * Set HTTP Status code
   * @example
   * const utils = trpc.useContext();
   * if (utils.ssrContext) {
   *   utils.ssrContext.status = 404;
   * }
   */
  status?: number;
}
export const trpc = createTRPCNext<AppRouter, SSRContext>({
  config({ ctx }) {
    return {
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
          headers() {
            if (ctx?.req) {
              const { connection: _connection, ...headers } = ctx.req.headers;
              return {
                ...headers,
                // Optional: inform server that it's an SSR request
                "x-ssr": "1",
              };
            }
            return {};
          },
        }),
      ],
    };
  },

  ssr: true,

  responseMeta(opts) {
    const ctx = opts.ctx as SSRContext;

    if (ctx.status) {
      return {
        status: ctx.status,
      };
    }

    const error = opts.clientErrors[0];
    if (error) {
      return {
        status: error.data?.httpStatus ?? 500,
      };
    }

    return {};
  },
});

export type AppRouterTypes = GetInferenceHelpers<AppRouter>;
