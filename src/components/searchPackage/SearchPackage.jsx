import React from "react";
import { useQuery } from "@apollo/client";
import { useLocation } from "react-router-dom";

import { GET_PACKAGE_SEARCH } from "../../graphql/query/PackageQuery";

import PackageCard from "../cards/PackageCard";

import "./SearchPackage.css";

const SearchPackage = () => {
  const location = useLocation();
  const searchTerm = location?.state;
  const { data, loading } = useQuery(GET_PACKAGE_SEARCH, {
    variables: { searchTerm },
    fetchPolicy: "no-cache",
  });
  const packages = data?.getPackageBySearch;

  return (
    <div className="search-package-section">
      <h1 className="search-packages-title">SEARCH PACKAGES</h1>
      {loading ? <h4>loding</h4> : <h4>package not found</h4>}
      <div>
        <PackageCard pack={packages} />
      </div>
    </div>
  );
};

export default SearchPackage;
