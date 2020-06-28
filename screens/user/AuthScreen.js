import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Card from '../../components/Card';
import BackImg from '../../assets/FITLOG.jpg';
import { useDispatch, useSelector } from 'react-redux';
import * as authActions from '../../store/actions/auth';

const AuthScreen = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [register, setRegister] = useState(false);
    const [fullName, setFullName] = useState('');
    const [userName, setUserName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [authMessage, setAuthMessage] = useState('');

    const dispatch = useDispatch();
    const signup = () => setRegister(true);
    const login = async () => {
        try {
            await dispatch(authActions.login(email, password));
            //const user = useSelector(state => state.fitlogReducer.user);
            //console.log('User ',user);
            props.navigation.navigate('Navigator');
        } catch (err) {

        }
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <ImageBackground source={BackImg} style={styles.image}>
                    <View style={styles.innerContainer}>
                        <Card style={styles.card}>
                            {!register && authMessage === '' &&
                                <React.Fragment>
                                    <View style={styles.inputContainer}>
                                        <View>
                                            <TextInput
                                                style={styles.textInput}
                                                placeholder='Email'
                                                onChangeText={text => setEmail(text)}
                                                value={email} />
                                        </View>
                                        <View style={{ paddingTop: 15 }}>
                                            <TextInput
                                                style={styles.textInput}
                                                placeholder='Password'
                                                onChangeText={text => setPassword(text)}
                                                value={password} />
                                        </View>
                                    </View>
                                    <View style={styles.buttonContainer}>
                                        <TouchableOpacity style={styles.button}
                                            disabled={!(email && password)}
                                            onPress={() => login()}>
                                            <Text style={{ fontWeight: 'bold' }}>Login</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.button}
                                            onPress={signup}>
                                            <Text style={{ fontWeight: 'bold' }}>Sign up</Text>
                                        </TouchableOpacity>
                                    </View>
                                </React.Fragment>}
                            {register &&
                                <React.Fragment>
                                    <View style={styles.inputContainer}>
                                        <View>
                                            <TextInput
                                                style={styles.textInput}
                                                placeholder='Full Name'
                                                onChangeText={text => setFullName(text)}
                                                value={fullName} />
                                        </View>
                                        <View style={{ paddingTop: 15 }}>
                                            <TextInput
                                                style={styles.textInput}
                                                placeholder='User Name'
                                                onChangeText={text => setUserName(text)}
                                                value={userName} />
                                        </View>
                                        <View style={{ paddingTop: 15 }}>
                                            <TextInput
                                                style={styles.textInput}
                                                placeholder='Email'
                                                onChangeText={text => setEmail(text)}
                                                value={email} />
                                        </View>
                                        <View style={{ paddingTop: 15 }}>
                                            <TextInput
                                                style={styles.textInput}
                                                placeholder='Password'
                                                onChangeText={text => setPassword(text)}
                                                value={password} />
                                        </View>
                                        <View style={{ paddingTop: 15 }}>
                                            <TextInput
                                                style={styles.textInput}
                                                placeholder='Confirm Password'
                                                onChangeText={text => setConfirmPassword(text)}
                                                value={confirmPassword} />
                                        </View>
                                    </View>
                                    <View style={{ paddingHorizontal: 30, marginTop: 30 }}>
                                        <TouchableOpacity style={styles.button} onPress={() => {
                                            setAuthMessage('Register success!');
                                            setRegister(false);
                                        }}>
                                            <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Register</Text>
                                        </TouchableOpacity>
                                    </View>
                                </React.Fragment>}
                            {authMessage !== '' &&
                                <React.Fragment>
                                    <View style={styles.inputContainer}>
                                        <View style={{ paddingTop: 15 }}>
                                            <Text style={{ textAlign: 'center' }}>{authMessage}</Text>
                                        </View>
                                    </View>
                                    <View style={{ paddingHorizontal: 30, marginTop: 30 }}>
                                        <TouchableOpacity style={styles.button}
                                            onPress={() => setAuthMessage('')}>
                                            <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Back to login</Text>
                                        </TouchableOpacity>
                                    </View>
                                </React.Fragment>}
                        </Card>
                    </View>
                </ImageBackground>
            </View>
        </TouchableWithoutFeedback>
    )
};

AuthScreen.navigationOptions = navigationData => {
    return {
        headerTitle: 'FITBOOK',
        headerTitleStyle: {
            textAlign: 'center'
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    image: { flex: 1 },
    innerContainer: {
        backgroundColor: 'rgba(238, 238, 238, 0.8)',
        height: '100%',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    card: {
        width: 300,
        maxWidth: '80%',
        justifyContent: 'space-between'
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold'
    },
    inputContainer: { width: '100%' },
    textInput: {
        height: 40,
        borderColor: 'grey',
        borderBottomWidth: 1
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 30,
        marginTop: 30
    },
    button: {
        backgroundColor: 'darkgrey',
        paddingHorizontal: 20,
        paddingVertical: 10
    }
});

export default AuthScreen;