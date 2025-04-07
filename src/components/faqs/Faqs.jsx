import React from "react";
import {
  FaPaperPlane,
  LiaUserEditSolid,
  MdFreeCancellation,
  GrUpdate,
  RiRefund2Line,
  MdModeOfTravel,
} from "../../utils/Icons";
import "./Faqs.css";

const Faqs = ({ faqs }) => {

  const icons = [<FaPaperPlane/>,<LiaUserEditSolid/>,<MdFreeCancellation/>,<GrUpdate/>,<RiRefund2Line/>,<MdModeOfTravel/>]

  return (
    <div className="faq-outer-container">
      <div className="faq-header-container">
        <p>FAQs</p>
        <p className="faq-header-title">Ask us anything</p>
        <p>Have any questions? We're here to assist you.</p>
      </div>
      <div className="faq-content-body">
        {faqs?.map((faq,index) => (
          <div>
            {icons[index]}
            <h2 className="faq-content-title">{faq.faq_title}</h2>
            <p>{faq.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faqs;
