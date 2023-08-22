import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

interface IMenuBar {
  menuActive: string;
  setMenuActive: (value: string) => void;
  setSearchValue: (value: string) => void;
}

const MenuBar: React.FC<IMenuBar> = ({
  menuActive,
  setMenuActive,
  setSearchValue
}) => {
    useEffect(() => {
        if(menuActive === "category") {
            setMenuActive("category");
        } else {
            setMenuActive("freeText");
        }
    }, [menuActive]);

    const activeClass = 'bg-blue-200 underline text-blue-600 hover:underline active:underline active:bg-blue-300';

    const inActiveClass = 'bg-blue-200 text-blue-600 hover:underline active:underline active:bg-blue-300';

    const handleOnClick = (value: string) => {
        setSearchValue("");
        setMenuActive(value);
    }

    return (
        <ul className="my-4 w-min flex lg:ml-4 cursor-pointer">
            <li 
                className={`w-[150px] text-center py-4 px-6 transition duration-300 ${menuActive === "category" ? activeClass : inActiveClass}`}
                onClick={() => handleOnClick("category")}
            >
                Category
            </li>
            <li 
                className={`w-[150px] text-center py-4 px-6 transition duration-300 ${menuActive === "freeText" ? activeClass : inActiveClass}`}
                onClick={() => handleOnClick("freeText")}
            >
                Free Text
            </li>
        </ul>
    )
}

export default MenuBar;
