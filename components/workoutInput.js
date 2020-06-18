import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, Text, View, Button, Picker } from 'react-native';
import { addExerciseLog } from '../store/actions';
import NumericInput from 'react-native-numeric-input'

const WorkoutInput = props => {
    const [weight, setWeight] = useState(0);
    const [unit, setUnit] = useState('lbs');
    const [count, setCount] = useState(0);
    const dispatch = useDispatch();

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
        setUnit('lbs');
        setCount(0);
    }

    addLog = (weight, unit, count) => {
        let timestamp = getTimestamp();
        let id = '5d7d6ce9e31bed84d467cdbe';
        let exerciseLog = {
            "userId": id,
            "category": props.category,
            "name": props.name,
            "date": timestamp,
            "weight": weight,
            "unit": unit,
            "count": count
        };
        resetInput();
        dispatch(addExerciseLog(exerciseLog, props.logs, props.workouts));
    }

    return (
        <View>
            <View style={{ flexDirection: 'row', paddingBottom: 10, justifyContent: 'center' }}>
                <View>
                    <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Weight</Text>
                    <NumericInput value={weight} onChange={value => setWeight(value)} />
                </View>
                <View style={{ paddingHorizontal: 20 }}>
                    <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Unit</Text>
                    <Picker
                        selectedValue={unit}
                        style={{ height: 50, width: 90, }}
                        onValueChange={(itemValue, itemIndex) => setUnit(itemValue)}>
                        <Picker.Item label="lbs" value="lbs" />
                        <Picker.Item label="kgs" value="kgs" />
                    </Picker>
                </View>
                <View>
                    <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Count</Text>
                    <NumericInput value={count} onChange={value => setCount(value)} />
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', paddingBottom: 15 }}>
                <Button
                    title='ADD'
                    disabled={!(weight>0 && count>0)}
                    onPress={() => addLog(weight, unit, count)} />
            </View>
        </View>
    )
}

export default WorkoutInput;