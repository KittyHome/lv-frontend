import BTable, { IColumn } from "../components/BTable/BTable";
import PageWrapper from "../components/PageWrapper";

const columns: IColumn[] = [
  { name: "id", title: "ID", grow: true },
  { name: "amount", title: "Amount", width: 150 },
  { name: "type", title: "Type", width: 140 },
  { name: "Status", title: "Status", width: 140 },
  { name: "createdAt", title: "Created At", width: 140 },
  { name: "completedAt", title: "Completed At", width: 140 },
];

const Transactions = () => {
  return (
    <PageWrapper title="Explore Your Financial Transactions">
      <div className="overflow-clip w-full mt-3">
        <div className="overflow-x-auto">
          <BTable columns={columns} rows={[]} />
        </div>
      </div>
    </PageWrapper>
  );
};

export default Transactions;
