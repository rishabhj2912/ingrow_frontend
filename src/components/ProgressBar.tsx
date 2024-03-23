export default function ProgressBar({
  percentage,
  className,
}: {
  percentage: string;
  className?: string;
}) {
  return (
    <div
      className={`bg-gradient-to-r from-purple-primary to-blue-primary w-[${percentage}%] ${className}`}
    />
  );
}
