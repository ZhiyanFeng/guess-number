// ./components/CustomButton.js
import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomButton = ({ onPress, title, style, textStyle }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, style]} activeOpacity={0.8}>
            <Text style={[styles.text, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#007AFF', // Default background color
        padding: 10,
        borderRadius: 5, // Default border radius
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    text: {
        color: 'white', // Default text color
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CustomButton;
