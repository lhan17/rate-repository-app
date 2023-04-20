import { FlatList, View, StyleSheet } from 'react-native'
import RepositoryItem from './RepositoryItem'
import useRepositories from '../hooks/useRepositories'
import { useQuery } from '@apollo/client'
import { GET_REPOSITORIES } from '../graphql/queries'

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
})

const ItemSeparator = () => <View style={styles.separator} />

const RepositoryList = () => {
    const styles = StyleSheet.create({
        container: {
            padding: 8,
            marginBottom: 120,
        },
    })

    const { data, error, loading } = useQuery(GET_REPOSITORIES, {
        fetchPolicy: 'cache-and-network',
    })

    const repositoryNodes = !loading
        ? data.repositories.edges.map((edge) => edge.node)
        : []

    return (
        <View style={styles.container}>
            <FlatList
                data={repositoryNodes}
                ItemSeparatorComponent={ItemSeparator}
                renderItem={({ item }) => <RepositoryItem repo={item} />}
                keyExtractor={(item) => item.id}
                // other props
            />
        </View>
    )
}

export default RepositoryList
