import React, { ReactNode } from 'react';

interface ICards {
    children: ReactNode;
}

const Cards: React.FC<ICards> = ({ children }) => {
  return (
    <>
        <div className="w-full border border-gray-300 mt-12 lg:mt-0 ml-0 lg:ml-4 p-4 rounded-md">
            {children}
        </div>
    </>
  )
}

export default Cards
