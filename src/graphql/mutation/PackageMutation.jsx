import { gql } from "@apollo/client";


export const CREATE_PACKAGE = gql`
  mutation CreatePackage(
    $packageImg: String!
    $title: String!
    $days: String!
    $visitPlace: String!
    $price: Int!
    $location: String!
  ) {
    createPackage(
      package_img: $packageImg
      title: $title
      days: $days
      visit_place: $visitPlace
      price: $price
      location: $location
    )
  }
`;