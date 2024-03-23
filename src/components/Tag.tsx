export default function Tag({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <div
      className={`px-2 py-1 text-xs uppercase font-bold text-white bg-yellow-primary rounded-full tracking-[0.5px] ${className}`}
    >
      {text}
    </div>
  );
}
