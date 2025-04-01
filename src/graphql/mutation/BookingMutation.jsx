import { gql } from "@apollo/client";

export const ADD_BOOKING = gql`
mutation($package_id: Int!, $booking_date: String!, $count: Int!, $total_price: Int!, $user_id: Int!, $email: String!){
  addBooking(package_id: $package_id, booking_date: $booking_date, count: $count, total_price: $total_price, user_id: $user_id, email: $email)
}
`