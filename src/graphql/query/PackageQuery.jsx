import { gql } from "@apollo/client";

export const GET_PACKAGE_LOCATION = gql`
    query getPackageByLocation($location:String!){
        getPackageByLocation(location:$location){
            package_id
            package_img
            title
            days
            visit_place
            price
        }
    }
`