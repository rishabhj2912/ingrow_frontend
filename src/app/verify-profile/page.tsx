'use client';

import { loginUser, updateLinkedInAuthCredentials } from '@/api/request';
import Spinner from '@/components/Spinner';
import { AppDispatch } from '@/redux/store';
import { login } from '@/redux/user-slice';
import { getCookie, setCookie } from 'cookies-next';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function Authentication() {
  const param = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const authentication = async () => {
    try {
      const cookies = getCookie('cookies');
      const csrfToken = getCookie('crsfToken');
      const response = await loginUser(param.get('code') || '');
      setCookie('token', response.access_token);
      dispatch(login(response));
      await updateLinkedInAuthCredentials({
        cookies: cookies,
        csrfToken: csrfToken,
      }),
        router.push('/');
    } catch (err) {
    } finally {
      router.push('/');
    }
  };

  useEffect(() => {
    (async () => {
      const token = getCookie('token');
      if (!token) await authentication();
      else {
        router.push('/');
      }
    })();
  }, []);

  return <Spinner />;
}
