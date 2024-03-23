import { PostData } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

export default function PostMedia({ post }: { post: PostData }) {
  function getPostMedia() {
    switch (post.postType) {
      case 'IMAGE':
        return (
          <div className='mt-5'>
            {post.media.image && (
              <Image
                src={post?.media?.image?.imageUrl}
                alt='post'
                className='w-full h-full max-h-[50vh] object-contain'
                width={100}
                height={100}
              />
            )}
          </div>
        );
      case 'VIDEO':
        return (
          <div className='mt-5'>
            {post.media.video && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <video
                  className='w-full h-full max-h-[50vh] object-contain'
                  // width={post?.media?.video?.width}
                  // height={100}
                  controls
                  // preload='none'
                  src={post?.media?.video?.videoUrl}
                >
                  <source
                    src={post?.media?.video?.videoUrl}
                    type={post?.media?.video?.$type}
                  />
                  <track src={post?.media?.video?.videoUrl} />
                </video>
              </div>
            )}
          </div>
        );
      case 'ARTICLE':
        return (
          <div className='mt-5'>
            {post.media.article && (
              <div className='w-full'>
                <Image
                  src={post?.media?.article.previewImage}
                  alt='post'
                  className='w-full h-full max-h-[50vh] object-contain'
                  width={100}
                  height={100}
                />
                <Link href={post.media.article.link} target='_blank'>
                  <div className=' bg-gray-100 p-4'>
                    <p className='font-semibold text-black-primary text-sm mb-1 underline'>
                      {post.media.article.titleText}
                    </p>
                    <p className='text-xs font-light text-grey-primary'>
                      {post.media.article.subTitleText}
                    </p>
                  </div>
                </Link>
              </div>
            )}
          </div>
        );
      default:
        return <></>;
    }
  }

  return <>{getPostMedia()}</>;
}
