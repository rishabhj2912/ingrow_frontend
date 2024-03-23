/* eslint-disable react/no-unescaped-entities */

export default function DeleteConnectionModal({
  onCancelClick,
  confirmRemoveConnection,
}: {
  onCancelClick: () => void;
  confirmRemoveConnection: () => Promise<void>;
}) {
  return (
    <div className=' overflow-y-auto fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full bg-opacity-45 bg-black flex'>
      <div className='relative p-4 w-full max-w-md max-h-full'>
        <div className='relative bg-white rounded-lg shadow'>
          <button
            onClick={onCancelClick}
            type='button'
            className='absolute top-3 end-2.5 text-grey-primary bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center'
            data-modal-hide='popup-modal'
          >
            <svg
              className='w-3 h-3'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 14 14'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
              />
            </svg>
            <span className='sr-only'>Close modal</span>
          </button>
          <div className='p-4 md:p-5 text-center'>
            <svg
              className='mx-auto mb-4 text-grey-primary w-12 h-12 '
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 20 20'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
              />
            </svg>
            <h3 className='mb-5 text-lg font-normal text-grey-primary '>
              Are you sure you want to delete this Connection?
            </h3>
            <button
              data-modal-hide='popup-modal'
              type='button'
              className='text-white bg-red-primary hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center'
              onClick={() => {
                (async () => {
                  await confirmRemoveConnection();
                })();
              }}
            >
              Yes, I'm sure
            </button>
            <button
              data-modal-hide='popup-modal'
              type='button'
              className='py-2.5 px-5 ms-3 text-sm font-medium text-black-primary focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-primary focus:z-10 focus:ring-4 focus:ring-gray-100 '
              onClick={onCancelClick}
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
