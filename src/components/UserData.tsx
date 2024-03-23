'use client';

import { getUserDetails } from '@/api/request';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { login } from '@/redux/user-slice';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Spinner from './Spinner';
import { getCookie, setCookie } from 'cookies-next';

export default function UserData({ children }: { children: React.ReactNode }) {
  const user = useAppSelector((state) => state.userReducer.value);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const pathName = usePathname();

  const fetchUserDetails = async () => {
    try {
      const token = getCookie('token');
      if (
        !token &&
        !pathName.includes('verify-profile') &&
        !pathName.includes('privacy')
      ) {
        router.push('/login');
      } else if (token && !user) {
        const response = await getUserDetails();
        dispatch(login(response));
        return response;
      } else {
        return user;
      }
    } catch (err) {}
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const finalUser = await fetchUserDetails();
      if (pathName === '/relogin') {
        setLoading(false);
        return;
      }
      if (
        (finalUser?.extensionInstalled && pathName.includes('/download')) ||
        (finalUser?.profileVerified && pathName.includes('/verify')) ||
        (finalUser?.personaSynced !== 'pending' &&
          pathName.includes('/persona')) ||
        (finalUser && pathName.includes('/login'))
      ) {
        router.push('/');
      }
      if (finalUser && !pathName.includes('privacy')) {
        if (!finalUser.extensionInstalled) router.push('/download');
        else if (!finalUser.profileVerified) router.push('/verify');
        else if (
          finalUser.personaSynced === 'pending' &&
          !pathName.includes('sync')
        )
          router.push('/persona');
      }
      setLoading(false);
    })();
  }, [user, pathName]);

  useEffect(() => {
    if (pathName === '/relogin') return;
    window.postMessage({ action: 'SEND_COOKIES' }, '*');

    window.addEventListener('message', (event) => {
      if (event.data.action === 'RECEIVE_COOKIES' && event.data.cookies) {
        const csrfToken: string = event.data.cookies.data.csrfToken;
        setCookie('cookies', event.data.cookies.data.cookie);
        setCookie('csrfToken', csrfToken.replaceAll('"', ''));
      }
    });

    window.onload = () => {
      const extensionInstalled = document.getElementById('extension-installed');
      if (!extensionInstalled) {
        router.push('/download');
      }
    };

    return () => {
      window.removeEventListener('message', (event) => {
        console.log('Removed event listener');
      });
    };
  }, []);

  if (
    pathName.includes('privacy') ||
    pathName.includes('terms-and-conditions')
  ) {
    return <>{children}</>;
  }

  if (
    loading ||
    (!user &&
      !pathName.includes('/login') &&
      !pathName.includes('verify-profile') &&
      !pathName.includes('relogin')) ||
    (user?.extensionInstalled && pathName.includes('/download')) ||
    (user?.profileVerified && pathName.includes('/verify')) ||
    (user?.personaSynced !== 'pending' && pathName.includes('/persona')) ||
    (user && pathName.includes('/login'))
  )
    return <Spinner />;
  return <>{children}</>;
}
