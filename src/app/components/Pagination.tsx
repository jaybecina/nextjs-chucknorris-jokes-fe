import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
}

const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  totalPages, 
  onNext, 
  onPrev 
}) => {
  return (
    <div className="flex justify-center my-4">
      <button
        className="mx-2 p-2"
        onClick={onPrev}
        disabled={currentPage === 1}
      >
        <FontAwesomeIcon icon={faCaretLeft} />
      </button>
      <span className="mx-2 mt-2">{currentPage} / {totalPages}</span>
      <button
        className="mx-2 p-2"
        onClick={onNext}
        disabled={currentPage === totalPages}
      >
        <FontAwesomeIcon icon={faCaretRight} />
      </button>
    </div>
  );
};

export default Pagination;