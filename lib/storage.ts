import clientEnv from "../utils/clientEnv";

const LEGACY_STORAGE_URL =
  "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards";

const storageBaseUrl = clientEnv.NEXT_PUBLIC_STORAGE_URL.replace(/\/$/, "");

export function storageUrl(assetPath: string) {
  return `${storageBaseUrl}/${assetPath.replace(/^\/+/, "")}`;
}

export function normalizeStorageUrl(url: string | null | undefined) {
  if (!url) {
    return url;
  }

  if (url.startsWith(`${LEGACY_STORAGE_URL}/`)) {
    return storageUrl(url.slice(LEGACY_STORAGE_URL.length + 1));
  }

  return url;
}
