import React from 'react';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import { AiOutlineEllipsis } from 'react-icons/ai';
import ReactPaginate from 'react-paginate';

type Props = {
  onChange?: (val: any) => void,
  count?: number | undefined,
  className?: string,
  currentPage?: number
};

function Pagination({
  onChange, count = 0, currentPage, className
}: Props) {
  return (
    <div className={`${className} w-full`}>
      {count > 0 ? (
        <ReactPaginate
          pageCount={count}
          forcePage={currentPage}
          pageRangeDisplayed={5}
          onPageChange={onChange}
          nextLabel={<IoIosArrowForward className="w-4 h-auto inline" />}
          breakLabel={<AiOutlineEllipsis className="w-5 h-auto" />}
          breakClassName="h-12 flex items-center"
          previousLabel={<IoIosArrowBack className="w-4 h-auto inline" />}
          className="flex justify-center list-none text-xs text-primary space-x-4"
          pageLinkClassName="w-12 h-12 border rounded-md flex justify-center items-center font-bold border-primary"
          activeLinkClassName="bg-primary text-white"
          previousLinkClassName="w-12 h-12 border border-gray-300 rounded-md flex justify-center items-center"
          nextLinkClassName="w-12 h-12 border border-gray-300 rounded-md flex justify-center items-center"
          disabledLinkClassName="text-gray-300"
        />
      ) : <div />}
    </div>
  );
}

Pagination.defaultProps = {
  className: '',
  onChange: () => { },
  count: 0,
  currentPage: 1
};

export default Pagination;
