import z from "zod";

const serverEnv = z.object({
  DATABASE_URL: z.string(),
  ADMIN_PASSWORD: z.string().default("admin123"),
});

export default serverEnv.parse({
  DATABASE_URL: process.env.DATABASE_URL,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
});
