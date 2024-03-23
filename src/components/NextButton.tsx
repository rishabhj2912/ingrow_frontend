import ArrowRight from '@/assets/icons/arrow-right.svg';

export default function NextButton({
  placeholder,
  onClick,
  className,
}: {
  placeholder: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <div
      className={`flex gap-2 items-center cursor-pointer ${className}`}
      onClick={onClick}
    >
      <p className='text-xl font-semibold bg-gradient-to-b from-purple-primary to-blue-primary bg-clip-text text-transparent capitalize'>
        {placeholder}
      </p>
      <ArrowRight />
    </div>
  );
}
