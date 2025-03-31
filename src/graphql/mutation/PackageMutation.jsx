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

export const UPDATE_PACKAGE = gql`
  mutation (
    $package_img: String!
    $title: String!
    $days: String!
    $visit_place: String!
    $price: Int!
    $location: String!
    $package_id: Int!
  ) {
    updatePackage(
      package_img: $package_img
      title: $title
      days: $days
      visit_place: $visit_place
      price: $price
      location: $location
      package_id: $package_id
    )
  }
`;

export const DELETE_PACKAGE = gql`
  mutation($package_id: Int!){
  deletePackage(package_id: $package_id)
}
`