'use client';

import ProgressBar from '@/components/ProgressBar';
import Image from 'next/image';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/user-slice';

export default function Sync({
  comments,
}: {
  comments: {
    comment: string;
  }[];
}) {
  const router = useRouter();
  const user = useAppSelector((state) => state.userReducer.value);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setTimeout(() => {
      dispatch(logout());
      router.push('/persona');
    }, 5000);
  }, []);
  return (
    <>
      <ProgressBar percentage="45" className="h-2 w-[45%]" />
      <div className="w-full h-full flex justify-center items-center relative flex-1">
        <div className="w-[90%] lg:w-[90%] xl:w-[70%] h-[70%] flex justify-between items-center gap-[5%]">
          <div className="w-[50%] min-w-[250px]">
            <p className="text-4xl leading-[54px] font-semibold mb-2.5">
              Syncing your comments
            </p>
            <p className="font-Poppin text-lg mb-2.5">
              We automatically retrieve your previous comments and train our
              model to generate personalized comments.
            </p>
          </div>

          <div className="container relative z-0">
            <div className="blur-lg absolute -top-10 w-full h-24 bg-white z-40" />
            <div className=" sliding-background">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => (
                <>
                  {comments.map((item) => (
                    <div
                      key={item.comment}
                      className="flex gap-5 w-[450px] my-8"
                    >
                      <Image
                        src={user?.picture ?? ''}
                        alt="user profile"
                        className="rounded-full h-11 w-11"
                        width={44}
                        height={44}
                      />
                      <div className="p-5 rounded-3xl border border-[#172935]">
                        <p className="text-sm font-Poppin">{item.comment}</p>
                      </div>
                    </div>
                  ))}
                </>
              ))}
            </div>
            <div className="blur-lg absolute -bottom-10 bg-white w-full h-24 z-40" />
          </div>
        </div>
      </div>
    </>
  );
}
