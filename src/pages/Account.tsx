import { useEffect, useState } from "react";
import { MdNotifications } from "react-icons/md";
import { HiWallet, HiUserCircle } from "react-icons/hi2";
import { BsInfoCircle } from "react-icons/bs";

import Button from "../common/Button";
import Input from "../common/Input";
import { useAuth } from "../hooks/useAuth";
import PageWrapper from "../components/PageWrapper";
import Dropdown from "../common/Dropdown";

type Network = "bep20" | "trc20";

const networkOptions: {
  label: string;
  value: Network;
}[] = [
  {
    label: "BEP20",
    value: "bep20",
  },
  { label: "TRC20", value: "trc20" },
];

const Account = () => {
  const { user } = useAuth();
  const [selectedNetwork, setSelectedNetwork] = useState<Network>("bep20");

  useEffect(() => {
    document.title = "Lucky Village | Account";
  }, []);

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
          <div className="flex flex-col gap-2">
            <label className="ml-2 text-sm font-bold">Password</label>
            <Input
              className="!bg-background-100"
              placeholder="Enter your password here"
              disabled
            />
          </div>
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
            Payment
          </h3>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3 bg-background-100 rounded-lg p-3">
              <div>
                <h3 className="ml-1 font-bold">Add Funds</h3>
              </div>
              <div className="flex flex-col gap-2">
                <label className="ml-2 text-sm font-bold">Amount (USD)</label>
                <Input placeholder="Enter amount in USD here" />
              </div>
              <Button className="w-full mx">Charge with Cryptomus</Button>
            </div>
            <div className="flex flex-col gap-3 bg-background-100 rounded-lg p-3">
              <div className="flex items-start justify-between px-1">
                <div>
                  <h3 className="font-bold">Withdraw</h3>
                  <p className="text-sm opacity-50">
                    You are allowed to withdraw up to 90% of your available
                    balance per request. <br />
                    Please note that processing withdrawals may take up to 24
                    hours due to high demand.
                  </p>
                </div>
              </div>
              {user && user.withdrawChance > 0 ? (
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <label className="ml-2 text-sm font-bold">
                      Amount (USD)
                    </label>
                    <Input placeholder="Enter amount in USD here" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="ml-2 text-sm font-bold">Network</label>
                    <Dropdown
                      value={selectedNetwork}
                      options={networkOptions}
                      onChange={(value) => setSelectedNetwork(value as Network)}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="ml-2 text-sm font-bold">Address</label>
                    <Input placeholder="Enter your USDT address here" />
                  </div>
                  <Button className="w-full mx">Send withdraw request</Button>
                </div>
              ) : (
                <div className="flex items-center justify-center p-5 opacity-70">
                  You have reached your withdrawal limit
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Account;
