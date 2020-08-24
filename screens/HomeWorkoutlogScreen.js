import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import BackImg from '../assets/back-workout.jpg';
import { fetchHomeWorkoutLog } from '../store/actions/actions';
import { SimpleLineIcons, Octicons, FontAwesome } from '@expo/vector-icons';
import ResistanceInput from '../components/resistanceInput';

const HomeWorkoutlogScreen = props => {
    const category = 'Homeworkout';
    const userId = '5dfecbdd39d8760019968d04';
    const mode = useSelector(state => state.fitlogReducer.theme);
    const selectedExercise = props.route.params ? props.route.params.exercise : null;
    const logs = useSelector(state => state.fitlogReducer.homeworkoutlogs);
    const maxRps = useSelector(state => state.fitlogReducer.maxRepsResistance);
    console.log('Max Reps: ', maxRps);
    const maxTime = useSelector(state => state.fitlogReducer.maxTime);
    const dispatch = useDispatch();
    const themeTextStyle =
        mode === 'light' ? styles.lightThemeText : styles.darkThemeText;
    const themeContainerStyle =
        mode === 'light' ? styles.lightContainer : styles.darkContainer;

    useEffect(() => {
        dispatch(fetchHomeWorkoutLog(category, selectedExercise, userId));
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* <ImageBackground source={BackImg} style={styles.image}> */}
            <View style={[styles.bg, themeContainerStyle]}>
                <ResistanceInput category={category} name={selectedExercise} logs={logs} />
                <View style={{ flexDirection: 'row' }}>
                    {maxRps && <View style={styles.max}>
                        <Text style={[styles.maxText, themeTextStyle]}>Max Reps</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={themeTextStyle}>{maxRps.count} reps</Text>
                        </View>
                    </View>}
                    {maxTime && <View style={styles.max}>
                        <Text style={[styles.maxText, themeTextStyle]}>Max Time</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={themeTextStyle}>{maxTime.time}</Text>
                        </View>
                    </View>}
                </View>
                <SafeAreaView style={{ flex: 1 }}>
                    <View>
                        <FlatList
                            data={logs}
                            renderItem={({ item }) =>
                                <View style={styles.logs}>
                                    {item.note ? <View style={{ flex: 1 }}><Octicons name="note" size={24} color={mode === 'light' ? 'black' : 'darkgrey'} onPress={() => addNotes(item)} /></View> :
                                        <View style={{ flex: 1 }}><SimpleLineIcons name="note" size={24} color={mode === 'light' ? 'black' : 'darkgrey'} onPress={() => addNotes(item)} /></View>}
                                    <View style={{ flex: 3 }}><Text style={themeTextStyle}>{item.date}</Text></View>
                                    <View style={{ flex: 1.5 }}><Text style={[{ textAlign: 'right' }, themeTextStyle]}>{item.count ? `${item.count} reps` : '-'}</Text></View>
                                    <View style={{ flex: 1.5 }}><Text style={[{ textAlign: 'right' }, themeTextStyle]}>{item.time != 0 ? item.time : '-'}</Text></View>
                                    <View style={{ flex: 1.5 }}><Text style={[{ textAlign: 'right' }, themeTextStyle]}>{item.weight ? `${item.weight} lbs` : '-'}</Text></View>
                                </View>}
                            keyExtractor={item => item._id}
                        />
                    </View>
                </SafeAreaView>
            </View>
            {/* </ImageBackground> */}
        </SafeAreaView>
    );
}

export const screenOptions = navigationData => {
    return {
        headerTitle: navigationData.route.params.exercise
    }
};

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
        paddingVertical: 15
    },
    label: {
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10
    },
    image: { flex: 1 },
    bg: {
        backgroundColor: 'rgba(238, 238, 238, 0.8)',
        height: '100%',
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    innerContainer: {
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    logs: {
        paddingVertical: 8,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: 'darkgrey'
    },
    max: {
        height: 50,
        textAlign: 'center',
        flex: 3
    },
    maxText: {
        fontWeight: 'bold',
        textAlign: 'center'
    },
    lightContainer: {
        backgroundColor: 'white',
    },
    darkContainer: {
        backgroundColor: '#2D2D2D',
    },
    lightThemeText: {
        color: 'black',
    },
    darkThemeText: {
        color: 'bisque',
    }
});

export default HomeWorkoutlogScreen;