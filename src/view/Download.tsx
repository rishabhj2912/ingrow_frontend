'use client';
import ProgressBar from '@/components/ProgressBar';
import DownloadIcon from '@/assets/icons/download.svg';
import CopyIcon from '@/assets/icons/copy.svg';
import Button from '@/components/Button';
import Navbar from '@/components/Navbar';
import Error from '@/assets/icons/error.svg';
import { checkExtensionInstalled } from '@/api/request';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/user-slice';
import toast from 'react-hot-toast';
import { deleteCookie } from 'cookies-next';
import Link from 'next/link';

export default function Download() {
  const [isLoading, setIsLoading] = useState(false);
  const [isIntervalActive, setIsIntervalActive] = useState(false);
  const [retry, setRetry] = useState(false);
  const user = useAppSelector((state) => state.userReducer.value);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    if (user?.extensionInstalled) router.push('/');
    (async () => {
      const fetchData = async () => {
        try {
          const response = await checkExtensionInstalled();
          return response.data.status;
        } catch (error) {}
      };

      if (isIntervalActive) {
        setIsLoading(true);
        const status = await fetchData();
        if (status) {
          dispatch(logout());
          setIsLoading(false);
          router.push('/verify');
          return;
        }
        const intervalId = setInterval(() => {
          (async () => {
            const status = await fetchData();
            if (status) {
              clearInterval(intervalId);
              dispatch(logout());
              setIsLoading(false);
              router.push('/verify');
            }
          })();
        }, 3000);

        setTimeout(() => {
          if (!retry) {
            clearInterval(intervalId);
            setRetry(true);
            setIsLoading(false);
            setIsIntervalActive(false);
          } else {
            toast.error('Something went wrong');
            deleteCookie('token');
          }
        }, 30000);
        return () => clearInterval(intervalId);
      }
    })();
  }, [isIntervalActive]);

  console.log('download', user?.extensionInstalled);

  return (
    <div className="w-full h-full flex flex-col">
      <Navbar
        component={
          <div className="flex w-full justify-center gap-4 items-center">
            <Error />
            <p className="text-red-primary">
              {user?.personaSynced === 'pending'
                ? 'You have not downloaded the inGrow extension yet'
                : 'It seemed you have removed the extension, please install to continue'}
            </p>
          </div>
        }
      />
      <ProgressBar percentage={'20'} className="h-2 w-[20%]" />
      <div className="flex-1 flex items-center justify-center">
        <div className="w-[450px] h-[350px] border border-light-grey-primary rounded-lg p-3.5 flex flex-col">
          <div className="w-full h-20 bg-gradient-to-b from-purple-primary to-[#ABE4AA00] rounded-lg mb-3 ">
            <div className="w-full h-full lines-background" />
          </div>
          <div className="flex flex-col justify-between items-center flex-1">
            <DownloadIcon className="mb-6" />
            <div>
              <p className="text-xl font-semibold mb-2 text-center">
                Download our extension to continue
              </p>
              <div className="flex gap-2 w-full justify-center items-center">
                <Link
                  href={
                    'https://chromewebstore.google.com/detail/ingrow-warmup-connections/alhpmkbieeocnipojejpcjmhjnbbbmda?hl=en&authuser=0&pli=1'
                  }
                  target="_blank"
                >
                  <p className="font-light text-grey-primary">
                    https://chromewebstore.goo...
                  </p>
                </Link>
                <CopyIcon
                  className="inline cursor-pointer"
                  onClick={() => {
                    (async () => {
                      await navigator.clipboard.writeText(
                        'https://chromewebstore.google.com/detail/ingrow-warmup-connections/alhpmkbieeocnipojejpcjmhjnbbbmda?hl=en&authuser=0&pli=1'
                      );
                    })();
                    toast.success('Copied successfully');
                  }}
                />
              </div>
            </div>
            <Button
              placeholder={retry ? 'Retry' : 'Download'}
              onClick={() => {
                window.open(
                  'https://chromewebstore.google.com/detail/ingrow-warmup-connections/alhpmkbieeocnipojejpcjmhjnbbbmda?hl=en&authuser=0&pli=1',
                  '_blank'
                );
                setIsIntervalActive(true);
              }}
              color="black"
              className="text-sm w-[19rem] h-11"
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
