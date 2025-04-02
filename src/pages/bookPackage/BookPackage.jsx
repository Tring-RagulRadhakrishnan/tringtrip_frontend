import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";

import { userContext } from "../../App";

import { ADD_BOOKING } from "../../graphql/mutation/BookingMutation";

import Button from "../../components/common/Button";
import ConfirmPopup from "../../components/confirmPopup/ConfirmPopup";
import useScrollToTop from "../../hooks/useScrollToTop";

import "./BookPackage.css";


const BookPackage = () => {
  useScrollToTop()
  const location = useLocation();
  const navigate = useNavigate();
  const packageDetail = location?.state;
  const [count, setCount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(packageDetail?.price);
  const [selectedDate, setSelectedDate] = useState("");
  const { userData } = useContext(userContext);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [addBooking] = useMutation(ADD_BOOKING, { fetchPolicy: "no-cache" });
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

  const confirmBooking = async () => {
    try {
      const response = await addBooking({
        variables: {
          package_id: packageDetail?.package_id,
          booking_date: selectedDate,
          count: count,
          total_price: totalPrice,
          user_id: userData?.user_id,
          email: userData?.email,
        },
      });
      if (response?.data?.addBooking) {
        setIsPopupOpen(false);
        toast.success("Booking Confirmed!");
        navigate('/home ')
      }
    } catch (err) {
      toast.error("signin to book package")
      // navigate("/signin")
      setIsPopupOpen(false)
      console.log("log from bookpackage", err);
    }
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
          <p className="package-location">
            📍 Location: {packageDetail?.location}
          </p>
          <p className="package-price">
            💰 Price: ₹{packageDetail?.price} / person
          </p>
          <p className="package-duration">⏳ Duration: {packageDetail?.days}</p>

          {selectedDate && (
            <p className="selected-date">📅 Selected Date: {selectedDate}</p>
          )}
          {/* <p className="package-description">{packageDetail?.}</p> */}
          <ul >
              <p>&#128203; Visit Places</p>
              {packageDetail.visit_place.split(",")?.map((place, index) => (
                <li key={index}>{place.trim()}</li>
              ))}
            </ul>

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
