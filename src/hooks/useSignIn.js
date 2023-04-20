import { useMutation } from '@apollo/client'
import { GET_ACCESS_TOKEN } from '../graphql/mutations'
import { useAuthStorage } from './useAuthStorage'
import { useContext } from 'react'
import AuthStorageContext from '../contexts/AuthStorageContext'
import { useApolloClient } from '@apollo/client'

const useSignIn = () => {
    const [mutate, result] = useMutation(GET_ACCESS_TOKEN)
    const authStorage = useContext(AuthStorageContext)
    const apolloClient = useApolloClient()

    const signIn = async ({ username, password }) => {
        try {
            const response = await mutate({
                variables: { credentials: { username, password } },
            })

            await authStorage.setAccessToken(
                response.data.authenticate.accessToken
            )
            console.log(authStorage.getAccessToken())
            apolloClient.resetStore()
            return response
        } catch (e) {
            console.log(e.message)
        }
    }

    return [signIn, result]
}

export default useSignIn
