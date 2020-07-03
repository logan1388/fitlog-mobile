import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, ImageBackground, Button } from 'react-native';
import { workoutHistory } from '../store/actions/actions';
import moment from 'moment';
import Card from '../components/Card';
import BackImg from '../assets/FITLOG.jpg';

const HomeScreen = props => {
    const workoutHist = useSelector(state => state.fitlogReducer.workoutHistory);
    const dispatch = useDispatch();
    const userId = '5dfecbdd39d8760019968d04';

    useEffect(() => {
        dispatch(workoutHistory(userId));
    }, []);

    const history = workoutHist.slice(0, 5).map(wh =>
        <View key={wh._id} style={{ width: '100%' }}>
            <Text>{wh.category} - {moment(wh.date).format('MM/DD/YY')}</Text>
        </View>
    );

    const prevWorkout = workoutHist.length > 0 &&
        <View style={{ width: '100%' }}>
            <Text>{workoutHist[0].category} - {moment(workoutHist[0].date).format('MM/DD/YY')}</Text>
        </View>;

    return (
        <View style={styles.container}>
            <ImageBackground source={BackImg} style={styles.image}>
                <View style={styles.innerContainer}>
                    <View style={{ width: '100%', alignItems: 'center' }}>
                        <View style={{ width: '100%' }}>
                            <Text style={{ fontWeight: 'bold', textAlign: 'center', marginVertical: 10 }}>Previous Workout</Text>
                            <Card style={styles.card}>{prevWorkout}</Card>
                        </View>
                        <View style={{ width: '100%' }}>
                            <Text style={{ fontWeight: 'bold', textAlign: 'center', marginVertical: 10 }}>Last 5 Workouts</Text>
                            <Card style={styles.card}>{history}</Card>
                        </View>
                    </View>
                    <View style={{ width: '100%', alignItems: 'center', paddingHorizontal: 15 }}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => props.navigation.navigate('Workouts')} >
                            <Text style={styles.buttonText}>Today's workout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}

export const screenOptions = { 
    headerTitle: 'FITBOOK',
    headerTitleStyle: {
        textAlign: 'center'
    }
};


const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    container: { flex: 1 },
    image: { flex: 1 },
    innerContainer: {
        backgroundColor: 'rgba(238, 238, 238, 0.8)',
        height: '100%',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    card: {
        justifyContent: 'space-between',
        backgroundColor: 'darkgrey',
        marginHorizontal: 15
    },
    button: {
        backgroundColor: 'darkgrey',
        paddingVertical: 25,
        alignItems: 'center',
        width: '100%'
    },
    buttonText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16
    },
    image: { flex: 1 },
    bg: {
        backgroundColor: 'rgba(238, 238, 238, 0.8)',
        height: '100%',
        paddingBottom: 20
    }
});

export default HomeScreen;