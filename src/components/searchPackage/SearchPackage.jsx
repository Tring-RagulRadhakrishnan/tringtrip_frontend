import React from 'react'
import PackageCard from '../cards/PackageCard'
import { useQuery } from '@apollo/client'
import { GET_PACKAGE_SEARCH } from '../../graphql/query/PackageQuery'
import { useLocation } from 'react-router-dom'
import './SearchPackage.css'

const SearchPackage = () => {
    const location = useLocation();
    const searchTerm = location?.state;
    const {data} = useQuery(GET_PACKAGE_SEARCH,{variables:{searchTerm},fetchPolicy:"no-cache"});
    console.log(data?.getPackageBySearch);
    const packages = data?.getPackageBySearch;
    
  return (
    <div className="search-package-section">
        <h1 className="search-packages-title">SEARCH PACKAGES</h1>
        <div>
            <PackageCard pack={packages} />
        </div>
    </div>
  )
}

export default SearchPackage