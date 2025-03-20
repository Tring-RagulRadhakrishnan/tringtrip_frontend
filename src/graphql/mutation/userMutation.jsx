import { gql } from "@apollo/client";

export const CREATE_USER=gql`
    mutation createUser($name:String!,$email:String!,$phone_number:String!,$password:String!){
        createUser(name:$name,email:$email,phone_number:$phone_number,password:$password){
            name
            email
        }
    }   
` 