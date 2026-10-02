import { v2 as cloudinary } from "cloudinary";
import { ENV } from "../../config/env.js";

const isConfigured = Boolean(
  ENV.CLOUDINARY_CLOUD_NAME &&
  ENV.CLOUDINARY_API_KEY &&
  ENV.CLOUDINARY_API_SECRET
);

if (isConfigured) {
  cloudinary.config({
    cloud_name: ENV.CLOUDINARY_CLOUD_NAME,
    api_key: ENV.CLOUDINARY_API_KEY,
    api_secret: ENV.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

export const isCloudinaryConfigured = () => isConfigured;

/**
 * Upload a local file path or stream to Cloudinary
 * @param {string} filePath - Absolute path to local file
 * @param {object} options - Cloudinary upload options (folder, public_id, etc.)
 * @returns {Promise<{ url: string, secure_url: string, public_id: string }>}
 */
export const uploadToCloudinary = async (filePath, options = {}) => {
  if (!isConfigured) {
    throw new Error("Cloudinary credentials are not configured.");
  }

  const folder = options.folder || "culinary_academy/uploads";
  const result = await cloudinary.uploader.upload(filePath, {
    folder,
    resource_type: "auto",
    transformation: options.transformation || [
      { quality: "auto:eco" },
      { fetch_format: "auto" },
    ],
    ...options,
  });

  return {
    url: result.url,
    secure_url: result.secure_url,
    public_id: result.public_id,
    format: result.format,
    bytes: result.bytes,
  };
};

/**
 * Delete a file from Cloudinary by public ID
 * @param {string} publicId
 */
export const deleteFromCloudinary = async (publicId) => {
  if (!isConfigured || !publicId) return null;
  try {
    return await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    console.warn("⚠️ Cloudinary delete failed:", err.message);
    return null;
  }
};

export default cloudinary;
