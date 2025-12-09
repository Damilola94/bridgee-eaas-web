"use client";

import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  const handleClick = (page: number, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const renderPages = () => {
    const pages: (number | string)[] = [];
    const totalNumbers = 7;
    const halfTotalNumbers = Math.floor(totalNumbers / 2);

    if (totalPages <= totalNumbers) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= halfTotalNumbers) {
        for (let i = 1; i <= halfTotalNumbers + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - halfTotalNumbers) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - halfTotalNumbers; i <= totalPages; i++)
          pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages.map((page, index) =>
      typeof page === "string" ? (
        <span key={index} className="px-2 text-gray-500">
          ...
        </span>
      ) : (
        <button
          key={index}
          onClick={(e) => handleClick(page, e)}
          className={`mx-1 px-3 py-1 rounded-md text-sm transition-all ${
            currentPage === page
              ? "bg-pink-500 text-white"
              : "text-gray-800 hover:bg-gray-200"
          }`}
        >
          {page}
        </button>
      )
    );
  };

  return (
    <div className="flex justify-center items-center gap-2 my-6">
      <button
        onClick={(e) => handleClick(currentPage - 1, e)}
        disabled={currentPage === 1}
        className={`flex items-center px-3 py-1 rounded-md text-sm transition-all ${
          currentPage === 1
            ? "cursor-not-allowed opacity-50"
            : "text-gray-800 hover:bg-gray-200"
        }`}
      >
        ← Previous
      </button>

      {renderPages()}

      <button
        onClick={(e) => handleClick(currentPage + 1, e)}
        disabled={currentPage === totalPages}
        className={`flex items-center px-3 py-1 rounded-md text-sm transition-all ${
          currentPage === totalPages
            ? "cursor-not-allowed opacity-50"
            : "text-gray-800 hover:bg-gray-200"
        }`}
      >
        Next →
      </button>
    </div>
  );
};

const MyComponent = () => {
  const [page, setPage] = React.useState(1);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    // You can also trigger your API call or router.push here:
  };

  return <Pagination currentPage={page} totalPages={10} onPageChange={handlePageChange} />;
};

export default MyComponent;
