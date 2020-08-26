import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const RadioButtons = props => {
    const mode = useSelector(state => state.fitlogReducer.theme);
    const themeTextStyle = mode === 'light' ? styles.lightThemeText : styles.darkThemeText;
    const themeButtonStyle = mode === 'light' ? styles.lightThemeButton : styles.darkThemeButton;
    const themeCircleStyle = mode === 'light' ? styles.lightThemeCircle : styles.darkThemeCircle;

    return (
        <View>
            {props.options.map(item => {
                return (
                    <View key={item.value} style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.circle, themeButtonStyle]}
                            onPress={() => props.setUnit(item.value)}>
                            {props.unit === item.value && <View style={[styles.checkedCircle, themeCircleStyle]} />}
                        </TouchableOpacity>
                        <Text style={themeTextStyle}>{item.label}</Text>
                    </View>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    circle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5
    },
    checkedCircle: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: 'black',
    },
    lightThemeText: { color: 'black' },
    darkThemeText: { color: 'bisque' },
    lightThemeButton: { borderColor: 'black' },
    darkThemeButton: { borderColor: 'darkgrey' },
    lightThemeCircle: { backgroundColor: 'black' },
    darkThemeCircle: { backgroundColor: 'darkgrey' }
});

export default RadioButtons;