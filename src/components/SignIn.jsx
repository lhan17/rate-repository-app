import { Pressable, StyleSheet, View } from 'react-native'
import { Formik, useField } from 'formik'
import * as yup from 'yup'
import Text from './Text'

import TextInput from './TextInput'
import useSignIn from '../hooks/useSignIn'
import FormikTextInput from './FormikTextInput'
import { useAuthStorage } from '../hooks/useAuthStorage'
import { useNavigate } from 'react-router-native'
import { ApolloClient } from '@apollo/client'

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
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
        fontWeight: 'bold',
    },
    errorText: {
        marginTop: 5,
        color: 'red',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginVertical: 10,
    },
    inputContainerError: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#d73a4a',
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginVertical: 10,
    },
    input: {
        flex: 1,
        fontSize: 18,
        marginLeft: 10,
        marginTop: 10,
        paddingVertical: 0,
        color: '#333',
    },
    inputIcon: {
        fontSize: 20,
        color: '#333',
    },
})

const validationSchema = yup.object().shape({
    username: yup.string().required('username is required'),
    password: yup.string().required('password is required'),
})

const initialValues = {
    username: '',
    password: '',
}

const UsernameForm = ({ onSubmit }) => {
    return (
        <View style={styles.container}>
            <FormikTextInput name='username' placeholder='Username' icon='👤' />
            <FormikTextInput
                name='password'
                placeholder='Password'
                secureTextEntry={true}
                icon='🔒'
            />
            <Pressable onPress={onSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Sign in</Text>
            </Pressable>
        </View>
    )
}

const SignIn = () => {
    const [signIn, result] = useSignIn()
    const authStorage = useAuthStorage()
    const navigate = useNavigate()
    const onSubmit = async (values) => {
        const { username, password } = values

        try {
            const { data } = await signIn({ username, password })
            navigate('/')
        } catch (e) {
            console.log('errorr', e)
        }
    }

    return (
        <View>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {({ handleSubmit }) => <UsernameForm onSubmit={handleSubmit} />}
            </Formik>
        </View>
    )
}

export default SignIn
