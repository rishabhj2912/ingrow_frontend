'use client';
import Logo from '@/assets/icons/ingrow-logo.svg';
import Illustration from '@/assets/images/login.svg';
import Button from '@/components/Button';
import Linkedin from '@/assets/icons/linked-in.svg';
import { useEffect, useState } from 'react';
import { getCookies } from 'cookies-next';
import Spinner from '@/components/Spinner';
import { useRouter } from 'next/navigation';

export default function ReLogin() {
  const router = useRouter();
  const [reloggedin, setReloggedin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const { cookies, csrfToken } = getCookies();
    if (cookies && csrfToken) {
      router.push('/');
      return;
    }
    setLoading(false);
    console.log('end');
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className='h-full flex-col flex'>
      <div className='h-20 border-b border-light-grey-primary flex items-center justify-center'>
        <Logo />
      </div>
      <div className='flex-1 w-full flex items-center justify-center'>
        <div className='min-w-[44rem] min-h-[25rem] w-[65%] h-[55%] flex gap-16 justify-center'>
          <div className='flex items-center w-[50%]'>
            <Illustration className='w-full' />
          </div>
          <div className='h-full flex flex-col justify-center w-96'>
            <p className='font-semibold text-2xl leading-9 mb-7 font-Poppin text-black-primary'>
              Re-Login your LinkedIn
            </p>
            <p className='text-grey-primary text-lg font-light mb-16'>
              It seems like you have logged out from your LinkedIn Account
            </p>
            <Button
              onClick={() => {
                if (window) {
                  if (reloggedin) {
                    window.location.href = '/';
                  } else {
                    setReloggedin(true);
                    window.open('https://www.linkedin.com/');
                  }
                }
              }}
              placeholder={
                <div className='flex gap-4'>
                  {!reloggedin && <Linkedin />}
                  <p>{reloggedin ? 'Retry' : 'Re-Login LinkedIn'}</p>
                </div>
              }
              className='font-semibold h-14 w-full rounded-xl flex justify-center items-center'
              color='purple'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
