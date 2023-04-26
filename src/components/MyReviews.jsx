import { useQuery } from '@apollo/client'
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native'
import { ME } from '../graphql/queries'
import MyReviewItem from './MyReviewItem'

const ItemSeparator = () => <View style={styles.separator} />

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
})

const MyReviews = () => {
    const { data, loading, refetch } = useQuery(ME, {
        variables: {
            includeReviews: true,
        },
        fetchPolicy: 'cache-and-network',
    })
    if (loading) {
        return <ActivityIndicator />
    }

    const reviews = data.me
        ? data.me.reviews.edges.map((edge) => edge.node)
        : []

    return (
        <FlatList
            data={reviews}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => (
                <MyReviewItem review={item} refetch={refetch} />
            )}
            keyExtractor={(item) => item.id}
        />
    )
}

export default MyReviews
