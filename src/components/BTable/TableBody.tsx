import clsx from "clsx";
import { IColumn, IRow } from "./BTable";

interface TableBodyProps {
  columns: IColumn[];
  rows: IRow[];
}

function TableBody({ columns, rows }: TableBodyProps) {
  return rows.map((row: IRow, index: number) => (
    <div
      key={index}
      className="flex items-center bg-background-200 hover:bg-background-100 rounded-lg mt-1 text-text-100/70"
    >
      <div
        key={null}
        className={clsx("shrink-0 py-1.5 px-4 flex items-center")}
        style={{
          width: 80,
        }}
      >
        <p>{index + 1}</p>
      </div>
      {columns.map((column: IColumn, index: number) => (
        <div
          key={index}
          className={clsx("shrink-0 py-1.5 px-4 flex items-center", {
            grow: column.grow,
            "justify-center": column.align === "center",
            "justify-end": column.align === "right",
          })}
          style={{
            width: column.width || 100,
          }}
        >
          {column.render ? column.render(row) : <p>{row[column.name]}</p>}
        </div>
      ))}
    </div>
  ));
}

export default TableBody;
