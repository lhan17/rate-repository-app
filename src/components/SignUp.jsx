import { Pressable, StyleSheet, View } from 'react-native'
import FormikTextInput from './FormikTextInput'
import Text from './Text'
import { Formik } from 'formik'
import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-native'
import * as yup from 'yup'
import { CREATE_USER } from '../graphql/mutations'
import useSignIn from '../hooks/useSignIn'

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

const SignUpForm = ({ onSubmit }) => {
    return (
        <View>
            <FormikTextInput name='username' placeholder={'Username'} />
            <FormikTextInput
                name='password'
                placeholder={'Password'}
                secureTextEntry={true}
            />
            <FormikTextInput
                name='passwordConfirm'
                placeholder={'Password Confirmation'}
                secureTextEntry={true}
            />
            <Pressable onPress={onSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Sign up</Text>
            </Pressable>
        </View>
    )
}

const initialValues = {
    username: '',
    password: '',
    passwordConfirm: '',
}

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .required('username is required')
        .min(1, 'The length of the username should be between 1 and 30')
        .max(30, 'The length of the username should be between 1 and 30'),
    password: yup
        .string()
        .required('password is required')
        .min(5, 'The length of the password should be between 5 and 50')
        .max(50, 'The length of the password should be between 5 and 50'),
    passwordConfirm: yup
        .string()
        .oneOf([yup.ref('password'), null])
        .required('Password confirm is required'),
})

const CreateUser = () => {
    const navigate = useNavigate()
    const [createUser] = useMutation(CREATE_USER)
    const [signIn, result] = useSignIn()

    const onSubmit = async (values) => {
        const { username, password, passwordConfirm } = values
        try {
            const { data } = await createUser({
                variables: {
                    user: {
                        username,
                        password,
                    },
                },
            })
            await signIn({ username, password })
            navigate(`/`)
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
                {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
            </Formik>
        </View>
    )
}

export default CreateUser
