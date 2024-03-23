import { Dispatch, SetStateAction } from 'react';
import Search from '@/assets/icons/search.svg';

export default function SearchBar({
  placeholder,
  search,
  setSearch,
  className,
}: {
  placeholder: string;
  className?: string;
  search?: string;
  setSearch: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div
      className={`bg-white rounded-lg flex w-full h-10 px-4 items-center border border-light-grey-primary ${className}`}
    >
      <input
        value={search}
        className='flex-1 bg-inherit placeholder:text-grey-primary placeholder:text-xs outline-none text-sm'
        placeholder={placeholder}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <Search className='cursor-pointer' />
    </div>
  );
}
