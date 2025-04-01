import { gql } from "@apollo/client";


export const LOGIN=gql`
    query login($email:String!,$password:String!){
        login(email:$email,password:$password){
        user_id
        name
        }
    }
`
export const GET_USER = gql`
    query{
        getUser{
            user_id
            name
            email
            phone_number
            role
        }
    } 
`
