import { View, StyleSheet, Pressable } from 'react-native'
import {
    fireEvent,
    render,
    screen,
    waitFor,
} from '@testing-library/react-native'
import { Formik } from 'formik'
import * as yup from 'yup'
import FormikTextInput from '../../components/FormikTextInput'
import Text from '../../components/Text'

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

const SignIn = ({ onSubmit }) => {
    const handleSubmit = ({ username, password }) => {
        onSubmit({ username, password })
    }
    return (
        <View>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                {({ handleSubmit }) => <UsernameForm onSubmit={handleSubmit} />}
            </Formik>
        </View>
    )
}

describe('SignIn', () => {
    describe('SignInContainer', () => {
        it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
            // render the SignInContainer component, fill the text inputs and press the submit button
            const onSubmit = jest.fn()
            render(<SignIn onSubmit={onSubmit} />)
            fireEvent.changeText(
                screen.getByPlaceholderText('Username'),
                'kalle'
            )
            fireEvent.changeText(
                screen.getByPlaceholderText('Password'),
                'password'
            )
            fireEvent.press(screen.getByText('Sign in'))

            await waitFor(() => {
                // expect the onSubmit function to have been called once and with the correct arguments
                expect(onSubmit).toHaveBeenCalledTimes(1)
                expect(onSubmit).toHaveBeenCalledWith({
                    password: 'password',
                    username: 'kalle',
                })
            })
        })
    })
})
