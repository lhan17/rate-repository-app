import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native'
import { Link } from 'react-router-native'
import Text from './Text'
import { useContext, useEffect, useState } from 'react'
import AuthStorageContext from '../contexts/AuthStorageContext'
import { useApolloClient, useQuery } from '@apollo/client'
import { ME } from '../graphql/queries'

const AppBarTab = () => {
    const styles = StyleSheet.create({
        text: {
            color: 'white',
            fontSize: 20,
            fontWeight: '700',
            margin: 20,
        },
        container: {
            flexDirection: 'row',
            justifyContent: 'space-around',
        },
    })
    const apolloClient = useApolloClient()
    const authStorage = useContext(AuthStorageContext)
    const handlePress = async () => {
        await authStorage.removeAccessToken()
        apolloClient.resetStore()
    }
    const { data, loading } = useQuery(ME, { fetchPolicy: 'cache-and-network' })

    if (loading) {
        return <ActivityIndicator />
    }

    return (
        <View style={styles.container}>
            <Link to='/'>
                <Text style={styles.text}>Repositories</Text>
            </Link>
            {data.me ? (
                <View style={styles.container}>
                    <Link to='/createReview'>
                        <Text style={styles.text}>Create a review</Text>
                    </Link>
                    <Link to='/myreviews'>
                        <Text style={styles.text}>My reviews</Text>
                    </Link>
                    <Pressable onPress={handlePress}>
                        <Text style={styles.text}>sign out</Text>
                    </Pressable>
                </View>
            ) : (
                <View style={styles.container}>
                    <Link to='/signin'>
                        <Text style={styles.text}>sign in</Text>
                    </Link>
                    <Link to='/signup'>
                        <Text style={styles.text}>sign up</Text>
                    </Link>
                </View>
            )}
        </View>
    )
}

export default AppBarTab
