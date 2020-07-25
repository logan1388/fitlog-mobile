import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { workoutHistory, workoutSummary } from '../store/actions/actions';
import moment from 'moment';
import Card from '../components/Card';
import BackImg from '../assets/FITLOG.jpg';
import { ScrollView } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";
import Colors from '../constants/colors';

const data = [
    { quarter: 1, earnings: 13000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 19000 }
];

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
        <View style={{ width: '100%' }}>
            <ScrollView>
                {workoutHist.slice(0, 5).map(item =>
                    <View style={styles.logs} key={item.date}>
                        <View style={{ flex: 2 }}><Text>{item.category}</Text></View>
                        <View style={{ flex: 1 }}><Text style={{ textAlign: 'right' }}>{moment(item.date).format('MM/DD/YY')}</Text></View>
                    </View>)}
            </ScrollView>
        </View>

    const summary = workoutSumm.length > 0 &&
        <View style={{ width: '100%' }}>
            <ScrollView>
                {workoutSumm.map(item =>
                    <View style={styles.logs} key={item.date}>
                        <View style={{ flex: 2 }}><Text>{item.name}</Text></View>
                        <View style={{ flex: 1 }}><Text style={{ textAlign: 'right' }}>{item.weight} {item.unit}</Text></View>
                        <View style={{ flex: 1 }}><Text style={{ textAlign: 'right' }}>{item.count} reps</Text></View>
                    </View>)}
            </ScrollView>
        </View>

    const hightlights =
        <View style={{ width: '100%' }}>
            <ScrollView>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ paddingLeft : 5 }}><MaterialCommunityIcons name="dumbbell" size={25} color={Colors.headerBackground} /></View>
                    <View style={{ paddingHorizontal : 15 }}><Text style={{ fontSize: 16 }}>Max wt for Bench press</Text></View>
                </View>
            </ScrollView>
        </View>

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground source={BackImg} style={styles.image}>
                <ScrollView style={styles.container}>
                    <View style={styles.innerContainer}>
                        {workoutSumm && workoutSumm.length > 0 ?
                            <View style={{ width: '100%', alignItems: 'center' }}>
                                <View style={{ width: '100%' }}>
                                    <Text style={styles.text}>Today's Summary</Text>
                                    <Card style={styles.card}>{summary}</Card>
                                </View>
                            </View> :
                            <View style={{ width: '100%', alignItems: 'center', paddingHorizontal: 15, marginVertical: 30 }}>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => props.navigation.navigate('Workouts')} >
                                    <Text style={styles.buttonText}>Start Tracking</Text>
                                </TouchableOpacity>
                            </View>}
                        <View style={{ width: '100%', alignItems: 'center' }}>
                            <View style={{ width: '100%' }}>
                                <Text style={styles.text}>Last 5 Workouts</Text>
                                <Card style={styles.card}>{history}</Card>
                            </View>
                            <View style={{ width: '100%', marginTop: 20 }}>
                                <Text style={styles.text}>Highlights</Text>
                                <Card style={styles.highlightCard}>{hightlights}</Card>
                                <Card style={styles.highlightCard}>{hightlights}</Card>
                            </View>
                            <View style={{ marginVertical: 20 }}>
                                <VictoryChart width={350} theme={VictoryTheme.material}>
                                    <VictoryBar data={data} x="quarter" y="earnings" />
                                </VictoryChart>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
}

export const screenOptions = {
    headerTitle: 'FITBOOK',
    headerTitleStyle: {
        textAlign: 'center'
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(238, 238, 238, 0.8)'
    },
    image: { flex: 1 },
    innerContainer: {
        height: '100%',
        alignItems: 'center',
        paddingVertical: 30
    },
    card: {
        justifyContent: 'space-between',
        backgroundColor: 'darkgrey',
        marginHorizontal: 15,
        maxHeight: 250
    },
    highlightCard: {
        justifyContent: 'space-between',
        backgroundColor: 'darkgrey',
        marginHorizontal: 15,
        marginVertical: 10,
        padding: 15
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