import { Alert, Pressable, StyleSheet, View } from 'react-native'
import Text from './Text'
import { useNavigate } from 'react-router-native'
import { useMutation } from '@apollo/client'
import { DELETE_REVIEW } from '../graphql/mutations'
import { ME } from '../graphql/queries'

const MyReviewItem = ({ review, refetch }) => {
    const navigate = useNavigate()
    const [deleteReview] = useMutation(DELETE_REVIEW)

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
        button: {
            backgroundColor: 'blue',
            padding: 15,
            borderRadius: 5,
            marginTop: 20,
        },
        buttonText: {
            color: 'white',
            textAlign: 'center',
            backgroundColor: 'blue',
            padding: 10,
            alignSelf: 'center',
            margin: 5,
            borderRadius: 10,
            width: 180,
            marginBottom: 5,
        },
        buttonTextE: {
            color: 'white',
            textAlign: 'center',
            backgroundColor: 'red',
            padding: 10,
            alignSelf: 'center',
            margin: 5,
            borderRadius: 10,
            width: 180,
            marginBottom: 5,
        },
    })

    const onPress = () => {
        console.log(review.repositoryId)
        navigate(`/${review.repositoryId}`)
    }

    const onDelete = async () => {
        console.log(review.id)
        Alert.alert(
            'Delete review',
            'Are you sure you want to delete this review?',
            [
                { text: 'cancel', onPress: () => console.log('not deleted') },
                {
                    text: 'delete',
                    onPress: async () => {
                        await deleteReview({
                            variables: { deleteReviewId: review.id },
                        })
                        refetch()
                    },
                },
            ]
        )
    }

    return (
        <View style={styles.infoContainer}>
            <View style={styles.reviewContainer}>
                <Text style={styles.rating}>{review.rating}</Text>
                <View style={styles.infoContainer}>
                    <Text style={styles.username}>
                        {review.repository.fullName}
                    </Text>
                    <Text style={styles.create}>
                        {formatDate(review.createdAt)}
                    </Text>
                    <Text style={styles.text}>{review.text}</Text>
                </View>
            </View>
            <View style={styles.reviewContainer}>
                <Pressable
                    onPress={() => {
                        onPress()
                    }}
                >
                    <Text style={styles.buttonText}>View repository</Text>
                </Pressable>
                <Pressable
                    onPress={() => {
                        onDelete(review.repositoryId)
                    }}
                >
                    <Text style={styles.buttonTextE}>Delete review</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default MyReviewItem
