import React, { useState } from 'react';
import { useRouter } from 'next/router';

// Define the props type
interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
  const router = useRouter();
  const [current, setCurrent] = useState(currentPage);

  const handleClick = (page: number, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCurrent(page);
    router.push(`?page=${page}`);
  };

  const renderPages = () => {
    const pages: (number | string)[] = []; // Allow both numbers and strings
    const totalNumbers = 7;
    const halfTotalNumbers = Math.floor(totalNumbers / 2);
    if (totalPages <= totalNumbers) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (current <= halfTotalNumbers) {
        for (let i = 1; i <= halfTotalNumbers + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (current >= totalPages - halfTotalNumbers) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - halfTotalNumbers; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = current - 1; i <= current + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages.map((page, index) => {
      if (typeof page === 'string') {
        return <span key={index} className="px-2">...</span>;
      } else {
        return (
          <button
            key={index}
            onClick={(e) => handleClick(page, e)}
            className={`mx-1 px-3 py-1 rounded ${
              current === page ? 'bg-pink-500 text-white' : 'text-gray-800 hover:bg-gray-200'
            }`}
          >
            {page}
          </button>
        );
      }
    });
  };

  return (
    <div className="flex justify-center items-center my-4">
      <button
        onClick={(e) => handleClick(current - 1, e)}
        disabled={current === 1}
        className={`flex items-center px-3 py-1 text-gray-800 hover:bg-gray-200 rounded ${
          current === 1 && 'cursor-not-allowed opacity-50'
        }`}
      >
        ← Previous
      </button>
      {renderPages()}
      <button
        onClick={(e) => handleClick(current + 1, e)}
        disabled={current === totalPages}
        className={`flex items-center px-3 py-1 text-gray-800 hover:bg-gray-200 rounded ${
          current === totalPages && 'cursor-not-allowed opacity-50'
        }`}
      >
        Next →
      </button>
    </div>
  );
};

// Example usage with currentPage and totalPages passed as props
const MyComponent = () => {
  return <Pagination currentPage={1} totalPages={10} />;
};

export default MyComponent;
