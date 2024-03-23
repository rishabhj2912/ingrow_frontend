'use client';
import Tag from '@/components/Tag';
import UserDetails from '@/components/UserDetails';
import MultipleAccounts from '@/assets/images/multiple-account.png';
import NoConnections from '@/assets/icons/no-connections.svg';
import AddAccount from '@/assets/icons/add-account.svg';
import Check from '@/assets/icons/check.svg';
import SearchBar from '@/components/SearchBar';
import AccountListRow from '@/components/AccountListRow';
import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import {
  addConnection,
  getConnectionList,
  getProfilebyUserName,
  getSuggestionList,
  removeConnection,
} from '@/api/request';
import toast from 'react-hot-toast';
import Spinner from '@/components/Spinner';
import { ConnectionProfile } from '@/types';
import { useAppSelector } from '@/redux/store';
import DeleteConnectionModal from '@/components/DeleteConnectionModal';

export default function Connections() {
  const [searchProfileURL, setSearchProfileURl] = useState('');

  const [connectionList, setConnectionList] = useState<ConnectionProfile[]>([]);

  const [suggestionList, setSuggestionList] = useState<ConnectionProfile[]>([]);

  const [filteredConnectionList, setFilteredConnectionList] = useState<
    ConnectionProfile[]
  >([]);

  const [searchedProfile, setSearchedProfile] =
    useState<ConnectionProfile | null>(null);

  const [searchConnections, setSearchConnections] = useState('');

  const [deleteConnection, setDeleteConnection] = useState<string | null>(null);

  const [searchProfileLoading, setSearchProfoleLoding] = useState(false);

  const [connectionListLoader, setConnectionListLoader] = useState(false);

  const user = useAppSelector((state) => state.userReducer.value);

  useEffect(() => {
    (async () => {
      await fetchConnectionList();
    })();
  }, []);
  useEffect(() => {
    setFilteredConnectionList(searchInConnections());
  }, [connectionList, searchConnections]);

  async function fetchConnectionList(): Promise<any> {
    try {
      setConnectionListLoader(true);

      const [connectionListResponse, suggestionListResponse] =
        await Promise.all([getConnectionList(), getSuggestionList()]);
      setConnectionList(connectionListResponse);
      setSuggestionList(suggestionListResponse);
    } catch (err) {
    } finally {
      setConnectionListLoader(false);
    }
  }

  async function getSearchProfile() {
    setSearchProfoleLoding(true);
    try {
      const response = await getProfilebyUserName(searchProfileURL);
      setSearchedProfile(response.data);
    } catch (err) {
    } finally {
      setSearchProfoleLoding(false);
    }
  }

  const searchInConnections = useCallback(() => {
    if (searchConnections === '') return connectionList;
    const updatedConnectionList = connectionList.filter((item) => {
      return (
        `${item.firstName} ${item.lastName}`
          .toLowerCase()
          .indexOf(searchConnections.toLowerCase()) !== -1
      );
    });
    return updatedConnectionList;
  }, [searchConnections, connectionList]);

  function onRemoveConnectionClick(username: string) {
    setDeleteConnection(username);
  }

  async function confirmRemoveConnection() {
    if (!deleteConnection) return;
    try {
      setConnectionListLoader(true);
      setDeleteConnection(null);
      const response = await removeConnection(deleteConnection);
      if (response.status == 202) {
        setConnectionList((prev) =>
          prev.filter((item) => {
            return item.username !== deleteConnection;
          })
        );
        toast.success('Connection removed succesfully');
      }
    } catch (err) {
    } finally {
      setConnectionListLoader(false);
    }
  }

  function onChangeSearchAccount(e: any) {
    let value = e.currentTarget.value;
    if (value.startsWith('https://www.linkedin.com/in/'))
      value = value.replace('https://www.linkedin.com/in/', '');
    if (value.endsWith('/')) value = value.substring(0, value.length - 1);
    setSearchProfileURl(value);
    setSearchedProfile(null);
  }

  async function addConnectionFromSuggestion(userProfile: ConnectionProfile) {
    try {
      setConnectionListLoader(true);
      const response = await addConnection(userProfile.username);
      if (response.status == 202) {
        setConnectionList((prev) => [userProfile, ...prev]);
        toast.success('Connection added succesfully');
      }
    } catch (err) {
    } finally {
      setConnectionListLoader(false);
    }
  }

  async function addSearchProfile() {
    try {
      if (searchedProfile) {
        setConnectionListLoader(true);
        const response = await addConnection(searchedProfile?.username);
        if (response.status == 202) {
          setConnectionList((prev) => [searchedProfile, ...prev]);
          setSearchedProfile(null);
          setSearchProfileURl('');
          toast.success('Connection added succesfully');
        }
      }
    } catch (err) {
    } finally {
      setConnectionListLoader(false);
    }
  }

  return (
    <div className='pt-14 px-14 pb-5 flex gap-11 h-full w-full'>
      {deleteConnection && (
        <DeleteConnectionModal
          confirmRemoveConnection={confirmRemoveConnection}
          onCancelClick={() => {
            setDeleteConnection(null);
          }}
        />
      )}
      <div className='max-w-[23%] flex flex-col gap-4 min-w-[270px]'>
        <p className='font-semibold'>Your Profiles</p>
        <hr className='bg-grey-primary' />
        <div className='w-full h-[70px] flex items-center justify-between p-3 rounded-lg bg-white gap-1'>
          <div className='w-[75%]'>
            <UserDetails
              img={user?.picture ?? ''}
              name={`${user?.firstName} ${user?.lastName}`}
              desc={user?.headline ?? '--'}
            />
          </div>
          <Tag text='admin' />
        </div>
        <div className='flex-1 flex flex-col justify-center items-center'>
          <Image
            src={MultipleAccounts}
            alt='illustration'
            width={180}
            unoptimized
          />
          <div className='text-sm mt-12 text-center'>
            <p>Multiple profile support</p>
            <p>Comming soon</p>
          </div>
        </div>
      </div>

      <div className='flex flex-1 flex-col min-w-[68%]'>
        <div className='mb-4'>
          <p className='font-semibold'>Connections</p>
        </div>

        <hr className='bg-grey-primary' />
        <div className='flex items-center gap-1 bg-white my-4 rounded-lg px-4'>
          <p className='text-xs text-grey-primary'>
            https://www.linkedin.com/in/
          </p>
          <input
            className='text-xs placeholder:text-grey-primary my-2 bg-inherit py-2 outline-none flex-1 text-grey-primary'
            placeholder='Enter username or paste linkedin URL'
            value={searchProfileURL}
            onChange={onChangeSearchAccount}
            onKeyUp={(event) => {
              if (event.keyCode === 13) {
                (async () => {
                  await getSearchProfile();
                })();
              }
            }}
          />
          {searchProfileURL.length > 0 && (
            <Check
              className='cursor-pointer fill-blue-primary'
              onClick={() =>
                (async () => {
                  await getSearchProfile();
                })()
              }
            />
          )}
        </div>

        <hr className='bg-grey-primary mb-4' />
        {searchedProfile && (
          <div className='w-full h-[70px] flex items-center justify-between p-3 rounded-lg bg-white mb-5'>
            <div className='w-[90%]'>
              <UserDetails
                img={searchedProfile.profileImage ?? ''}
                name={`${searchedProfile.firstName ?? ''} ${
                  searchedProfile.lastName ?? ''
                }`}
                desc={searchedProfile.headline ?? '--'}
              />
            </div>
            <AddAccount className='cursor-pointer' onClick={addSearchProfile} />
          </div>
        )}
        {searchProfileLoading && (
          <div className='w-full h-[70px] mb-5'>
            <Spinner />
          </div>
        )}

        <div className='flex-1 overflow-hidden w-full'>
          <div className='bg-white rounded-lg h-full w-full'>
            {connectionListLoader ? (
              <Spinner />
            ) : (
              <div className='h-full'>
                <div className='h-16 flex justify-end items-center p-4 py-5 relative z-30 shadow'>
                  {connectionList.length > 0 && (
                    <div className='w-[40%]'>
                      <SearchBar
                        placeholder='Search your connections'
                        search={searchConnections}
                        setSearch={setSearchConnections}
                      />
                    </div>
                  )}
                </div>
                <div className='flex w-full h-[calc(100%-96px)]'>
                  <div
                    className={`p-3 h-full ${
                      connectionList.length == 0 ? 'hidden' : 'w-[50%]'
                    }`}
                  >
                    <p className='text-grey-primary'>Connections</p>
                    <hr className='my-2' />
                    {connectionList.length > 0 && (
                      <>
                        {filteredConnectionList.length > 0 ? (
                          <div className='h-full overflow-y-auto'>
                            {filteredConnectionList.map(
                              (item: ConnectionProfile) => (
                                <AccountListRow
                                  key={item._id}
                                  connection={item}
                                  action={onRemoveConnectionClick}
                                />
                              )
                            )}
                          </div>
                        ) : (
                          <div className='w-full h-full flex items-center justify-center text-[#00000054]'>
                            <div>
                              <NoConnections className='mx-auto mb-3' />
                              <div className='text-center'>
                                <p className='font-medium'>
                                  No connection found.
                                </p>
                                <p>
                                  Please clear the search bar or try searching
                                  for a different name
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  <div className='border-s h-[calc(100%+96px)]' />
                  <div
                    className={`p-3 ${
                      connectionList.length == 0 ? 'flex-1' : 'w-[50%]'
                    }`}
                  >
                    <p className='text-grey-primary'>Suggestions</p>
                    <hr className='my-2' />
                    <div className='h-full overflow-y-auto'>
                      {suggestionList.map((item) => {
                        if (!connectionList.includes(item))
                          return (
                            <AccountListRow
                              key={item._id}
                              connection={item}
                              action={() => {
                                (async () => {
                                  await addConnectionFromSuggestion(item);
                                })();
                              }}
                              industry={item.industries}
                            />
                          );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
