import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./BookPackage.css";
import Button from "../../components/common/Button";
import { toast } from "react-toastify";
import { userContext } from "../../App";
import ConfirmPopup from "../../components/confirmPopup/ConfirmPopup";

const BookPackage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const packageDetail = location?.state;
  const [count, setCount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(packageDetail?.price);
  const [selectedDate, setSelectedDate] = useState("");
  const { userData } = useContext(userContext);
  const [isPopupOpen, setIsPopupOpen] = useState(false); 

  const today = new Date();
  today.setDate(today.getDate() + 4);
  const minDate = today.toISOString().split("T")[0];

  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 2);
  const maxDateString = maxDate.toISOString().split("T")[0];

  const handleAddBtn = () => {
    if (count < 50) {
      const newCount = count + 1;
      setCount(newCount);
      setTotalPrice(packageDetail?.price * newCount);
    }
  };

  const handleDropBtn = () => {
    if (count > 1) {
      const newCount = count - 1;
      setCount(newCount);
      setTotalPrice(packageDetail?.price * newCount);
    }
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleBookNow = () => {
    if (!selectedDate) {
      toast.error("Select a date to book");
      return;
    }
    setIsPopupOpen(true); 
  };

  const confirmBooking = () => {
    console.log("Booking Details:");
    console.log("Date:", selectedDate);
    console.log("Count:", count);
    console.log("Total Price:", totalPrice);
    console.log("User ID:", userData?.user_id);
    console.log("Package ID:", packageDetail?.package_id);
    console.log("Email:", userData?.email);

    setIsPopupOpen(false);
    toast.success("Booking Confirmed!");
  };

  return (
    <div className="book-package-container">
      <div className="book-package-card">
        <div className="package-image-container">
          <img
            src={packageDetail?.package_img}
            alt={packageDetail?.title}
            className="package-image"
          />
        </div>
        <div className="package-detail-container">
          <h1 className="title">Book Your Package</h1>
          <h2 className="package-title">{packageDetail?.title}</h2>
          <p className="package-location">📍 Location: {packageDetail?.location}</p>
          <p className="package-price">💰 Price: ₹{packageDetail?.price} / person</p>
          <p className="package-duration">⏳ Duration: {packageDetail?.days}</p>

          {selectedDate && <p className="selected-date">📅 Selected Date: {selectedDate}</p>}
          <p className="package-description">{packageDetail?.description}</p>

          <div className="package-add-person-container">
            <p className="package-add-person-title">Add person:</p>
            <div className="add-person-button-container">
              <button onClick={handleDropBtn}>-</button>
              <p>{count}</p>
              <button onClick={handleAddBtn}>+</button>
            </div>
          </div>

          <div className="date-picker-container">
            <label htmlFor="date-picker" className="date-label">
              Select Booking Date:
            </label>
            <input
              id="date-picker"
              type="date"
              min={minDate}
              max={maxDateString}
              value={selectedDate}
              onChange={handleDateChange}
              className="date-input"
            />
          </div>

          <h2 className="total-price">Total Price: ₹{totalPrice}</h2>
          <div type="button" onClick={handleBookNow}>
            <Button message="Book Now" />
          </div>
        </div>
      </div>

      <ConfirmPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onConfirm={confirmBooking}
        message={`Confirm your booking for ${packageDetail?.title} on ${selectedDate}?`}
      />
    </div>
  );
};

export default BookPackage;
