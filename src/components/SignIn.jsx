import { Pressable, StyleSheet, View } from 'react-native'
import { Formik, useField } from 'formik'
import * as yup from 'yup'
import Text from './Text'

import TextInput from './TextInput'

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

const FormikTextInput = ({ name, ...props }) => {
    const [field, meta, helpers] = useField(name)
    const showError = meta.touched && meta.error
    const inputContainerStyle = showError
        ? styles.inputContainerError
        : styles.inputContainer
    return (
        <>
            <View style={inputContainerStyle}>
                {props.icon && (
                    <Text style={styles.inputIcon}>{props.icon}</Text>
                )}
                <TextInput
                    onChangeText={(value) => helpers.setValue(value)}
                    onBlur={() => helpers.setTouched(true)}
                    value={field.value}
                    error={showError}
                    style={styles.input}
                    {...props}
                />
            </View>
            {showError && <Text style={styles.errorText}>{meta.error}</Text>}
        </>
    )
}

const UsernameForm = ({ onSubmit }) => {
    const [usernameField, usernameMeta, usernameHelpers] = useField('username')
    const [passwordField, passwordMeta, passwordHelpers] = useField('password')

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
    const onSubmit = (values) => {
        const username = values.username
        const password = values.password
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
