import { gql } from "@apollo/client";


export const GET_USER=gql`
    query getUser($email:String!,$password:String!){
        getUser(email:$email,password:$password){
        user_id
        name
        }
    }
`