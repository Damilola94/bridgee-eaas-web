import React, {
  useEffect, useState, useRef, useCallback
} from 'react';
import { IoMdClose } from 'react-icons/io';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { BulletList } from 'react-content-loader';
import { useCookies } from 'react-cookie';
import { useMutation } from 'react-query';
import Image from 'next/image';

import BellIcon from '../../assets/svgs/notification.svg';
import Loading from '../../assets/svgs/loading.svg';
import UserAvater from '../../assets/images/profile-pic.jpg';
import { formatFileUrl } from '../../utilities/general';
import { formatTimeFromNow } from '../../utilities/dateTime';
import useClickOutsideBox from '../../hooks/useClickOutsideBox';
import useGetQuery from '../../hooks/useGetQuery';
import handleFetch from '../../services/api/handleFetch';
import notification from '../../utilities/notification';

type NotificationProps = {
  notificationId: number
  message: string
  read: boolean
  profilePicture: string
  createdAt: string
};

function Notifications({ isResponsive }: { isResponsive?: boolean }) {
  const [cookie] = useCookies(['data']);
  const [open, setOpen] = useState(false);

  const wrapperRef = useRef(null);
  useClickOutsideBox(wrapperRef, () => setOpen(false));

  const { data, status, error } = useGetQuery({
    endpoint: 'notification',
    pQuery: { pageSize: 2000 },
    queryKey: ['notifications'],
    enabled: !!cookie?.data?.token && open,
    auth: true
  });

  const { data: count } = useGetQuery({
    endpoint: 'notification', extra: 'unreadCount', auth: true, queryKey: ['notifications-count'], enabled: false
  });

  return (
    <div className="relative">
      <Image
        src={BellIcon}
        alt="Notifications"
        width={40}
        height={40}
        className="cursor-pointer rounded-full w-auto h-auto mt-1"
        onClick={() => setOpen(!open)}
      />
      {count?.data?.count > 0 && <span className="absolute w-3 h-3 rounded-full bg-red-500 top-2 right-2" />}

      {open && (
        <div
          ref={wrapperRef}
          className={`absolute z-50 w-[340px] bg-white shadow-box ${isResponsive
            ? 'bottom-14 -left-6 lg:bottom-auto lg:left-auto' : 'right-0 top-12'} lg:right-0 lg:top-12`}
        >
          <div className="w-full flex items-center justify-between py-4 px-5 border-b border-borderColor">
            <h2 className="text-xl font-bold">Notifications</h2>
            <IoMdClose className="cursor-pointer w-8 h-auto hover:text-primary" onClick={() => setOpen(false)} />
          </div>
          <div className="h-[300px] overflow-auto">
            <div className="w-full py-5">
              {status === 'loading' && (
                <div className="px-5">
                  <BulletList className="relative w-full" />
                </div>
              )}
              {status === 'success' && (
                data.data.length > 0 ? (
                  data?.data?.map((item: any) => (
                    <NotificationItem key={item.notificationId} details={item} />
                  ))
                ) : (
                  <div className="px-5 text-center">No Notification</div>
                )
              )}
              {status === 'error' && (
                <div className="px-5 text-center">{String(error)}</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

Notifications.defaultProps = { responsive: false };

function NotificationItem({ details }: { details: NotificationProps}) {
  const [userPix, setUserPix] = useState<string | null>(null);
  const [imgHasError, setImgHasError] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isRead, setIsRead] = useState(details?.read);

  useEffect(() => {
    if (!imgHasError) setUserPix(formatFileUrl(details.profilePicture));
  }, [imgHasError, details]);

  const handleImgError = () => {
    setUserPix('');
    setImgHasError(true);
  };

  const ideaMutation = useMutation(handleFetch, {
    onSuccess: (res) => {
      if (res?.method === 'DELETE') setIsDeleted(true);
      else setIsRead(true);
    },
    onError: (err) => {
      notification({
        title: 'Error',
        message: String(err) || 'Something went wrong.',
        type: 'danger'
      });
    }
  });

  const markRead = useCallback(() => {
    ideaMutation.mutate({
      endpoint: 'notification', extra: 'read', param: details.notificationId, method: 'PATCH', auth: true
    });
  }, [details.notificationId, ideaMutation]);

  useEffect(() => {
    if (!isRead) {
      setTimeout(() => markRead(), 2000);
    }
  }, [isRead, markRead]);

  const handleDelete = () => {
    ideaMutation.mutate({
      endpoint: 'notification', param: details.notificationId, method: 'DELETE', auth: true
    });
  };

  const { isLoading } = ideaMutation;

  if (isDeleted) return null;

  return (
    <div className={`w-full flex px-5 py-3 border-b border-borderColor last:border-b-0 ${isRead ? '' : 'bg-primary/5'}`}>
      <Image
        onError={handleImgError}
        src={userPix || UserAvater}
        className="w-10 h-10 mr-3 rounded-full"
        alt="notification"
      />
      <div className="w-[calc(100%-80px)]">
        <p className="text-sm">{details.message}</p>
        <p className="text-xs text-labelColor text-right">{formatTimeFromNow(details.createdAt)}</p>
      </div>
      {isLoading ? <Image src={Loading} alt="..." className="w-5 h-auto ml-2" /> : (
        <RiDeleteBin5Line
          className="w-5 h-auto ml-2 cursor-pointer hover:text-red-400"
          onClick={handleDelete}
        />
      )}
    </div>
  );
}

export default Notifications;
