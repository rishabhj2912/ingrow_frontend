'use client';

import { uninstall } from '@/api/request';
import Spinner from '@/components/Spinner';
import { AppDispatch } from '@/redux/store';
import { logout } from '@/redux/user-slice';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export default function Uninstall() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  async function unistallExtention() {
    try {
      setLoading(true);
      await uninstall(false);
      deleteCookie('token');
      dispatch(logout());
      router.push('/login');
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    (async () => {
      unistallExtention();
    })();
  }, []);
  if (loading) return <Spinner />;
  return <></>;
}
