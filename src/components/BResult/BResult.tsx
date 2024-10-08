import Gold from "/images/gold.png";
import Silver from "/images/silver.png";
import Brozen from "/images/brozen.png";
import Medal from "./Medal";
import { GiHamburgerMenu } from "react-icons/gi";
import BTable, { IColumn, IRow } from "../BTable/BTable";

const MedalImages = [Gold, Silver, Brozen];

const columns: IColumn[] = [
  {
    name: "rank",
    title: "Rank",
    render: (row: IRow) => {
      return (
        <div>
          <img
            className="w-[20px]"
            src={MedalImages[parseInt(row["rank"])]}
            alt="Gold"
          />
        </div>
      );
    },
  },
  { name: "username", title: "Username", grow: true },
  { name: "noOfTickets", title: "# of tickets", width: 140 },
  { name: "score", title: "Total earned", width: 150 },
];

const rows = [
  { rank: 0, username: "RandomUser123", noOfTickets: 3, score: 1500 },
  { rank: 1, username: "MysteryGamer456", noOfTickets: 4, score: 1400 },
  { rank: 2, username: "AnonPlayer789", noOfTickets: 1, score: 1300 },
];

const BResult = () => {
  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-secondary-100 to-background-200 rounded-lg border border-background-100 shadow backdrop-blur overflow-clip w-full">
      <div
        className="px-5 p-3 relative min-h-[290px] w-full"
        style={{
          backgroundImage: "url(/images/bg-pattern.svg)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex justify-between items-center">
          <p className="font-bold text-2xl">Betting Result</p>
          <button className="p-2 text-xl">
            <GiHamburgerMenu />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="items-center gap-10 justify-center flex">
            <Medal imgSrc={Gold} count={1238} />
            <Medal imgSrc={Silver} count={83} />
            <Medal imgSrc={Brozen} count={733} />
          </div>
        </div>
        <div className="overflow-clip rounded-lg">
          <div className="font-sans text-sm overflow-x-auto">
            <BTable columns={columns} rows={rows} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BResult;
