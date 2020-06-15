import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const DashboardScreen = props => {
    const buttons = [
        { title: 'CHEST', workout: 'chest' },
        { title: 'LEGS', workout: 'legs' },
        { title: 'SHOULDER', workout: 'shoulder' },
        { title: 'BACK', workout: 'back' },
        { title: 'BICEPS', workout: 'biceps' },
        { title: 'TRICEPS', workout: 'triceps' },
    ];

    return (
        <View style={styles.container}>
            {buttons.map((button, idx) => 
                <Button 
                    style={styles.button} 
                    key={idx} 
                    title={button.title} 
                    onPress={() => props.navigation.navigate({routeName: 'Workout', params: {
                        workout: button.title
                    }})} />)}
        </View>
    );
}

DashboardScreen.navigationOptions = {
    headerTitle: 'FITLOG',
    headerStyle: {
        backgroundColor: '#343a40'
    },
    headerTintColor: 'bisque',
    headerTitleStyle: {
        textAlign: 'center'
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        paddingVertical: 50,
        paddingHorizontal: 50
    },
    button: {
    }
});

export default DashboardScreen;