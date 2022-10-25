import { router, publicProcedure } from "../trpc";
import { signUpSchema } from "../../pages/api/auth/validation";
import { hash } from "argon2";

export const UserRouter = router({
  find: publicProcedure.query(async ({ ctx }) => {
    await ctx.client.user.findMany();
  }),
  signup: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ input, ctx }) => {
      const { email, password, username } = input;
      const hashedPassword = await hash(password);
      const user = await ctx.client.user.create({
        data: {
          email,
          username,
          password: hashedPassword,
        },
      });
      return user;
    }),
});
