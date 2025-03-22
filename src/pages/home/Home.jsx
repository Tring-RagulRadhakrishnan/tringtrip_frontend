import React from "react";

import "./Home.css";
import CardContainer from "../../components/common/CardContainer";
import { useQuery } from "@apollo/client";
import {
  GET_BEST_PACKAGE,
  GET_INTERNATIONAL_PACKAGE,
  GET_VISA_PACKAGE,
} from "../../graphql/query/LocationQuery";

const Home = () => {
  const {
    data: bestpack,
    loading,
    error,
  } = useQuery(GET_BEST_PACKAGE, { fetchPolicy: "no-cache" });
  const { data: visaFreePack } = useQuery(GET_VISA_PACKAGE, {
    fetchPolicy: "no-cache",
  });
  const { data: InternationalPack } = useQuery(GET_INTERNATIONAL_PACKAGE, {
    fetchPolicy: "no-cache",
  });

  return (
    <div className="home-outer-container">
      <CardContainer
        locationCard={bestpack?.getBestPackage}
        category="BEST PACKAGES"
      />
      <CardContainer
        locationCard={visaFreePack?.getVisaFreePackage}
        category="VISA FREE PACKAGES"
      />
      <CardContainer
        locationCard={InternationalPack?.getInternationalPackage}
        category="INTERNATIONAL PACKAGES"
      />
    </div>
  );
};

export default Home;
