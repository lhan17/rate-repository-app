import { useQuery } from '@apollo/client'
import { SINGLE_REPOSITORY } from '../graphql/queries'

const useRepositories = (variables) => {
    const { data, loading, fetchMore, ...result } = useQuery(
        SINGLE_REPOSITORY,
        variables
    )

    const handleFetchMore = () => {
        const canFetchMore =
            !loading && data?.repository.reviews.pageInfo.hasNextPage

        if (!canFetchMore) {
            return
        }

        fetchMore({
            variables: {
                after: data.repository.reviews.pageInfo.endCursor,
                ...variables,
            },
        })
    }

    return {
        repository: data?.repository,
        fetchMore: handleFetchMore,
        loading,
        ...result,
    }
}
export default useRepositories
