import "dotenv/config";
import fs from "fs";
import path from "path";
import cloudinary from "../lib/cloudinary";

function assertCloudinaryEnv() {
  const requiredVars = [
    "CLOUDINARY_CLOUD_NAME",
    "CLOUDINARY_API_KEY",
    "CLOUDINARY_API_SECRET",
  ];

  const missing = requiredVars.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`Missing required Cloudinary env vars: ${missing.join(", ")}`);
  }
}

function toPosixRelativePath(inputPath: string) {
  const absolutePath = path.resolve(process.cwd(), inputPath);
  const relativePath = path.relative(process.cwd(), absolutePath);
  return relativePath.split(path.sep).join("/");
}

function toPublicId(relativePath: string) {
  const withoutExtension = relativePath.replace(/\.[^/.]+$/, "");
  return withoutExtension
    .replace(/[^a-zA-Z0-9/_-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^[-/]+|[-/]+$/g, "");
}

function toDeterministicDeliveryUrl(publicId: string) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  return `https://res.cloudinary.com/${cloudName}/image/upload/${publicId}`;
}

async function uploadSingleFile(relativePath: string) {
  const absolutePath = path.resolve(process.cwd(), relativePath);

  if (!fs.existsSync(absolutePath)) {
    throw new Error(`File not found: ${relativePath}`);
  }

  const publicId = toPublicId(relativePath);

  await cloudinary.uploader.upload(absolutePath, {
    public_id: publicId,
    resource_type: "image",
    overwrite: true,
    unique_filename: false,
    use_filename: false,
  });

  return toDeterministicDeliveryUrl(publicId);
}

async function main() {
  assertCloudinaryEnv();

  const args = process.argv.slice(2);
  if (args.length === 0) {
    throw new Error(
      "Usage: npm run upload:cloudinary-images -- <file1> <file2> ..."
    );
  }

  const uniqueSortedRelativePaths = Array.from(
    new Set(args.map((arg) => toPosixRelativePath(arg)))
  ).sort((a, b) => a.localeCompare(b));

  const mapping: Record<string, string> = {};

  for (const relativePath of uniqueSortedRelativePaths) {
    console.log(`Uploading ${relativePath} ...`);
    const deliveryUrl = await uploadSingleFile(relativePath);
    mapping[relativePath] = deliveryUrl;
    console.log(`Uploaded ${relativePath} -> ${deliveryUrl}`);
  }

  const sortedMapping = Object.fromEntries(
    Object.entries(mapping).sort(([a], [b]) => a.localeCompare(b))
  );

  const outputPath = path.resolve(process.cwd(), "br/cloudinary-upload-map.json");
  fs.writeFileSync(outputPath, `${JSON.stringify(sortedMapping, null, 2)}\n`, "utf8");

  console.log(`\nSaved mapping to ${outputPath}`);
  console.log(JSON.stringify(sortedMapping, null, 2));
}

main().catch((error) => {
  console.error("Upload failed:", error);
  process.exit(1);
});
