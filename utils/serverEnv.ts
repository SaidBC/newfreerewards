import z from "zod";

const serverEnv = z.object({
  DATABASE_URL: z.string(),
  ADMIN_PASSWORD: z.string().default("admin123"),
  CLOUDINARY_CLOUD_NAME: z.string(),
  CLOUDINARY_API_KEY: z.string(),
  CLOUDINARY_API_SECRET: z.string(),
});

export default serverEnv.parse({
  DATABASE_URL: process.env.DATABASE_URL,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
});
