import { gql } from "@apollo/client";


export const CREATE_PACKAGE = gql`
  mutation createPackage(
    $package_img: String!
    $title: String!
    $days: String!
    $visit_place: String!
    $price: Int!
    $location: String!
  ) {
    createPackage(
      package_img: $package_img
      title: $title
      days: $days
      visit_place: $visit_place
      price: $price
      location: $location
    )
  }
`;