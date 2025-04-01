import { gql } from "@apollo/client";

export const CREATE_USER=gql`
    mutation createUser($name:String!,$email:String!,$phone_number:String!,$password:String!){
        createUser(name:$name,email:$email,phone_number:$phone_number,password:$password){
            name
            email
        }
    }   
` 

export const UPDATE_USER = gql`
    mutation($name: String!, $phone_number: String!, $user_id: Int!){
        updateUser(name: $name, phone_number: $phone_number, user_id: $user_id){
            user_id
            name
            email
            phone_number
        }
    }
`
export const LOGOUT = gql`
    mutation{
        logout
    }
`