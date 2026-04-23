import { NextResponse } from "next/server";
import { UploadApiResponse } from "cloudinary";
import cloudinary from "@/lib/cloudinary";
import { isAdminAuthenticated } from "@/lib/adminAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

function sanitizeSegment(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^[-_]+|[-_]+$/g, "");
}

function sanitizeFolder(value: string) {
  const sanitized = value
    .replace(/\\/g, "/")
    .split("/")
    .map((segment) => sanitizeSegment(segment))
    .filter(Boolean)
    .join("/");

  return sanitized || "images/uploads";
}

function sanitizeFilename(value: string) {
  const withoutExtension = value.replace(/\.[^/.]+$/, "");
  return sanitizeSegment(withoutExtension) || "image";
}

function uploadToCloudinary(buffer: Buffer, publicId: string) {
  return new Promise<UploadApiResponse>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        public_id: publicId,
        resource_type: "image",
        overwrite: false,
        unique_filename: false,
        use_filename: false,
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Cloudinary upload failed."));
          return;
        }

        resolve(result);
      }
    );

    stream.end(buffer);
  });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const folderInput = formData.get("folder");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Image file is required." }, { status: 400 });
    }

    if (typeof folderInput !== "string" || !folderInput.trim()) {
      return NextResponse.json({ error: "Folder is required." }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Only image uploads are allowed." }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "Image is too large. Maximum file size is 10 MB." },
        { status: 413 }
      );
    }

    const folder = sanitizeFolder(folderInput);
    const fileName = sanitizeFilename(file.name);
    const suffix = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
    const publicId = `${folder}/${fileName}-${suffix}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await uploadToCloudinary(buffer, publicId);
    const assetPath = `${result.public_id}.${result.format ?? file.name.split(".").pop() ?? "png"}`;

    return NextResponse.json({
      success: true,
      file: {
        url: result.secure_url,
        assetPath,
        folder,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
        bytes: result.bytes,
        format: result.format,
      },
    });
  } catch (error) {
    console.error("Admin upload failed:", error);
    return NextResponse.json({ error: "Upload failed." }, { status: 500 });
  }
}
