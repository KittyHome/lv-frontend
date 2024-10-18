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
    <div className="flex flex-col overflow-clip bg-background-200 p-3 min-w-[500px] rounded-b-lg">
      <TableHead columns={columns} />
      <div>
        {rows.length > 0 ? (
          <TableBody columns={columns} rows={rows} />
        ) : (
          <div className="p-5 pb-2 w-full flex justify-center items-center">
            No data available
          </div>
        )}
      </div>
    </div>
  );
}

export type { IColumn, IRow };
export default BTable;
