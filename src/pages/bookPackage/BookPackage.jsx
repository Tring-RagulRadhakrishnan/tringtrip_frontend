import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import './BookPackage.css';
import Button from '../../components/common/Button';
import { toast } from 'react-toastify';
import StripePayment from '../../components/StripePayment';

const BookPackage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const packageDetail = location?.state;
    const [count, setCount] = useState(1);
    const [totalPrice, setTotalPrice] = useState(packageDetail?.price);
    const [selectedDate, setSelectedDate] = useState("");
    const userData = JSON.parse(localStorage.getItem("userData"));
    
    const bookingDetails = {
      userid: null,
      totalPrice,
      booking_date: selectedDate,
      count,
      email: null,
      packageid: packageDetail?.package_id,
    };
  
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
        const newCount = count - 1;
        setCount(newCount);
        setTotalPrice(packageDetail?.price * newCount);
      
    };
  
    const handleDateChange = (e) => {
      setSelectedDate(e.target.value);
    };
  
    const handleBookNow = () => {
        navigate('/payment')
      if (!selectedDate) {
        toast.error("Select a date to book");
        return;
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
            &#x1F4CD; Location: {packageDetail?.location}
          </p>
          <p className="package-price">
            &#128176; Price: <span>₹{packageDetail?.price} / person</span>
          </p>
          <p className="package-duration">
            &#128338; Duration: {packageDetail?.days}
          </p>
          {selectedDate && (
            <p className="selected-date">
              &#128198; Selected Date: {selectedDate}
            </p>
          )}
          <p className="package-description">{packageDetail?.description}</p>
          <div className="package-add-person-container">
            <p className="package-add-person-title">Add person: </p>
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
            <Button message="Book Now"/>
            
          </div>
        </div>
      </div>
      {/* <StripePayment amount={totalPrice} /> */}
    </div>
  )
}

export default BookPackage