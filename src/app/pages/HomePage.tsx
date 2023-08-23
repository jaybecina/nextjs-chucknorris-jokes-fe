"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import Dropdown from '../components/Dropdown';
import SearchInput from '../components/SearchInput';
import Cards from '../components/Cards';
import { formatTimestamp } from '../helpers/currentTimestamp';

import { 
  getCategoryList,
  getJokeByDefault,
  getJokeByCategory,
  getJokesByFreeText
} from '../services/jokeService';
import MenuBar from '../components/MenuBar';
import Pagination from '../components/Pagination';

export default function HomePage() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any>(null);
  const [currentResult, setCurrentResult] = useState<any>(null);
  const [categoryOptions, setCategoryOptions] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [menuActive, setMenuActive] = useState<string>("category");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalResult, setTotalResult] = useState(1);
  const resultsPerPage = 10; 

  useEffect(() => {
    // Get current results for the current page when menuActive freeText
    const startNum = currentPage - 1;
    const endNum = searchResults?.total;
    const currentRes = searchResults?.result?.slice(startNum, endNum);

    setTotalResult(endNum);

    setCurrentResult(currentRes);

    console.log("currentRes: " + currentRes);
    console.log("searchResults: ");
    console.log(searchResults);
  }, [searchResults])

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
    const response = await getJokeByDefault();
    console.log("fetchJokeByDefault: ", response?.data)
    setSearchResults(response?.data);

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

  useEffect(() => {
    console.log("menuActive: " + menuActive)
  }, [menuActive])

  const handleSearch = async () => {
    try {
      console.log("handleSearch activated... ")

      let response = null;
      if (menuActive === "freeText") {
        setIsLoading(true); 
        console.log("searchValue: " + searchValue)
        if(searchValue !== "") {
          console.log("searchValue not empty")
          response = await getJokesByFreeText(searchValue);
          console.log("handleSearch freetext: ")
          console.log(response?.data)
          setSearchResults(response?.data);

          setIsLoading(false);
      
          return response.data;
        } else {
          setIsLoading(false); 
          console.log("searchValue empty")
          return;
        }
      } else {
        setIsLoading(true); 
        response = await getJokeByCategory(searchValue);
        console.log("handleSearch category: ")
        console.log(response?.data)
        setSearchResults(response?.data);

        setIsLoading(false);
      
        return response.data;
      }
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
      <div className="flex flex-col lg:flex-row lg:my-6 lg:w-min lg:ml-4">
        <label className="lg:text-center text-blue-600 lg:mt-2 mr-4">{menuActive === "freeText" ? "Free Text:" : "Categories:"}</label>
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
      {menuActive === "freeText" && currentResult?.length > 0 ?
        <Cards key={currentResult[currentPage - 1]}>
          <p className="text-xs text-blue-600 mb-1">{isLoading ? <Skeleton /> : currentResult?.length > 0 ? formatTimestamp(currentResult[currentPage - 1]?.updated_at) : ""}</p>
          <p className="text-lg font-semibold text-blue-600 my-6">
            {isLoading 
              ? <Skeleton /> 
              : currentResult[currentPage - 1]?.value
            }
          </p>
          <p className="text-xs text-blue-600 text-right mt-4">{isLoading ? <Skeleton /> : "Joke Page"}</p>
        </Cards>
      :
        <Cards>
          <p className="text-xs text-blue-600 mb-1">{isLoading ? <Skeleton /> : formatTimestamp(searchResults?.updated_at)}</p>
          <p className="text-lg font-semibold text-blue-600 my-6">
            {isLoading 
              ? <Skeleton /> 
              : searchResults?.value
            }
          </p>
          <p className="text-xs text-blue-600 text-right mt-4">{isLoading ? <Skeleton /> : "Joke Page"}</p>
        </Cards>
      }
      
      {menuActive === "freeText" && currentResult?.length > 0 
        ?
          <Pagination
            currentPage={currentPage}
            totalPages={searchResults?.total}
            onNext={() => currentPage > 0 && setCurrentPage(currentPage + 1)}
            onPrev={() => currentPage <= totalResult && setCurrentPage(currentPage - 1)}
          />
        :
          <></>
      }
    </>
  )
}
