import BTable, { IColumn, IRow } from "../components/BTable/BTable";
import Medal from "../components/Medal";
import PageWrapper from "../components/PageWrapper";
import Rank from "../components/Rank";
import Timeline from "../components/Timeline";
import Brozen from "/images/brozen.png";
import Gold from "/images/gold.png";
import Silver from "/images/silver.png";

const MedalImages = [Gold, Silver, Brozen];

const GameDetail = () => {
  return (
    <div className="sm:absolute relative xl:bottom-3 bottom-0 left-1/2 -translate-x-1/2 w-full flex justify-center z-20">
      <div className="flex gap-3 items-center w-fit backdrop-blur-sm rounded-lg bg-white/10 border border-white/10 p-2 px-5 justify-center my-3">
        <div className="flex sm:gap-3 gap-0.5 sm:items-center sm:flex-row flex-col">
          <div className="flex flex-col">
            <span className="sm:text-sm text-[11px] opacity-50 font-mono">
              Players
            </span>
            <span className="text-xl font-bold opacity-50">999999</span>
          </div>
          <div className="h-[30px] w-[0.5px] bg-white/20 sm:flex hidden"></div>
          <div className="flex flex-col">
            <span className="sm:text-sm text-[11px] opacity-50 font-mono text-nowrap">
              Prize Pool
            </span>
            <span className="text-xl font-bold nabla-regular">$999999</span>
          </div>
        </div>
        <div className="h-[30px] w-[0.5px] bg-white/20"></div>
        <div className="flex items-center sm:gap-3 gap-4">
          <Medal imgSrc={Gold} count={1238} title="Gold" />
          <div className="h-[30px] w-[0.5px] bg-white/20"></div>
          <Medal imgSrc={Silver} count={1238} title="Silver" />
          <div className="h-[30px] w-[0.5px] bg-white/20"></div>
          <Medal imgSrc={Brozen} count={1238} title="Bronze" />
        </div>
      </div>
    </div>
  );
};

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

const Result = () => {
  return (
    <PageWrapper title="Discover the results for any game here">
      <div className="relative w-full">
        <div className="px-5 p-3">
          <Timeline />
        </div>
        <div className="relative">
          <Rank />
          <GameDetail />
        </div>
        <div className="overflow-clip">
          <div className="overflow-x-auto">
            <BTable columns={columns} rows={rows} />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Result;
