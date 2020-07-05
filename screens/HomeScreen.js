import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, ImageBackground, Button } from 'react-native';
import { workoutHistory, workoutSummary } from '../store/actions/actions';
import moment from 'moment';
import Card from '../components/Card';
import BackImg from '../assets/FITLOG.jpg';
import { ScrollView } from 'react-native-gesture-handler';

const HomeScreen = props => {
    const workoutHist = useSelector(state => state.fitlogReducer.workoutHistory);
    const workoutSumm = useSelector(state => state.fitlogReducer.workoutSummary);
    const dispatch = useDispatch();
    const userId = '5dfecbdd39d8760019968d04';

    useEffect(() => {
        dispatch(workoutSummary(userId));
        dispatch(workoutHistory(userId));
    }, []);

    const history = 
        <View style={{ width: '100%', maxHeight: 250 }}>
            <FlatList
                data={workoutHist.slice(0, 5)}
                renderItem={({ item }) =>
                    <View style={styles.logs}>
                        <View style={{ flex: 2 }}><Text>{item.category}</Text></View>
                        <View style={{ flex: 1 }}><Text style={{ textAlign: 'right' }}>{moment(item.date).format('MM/DD/YY')}</Text></View>
                    </View>}
                keyExtractor={item => item._id}
            />
        </View>

    const prevWorkout = workoutHist.length > 0 &&
        <View style={{ width: '100%' }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}><Text style={{ textAlign: 'center' }}>{workoutHist[0].category}</Text></View>
                <View style={{ flex: 1 }}><Text style={{ textAlign: 'center' }}>{moment(workoutHist[0].date).format('MM/DD/YY')}</Text></View>
            </View>
        </View>;

    const summary = workoutSumm.length > 0 &&
        <View style={{ width: '100%', maxHeight: 250 }}>
            <FlatList
                data={workoutSumm}
                renderItem={({ item }) =>
                    <View style={styles.logs}>
                        <View style={{ flex: 2 }}><Text>{item.name}</Text></View>
                        <View style={{ flex: 1 }}><Text style={{ textAlign: 'right' }}>{item.weight} {item.unit}</Text></View>
                        <View style={{ flex: 1 }}><Text style={{ textAlign: 'right' }}>{item.count} reps</Text></View>
                    </View>}
                keyExtractor={item => item.date}
            />
        </View>

    return (
        <ScrollView style={styles.container}>
            <ImageBackground source={BackImg} style={styles.image}>
                <View style={styles.innerContainer}>
                    <View style={{ width: '100%', alignItems: 'center' }}>
                        <View style={{ width: '100%' }}>
                            <Text style={styles.text}>Today's Summary</Text>
                            <Card style={styles.card}>{summary}</Card>
                        </View>
                    </View>
                    <View style={{ width: '100%', alignItems: 'center', paddingHorizontal: 15, marginVertical: 30 }}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => props.navigation.navigate('Workouts')} >
                            <Text style={styles.buttonText}>Start Tracking</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '100%', alignItems: 'center' }}>
                        <View style={{ width: '100%' }}>
                            <Text style={styles.text}>Previous Workout</Text>
                            <Card style={styles.card}>{prevWorkout}</Card>
                        </View>
                        <View style={{ width: '100%' }}>
                            <Text style={styles.text}>Last 5 Workouts</Text>
                            <Card style={styles.card}>{history}</Card>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </ScrollView>
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
        alignItems: 'center',
        paddingVertical: 30
    },
    card: {
        justifyContent: 'space-between',
        backgroundColor: 'darkgrey',
        marginHorizontal: 15
    },
    button: {
        backgroundColor: '#343a40',
        paddingVertical: 25,
        alignItems: 'center',
        width: '100%'
    },
    buttonText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        color: 'bisque'
    },
    text: { 
        fontWeight: 'bold', 
        textAlign: 'center', 
        marginVertical: 10, 
        fontSize: 18 
    },
    bg: {
        backgroundColor: 'rgba(238, 238, 238, 0.8)',
        height: '100%',
        paddingBottom: 20
    },
    logs: {
        paddingVertical: 8,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: 'black'
    }
});

export default HomeScreen;