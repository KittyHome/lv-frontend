import React, { useEffect, useState } from "react";

import Dropdown from "../common/Dropdown";
import BTable, { IColumn } from "../components/BTable/BTable";
import Medal from "../components/Medal";
import PageWrapper from "../components/PageWrapper";
import Rank from "../components/Rank";
import { getAllStageData, getUserDataByStageId } from "../lib/supabase/utils";
import { Stage } from "../lib/types";
import { getMatchedLength } from "../lib/utils";
import Brozen from "/images/brozen.png";
import Gold from "/images/gold.png";
import Silver from "/images/silver.png";

interface GameDetailProps {
  stage: Stage;
}
const GameDetail: React.FC<GameDetailProps> = ({ stage }) => {
  return (
    <div className="sm:absolute relative xl:bottom-3 bottom-0 left-1/2 -translate-x-1/2 w-full flex justify-center z-20">
      <div className="flex gap-3 items-center w-fit backdrop-blur-sm rounded-lg bg-white/10 border border-white/10 p-2 px-5 justify-center my-3">
        <div className="flex flex-col">
          <span className="sm:text-sm text-[11px] opacity-50 font-mono text-nowrap">
            Prize Pool
          </span>
          <span className="text-xl font-bold nabla-regular">
            ${stage.prizePool.toFixed(2)}
          </span>
        </div>
        <div className="h-[30px] w-[0.5px] bg-white/20"></div>
        <div className="flex items-center sm:gap-3 gap-4">
          <Medal imgSrc={Gold} count={stage.prizeForGold || 0} title="Gold" />
          <div className="h-[30px] w-[0.5px] bg-white/20"></div>
          <Medal
            imgSrc={Silver}
            count={stage.prizeForSilver || 0}
            title="Silver"
          />
          <div className="h-[30px] w-[0.5px] bg-white/20"></div>
          <Medal
            imgSrc={Brozen}
            count={stage.prizeForBronze || 0}
            title="Bronze"
          />
        </div>
      </div>
    </div>
  );
};

const columns: IColumn[] = [
  { name: "username", title: "Username", grow: true },
  { name: "noOfTickets", title: "# of tickets", width: 140 },
  {
    name: "score",
    title: "Total earned",
    width: 150,
    render: (row) => `$${row.score.toFixed(2)}`,
  },
];

type TableRow = {
  username: string;
  noOfTickets: number;
  score: number;
};

const Result = () => {
  const [selectedStage, setSelectedStage] = useState<Stage>();
  const [stages, setStages] = useState<Stage[]>([]);
  const [rows, setRows] = useState<TableRow[]>([]);

  useEffect(() => {
    getAllStageData().then((allStages) => allStages && setStages(allStages));
  }, []);

  useEffect(() => {
    stages.length > 0 && setSelectedStage(stages[0]);
  }, [stages]);

  useEffect(() => {
    if (!selectedStage || !selectedStage.stageResult) return;

    getUserDataByStageId(selectedStage.id).then((userData) => {
      const prizeMapping: Record<number, number> = {
        5: selectedStage.prizeForGold || 0,
        3: selectedStage.prizeForSilver || 0,
        2: selectedStage.prizeForBronze || 0,
      };

      const updatedRows = userData.map((one) => {
        const noOfTickets = one.orders.length;
        const score = one.orders.reduce((acc, order) => {
          const matchedLen = getMatchedLength(
            order,
            selectedStage.stageResult!
          );
          return acc + (prizeMapping[matchedLen] || 0);
        }, 0);

        return {
          username: one.username,
          noOfTickets,
          score,
        };
      });

      setRows(updatedRows);
    });
  }, [selectedStage]);

  return (
    <PageWrapper title="Discover the results for any game here">
      <div className="relative w-full">
        <div className="mb-4">
          <Dropdown
            value={selectedStage?.id || null}
            options={stages.map((stage) => ({
              value: stage.id,
              label: `Ended At: ${stage.endedAt.toLocaleString()} - Prize Pool: ${stage.prizePool.toFixed(
                2
              )}`,
            }))}
            onChange={(selectedOption) => {
              const stage = stages.find((stage) => stage.id === selectedOption);
              stage && setSelectedStage(stage);
            }}
          />
        </div>

        {selectedStage?.stageResult ? (
          <>
            <div className="relative">
              <Rank order={selectedStage.stageResult} />
              <GameDetail stage={selectedStage} />
            </div>
            <div className="overflow-clip">
              <div className="overflow-x-auto">
                <BTable columns={columns} rows={rows} />
              </div>
            </div>
          </>
        ) : (
          <div className="bg-background-200 rounded-lg p-5 flex items-center justify-center">
            No result found
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default Result;
