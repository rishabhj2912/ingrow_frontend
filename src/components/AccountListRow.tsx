import UserDetails from '@/components/UserDetails';
import Cross from '@/assets/icons/cross.svg';
import { ConnectionProfile } from '@/types';
import Plus from '@/assets/icons/plus.svg';

export default function AccountListRow({
  industry,
  connection,
  action,
}: {
  connection: ConnectionProfile;
  action: (username: string) => void;
  industry?: string[];
}) {
  return (
    <div className='w-full h-[4.375rem] flex items-center justify-between p-3 bg-white gap-6 border-b-[0.5px] border-light-grey-primary'>
      <div className='flex-1 overflow-hidden'>
        <UserDetails
          img={connection.profileImage}
          name={`${connection.firstName} ${connection.lastName}`}
          desc={connection.headline}
        />
      </div>
      {industry && (
        <div>
          {industry.map((industryName) => (
            <div key={industryName} className='bg-[#D4E4FF] rounded-md px-2 py-1 text-[#297AFFA6] inline capitalize text-wrap text-justify text-xs mr-1'>
              {industryName}
            </div>
          ))}
        </div>
      )}
      <div className='flex gap-2'>
        {industry ? (
          <Plus
            className='cursor-pointer'
            onClick={() => {
              action(connection.username);
            }}
          />
        ) : (
          <Cross
            className='cursor-pointer'
            onClick={() => {
              action(connection.username);
            }}
          />
        )}
      </div>
    </div>
  );
}
