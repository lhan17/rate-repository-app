import { StyleSheet, View } from 'react-native'
import Text from './Text'

const ReviewItem = ({ review }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const year = date.getFullYear().toString()

        return `${day}/${month}/${year}`
    }

    const styles = StyleSheet.create({
        reviewContainer: {
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: 'white',
        },
        infoContainer: {
            display: 'flex',
            flexDirection: 'column',
        },
        rating: {
            color: 'blue',
            borderWidth: 2,
            borderColor: 'blue',
            borderRadius: 50,
            width: 50,
            height: 50,
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 'bold',
            margin: 10,
            lineHeight: 50,
        },
        username: {
            fontWeight: 'bold',
            fontSize: 20,
        },
        create: {
            color: 'grey',
            marginTop: 5,
            marginBottom: 5,
            fontSize: 20,
        },
        text: {
            fontSize: 16,
            marginBottom: 10,
            width: 300,
        },
    })
    return (
        <View style={styles.reviewContainer}>
            <Text style={styles.rating}>{review.rating}</Text>
            <View style={styles.infoContainer}>
                <Text style={styles.username}>{review.user.username}</Text>
                <Text style={styles.create}>
                    {formatDate(review.createdAt)}
                </Text>
                <Text style={styles.text}>{review.text}</Text>
            </View>
        </View>
    )
}

export default ReviewItem
