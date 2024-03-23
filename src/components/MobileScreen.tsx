import Logo from '@/assets/icons/ingrow-logo.svg';
import Illustration from '@/assets/images/login.svg';

export default function MobileScreen() {
  return (
    <div className='h-full flex-col flex md:hidden'>
      <div className='h-20 border-b border-light-grey-primary flex items-center justify-center'>
        <Logo />
      </div>
      <div className='h-full flex items-center'>
        <div className='w-full flex gap-10 justify-center items-center flex-wrap p-8 sm:p-14'>
          <Illustration className='w-[80vw] sm:w-[50vw]' />
          <p className='text-grey-primary text-lg font-light text-center'>
            Currently, our website is not supported on mobile devices. Please
            log in from your laptop or desktop for the best experience.
          </p>
        </div>
      </div>
    </div>
  );
}
