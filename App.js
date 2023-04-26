import { StatusBar } from 'react-native'
import { ApolloProvider } from '@apollo/client'
import Main from './src/components/Main'
import { NativeRouter } from 'react-router-native'
import createApolloClient from './src/utils/apolloClient'
import AuthStorage from './src/utils/authStorage'
import AuthStorageContext from './src/contexts/AuthStorageContext'
import { Provider as PaperProvider } from 'react-native-paper'

const authStorage = new AuthStorage()
const apolloClient = createApolloClient(authStorage)

const App = () => {
    return (
        <>
            <NativeRouter>
                <ApolloProvider client={apolloClient}>
                    <PaperProvider>
                        <AuthStorageContext.Provider value={authStorage}>
                            <Main />
                        </AuthStorageContext.Provider>
                    </PaperProvider>
                </ApolloProvider>
            </NativeRouter>
            <StatusBar style='auto' />
        </>
    )
}

export default App
