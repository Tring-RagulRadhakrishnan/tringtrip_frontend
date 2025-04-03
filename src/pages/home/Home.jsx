import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { Slide } from "react-slideshow-image";
import 'react-slideshow-image/dist/styles.css';

import {
  GET_BEST_PACKAGE,
  GET_INTERNATIONAL_PACKAGE,
  GET_VISA_PACKAGE
} from "../../graphql/query/LocationQuery";

import { GET_FAQS } from "../../graphql/query/FaqsQuery";
import { LOW_PRICE } from "../../graphql/query/PackageQuery";

import Faqs from "../../components/faqs/Faqs";
import LoctionCard from "../../components/cards/LoctionCard";
import useScrollToTop from "../../hooks/useScrollToTop";

import "./Home.css";
import Button from "../../components/common/Button";



const Home = () => {
  useScrollToTop()
  const navigate = useNavigate();
  const { data: lowPack, loading: lowPackLoading } = useQuery(LOW_PRICE, {
    fetchPolicy: "no-cache",
  });
  
  const [slidePackages, setSlidePackages] = useState([]);
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
  
  useEffect(() => {
    setSlidePackages(lowPack?.getLowPackage);
  }, [lowPack]);

  const handleBookNow = (data)=>{
    // console.log(data?.package_id,data?.title,data?.days,data?.visit_place,data?.price);
    
    navigate("/bookpackage",{state:data})
  }

  return (
    <div className="home-outer-container">
      
      <div className="home-slide-container">
      <h1>LOWEST PRICE PACKAGE</h1>
        {lowPackLoading ? (
          <div>Loading slides...</div>
        ) : slidePackages?.length > 0 ? (
          <Slide autoplay={true} duration={3000} transitionDuration={500} indicators={true}>
            {slidePackages?.map((data) => (
              <div key={data.package_id} className="slide-item">
                <img
                  src={data?.package_img}
                  alt={data?.title}
                  className="home-slide-img"
                />
                <div className="slide-overlay">
                  <p className="home-slide-title">{data?.title}</p>
                  <p className="home-slide-price">
                    &#8377; {data?.price} onwards
                  </p>
                  <div style={{width:"200px"}}>
                  <Button
                    className="home-slide-booknow-button"
                    onClick={()=>handleBookNow(data)}
                  
                    message="Book Now"
                  ></Button>
                  </div>
                </div>
              </div>
            ))}
          </Slide>
        ) : (
          <div>No packages available.</div>
        )}
      </div>
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
      <div id="home-faq-container">
        <Faqs faqs={faqs?.getFaqs} />
      </div>
    </div>
  );
};

export default Home;
