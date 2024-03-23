'use client';

import Celebration from '@/assets/icons/celebration.svg';
import Sparkles from '@/assets/icons/sparkles.svg';
import Image from 'next/image';
import { AppDispatch, useAppSelector } from '@/redux/store';
import CheckBox from '@/components/CheckBox';
import NextButton from '@/components/NextButton';
import GradientButton from '@/components/GradientButton';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Answers, Question } from '@/types';
import { skipPersonaSync } from '@/api/request';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/user-slice';
import { getPersonaComments } from '@/constants';

export default function PersonaQuestions({
  question,
  currentQuestion,
  setCurrentQuestion,
  answers,
  setAnswers,
  showDetailsPage,
  setShowDetailsPage,
}: {
  question: Question;
  currentQuestion: number;
  setCurrentQuestion: Dispatch<SetStateAction<number>>;
  answers: Answers;
  setAnswers: Dispatch<SetStateAction<Answers>>;
  setShowDetailsPage: Dispatch<SetStateAction<boolean>>;
  showDetailsPage: boolean;
}) {
  const [selected, setSelected] = useState<string[]>(answers[question.value]);
  const [showError, setShowError] = useState(false);
  const user = useAppSelector((state) => state.userReducer.value);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setSelected(answers[question.value]);
    setShowError(false);
  }, [currentQuestion, showDetailsPage]);

  async function onSkipClick() {
    try {
      const responce = await skipPersonaSync();
      dispatch(logout());
      router.push('/');
    } catch (err) {}
  }
  return (
    <div className='w-[90%] lg:w-[90%] xl:w-[70%] h-[85%] flex items-center justify-between relative max-w-[1000px]'>
      {/* <GradientButton
        label='Skip'
        className='absolute top-0 right-0'
        onClick={() => {
          (async () => {
            await onSkipClick();
          })();
        }}
      /> */}
      <div className='w-[45%] h-[60%] flex flex-col gap-4 max-h-[22rem]'>
        {currentQuestion !== 0 && (
          <p
            className='text-grey-secondary text-xl cursor-pointer'
            onClick={() => {
              if (showDetailsPage) {
                setCurrentQuestion(4);
              } else if (currentQuestion === 0) {
                router.push('/');
              } else {
                setCurrentQuestion(currentQuestion - 1);
              }
            }}
          >
            Back
          </p>
        )}
        <div className='flex-1'>
          <p className='text-3xl font-semibold mb-6'>Craft your AI persona</p>
          <p className='font-Poppin text-lg mb-6'>{question.title}</p>
          <div
            className={`flex gap-4 flex-wrap mb-3 ${
              question.isCheckBox && 'flex-col'
            }`}
          >
            {question.options.map(({ value, title }) => (
              <div key={title} className=''>
                {question.isCheckBox ? (
                  <CheckBox
                    label={title}
                    checked={selected.includes(value)}
                    setChecked={() => {
                      const index = selected.indexOf(value);
                      index > -1
                        ? setSelected(
                            selected.filter((item) => {
                              return item != value;
                            })
                          )
                        : setSelected([...selected, value]);
                    }}
                  />
                ) : (
                  <GradientButton
                    label={title}
                    checked={selected.includes(value)}
                    onClick={() => {
                      const index = selected.indexOf(value);
                      index > -1
                        ? setSelected(
                            selected.filter((item) => {
                              return item != value;
                            })
                          )
                        : selected.length == question.minSelect
                        ? setSelected([...selected.slice(1), value])
                        : setSelected([...selected, value]);
                    }}
                  />
                )}
              </div>
            ))}
          </div>
          {showError && selected.length != question.minSelect && (
            <p className='text-red-primary text-sm mt-3'>
              Please select any {question.minSelect}
            </p>
          )}
        </div>
        <NextButton
          placeholder='Next'
          onClick={() => {
            if (selected.length < question.minSelect) {
              setShowError(true);
              return;
            }
            setAnswers({ ...answers, [question.value]: selected });
            if (currentQuestion === 3) {
              setShowDetailsPage(true);
            } else {
              setCurrentQuestion(currentQuestion + 1);
            }
          }}
        />
      </div>
      <div className='w-[55%] h-[50%] relative flex justify-end items-center max-w-[40vw]'>
        <div className='border border-[#172935] rounded-2xl p-4 w-[390px] relative'>
          <Celebration className='absolute w-[60px] h-[60px] -right-9 -top-9' />
          <Sparkles className='absolute -left-24 -bottom-16 h-20 text-[75px]' />
          <Image
            src={user?.picture ?? ''}
            alt='user profile'
            width={44}
            height={44}
            className='rounded-full absolute top-0 -left-16'
          />
          <p>{getPersonaComments(selected, currentQuestion)}</p>
        </div>
      </div>
    </div>
  );
}
