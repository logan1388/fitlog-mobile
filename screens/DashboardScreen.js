import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';

const DashboardScreen = props => {
    const buttons = [
        { title: 'Chest', workout: 'chest' },
        { title: 'Leg', workout: 'legs' },
        { title: 'Shoulder', workout: 'shoulder' },
        { title: 'Back', workout: 'back' },
        { title: 'Biceps', workout: 'biceps' },
        { title: 'Triceps', workout: 'triceps' },
    ];

    function Item({ title }) {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => props.navigation.navigate({
                        routeName: 'Workout', params: {
                            workout: title
                        }
                    })} >
                    <Text style={styles.buttonText}>{title.toUpperCase()}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={buttons}
                renderItem={({ item }) => <Item title={item.title} />}
                keyExtractor={item => item.title}
            />
        </SafeAreaView>
    );
}

DashboardScreen.navigationOptions = {
    headerTitle: 'FITBOOK',
    headerTitleStyle: {
        textAlign: 'center'
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
    }
});

export default DashboardScreen;