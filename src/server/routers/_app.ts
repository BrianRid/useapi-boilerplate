import { publicProcedure, router } from "../trpc";
import { UserRouter } from "./user";

export const appRouter = router({
  healthcheck: publicProcedure.query(() => "TEST!"),
  users: UserRouter.find,
  signup: UserRouter.signup,
});

export type AppRouter = typeof appRouter;
