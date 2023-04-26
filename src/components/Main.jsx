import Constants from 'expo-constants'
import { Text, StyleSheet, View } from 'react-native'
import RepositoryList, { RepositoryListContainer } from './RepositoryList'
import AppBar from './AppBar'
import { Route, Routes, Navigate } from 'react-router-native'
import SignIn from './SignIn'
import RepositoryItem from './RepositoryItem'
import RepositoryItemView from './RepositoryItemView'
import CreateReview from './CreateReview'
import CreateUser from './SignUp'
import MyReviews from './MyReviews'
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: '#e1e4e8',
    },
})

const Main = () => {
    return (
        <View style={styles.container}>
            <AppBar />
            <Routes>
                <Route path='/' element={<RepositoryList />} exact />
                <Route path='/signin' element={<SignIn />} exact />
                <Route path='*' element={<Navigate to='/' replace />} />
                <Route path='/:id' element={<RepositoryItemView />} />
                <Route path='/createReview' element={<CreateReview />} />
                <Route path='/signup' element={<CreateUser />} />
                <Route path='/myreviews' element={<MyReviews />} />
            </Routes>
        </View>
    )
}

export default Main
