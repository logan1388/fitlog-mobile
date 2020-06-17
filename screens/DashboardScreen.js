import React from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, FlatList } from 'react-native';

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
                <Button
                    title={title.toUpperCase()}
                    onPress={() => props.navigation.navigate({
                        routeName: 'Workout', params: {
                            workout: title
                        }
                    })} />
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
    headerTitle: 'FITLOG',
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
    }
});

export default DashboardScreen;