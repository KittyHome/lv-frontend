import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PaginationProps {
  totalRows: number;
}

function Pagination({ totalRows }: PaginationProps) {
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(10);

  const totalPage = useMemo(
    () => Math.ceil(totalCount / rowsPerPage),
    [totalCount, rowsPerPage]
  );

  const pages = useMemo(() => {
    if (totalPage <= 5) return [...Array(totalPage + 1).keys()].slice(1);
    if (currentPage <= 4) return [1, 2, 3, 4, 5];
    if (currentPage > totalPage - 4)
      return [...Array(5).keys()].reverse().map((key) => totalPage - key);
    return [currentPage - 1, currentPage, currentPage + 1];
  }, [currentPage, totalPage]);

  const navigatePage = (page: number) => {
    if (page === 0 || page === totalPage + 1) return;
    setCurrentPage(page);
  };

  useEffect(() => {
    setTotalCount(totalRows);
  }, [totalRows]);

  return (
    <div className="w-full flex items-center justify-between mt-3 sm:flex-row flex-col gap-3">
      <div className="flex items-center gap-x-2">
        <p>Rows Per Page: </p>
        <select
          value={rowsPerPage}
          onChange={(e) => setRowsPerPage(Number(e.target.value))}
          className="py-1.5 px-2.5 outline-none rounded-lg bg-background-100"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
      <div className="flex gap-x-0.5">
        <span
          className="h-8 w-8 flex items-center justify-center bg-background-100 hover:text-text-100 hover:bg-primary-100 rounded-md cursor-pointer select-none"
          onClick={() => {
            navigatePage(currentPage - 1);
          }}
        >
          <FaChevronLeft />
        </span>
        {totalPage > 5 && currentPage >= 5 && (
          <>
            <span
              className={clsx(
                "h-8 w-8 flex items-center justify-center bg-background-100 hover:text-text-100 hover:bg-primary-100 rounded-md cursor-pointer select-none"
              )}
              onClick={() => {
                navigatePage(1);
              }}
            >
              1
            </span>
            <span className="h-8 w-8 flex items-center justify-center bg-background-100 rounded-md cursor-pointer select-none">
              ...
            </span>
          </>
        )}
        {pages.map((page: number) => (
          <span
            key={page}
            className={clsx(
              "h-8 w-8 flex items-center justify-center bg-background-100 hover:text-text-100 hover:bg-primary-100 rounded-md cursor-pointer select-none",
              {
                "border !border-primary-100 !text-text-100":
                  currentPage === page,
              }
            )}
            onClick={() => {
              navigatePage(page);
            }}
          >
            {page}
          </span>
        ))}
        {totalPage > 5 &&
          ((currentPage >= totalPage - 4 && currentPage < 5) ||
            currentPage <= totalPage - 4) && (
            <>
              <span className="h-8 w-8 flex items-center justify-center bg-background-100 rounded-md cursor-pointer select-none">
                ...
              </span>
              <span
                className={clsx(
                  "h-8 w-8 flex items-center justify-center bg-background-100 hover:text-text-100 hover:bg-primary-100 rounded-md cursor-pointer select-none"
                )}
                onClick={() => {
                  navigatePage(totalPage);
                }}
              >
                {totalPage}
              </span>
            </>
          )}
        <span
          className="h-8 w-8 flex items-center justify-center bg-background-100 hover:text-text-100 hover:bg-primary-100 rounded-md cursor-pointer select-none"
          onClick={() => {
            navigatePage(currentPage + 1);
          }}
        >
          <FaChevronRight />
        </span>
      </div>
    </div>
  );
}

export default Pagination;
