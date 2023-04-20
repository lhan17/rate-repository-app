import { gql } from '@apollo/client'

export const GET_REPOSITORIES = gql`
    query Repositories {
        repositories {
            edges {
                node {
                    id
                    name
                    ownerName
                    fullName
                    reviewCount
                    ratingAverage
                    forksCount
                    stargazersCount
                    description
                    language
                    ownerAvatarUrl
                }
            }
        }
    }
`

export const ME = gql`
    query Query {
        me {
            id
            username
        }
    }
`
