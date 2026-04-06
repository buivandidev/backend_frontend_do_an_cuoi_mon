const DEFAULT_API_BASE_URL = "http://127.0.0.1:5187";

export type ApiEnvelope<T> = {
  thanhCong?: boolean;
  ThanhCong?: boolean;
  thongDiep?: string;
  ThongDiep?: string;
  duLieu?: T;
  DuLieu?: T;
};

export function getApiBaseUrl(): string {
  return (process.env.NEXT_PUBLIC_API_BASE_URL || DEFAULT_API_BASE_URL).replace(/\/+$/, "");
}

export function buildApiUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getApiBaseUrl()}${normalizedPath}`;
}

export function resolveMediaUrl(path: string | null | undefined, fallback: string): string {
  if (!path) return fallback;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return buildApiUrl(path);
}

export function unwrapApiEnvelope<T>(payload: unknown): {
  success: boolean;
  message?: string;
  data?: T;
} {
  const value = payload as ApiEnvelope<T> | null | undefined;
  if (!value || typeof value !== "object") {
    return { success: false, message: "Phan hoi API khong hop le." };
  }

  return {
    success: value.thanhCong ?? value.ThanhCong ?? false,
    message: value.thongDiep ?? value.ThongDiep,
    data: value.duLieu ?? value.DuLieu,
  };
}

export function isGuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value.trim(),
  );
}
