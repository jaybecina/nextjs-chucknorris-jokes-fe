import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

interface IDropdown {
  options: string[];
  value: string;
  setValue: (value: string) => void;
}

const Dropdown: React.FC<IDropdown> = ({ 
  options,
  value,
  setValue
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  

  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (e: any) => {
    setValue(e.target.dataset.value);
  }

  const handleOutsideClick = (e: MouseEvent) => {
    if (dropdownRef.current && !(dropdownRef.current as HTMLElement).contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div 
      className="relative inline-block text-left w-full lg:w-[200px]"
      ref={dropdownRef}
    >
      <button
        type="button"
        className="h-[41px] inline-flex items-center justify-center w-full px-2 py-5 font-medium text-gray-800 bg-white border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-300"
        onClick={toggleDropdown}
      >
        {value}
        <FontAwesomeIcon
          icon={isOpen ? faCaretUp : faCaretDown}
          className="absolute ml-2 right-3 h-6 w-6 text-gray-600"
        />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-full lg:w-48 bg-white border border-gray-300 rounded-md shadow-lg">
          <ul className="py-1">
            {options?.map((option, index) => (
              <li
                key={index}
                data-value={option}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={handleSelect}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Dropdown
