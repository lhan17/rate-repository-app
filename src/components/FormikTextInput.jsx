import { StyleSheet, View } from 'react-native'
import Text from './Text'
import TextInput from './TextInput'
import { useField } from 'formik'

const styles = StyleSheet.create({
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
})

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

export default FormikTextInput
