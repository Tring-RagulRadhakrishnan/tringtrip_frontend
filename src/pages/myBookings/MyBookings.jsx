import React, { useContext } from "react";
import { useQuery } from "@apollo/client";

import { userContext } from "../../App";
import { GET_BOOKINGS } from "../../graphql/query/BookingQuery";
import NoPackage from '../../assets/notFound.png'

import "./MyBookings.css";

const MyBookings = () => {
  const { userData } = useContext(userContext);
  console.log('userData', userData)

  const { data, loading, error } = useQuery(GET_BOOKINGS, {
    fetchPolicy: "no-cache",
    
  });
console.log("data",data?.getBookingByUser);

  if (loading) return <p>Loading bookings...</p>;
  if (data?.getBookingByUser?.length==null)
    return (
      <div className="no-package-container">
        <img src={NoPackage} alt="No Package" className="no-package-image" />
        <p className="no-package-message">No upcoming Travel</p>
      </div>
    );
  if (error) return <p>Error loading bookings</p>;

  return (
    <div className="my-bookings-container">
      <h1 className="my-bookings-title">My Bookings</h1>
      <div className="bookings-grid">
        {data?.getBookingByUser?.map((booking) => (
          <div className="booking-card" key={booking.booking_id}>
            <img
              src={booking.package_img}
              alt={booking.title}
              className="booking-img"
            />
            <h3 className="package-title">{booking.title}</h3>
            <p className="package-location">📍 {booking.location}</p>
            <p>
              <strong>📅 Date:</strong> {booking.booking_date}
            </p>
            <p>
              <strong>🕒 Duration:</strong> {booking.days}
            </p>
            <p>
              <strong>👥 People:</strong> {booking.count}
            </p>
            <p>
              <strong>💰 Total:</strong> ₹{booking.total_price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
