import React from 'react';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ totalItems, itemsPerPage, currentPage, onPageChange }: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleClick = (page: number) => {
    onPageChange(page);
  };

  return (
    <div className="flex justify-center mt-4">
      <button 
        onClick={() => handleClick(currentPage - 1)} 
        disabled={currentPage === 1}
        className="px-4 py-2 mx-1 text-white bg-gray-800 rounded disabled:opacity-50"
      >
        Previous
      </button>
      {[...Array(totalPages)].map((_, index) => (
        <button 
          key={index} 
          onClick={() => handleClick(index + 1)} 
          className={`px-4 py-2 mx-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
        >
          {index + 1}
      </button>
      ))}
      <button 
        onClick={() => handleClick(currentPage + 1)} 
        disabled={currentPage === totalPages}
        className="px-4 py-2 mx-1 text-white bg-gray-800 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
