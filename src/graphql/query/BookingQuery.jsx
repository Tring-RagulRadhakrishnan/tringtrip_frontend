import { gql } from "@apollo/client";

export const GET_BOOKINGS = gql`
query{
  getBookingByUser {
  package_id
  booking_id
  booking_date
  count
   total_price
   user_id
   package_img
    title
    days
    visit_place
    price
    location
   
    
  }
}
`;
