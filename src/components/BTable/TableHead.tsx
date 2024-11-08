import clsx from "clsx";

import { IColumn } from "./BTable";

interface TableHeadProps {
  columns: IColumn[];
}

function TableHead({ columns }: TableHeadProps) {
  return (
    <div className="flex items-center backdrop-blur bg-background-100 rounded-lg">
      <div
        key={null}
        className={clsx("shrink-0 py-2.5 px-4 flex items-center")}
        style={{
          width: 80,
        }}
      >
        #
      </div>
      {columns.map((column: IColumn, index: number) => (
        <div
          key={index}
          className={clsx("shrink-0 py-2.5 px-4 flex items-center", {
            grow: column.grow,
            "justify-center": column.align === "center",
            "justify-end": column.align === "right",
          })}
          style={{
            width: column.width || 100,
          }}
        >
          {column.title}
        </div>
      ))}
    </div>
  );
}

export default TableHead;
