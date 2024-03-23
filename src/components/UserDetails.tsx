import Image, { StaticImageData } from 'next/image';

export default function UserDetails({
  img,
  name,
  desc,
}: {
  img: string | StaticImageData;
  name: string;
  desc: string;
}) {
  return (
    <div className='flex gap-2.5 items-center w-full max-w-[100%]'>
      <Image
        src={img}
        alt='user profile'
        className='w-[38px] h-[38px] rounded-full'
        width={42}
        height={42}
      />
      <div className='w-[75%] max-w-[100%]:'>
        <p className='text-sm leading-4 font-medium'>{name}</p>
        <p className='text-grey-primary text-xs truncate w-full'>{desc}</p>
      </div>
    </div>
  );
}
