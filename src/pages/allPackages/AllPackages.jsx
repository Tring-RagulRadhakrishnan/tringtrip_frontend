import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";

import InfiniteScroll from "react-infinite-scroll-component";

import { GET_ALL_PACKAGES } from "../../graphql/query/PackageQuery";

import PackageCard from "../../components/cards/PackageCard";

import "./AllPackages.css";


const AllPackages = () => {
    const[page,setPage] = useState(1);
    const [totalPage,setTotalPage]=useState(0)
    const [allPackages, setAllPackages] = useState([]);
  const { data,loading} = useQuery(GET_ALL_PACKAGES, {variables:{page} ,fetchPolicy: "no-cache" });
  // console.log("....",data?.getAllPackages);


 

  useEffect(()=>{
    if(data?.getAllPackages){
      setTotalPage(Math.ceil(data?.getAllPackages[0]?.total_count/6))

      setAllPackages((prevPackages) => [
        ...prevPackages,
        ...data.getAllPackages,
      ]);
    }

  },[data])

  const fetchMoreData = () => {
    if (page < totalPage) {
      setPage((prevPage) => prevPage + 1); 
    }
  };

  console.log("total page",totalPage);
  
  
  return (
    <div className="all-package-section">
      <h1 className="all-packages-title">ALL PACKAGES</h1>
      <InfiniteScroll
        dataLength={allPackages.length}
        next={fetchMoreData}
        hasMore={page < totalPage}
        loader={<h4>Loading</h4>}
      >
        <PackageCard pack={allPackages} />
      </InfiniteScroll>
    </div>
  );
};

export default AllPackages;
