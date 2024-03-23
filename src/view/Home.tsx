'use client';

import CommentsSuggestion from '@/components/CommentsSuggestion';
import Post from '../components/Post';
import { useEffect, useState } from 'react';
import { getPostsList } from '@/api/request';
import Spinner from '@/components/Spinner';
import { PostData } from '@/types';
import NoConnections from '@/assets/icons/no-connections.svg';
import { useAppSelector } from '@/redux/store';
import Button from '@/components/Button';
import Link from 'next/link';

export default function Home() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [visiblePostUrn, setVisiblePostUrn] = useState<string>('');
  const [loader, setLoader] = useState<boolean>(false);
  const [commentPosted, setCommentPosted] = useState<string[]>([]);
  const user = useAppSelector((state) => state.userReducer.value);

  useEffect(() => {
    (async () => {
      try {
        setLoader(true);
        const response = await getPostsList();
        if (response.data.length > 0) {
          setVisiblePostUrn(response.data[0].postUrn);
        }
        setPosts(response.data);
      } catch (e) {
        console.log(e);
      }
      setLoader(false);
    })();
  }, []);

  if (!posts) {
    console.log('No posts found');
  }
  if (loader) {
    return <Spinner />;
  }

  return (
    <div className='w-full h-full bg-[#F8F8F9] '>
      <div className='w-full mx-auto h-full flex'>
        <div className='flex-1 pt-11 px-6'>
          <div className='h-full overflow-y-auto no-scrollbar  mx-auto'>
            {posts.length > 0 ? (
              <>
                {posts.map((item) => (
                  <Post
                    key={item.postUrn}
                    onVisibleChange={() => {
                      setVisiblePostUrn(item.postUrn);
                    }}
                    post={item}
                    visiblePostUrn={visiblePostUrn}
                    commentPosted={commentPosted}
                  />
                ))}
              </>
            ) : (
              <div className='w-full h-full text-grey-primary flex flex-col items-center justify-center gap-1'>
                <NoConnections />
                <p className='text-xl font-semibold'>No Post Found Yet !!</p>
                {!user?.connectionsCount && (
                  <>
                    <p className='text-grey-secondary text-sm'>
                      Please add more connections
                    </p>
                    <Link href={'/connections'}>
                      <Button
                        placeholder={'Add Connections +'}
                        color='purple'
                        className='mt-5 px-3 py-2 mx-auto'
                      />
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        <div className='rounded-lg bg-white w-[400px]'>
          <div className='h-full'>
            <CommentsSuggestion
              comments={
                posts.find((post) => post.postUrn === visiblePostUrn)?.comments
              }
              visiblePost={visiblePostUrn}
              setCommentPosted={setCommentPosted}
              commentPosted={commentPosted}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
