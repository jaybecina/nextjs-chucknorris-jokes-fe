"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import Dropdown from '../components/Dropdown';
import SearchInput from '../components/SearchInput';
import Cards from '../components/Cards';
import { getCurrentTimestamp } from '../helpers/currentTimestamp';

import { 
  getCategoryList,
  getJokeByDefault,
  getJokeByCategory
} from '../services/jokeService';
import MenuBar from '../components/MenuBar';

export default function HomePage() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any>(null);
  const [categoryOptions, setCategoryOptions] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [menuActive, setMenuActive] = useState<string>("category");
  const [isSearchNotEmpty, setIsSearchNotEmpty] = useState<boolean>(true);

  const timestamp = getCurrentTimestamp();

  const fetchCategoryList = async () => {
    setIsLoading(true); 
    const response = await getCategoryList();
    setCategoryOptions(response?.data);

    setIsLoading(false);

    return response.data;
  }

  useEffect(() => {
    let mounted = true;

    if(mounted) fetchCategoryList();

    return () => {
      mounted = false;
    }
  }, []);

  const fetchJokeByDefault = async () => {
    setIsLoading(true); 
    setIsSearchNotEmpty(false);
    const response = await getJokeByDefault();
    setSearchResults(menuActive ? response?.data : response);

    setIsLoading(false);

    return response.data;
  }

  useEffect(() => {
    let mounted = true;

    if(mounted) fetchJokeByDefault();

    return () => {
      mounted = false;
    }
  }, []);

  const fetchJokeByEmptySearch = async () => {
    setIsLoading(true); 
    const response = await getJokeByDefault();
    setSearchResults(response?.data);

    setIsLoading(false);

    return response.data;
  }

  const handleSearch = async () => {
    try {
      setIsLoading(true); 

      let response = null;
      if (searchValue?.trim() === "") {
        setIsSearchNotEmpty(false);
        response = await fetchJokeByEmptySearch();
        setSearchResults(response);
      } else {
        setIsSearchNotEmpty(true);
        response = await getJokeByCategory(searchValue);
        setSearchResults(response?.data);
      }

      setIsLoading(false);
      
      

      return response.data;
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  }
  
  return (
    <>
      <div className="flex justify-center h-full mx-4 w-full">
        <h1 className="font-bold text-xl underline text-blue-600">Chuck Norris Jokes</h1>
      </div>
      <MenuBar 
        menuActive={menuActive} 
        setMenuActive={setMenuActive}
        setSearchValue={setSearchValue} 
      />
      {/* <div className="bg-blue-200 my-4 w-min flex lg:ml-4">
        <a href="#" className="w-[150px] text-center py-4 px-6 text-blue-600 hover:bg-blue-300 hover:underline active:underline active:bg-blue-300 transition duration-300">Category</a>
        <a href="#" className="w-[150px] text-center py-4 px-6 text-blue-600 hover:bg-blue-300 hover:underline active:underline active:bg-blue-300 transition duration-300">Free Text</a>
      </div> */}
      <div className="flex flex-col lg:flex-row lg:my-6 lg:w-min lg:ml-4">
        <label className="lg:text-center text-blue-600 lg:mt-2 mr-4">Categories: </label>
        {menuActive === "category" ?
          <Dropdown 
            options={categoryOptions}
            value={searchValue}
            setValue={setSearchValue}
          />
          :
          <SearchInput
            value={searchValue}
            setValue={setSearchValue}
          />
        }
        <button 
          className="w-[200px] h-[41px] bg-white text-blue-600 border border-blue-300 hover:text-white hover:bg-blue-300 focus:outline-none lg:ml-4 mt-4 lg:mt-0"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <Cards>
        <p className="text-xs text-blue-600 mb-1">{isLoading ? <Skeleton /> : timestamp}</p>
        <p className="text-lg font-semibold text-blue-600 my-6">
          {isLoading 
            ? <Skeleton /> 
            : isSearchNotEmpty ? searchResults?.joke : searchResults?.value
          }
        </p>
        <p className="text-xs text-blue-600 text-right mt-4">{isLoading ? <Skeleton /> : "Joke Page"}</p>
      </Cards>
    </>
  )
}
