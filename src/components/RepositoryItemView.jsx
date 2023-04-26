import { useQuery } from '@apollo/client'
import { SINGLE_REPOSITORY } from '../graphql/queries'
import {
    ActivityIndicator,
    FlatList,
    Pressable,
    StyleSheet,
    View,
} from 'react-native'
import RepositoryItem from './RepositoryItem'
import { useParams } from 'react-router-native'
import ReviewItem from './ReviewItem'
import useRepositories from '../hooks/useRepositories'
import { print } from 'graphql/language/printer'

const RepositoryItemView = () => {
    const styles = StyleSheet.create({
        separator: {
            height: 10,
        },
    })
    const ItemSeparator = () => <View style={styles.separator} />
    const id = useParams().id
    const { repository, loading, fetchMore } = useRepositories({
        variables: { repositoryId: id },
        fetchPolicy: 'cache-and-network',
    })

    if (loading) {
        return <ActivityIndicator />
    }
    const repo = repository

    const reviewss = repo.reviews.edges.map((i) => i.node)

    const onEndReach = () => {
        fetchMore()
    }

    return (
        <FlatList
            data={reviewss}
            renderItem={({ item }) => <ReviewItem review={item} />}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={ItemSeparator}
            ListHeaderComponent={() => (
                <RepositoryItem repo={repo} showButton={true} />
            )}
            onEndReached={onEndReach}
            onEndReachedThreshold={0.5}
        />
    )
}

export default RepositoryItemView
