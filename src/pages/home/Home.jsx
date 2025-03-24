import React from "react";

import Faqs from "../../components/faqs/Faqs";
import { useQuery } from "@apollo/client";
import {
  GET_BEST_PACKAGE,
  GET_INTERNATIONAL_PACKAGE,
  GET_VISA_PACKAGE,
} from "../../graphql/query/LocationQuery";
import "./Home.css";
import { GET_FAQS } from "../../graphql/query/FaqsQuery";
import LoctionCard from "../../components/cards/LoctionCard";

const Home = () => {
  const { data: bestpack } = useQuery(GET_BEST_PACKAGE, {
    fetchPolicy: "no-cache",
  });
  const { data: visaFreePack } = useQuery(GET_VISA_PACKAGE, {
    fetchPolicy: "no-cache",
  });
  const { data: InternationalPack } = useQuery(GET_INTERNATIONAL_PACKAGE, {
    fetchPolicy: "no-cache",
  });
  const { data: faqs } = useQuery(GET_FAQS, { fetchPolicy: "no-cache" });

  return (
    <div className="home-outer-container">
      <LoctionCard
        locationCard={bestpack?.getBestPackage}
        category="BEST PACKAGES"
      />
      <LoctionCard
        locationCard={visaFreePack?.getVisaFreePackage}
        category="VISA FREE PACKAGES"
      />
      <LoctionCard
        locationCard={InternationalPack?.getInternationalPackage}
        category="INTERNATIONAL PACKAGES"
      />
      <Faqs faqs = {faqs?.getFaqs}/>
    </div>
  );
};

export default Home;
