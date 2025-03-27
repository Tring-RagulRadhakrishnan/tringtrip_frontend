import { gql } from "@apollo/client";

export const GET_PACKAGE_LOCATION = gql`
  query getPackageByLocation($location: String!) {
    getPackageByLocation(location: $location) {
      package_id
      package_img
      title
      days
      visit_place
      price
    }
  }
`;
export const GET_ALL_PACKAGES = gql`
    query getAllPackages($page: Int!){
        getAllPackages(page: $page)
        {
            package_id
            package_img
            title
            days
            visit_place
            price
        }
    }
`;
export const GET_PACKAGE_SEARCH = gql`
  query getPackageBySearch($searchTerm:String!){
    getPackageBySearch(searchTerm:$searchTerm)
    {
      package_id
      package_img
      title
      days
      visit_place
      price
    }
  }

`
