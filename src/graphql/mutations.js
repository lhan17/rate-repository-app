import { gql } from '@apollo/client'

export const GET_ACCESS_TOKEN = gql`
    mutation Mutation($credentials: AuthenticateInput) {
        authenticate(credentials: $credentials) {
            accessToken
        }
    }
`
