import React from 'react';

const Pagination = ({ currentPage, totalPages, setPage }) => {
  const handlePageClick = (page) => {
    if (page !== currentPage) setPage(page);
  };

  return (
    <div className="flex flex-wrap justify-center mb-[70px] mt-[50px]">
      {[...Array(totalPages)].map((_, index) => {
        const pageNumber = index + 1;
        const isActive = currentPage === pageNumber;

        return (
          <button
            key={pageNumber}
            onClick={() => handlePageClick(pageNumber)}
            className={`w-10 h-10 mx-2 rounded-md cursor-pointer transition-all duration-300 
              font-sans font-semibold text-base border 
              ${isActive 
                ? "font-black border-[#101010] bg-[#ffe400] text-[#101010]" 
                : "bg-white text-black border-[#eee]"}`
            }
          >
            {pageNumber}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
