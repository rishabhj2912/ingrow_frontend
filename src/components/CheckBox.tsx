'use client';

import { Dispatch, SetStateAction } from 'react';

export default function CheckBox({
  label,
  checked,
  setChecked,
}: {
  label: string;
  checked: boolean;
  setChecked: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div
      className="flex cursor-pointer gap-3 ml-1"
      onClick={() => setChecked(!checked)}
    >
      <input
        className="relative h-7 w-7 appearance-none rounded-md border-solid outline-none 
   before:absolute before:border-2 before:border-blue-primary before:h-7 before:w-7 before:rounded-md
   before:bg-transparent before:content-[''] 
   checked:border-r-blue-primary checked:bg-blue-primary  checked:after:absolute  checked:after:rotate-45 
   checked:after:border-0.5  checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer  hover:before:shadow-[0px_0px_0px_0.5px_rgba(0,0,0,0.6)] 
    shadow-none transition-[border-color_0.2s] before:scale-100
    before:transition-[box-shadow_0.2s,transform_0.2s]
     after:absolute after:z-[1] after:block after:content-[''] checked:before:scale-100 
     checked:before:shadow-none
     checked:after:h-4 checked:after:w-2 checked:after:flex  checked:before:transition-[box-shadow_0.2s,transform_0.2s] checked:after:mt-[0.25rem] checked:after:ml-2.5  checked:after:rounded-none checked:after:border-[0.125rem] 
     checked:after:border-t-0 checked:after:border-l-0 checked:after:border-solid
      checked:after:border-white  disabled:checked:bg-grey-primary-text-2 disabled:border-grey-primary-text-2 cursor-pointer"
        type="checkbox"
        checked={checked}
        readOnly
      />
      <p className="text-grey-primary text-lg">{label}</p>
    </div>
  );
}
