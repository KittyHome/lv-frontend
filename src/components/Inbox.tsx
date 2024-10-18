import clsx from "clsx";
import { motion } from "framer-motion";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { IoCheckmarkSharp } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";

import PopupPanel from "../common/PopupPanel";
import Switch from "../common/Switch";
import { useAppContext } from "../hooks/useAppContext";
import { useAuth } from "../hooks/useAuth";
import { updateNotification } from "../lib/supabase/utils";

interface NotificationProps {
  content: string;
  time: Date;
  isRead: boolean;
  onRead: () => void;
  onDelete: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  content,
  time,
  isRead,
  onRead,
  onDelete,
}) => {
  const [expand, setExpand] = useState(false);

  const toggleExpand = useCallback(() => {
    setExpand((prv) => !prv);
  }, []);

  useEffect(() => {
    if (expand && !isRead) {
      onRead();
    }
  }, [isRead, expand, onRead]);

  return (
    <div className="bg-background-100 hover:bg-background-200 cursor-pointer rounded-lg border border-text-100/10">
      <div className={`p-2 text-sm ${isRead ? "opacity-50" : ""}`}>
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500">{moment(time).fromNow()}</p>
          <div className="flex items-center gap-2 text-[11px]">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onRead}
              className="flex items-center gap-1"
            >
              <IoCheckmarkSharp />
              Mark as read
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onDelete}
              className="flex items-center gap-1"
            >
              <MdDeleteOutline />
              Delete
            </motion.button>
          </div>
        </div>
        <p
          className={clsx(
            "w-full overflow-clip",
            expand ? "" : "text-ellipsis text-nowrap"
          )}
          onClick={toggleExpand}
        >
          {content}
        </p>
      </div>
    </div>
  );
};

const Inbox = () => {
  const [checked, setChecked] = useState(false);
  const { notifications } = useAppContext();
  const { user } = useAuth();

  const handleRead = useCallback(
    (id: string) => () => {
      user?.id && updateNotification(user.id, id, { isRead: true });
    },
    [user?.id]
  );

  const handleDelete = useCallback(
    (id: string) => () => {
      user?.id && updateNotification(user.id, id, { isDeleted: true });
    },
    [user?.id]
  );

  const filteredNotifications = notifications.filter((notification) =>
    checked ? !notification.isRead : true
  );

  return (
    <PopupPanel className="relative w-[300px] flex flex-col">
      <div className="w-full bg-primary-100 p-2 h-[fit-content] flex justify-between">
        <p className="text-sm font-bold">Notifications</p>
        <div className="flex items-center gap-2 text-sm">
          Unread
          <Switch onChange={setChecked} checked={checked} />
        </div>
      </div>
      <div className="flex flex-col overflow-y-auto max-h-[300px] gap-1 p-1">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <Notification
              key={notification.id}
              content={notification.content}
              time={notification.createdAt}
              isRead={notification.isRead}
              onRead={handleRead(notification.id)}
              onDelete={handleDelete(notification.id)}
            />
          ))
        ) : (
          <div className="w-full flex items-center justify-center p-5 opacity-50">
            {checked ? "No unread notification" : "No notification"}
          </div>
        )}
      </div>
    </PopupPanel>
  );
};

export default Inbox;
