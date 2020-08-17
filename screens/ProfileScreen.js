import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from '../store/actions/actions';

const Profile = props => {
    const [isEnabled, setIsEnabled] = useState(false);
    const mode = useSelector(state => state.fitlogReducer.theme);
    const dispatch = useDispatch();
    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
        dispatch(setTheme(isEnabled ? 'light' : 'dark'));
    }
    const themeTextStyle =
        mode === 'light' ? styles.lightThemeText : styles.darkThemeText;
    const themeButtonTextStyle =
        mode === 'light' ? styles.lightThemeButtonText : styles.darkThemeButtonText;
    const themeContainerStyle =
        mode === 'light' ? styles.lightContainer : styles.darkContainer;
    const themeButtonStyle =
        mode === 'light' ? styles.lightThemeButton : styles.darkThemeButton;

    return (
        <View style={[styles.container, themeContainerStyle]}>
            <View style={[styles.innerContainer]}>
                <Text style={[{ fontSize: 18 }, themeTextStyle]}>Dark Theme</Text>
                <Switch
                    trackColor={{ false: "darkgrey", true: "lightgrey" }}
                    thumbColor={isEnabled ? "steelblue" : "#f4f3f4"}
                    ios_backgroundColor="darkgrey"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
            <View style={{ width: '100%', alignItems: 'center', paddingHorizontal: 15, marginVertical: 30 }}>
                <TouchableOpacity
                    style={[styles.button, themeButtonStyle]}
                    onPress={() => dispatch(logout())} >
                    <Text style={[styles.buttonText, themeButtonTextStyle]}>Log out</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    button: {
        paddingVertical: 25,
        alignItems: 'center',
        width: '100%'
    },
    innerContainer: {
        flexDirection: 'row',
        marginVertical: 30,
        marginHorizontal: 20,
        justifyContent: 'space-between'
    },
    buttonText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18
    },
    lightContainer: {
        backgroundColor: 'white',
    },
    darkContainer: {
        backgroundColor: '#2D2D2D',
    },
    lightThemeText: {
        color: '#343a40',
    },
    darkThemeText: {
        color: 'bisque',
    },
    lightThemeButtonText: {
        color: 'bisque',
    },
    darkThemeButtonText: {
        color: 'black',
    },
    lightThemeButton: {
        backgroundColor: '#343a40',
    },
    darkThemeButton: {
        backgroundColor: 'darkgrey',
    }
});

export default Profile;