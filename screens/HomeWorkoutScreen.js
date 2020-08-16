import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import BackImg from '../assets/FITLOG.jpg';

const HomeWorkoutScreen = props => {
    const buttons = [
        { title: 'Pushup', workout: 'pushups' },
        { title: 'Pullup', workout: 'pullups' },
        { title: 'Dips', workout: 'dips' },
        { title: 'Burpee', workout: 'burpee' },
        { title: 'Plank', workout: 'plank' },
        { title: 'Lunges', workout: 'lunges' },
    ];

    function Item({ title }) {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        props.navigation.navigate('HomeWorkoutlog', {
                            exercise: title
                        });
                    }} >
                    <Text style={styles.buttonText}>{title.toUpperCase()}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground source={BackImg} style={styles.image}>
                <View style={styles.bg}>
                    <FlatList
                        data={buttons}
                        renderItem={({ item }) => <Item title={item.title} />}
                        keyExtractor={item => item.title}
                    />
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

export const screenOptions = { headerTitle: 'Workouts' };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    button: {
        backgroundColor: 'darkgrey',
        paddingVertical: 25,
        alignItems: 'center'
    },
    buttonText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16
    },
    image: {
        flex: 1
    },
    bg: {
        backgroundColor: 'rgba(238, 238, 238, 0.8)',
        height: '100%',
        paddingBottom: 20
    }
});

export default HomeWorkoutScreen;