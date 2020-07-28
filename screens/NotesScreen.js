import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import BackImg from '../assets/back-workout.jpg';

const NotesScreen = props => {
    return (
        <View style={styles.container}>
            <ImageBackground source={BackImg} style={styles.image}>
                <View style={styles.innerContainer}>
                    <Text>Notes!</Text>
                </View>
            </ImageBackground>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    innerContainer: {
        paddingVertical: 30,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(238, 238, 238, 0.8)',
        height: '100%',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    image: {
        flex: 1
    }
})

export default NotesScreen;