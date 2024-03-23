export default function GradientButton({
  label,
  checked = false,
  onClick,
  className,
}: {
  label: string;
  onClick: () => void;
  checked?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`bg-gradient-to-r from-purple-primary to-blue-primary min-w-[120px] h-12 rounded-full p-[2.5px] cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div
        className={`w-full h-full rounded-full flex items-center justify-center ${
          !checked && 'bg-white'
        }`}
      >
        <p
          className={`text-medium m-1 ${
            checked
              ? 'text-white'
              : 'bg-gradient-to-b from-purple-primary to-blue-primary bg-clip-text text-transparent'
          }`}
        >
          {label}
        </p>
      </div>
    </div>
  );
}
