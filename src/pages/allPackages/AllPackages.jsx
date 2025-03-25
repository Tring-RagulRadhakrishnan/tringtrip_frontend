import React, { useState } from "react";
import PackageCard from "../../components/cards/PackageCard";
import { useQuery } from "@apollo/client";
import { GET_ALL_PACKAGES } from "../../graphql/query/PackageQuery";
import './AllPackages.css'
import { FaArrowAltCircleRight ,FaArrowAltCircleLeft} from "react-icons/fa";


const AllPackages = () => {
    const[page,setPage] = useState(1);
  const { data } = useQuery(GET_ALL_PACKAGES, {variables:{page} ,fetchPolicy: "no-cache" });
  console.log(data?.getAllPackages);

  const packages = data?.getAllPackages;
  
  return (
    <div className="all-package-section">
      <h1 className="all-packages-title">ALL PACKAGES</h1>
      <div>
        <PackageCard pack = {packages}/>
      </div>

      <div className="all-package-nav-container">
        
       <FaArrowAltCircleLeft onClick={()=>setPage(page-1)}/>
       <p>{page}</p>
       <FaArrowAltCircleRight onClick={()=>setPage(page+1)}/>

      </div>
    </div>
  );
};

export default AllPackages;
