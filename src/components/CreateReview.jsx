import { Pressable, StyleSheet, View } from 'react-native'
import FormikTextInput from './FormikTextInput'
import Text from './Text'
import { Formik } from 'formik'
import { useMutation } from '@apollo/client'
import { CREATE_REVIEW } from '../graphql/mutations'
import { useNavigate } from 'react-router-native'
import * as yup from 'yup'

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'blue',
        padding: 15,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    container: {
        marginHorizontal: 20,
    },
})

const ReviewForm = ({ onSubmit }) => {
    return (
        <View>
            <FormikTextInput
                name='ownerName'
                placeholder={'Repository owner name'}
            />
            <FormikTextInput
                name='repositoryName'
                placeholder={'Repository name'}
            />
            <FormikTextInput
                name='rating'
                placeholder={'Rating between 0 and 100'}
            />
            <FormikTextInput
                name='text'
                placeholder={'Write your review here'}
            />
            <Pressable onPress={onSubmit} style={styles.button}>
                <Text style={styles.buttonText}>create</Text>
            </Pressable>
        </View>
    )
}

const initialValues = {
    ownerName: '',
    rating: '',
    repositoryName: '',
    text: '',
}

const validationSchema = yup.object().shape({
    ownerName: yup.string().required('username is required'),
    repositoryName: yup.string().required('password is required'),
    rating: yup.number().required('rating is required'),
})

const CreateReview = () => {
    const navigate = useNavigate()
    const [createReview] = useMutation(CREATE_REVIEW)

    const onSubmit = async (values) => {
        const { ownerName, repositoryName, rating, text } = values
        try {
            const { data } = await createReview({
                variables: {
                    review: {
                        ownerName,
                        repositoryName,
                        rating: parseInt(rating, 10),
                        text,
                    },
                },
            })
            navigate(`/${data.createReview.repository.id}`)
        } catch (e) {
            console.log(e.message)
        }
    }
    return (
        <View style={styles.container}>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
            </Formik>
        </View>
    )
}

export default CreateReview
