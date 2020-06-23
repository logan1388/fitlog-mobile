import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { fetchExercises } from '../store/actions/actions';
import BackImg from '../assets/FITLOG.jpg';

const WorkoutScreen = props => {
    const selectedWorkout = props.navigation.getParam('workout');
    const workouts = useSelector(state => state.fitlogReducer.workouts);
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
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground source={BackImg} style={styles.image}>
                <FlatList
                    style={styles.innerContainer}
                    data={workouts}
                    renderItem={({ item }) => <Item title={item.name} category={item.category} />}
                    keyExtractor={item => item.name}
                />
            </ImageBackground>
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
        justifyContent: 'space-between',
        paddingVertical: 20
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
    innerContainer: {
        paddingVertical: 30,
        paddingHorizontal: 10,
        backgroundColor: 'rgba(238, 238, 238, 0.8)',
        height: '100%'
    }
});

export default WorkoutScreen;