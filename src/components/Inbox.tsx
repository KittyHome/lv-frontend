import { useCallback, useState } from "react";
import moment from "moment";

import PopupPanel from "../common/PopupPanel";
import Switch from "../common/Switch";
import clsx from "clsx";

interface NotificationProps {
  content: string;
  time: Date;
  isRead: boolean;
}

const Notification: React.FC<NotificationProps> = ({
  content,
  time,
  isRead,
}) => {
  const [expand, setExpand] = useState(false);

  const toggleExpand = useCallback(() => {
    setExpand((prv) => !prv);
  }, []);

  return (
    <div
      className="bg-background-100 hover:bg-background-200 cursor-pointer rounded-lg border border-text-100/10"
      onClick={toggleExpand}
    >
      <div className={`p-2 text-sm ${isRead ? "opacity-50" : ""}`}>
        <p className="text-xs text-gray-500 text-right">
          {moment(time).fromNow()}
        </p>
        <p
          className={clsx(
            "w-full overflow-clip",
            expand ? "" : "text-ellipsis text-nowrap"
          )}
        >
          {content}
        </p>
      </div>
    </div>
  );
};

const Inbox = () => {
  const [checked, setChecked] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      content:
        "Congratulations! You have successfully completed the task assigned to you. Your dedication and hard work have paid off, and we are thrilled to see your progress. Keep up the great work!",
      time: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
      isRead: false,
    },
    {
      content:
        "Congratulations! You have successfully completed the task assigned to you. Your dedication and hard work have paid off, and we are thrilled to see your progress. Keep up the great work!",
      time: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
      isRead: false,
    },
    {
      content:
        "Congratulations! You have successfully completed the task assigned to you. Your dedication and hard work have paid off, and we are thrilled to see your progress. Keep up the great work!",
      time: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
      isRead: false,
    },
    {
      content:
        "Congratulations! You have successfully completed the task assigned to you. Your dedication and hard work have paid off, and we are thrilled to see your progress. Keep up the great work!",
      time: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
      isRead: false,
    },
  ]);

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
        {notifications.length > 0 ? (
          notifications.map((notification, idx) => (
            <Notification
              key={idx}
              content={notification.content}
              time={notification.time}
              isRead={notification.isRead}
            />
          ))
        ) : (
          <div className="w-full flex items-center justify-center p-5 opacity-50">
            No notification
          </div>
        )}
      </div>
    </PopupPanel>
  );
};

export default Inbox;
