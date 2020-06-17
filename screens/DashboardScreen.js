import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const DashboardScreen = props => {
    const buttons = [
        { title: 'Chest', workout: 'chest' },
        { title: 'Leg', workout: 'legs' },
        { title: 'Shoulder', workout: 'shoulder' },
        { title: 'Back', workout: 'back' },
        { title: 'Biceps', workout: 'biceps' },
        { title: 'Triceps', workout: 'triceps' },
    ];

    return (
        <View style={styles.container}>
            {buttons.map((button, idx) => 
                <Button 
                    style={styles.button} 
                    key={idx} 
                    title={button.title.toUpperCase()} 
                    onPress={() => props.navigation.navigate({routeName: 'Workout', params: {
                        workout: button.title
                    }})} />)}
        </View>
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
        paddingVertical: 50,
        paddingHorizontal: 50
    },
    button: {
    }
});

export default DashboardScreen;