import { Pressable, StyleSheet, View } from 'react-native'
import { Link } from 'react-router-native'
import Text from './Text'

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
    return (
        <View style={styles.container}>
            <Link to='/'>
                <Text style={styles.text}>Repositories</Text>
            </Link>
            <Link to='/signin'>
                <Text style={styles.text}>sign in</Text>
            </Link>
        </View>
    )
}

export default AppBarTab
