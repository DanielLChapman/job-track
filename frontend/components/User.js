import { useQuery } from "@apollo/client";
import gql from "graphql-tag";


export const CURRENT_USER_QUERY = gql`
    query {
        authenticatedItem {
            ... on User {
                id 
                name
                jobs {
                    name
                    publishedAt
                    applicationDate
                    status
                    salaryExpectation
                    interviews {
                        date 
                        type 
                    }
                    notes
                    id
                }
            }
        }
    }
`;

export function useUser() {
    const {data, error, loading} = useQuery(CURRENT_USER_QUERY);
    return data?.authenticatedItem;
}

