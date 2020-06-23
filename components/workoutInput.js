import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import { addExerciseLog } from '../store/actions/actions';
import NumericInput from 'react-native-numeric-input';

const WorkoutInput = props => {
    const [weight, setWeight] = useState(0);
    const [unit, setUnit] = useState(0);
    const [count, setCount] = useState(0);
    const dispatch = useDispatch();
    let unitRadio = [
        { label: 'lbs', value: 0 },
        { label: 'kgs', value: 1 }
    ];

    const getTimestamp = () => {
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        var hours = new Date().getHours();
        var min = new Date().getMinutes();
        var sec = new Date().getSeconds();
        if (date < 10) date = '0' + date;
        if (month < 10) month = '0' + month;
        if (hours < 10) hours = '0' + hours;
        if (min < 10) min = '0' + min;
        if (sec < 10) sec = '0' + sec;
        let timestamp = month + '/' + date + '/' + year + ' ' + hours + ':' + min + ':' + sec;
        return timestamp;
    }

    const resetInput = () => {
        setWeight(0);
        setUnit(0);
        setCount(0);
    }

    addLog = (weight, unit, count) => {
        let timestamp = getTimestamp();
        let id = '5dfecbdd39d8760019968d04';
        let exerciseLog = {
            "userId": id,
            "category": props.category,
            "name": props.name,
            "date": timestamp,
            "weight": weight,
            "unit": unit === 0 ? 'lbs' : 'kgs',
            "count": count
        };
        resetInput();
        dispatch(addExerciseLog(exerciseLog, props.logs, props.workouts));
    }

    return (
        <View>
            <View style={{ flexDirection: 'row', paddingBottom: 15, justifyContent: 'center' }}>
                <View>
                    <Text style={styles.label}>Weight</Text>
                    <NumericInput
                        initValue={weight}
                        value={weight}
                        onChange={value => setWeight(value)}
                        type='up-down'
                        totalHeight={60}
                        borderColor='darkgrey'
                        upDownButtonsBackgroundColor='darkgrey' />
                </View>
                <View style={{ marginHorizontal: 20 }}>
                    <Text style={styles.label}>Unit</Text>
                    <RadioForm
                        radio_props={unitRadio}
                        initial={unit}
                        buttonColor='black'
                        selectedButtonColor='black'
                        onPress={(value) => setUnit(value)} />
                </View>
                <View>
                    <Text style={styles.label}>Count</Text>
                    <NumericInput
                        initValue={count}
                        value={count}
                        onChange={value => setCount(value)}
                        type='up-down'
                        totalHeight={60}
                        borderColor='darkgrey'
                        upDownButtonsBackgroundColor='darkgrey' />
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', paddingBottom: 15 }}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => weight > 0 && count > 0 && addLog(weight, unit, count)}>
                    <Text style={{ fontWeight: 'bold' }}>ADD</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10
    },
    button: {
        backgroundColor: 'darkgrey',
        paddingHorizontal: 20,
        paddingVertical: 10
    }
})

export default WorkoutInput;