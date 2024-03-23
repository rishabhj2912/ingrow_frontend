import Sparkles from '@/assets/icons/sparkles.svg';
import Regenerate from '@/assets/icons/regenerate.svg';
import Post from '@/assets/icons/post.svg';
import { postComment, regenerateComment } from '@/api/request';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Comment } from '@/types';

export default function CommentsSuggestion({
  comments,
  visiblePost,
  setCommentPosted,
  commentPosted,
}: {
  comments: Comment[] | undefined;
  visiblePost: string;
  commentPosted: string[];
  setCommentPosted: Dispatch<SetStateAction<string[]>>;
}) {
  const [commentRegenerating, setCommentRegenerating] = useState<number | null>(
    null
  );
  const [finalComments, setFinalComments] = useState(comments);
  const [pastComments, setPastComments] = useState<string[]>([]);

  useEffect(() => {
    if (!comments) return;
    const categories: string[] = [];
    const initialComments: string[] = [];
    const finalComments = comments.filter((item) => {
      if (!categories.includes(item.category)) {
        initialComments.push(item.comment);
        categories.push(item.category);
        return item;
      }
    });
    setFinalComments(finalComments);
    setPastComments(initialComments);
    setCommentRegenerating(null);
  }, [visiblePost]);

  async function onRegenerateCommentClick(type: string, commentIndex: number) {
    try {
      setCommentRegenerating(commentIndex);
      let regeneratedComment: any = comments?.find((item) => {
        if (item.category === type && !pastComments.includes(item.comment)) {
          setPastComments([...pastComments, item.comment]);
          return item;
        }
      });
      if (!regeneratedComment) {
        regeneratedComment = await regenerateComment(type, visiblePost);
      }
      if (regeneratedComment) {
        setFinalComments(
          finalComments?.map((item, index) => {
            return index == commentIndex ? regeneratedComment : item;
          })
        );
      }
    } catch (err) {
    } finally {
      setCommentRegenerating(null);
    }
  }

  async function onPostCommentClick(comment: string) {
    const toastHandler = toast.loading('processing');
    try {
      const response = await postComment(visiblePost, comment);
      setCommentPosted([...commentPosted, visiblePost]);
      toast.success('Commented Succesfully');
    } catch (err) {
    } finally {
      toast.remove(toastHandler);
    }
  }
  return (
    <div className=' bg-white py-4 text-xs 2xl:text-sm h-full flex flex-col px-4 xl:px-6 relative z-0'>
      <div className='h-14 flex gap-2 items-center mb-4 bg-[#F7F7F8] rounded-lg'>
        <Sparkles className='mt-10 w-[60px] text-[40px]' />
        <p className='font-medium'>Auto generated comments for you</p>
      </div>
      <div className='overflow-y-auto scroll-smooth overflow-x-hidden'>
        <div className='flex-1 mr-1'>
          {finalComments &&
            finalComments.map((item: Comment, index: number) => (
              <div
                className='bg-[#89B6FF1A] p-4 text-sm mb-4 rounded-lg relative z-0 w-[99%]'
                key={index}
              >
                <div className='bg-[#D4E4FF] rounded-md px-2 py-1 text-[#297AFFA6] text-semibold mb-4 inline capitalize text-wrap text-justify'>
                  {item.category}
                </div>
                <textarea
                  rows={3}
                  cols={10}
                  style={{ resize: 'none' }}
                  value={item.comment}
                  className='outline-none bg-transparent w-[95%] mt-3 pr-3'
                  onChange={(e) => {
                    setFinalComments(
                      finalComments.with(index, {
                        comment: e.target.value,
                        category: item.category,
                      })
                    );
                  }}
                />
                <div className='h-full absolute -right-4 flex flex-col gap-3 justify-center top-0 z-50 mr-2'>
                  <Regenerate
                    className={
                      'cursor-pointer ' +
                      (commentRegenerating === index && ' animate-rotate')
                    }
                    onClick={() => {
                      onRegenerateCommentClick(item.category, index);
                    }}
                  />
                  <Post
                    className='cursor-pointer'
                    onClick={() => {
                      onPostCommentClick(item.comment);
                    }}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
