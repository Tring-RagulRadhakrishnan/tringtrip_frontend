import { gql } from "@apollo/client";
    
export const GET_BEST_PACKAGE=gql`
query{
    getBestPackage{
        location
        tp_id
        image
    }
}`

export const GET_VISA_PACKAGE=gql`
query{
    getVisaFreePackage{
        location
        tp_id
        image
    }
}`

export const GET_INTERNATIONAL_PACKAGE=gql`
query{
    getInternationalPackage{
        location
        tp_id
        image
    }
}`
