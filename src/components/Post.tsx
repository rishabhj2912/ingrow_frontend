import Link from 'next/link';
import UserDetails from './UserDetails';
import { PostData } from '@/types';
import PostMedia from './PostMedia';
import PostText from './PostText';
import Redirect from '@/assets/icons/redirect.svg';
import Tag from './Tag';

export default function Post({
  onVisibleChange,
  post,
  visiblePostUrn,
  commentPosted,
}: {
  onVisibleChange: (isVisible: any) => void;
  post: PostData;
  visiblePostUrn: string;
  commentPosted: string[];
}) {
  function getCommentsNumber(): number {
    if (commentPosted.includes(post.postUrn)) {
      if (post.commentsPresent) {
        return post.commentsPresent?.length + 1;
      } else {
        return 1;
      }
    }
    return 0;
  }

  return (
    <div
      onClick={onVisibleChange}
      className={` bg-white text-xs 2xl:text-base rounded-xl p-5 min-w-[450px] max-w-[650px] mx-auto h-auto mb-7 flex flex-col justify-between cursor-pointer border ${
        post.postUrn === visiblePostUrn
          ? 'border-purple-primary shadow-2xl relative z-40'
          : 'border-grey-100'
      }`}
    >
      <div className='flex justify-between items-center mb-5'>
        <Link
          href={
            post.repostDetails
              ? post.rePostActor.profileUrl
              : post.actor.profileUrl
          }
          target='_blank'
          className='w-[20%] inline flex-1'
        >
          <UserDetails
            img={
              post.repostDetails
                ? post.rePostActor.profilePicture
                : post.actor.profilePicture
            }
            name={post.repostDetails ? post.rePostActor.name : post.actor.name}
            desc={
              post.repostDetails
                ? post.rePostActor.headline
                : post.actor.headline
            }
          />
        </Link>
        {(commentPosted.includes(post.postUrn) || post.alreadyCommented) && (
          <Tag text='Commented' className='mr-4 font-medium text-xs' />
        )}
        <Link href={post.postUrl} target='_blank'>
          <Redirect className='fill-blue-primary cursor-pointer' />
        </Link>
      </div>

      {post?.postText && (
        <div className='leading-[18px] 2xl:leading-7 h-fit'>
          <PostText
            text={post.repostDetails ? post.repostDetails.text : post.postText}
          />
        </div>
      )}
      <div className='h-auto w-auto relative rounded-xl my-2'>
        {!post.repostDetails ? (
          <>
            <PostMedia post={post} />
          </>
        ) : (
          <div className='border border-xl rounded-xl p-5 flex flex-col mt-5'>
            <Link href={post?.actor.profileUrl || ''} target='_blank'>
              <UserDetails
                img={post?.actor?.profilePicture ?? ''}
                name={post?.actor?.name || '--'}
                desc={post?.actor?.headline || '--'}
              />
            </Link>
            {post?.postText && (
              <div className='leading-[18px] 2xl:leading-7 h-fit mt-4 mb-6'>
                <PostText text={post?.postText} />
              </div>
            )}
            <PostMedia post={post} />
          </div>
        )}
      </div>

      {/* <div className='flex leading-[18px] 2xl:leading-7 items-center'>
        <ThumbsUp className='fill-blue-primary mr-2 w-6 h-6' />
        <span>{post.likes}</span>
        <Comments className='stroke-grey-primary mr-2 ml-6' />
        <span>{getCommentsNumber()}</span>
      </div> */}
    </div>
  );
}
