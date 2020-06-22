import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground } from 'react-native';
import Card from '../../components/Card';
import BackImg from '../../assets/FITLOG.jpg';

const AuthScreen = props => {
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');

    return (
        <View style={styles.container}>
            <ImageBackground source={BackImg} style={styles.image}>
                <View style={styles.innerContainer}>
                    <Card style={styles.card}>
                        <View style={styles.inputContainer}>
                            <View>
                                <Text>Email</Text>
                                <TextInput
                                    style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1 }}
                                    placeholder='Email'
                                    onChangeText={text => setInput1(text)}
                                    value={input1} />
                            </View>
                            <View style={{ paddingTop: 15 }}>
                                <Text>Password</Text>
                                <TextInput
                                    style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1 }}
                                    placeholder='Password'
                                    onChangeText={text => setInput2(text)}
                                    value={input2} />
                            </View>
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button title='Login' />
                            <Button title='Sign up' />
                        </View>
                    </Card>
                </View>
            </ImageBackground>
        </View>
    )
};

AuthScreen.navigationOptions = navigationData => {
    return {
        headerTitle: 'FITLOG',
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
    image: {
        flex: 1
    },
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
    inputContainer: {
        width: '100%'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 30,
        marginTop: 30
    }
});

export default AuthScreen;