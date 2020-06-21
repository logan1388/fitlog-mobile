import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, Button, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { fetchExercises } from '../store/actions';

const WorkoutScreen = props => {
    const selectedWorkout = props.navigation.getParam('workout');
    const workouts = useSelector(state => state.workouts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchExercises(selectedWorkout));
    }, []);

    function Item({ title, category }) {
        return (
            <View style={styles.container}>
                {category.toLowerCase() == selectedWorkout.toLowerCase() ?
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => props.navigation.navigate({
                            routeName: 'Exercise', params: {
                                exercise: title,
                                workout: selectedWorkout
                            }
                        })} >
                        <Text style={styles.buttonText}>{title}</Text>
                        </TouchableOpacity> : null}
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={workouts}
                renderItem={({ item }) => <Item title={item.name} category={item.category} />}
                keyExtractor={item => item.name}
            />
        </SafeAreaView>
    );
}

WorkoutScreen.navigationOptions = navigationData => {
    const workoutTitle = navigationData.navigation.getParam('workout');
    return {
        headerTitle: workoutTitle
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

export default WorkoutScreen;