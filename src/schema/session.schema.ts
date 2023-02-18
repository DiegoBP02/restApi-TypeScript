import { object, string } from "zod";

export const createSessionSchema = object({
  body: object({
    email: string({
      required_error: "Please provide email!",
    }),
    password: string({
      required_error: "Please provide password!",
    }),
  }),
});
