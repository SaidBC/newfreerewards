import z from "zod";

const serverEnv = z.object({
  DATABASE_URL: z.string(),
});

export default serverEnv.parse({
  DATABASE_URL: process.env.DATABASE_URL,
});
