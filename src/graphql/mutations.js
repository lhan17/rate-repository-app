import { gql } from '@apollo/client'

export const GET_ACCESS_TOKEN = gql`
    mutation Mutation($credentials: AuthenticateInput) {
        authenticate(credentials: $credentials) {
            accessToken
        }
    }
`

export const CREATE_REVIEW = gql`
    mutation Mutation($review: CreateReviewInput) {
        createReview(review: $review) {
            id
            rating
            repository {
                id
                name
            }
            text
        }
    }
`

export const DELETE_REVIEW = gql`
    mutation Mutation($deleteReviewId: ID!) {
        deleteReview(id: $deleteReviewId)
    }
`

export const CREATE_USER = gql`
    mutation Mutation($user: CreateUserInput) {
        createUser(user: $user) {
            username
        }
    }
`
