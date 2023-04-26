import { gql } from '@apollo/client'

export const GET_REPOSITORIES = gql`
    query Repositories(
        $searchKeyword: String
        $orderBy: AllRepositoriesOrderBy
        $orderDirection: OrderDirection
    ) {
        repositories(
            searchKeyword: $searchKeyword
            orderBy: $orderBy
            orderDirection: $orderDirection
        ) {
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
                    url
                }
            }
        }
    }
`

export const ME = gql`
    query getCurrentUser($includeReviews: Boolean = false) {
        me {
            id
            username
            reviews @include(if: $includeReviews) {
                edges {
                    node {
                        text
                        user {
                            username
                            id
                        }
                        rating
                        createdAt
                        id
                        repositoryId
                        repository {
                            fullName
                        }
                    }
                }
            }
        }
    }
`

export const SINGLE_REPOSITORY = gql`
    query Query($repositoryId: ID!, $after: String) {
        repository(id: $repositoryId) {
            fullName
            description
            language
            forksCount
            ratingAverage
            reviewCount
            stargazersCount
            url
            ownerAvatarUrl
            reviews(first: 2, after: $after) {
                pageInfo {
                    endCursor
                    startCursor
                    hasNextPage
                }
                edges {
                    node {
                        text
                        user {
                            username
                            id
                        }
                        rating
                        createdAt
                        id
                        repositoryId
                    }
                    cursor
                }
            }
        }
    }
`
