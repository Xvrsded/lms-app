type NoticeVariant = "info" | "success" | "error";

type NoticeProps = {
  message: string;
  variant?: NoticeVariant;
};

const variantClasses: Record<NoticeVariant, string> = {
  info: "border-blue-200 bg-blue-50 text-blue-700",
  success: "border-emerald-200 bg-emerald-50 text-emerald-700",
  error: "border-rose-200 bg-rose-50 text-rose-700",
};

export function Notice({ message, variant = "info" }: NoticeProps) {
  return <div className={`rounded-md border px-3 py-2 text-sm ${variantClasses[variant]}`}>{message}</div>;
}
