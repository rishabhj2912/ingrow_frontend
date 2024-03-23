'use client';
import NextButton from '@/components/NextButton';
import User from '@/assets/images/user-profile.jpg';
import Image from 'next/image';
import ProgressBar from '@/components/ProgressBar';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { deleteCookie } from 'cookies-next';
import { logout } from '@/redux/user-slice';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Spinner from '@/components/Spinner';
import { downloadExtention, getUserDetails } from '@/api/request';
import Sync from './Sync';

export default function VerifyProfile() {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(false);
  const user = useAppSelector((state) => state.userReducer.value);
  const router = useRouter();
  const [syncComments, setSyncComments] = useState<
    { comment: string }[] | null
  >(null);

  async function onVerifyClick() {
    try {
      setIsLoading(true);
      const response = await downloadExtention();
      if (response.statusCode == 200) {
        setSyncComments(response.data);
        await getUserDetails();
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }

  function logoutUser() {
    deleteCookie('token');
    dispatch(logout());
    router.push('/login');
  }

  if (user?.profileVerified) router.push('/');

  if (isLoading) return <Spinner />;
  if (syncComments) return <Sync comments={syncComments} />;
  return (
    <>
      <ProgressBar percentage='30' className='h-2 w-[25%]' />
      <div className='w-full h-full flex justify-center items-center relative flex-1'>
        <div className='w-[90%] lg:w-[80%] xl:w-[70%] h-[50%] flex justify-between items-center gap-[10%]'>
          <div className='flex flex-col gap-5 w-[55%]'>
            <p className='text-2xl leading-[44px] font-semibold'>
              Verify your profile
            </p>
            <p className='text-lg leading-5 mb-4'>
              Please verify if this is your linkedin profile.
            </p>
            <NextButton
              placeholder='Verify'
              onClick={() => {
                (async () => await onVerifyClick())();
              }}
            />
            <p className='text-grey-secondary text-lg leading-5'>
              Not your profile?
              <span
                className='text-blue-primary cursor-pointer mx-2'
                onClick={logoutUser}
              >
                Log Out
              </span>
            </p>
          </div>
          <div className='w-[50%]'>
            <p className='text-xl font-semibold mb-4'>Your Profile</p>
            <hr className='bg-grey-secondary' />
            <div className='w-full border border-[#0000000D] h-[7.5rem] p-5 flex gap-7 items-center rounded-2xl shadow drop-shadow-md my-7'>
              <Image
                src={user?.picture ?? User}
                alt='User profile'
                className=' border-4 rounded-lg border-green-primary w-auto h-full'
                width={120}
                height={120}
              />
              <div className='w-full'>
                <p className='text-xl font-semibold'>{`${user?.firstName} ${user?.lastName}`}</p>
                {/* <p className='text-[#969696] truncate w-[75%]'>
                  {user?.headline}
                </p> */}
              </div>
            </div>
            {/* <div className='w-full border border-[#0000000D] h-[5rem] p-5 flex justify-between items-center rounded-2xl shadow drop-shadow-md'>
              <div className='flex items-center'>
                <People className='mr-4' />
                <p className='text-lg leading-5'>Followers</p>
              </div>
              <p className='font-semibold text-[1.375rem] leading-[1.625rem]'>
                {user?.followers}
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
