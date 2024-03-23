'use client';

import TextArea from '@/components/TextArea';
import ProgressBar from '@/components/ProgressBar';
import { Field, Formik } from 'formik';
import NextButton from '@/components/NextButton';
import { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/navigation';
import { Answers } from '@/types';
import { postPersona } from '@/api/request';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { logout } from '@/redux/user-slice';

export default function EnterDetails({
  setShowDetailsPage,
  answers,
}: {
  answers: Answers;
  setShowDetailsPage: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const validation = (value: string) => {
    let error;
    if (!value) {
      error = 'Required';
    }
    return error;
  };

  async function onSubmitClick(
    values: { role: string; objective: string },
    setSubmitting: (isSubmitting: boolean) => void
  ) {
    try {
      setSubmitting(true);
      const processingToast = toast.loading('processing');
      const res = await postPersona({
        includeHastags: answers.addInComments.includes('includeHastags'),
        includeEmojis: answers.addInComments.includes('includeEmojis'),
        brief: answers.brief[0],
        tone: answers.tone[0],
        characters: answers.characters,
        ...values,
      });
      if (res.status == 200) {
        toast.remove(processingToast);
        toast.success('Persona Synced');
        dispatch(logout());
        router.push('/');
      }
    } catch (err) {}
  }
  return (
    <div className="w-full h-full flex flex-col">
      <ProgressBar percentage={'100'} className="h-2" />
      <div className="flex-1 flex items-center justify-center">
        <div className="w-[80%] h-[80%] flex items-center justify-center relative">
          {/* <GradientButton
           label='Skip'
           className='absolute top-0 right-0'
           onClick={() => {}}
         /> */}
          <div className="w-[50%] h-[80%] min-w-[31rem] min-h-[28.75rem] flex flex-col gap-6">
            <p
              className="text-grey-secondary text-xl cursor-pointer"
              onClick={() => {
                setShowDetailsPage(false);
              }}
            >
              Back
            </p>
            <div>
              <p className="text-4xl leading-[54px] font-semibold mb-2.5">
                Tell us more about you
              </p>
              <p className="text-grey-primary text-sm mb-2.5">
                {
                  "Provide an overview of your current role and your company. Share your objectives for using our tool, as this data enhances GPT's context."
                }
              </p>
            </div>
            <Formik
              initialValues={{ role: '', objective: '' }}
              onSubmit={(values, { setSubmitting }) => {
                onSubmitClick(values, setSubmitting);
              }}
            >
              {({
                values,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                errors,
                setFieldTouched,
                touched,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Field
                    name="role"
                    validate={validation}
                    render={() => (
                      <TextArea
                        id="role"
                        name="role"
                        onBlur={handleBlur}
                        value={values.role}
                        onChange={handleChange}
                        placeholder="Current Role and Company:"
                        className="h-16 text-nowrap"
                        error={errors.role}
                        setFieldTouched={setFieldTouched}
                        touched={touched.role}
                      />
                    )}
                  />
                  <Field
                    name="objective"
                    validate={validation}
                    render={() => (
                      <TextArea
                        id="objective"
                        name="objective"
                        onBlur={handleBlur}
                        value={values.objective}
                        onChange={handleChange}
                        placeholder="Objective behind Generating AI Comments:"
                        error={errors.objective}
                        className="h-32"
                        setFieldTouched={setFieldTouched}
                        touched={touched.objective}
                      />
                    )}
                  />
                  <button type="submit" disabled={isSubmitting}>
                    <NextButton
                      placeholder="Next"
                      className={`${
                        isSubmitting && 'pointer-events-none cursor-none'
                      }`}
                    />
                  </button>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
