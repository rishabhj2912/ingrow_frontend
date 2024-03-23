'use client';
import Logo from '@/assets/icons/ingrow-logo.svg';
import Illustration from '@/assets/images/login.svg';
import Button from '@/components/Button';
import Linkedin from '@/assets/icons/linked-in.svg';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import Link from 'next/link';

export default function Login() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (getCookie('token')) router.push('/');
    setLoading(false);
  }, []);

  if (loading) return <></>;

  return (
    <div className="h-full flex-col flex">
      <div className="h-20 border-b border-light-grey-primary flex items-center justify-center">
        <Logo />
      </div>
      <div className="flex-1 w-full flex items-center justify-center">
        <div className="min-w-[44rem] min-h-[25rem] w-[65%] h-[55%] flex gap-16 justify-center">
          <div className="flex items-center w-[50%]">
            <Illustration className="w-full" />
          </div>
          <div className="h-full flex flex-col justify-center w-96">
            <p className="font-semibold text-2xl leading-9 mb-7 font-Poppin text-black-primary">
              {"Let's get started!"}
            </p>
            <p className="text-grey-primary text-lg font-light mb-16">
              Log in or sign up using your LinkedIn account.
            </p>
            <Link
              href={`https://www.linkedin.com/oauth/v2/authorization?response_type=code&state=987654321&scope=${encodeURIComponent(
                process.env.NEXT_PUBLIC_LINKEDIN_SCOPE || ''
              )}&client_id=${encodeURIComponent(
                process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID || ''
              )}&redirect_uri=${encodeURIComponent(
                process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI || ''
              )}`}
            >
              <Button
                placeholder={
                  <div className="flex gap-4">
                    <Linkedin />
                    <p>Login With LinkedIn</p>
                  </div>
                }
                className="font-semibold h-14 w-full rounded-xl flex justify-center items-center"
                color="purple"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
