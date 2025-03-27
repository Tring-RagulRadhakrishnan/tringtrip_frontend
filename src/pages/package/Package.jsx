import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import "./Package.css";
import { useQuery } from "@apollo/client";
import { GET_PACKAGE_LOCATION } from "../../graphql/query/PackageQuery";
import PackageCard from "../../components/cards/PackageCard";

const Package = () => {
  const location = useLocation();
  const tourist_place = location?.state;

  const { data, loading, error } = useQuery(GET_PACKAGE_LOCATION, {
    variables: { location: tourist_place?.location },
    fetchPolicy: "no-cache",
  });


  console.log(data?.getPackageByLocation);
  

  const packages = data?.getPackageByLocation;
  return (
    <div className="package-section-outer-container">
      {/* Cover Image Section */}
      <section className="package-cover-image-container">
        <img
          src={tourist_place?.cover_image}
          alt={tourist_place?.location}
          className="cover-image"
        />
        <div className="cover-image-overlay">
          <p className="package-cover-image-container-title">
            {tourist_place?.location} Package
          </p>
          <p className="package-cover-image-container-subtitle">
            {tourist_place?.subtitle}
          </p>
        </div>
      </section>

      {/* Packages Section */}
      <section className="package-section">
        <h1>PACKAGES</h1>
        <PackageCard pack = {packages}/>
        
      </section>
    </div>
  );
};

export default Package;
