// import Pagination from "./Pagination";
import TableBody from "./TableBody";
import TableHead from "./TableHead";

interface IRow extends Record<string, any> {}

interface IColumn {
  name: string;
  title: string;
  align?: "left" | "center" | "right";
  width?: number;
  grow?: boolean;
  render?: (row: IRow) => React.ReactNode;
}

interface BTableProps {
  columns: IColumn[];
  rows: IRow[];
}

function BTable({ columns, rows }: BTableProps) {
  return (
    <div className="flex flex-col overflow-clip bg-background-100 rounded-lg p-3 min-w-[500px]">
      <TableHead columns={columns} />
      <div>
        <TableBody columns={columns} rows={rows} />
      </div>
    </div>
  );
}

export type { IColumn, IRow };
export default BTable;
