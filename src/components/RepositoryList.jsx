import { FlatList, View, StyleSheet, TextInput } from 'react-native'
import RepositoryItem from './RepositoryItem'
import useRepositories from '../hooks/useRepositories'
import { useQuery } from '@apollo/client'
import { GET_REPOSITORIES } from '../graphql/queries'
import { Picker } from '@react-native-picker/picker'
import React, { useEffect, useState } from 'react'
import { Searchbar } from 'react-native-paper'
import { useDebounce } from 'use-debounce'

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
})

const ItemSeparator = () => <View style={styles.separator} />

const SearchComponent = ({
    order,
    setOrder,
    refetch,
    searchQuery,
    setSearchQuery,
}) => {
    const [text, setText] = useState('')
    const debounced = useDebounce(text, 1000)
    const handleChange = (newQuery) => {
        setSearchQuery(newQuery)
        setText(newQuery)
        // console.log('searchQuery: ', searchQuery)
        // console.log('newQuery:', newQuery)
        setOrder({ ...order, searchKeyword: newQuery })
    }

    useEffect(() => {
        refetch(order)
    }, [order])

    return (
        <Searchbar
            placeholder='Search'
            onChangeText={handleChange}
            value={searchQuery}
        />
    )
}

const Order = ({ order, setOrder, refetch, searchQuery, setSearchQuery }) => {
    return (
        <View>
            <SearchComponent
                order={order}
                setOrder={setOrder}
                refetch={refetch}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <Picker
                selectedValue={order}
                onValueChange={(itemValue, itemIndex) => {
                    setOrder(itemValue)
                    refetch(itemValue)
                }}
            >
                <Picker.Item label='Select an item' value={null} />
                <Picker.Item
                    label='Latest repositories'
                    value={{
                        ...order,
                        orderBy: 'CREATED_AT',
                    }}
                />
                <Picker.Item
                    label='Highest rated repositories'
                    value={{
                        ...order,
                        orderBy: 'RATING_AVERAGE',
                        orderDirection: 'DESC',
                    }}
                />
                <Picker.Item
                    label='Lowest rated repositories'
                    value={{
                        ...order,
                        orderBy: 'RATING_AVERAGE',
                        orderDirection: 'ASC',
                    }}
                />
            </Picker>
        </View>
    )
}

const RepositoryList = () => {
    const [order, setOrder] = useState({
        orderBy: 'CREATED_AT',
        orderDirection: 'DESC',
        searchKeyword: '',
    })
    const [searchQuery, setSearchQuery] = useState('')
    const styles = StyleSheet.create({
        container: {
            padding: 8,
            marginBottom: 120,
        },
    })

    const { data, error, loading, refetch } = useQuery(GET_REPOSITORIES, {
        fetchPolicy: 'cache-and-network',
    })

    const repositoryNodes = !loading
        ? data.repositories.edges.map((edge) => edge.node)
        : []

    return (
        <View style={styles.container}>
            <RepositoryListContainer
                repositoryNodes={repositoryNodes}
                order={order}
                setOrder={setOrder}
                refetch={refetch}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            {/* <FlatList
                data={repositoryNodes}
                ItemSeparatorComponent={ItemSeparator}
                renderItem={({ item }) => <RepositoryItem repo={item} />}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={() => (
                    <Order
                        order={order}
                        setOrder={setOrder}
                        refetch={refetch}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />
                )}
                // other props
            /> */}
        </View>
    )
}

export class RepositoryListContainer extends React.Component {
    renderHeader = () => {
        // this.props contains the component's props
        const props = this.props

        return (
            <Order
                order={props.order}
                setOrder={props.setOrder}
                refetch={props.refetch}
                searchQuery={props.searchQuery}
                setSearchQuery={props.setSearchQuery}
            />
        )
    }

    render() {
        return (
            <FlatList
                data={this.props.repositoryNodes}
                ItemSeparatorComponent={ItemSeparator}
                renderItem={({ item }) => <RepositoryItem repo={item} />}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={this.renderHeader}
            />
        )
    }
}

export default RepositoryList
