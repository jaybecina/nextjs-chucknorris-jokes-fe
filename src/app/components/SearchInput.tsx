import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

interface ISearchInput {
  value: string;
  setValue: (value: string) => void;
}

const SearchInput: React.FC<ISearchInput> = ({
  value,
  setValue
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className="inline-block text-left w-full lg:w-[200px]">
      <input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={handleChange}
        className="h-[41px] inline-flex items-center justify-center w-full px-2 py-5 font-medium text-gray-800 bg-white border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-300 mr-2"
      />
    </div>
  )
}

export default SearchInput
