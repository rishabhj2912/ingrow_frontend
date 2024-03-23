'use client';
import Tag from '@/components/Tag';
import Logo from '../assets/icons/ingrow-logo.svg';
import ChevronDown from '../assets/icons/chevron-down.svg';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/user-slice';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { NAVIGATIONS } from '@/constants';

export default function Navbar({ component }: { component?: JSX.Element }) {
  const pathName = usePathname();
  const user = useAppSelector((state) => state.userReducer.value);
  const dispatch = useDispatch<AppDispatch>();
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  return (
    <nav className='h-20 w-full p-5 flex border-b border-light-grey-primary relative'>
      <div className='px-4 lg:px-8 py-3 border-e border-light-grey-primary'>
        <Logo
          onClick={() => {
            router.push('/');
          }}
          className='cursor-pointer'
        />
      </div>
      <div className='flex-1 px-4 lg:px-8 flex items-center gap-6 lg:gap-8'>
        {component
          ? component
          : NAVIGATIONS.map((item) => (
              <Link
                key={item.title}
                href={item.link}
                className={`text-sm leading-4 capitalize ${
                  pathName == item.link && 'font-semibold text-purple-primary'
                }`}
              >
                {item.title}
              </Link>
            ))}
      </div>
      <div className='border-s border-light-grey-primary px-4 flex items-center'>
        <Tag text='pro' className='mr-6' />
        <div
          className='flex items-center cursor-pointer'
          onClick={() => {
            setShowDropdown(!showDropdown);
          }}
        >
          <Image
            src={user?.picture ?? ''}
            alt='user profile'
            width={35}
            height={37}
            className='rounded-full mr-3'
          />
          <p className='font-semibold text-sm leading-4 mr-3 lg:mr-5'>
            {`${user?.firstName} ${user?.lastName}`}
          </p>
          <ChevronDown className='w-4 h-2' />
        </div>
      </div>
      {showDropdown && (
        <div className='z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-44 absolute top-16 right-10 border border-gray-200'>
          <div className='py-2 text-sm text-black-primary'>
            <div
              className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
              onClick={() => {
                router.push('/login');
                dispatch(logout());
                deleteCookie('token');
              }}
            >
              Logout
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
