import { MdNotifications } from "react-icons/md";
import { HiWallet, HiUserCircle } from "react-icons/hi2";
import { BsInfoCircle } from "react-icons/bs";

import Button from "../common/Button";
import Input from "../common/Input";
import { useAuth } from "../hooks/useAuth";
import PageWrapper from "../components/PageWrapper";

const Account = () => {
  const { user } = useAuth();
  return (
    <PageWrapper title="Manage your account settings and preferences">
      <div className="w-full flex flex-col gap-3 mt-3">
        <div className="border border-background-100 rounded-lg bg-background-200 p-3 flex flex-col gap-3">
          <h3 className="font-bold text-xl flex items-center gap-2">
            <HiUserCircle />
            Profile
          </h3>
          <div className="flex flex-col gap-2">
            <label className="ml-2 text-sm font-bold">Username</label>
            <Input
              className="!bg-background-100"
              placeholder="Enter your username here"
              value={user?.username}
              readOnly
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="ml-2 text-sm font-bold">Email</label>
            <Input
              className="!bg-background-100"
              placeholder="Enter your email here"
              readOnly
              value={user?.email || ""}
              disabled
            />
          </div>
          {user?.providerData[0].providerId === "password" && (
            <div className="flex flex-col gap-2">
              <label className="ml-2 text-sm font-bold">Password</label>
              <Input
                className="!bg-background-100"
                placeholder="Enter your password here"
                disabled
              />
            </div>
          )}
          <Button>Save</Button>
        </div>
        <div className="flex flex-col gap-3 border border-background-100 bg-background-200 p-3 rounded-lg">
          <h3 className="font-bold text-xl flex items-center gap-2">
            <MdNotifications />
            Notification
            <small
              className="text-[12px] cursor-pointer -mt-2"
              data-tooltip-id="global-tooltip"
              data-tooltip-content="Get email updates on game status. Feature exclusive to advanced users!"
            >
              <BsInfoCircle />
            </small>
          </h3>
          <div className="flex items-center gap-2 opacity-70">
            <input
              type="checkbox"
              id="notification"
              className="form-checkbox h-5 w-5 rounded-lg focus:ring-primary-500"
              disabled
            />
            <label htmlFor="notification" className="ml-2 text-text-200">
              Receive notification about game status in every 15mins
            </label>
          </div>
        </div>
        <div className="flex gap-3 border border-background-100 bg-background-200 rounded-lg p-3 flex-col">
          <h3 className="font-bold text-xl flex items-center gap-2">
            <HiWallet />
            Wallet
          </h3>
          <div className="flex justify-center items-center md:flex-row flex-col gap-5">
            <div className="flex flex-col items-center justify-center">
              <p className="mb-3">
                You can deposit money by sending crypto to below address
              </p>
              <img
                className="w-[200px] h-[200px] bg-white p-2 rounded-lg"
                src="https://www.freepnglogos.com/uploads/qr-code-png/qr-code-ios-will-enable-the-iphone-camera-app-read-codes-29.png"
              />
              <p className="text-text-100/50 py-2">
                0x1234567890abcdef1234567890abcdef12345678
              </p>
            </div>
            <div className="mt-10 flex gap-3 w-full max-w-[500px] md:flex-row flex-col">
              <Input
                className="flex-1 !bg-background-100"
                placeholder="Enter your withdraw address here"
              />
              <Button>Withdraw</Button>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Account;
