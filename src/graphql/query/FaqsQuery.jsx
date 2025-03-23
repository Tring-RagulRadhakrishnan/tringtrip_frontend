import { gql } from "@apollo/client";
export const GET_FAQS=gql`
    query{
        getFaqs {
        faq_title
        content
        }
}

`