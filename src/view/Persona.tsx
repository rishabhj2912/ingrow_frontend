'use client';

import PersonaQuestions from '@/components/PersonaQuestions';
import ProgressBar from '@/components/ProgressBar';
import { useState } from 'react';
import EnterDetails from './Enter-Details';
import { Answers } from '@/types';
import { Questions } from '@/constants';
import { useAppSelector } from '@/redux/store';
import { useRouter } from 'next/navigation';

export default function Persona() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showDetailsPage, setShowDetailsPage] = useState(false);
  const [answers, setAnswers] = useState<Answers>({
    addInComments: [],
    brief: [],
    tone: [],
    characters: [],
  });
  const router = useRouter();
  const user = useAppSelector((state) => state.userReducer.value);

  if (user?.personaSynced !== 'pending') router.push('/');

  if (showDetailsPage)
    return (
      <EnterDetails answers={answers} setShowDetailsPage={setShowDetailsPage} />
    );
  else
    return (
      <div className="w-full h-full flex flex-col">
        <ProgressBar percentage={'70'} className="h-2 w-[70%]" />
        <div className="flex-1 flex items-center justify-center">
          <PersonaQuestions
            question={Questions[currentQuestion]}
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
            answers={answers}
            setAnswers={setAnswers}
            setShowDetailsPage={setShowDetailsPage}
            showDetailsPage={showDetailsPage}
          />
        </div>
      </div>
    );
}
