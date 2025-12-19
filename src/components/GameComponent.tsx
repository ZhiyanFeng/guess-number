import React, {useEffect, useRef, useState} from 'react';
import {Keyboard, StyleSheet, Text, TextInput, View, Image} from 'react-native';
import {generateRandomGuessNumber} from "../utils/random";
import {GameProgress} from "../types/GameProgress";
import CustomButton from "./CustomButton";


interface GameComponentProps {
    onConfirm: (inputNumber: string) => void;
    onReset: () => void;
    onGuess: (guessNumber: number) => void;
    onDetectLie: (isVisible: boolean) => void;
    gameProgress: GameProgress;
    guessCount: number;
}

function GameComponent({onConfirm, onReset, onGuess, onDetectLie, gameProgress, guessCount}: GameComponentProps) {
    const [currentGuess, setCurrentGuess] = useState(0);
    const [inputNumber, setInputNumber] = useState('');
    const isInitialRender = useRef(true);
    const handleReset = () => {
        setInputNumber('');
        onReset();
    }
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(99);
    const gameOverImage = require('../../assets/smile.jpg');

    const handleConfirm = () => {
        Keyboard.dismiss();
        onConfirm(inputNumber);
        handleGuess();
    }
    useEffect(() => {
        if (isInitialRender.current) {
            isInitialRender.current = false; // Set to false after the first run
            return; // Skip the effect's logic for the initial render
        }
        onGuess(currentGuess);
    }, [currentGuess]);

    const handleGuess = () => {
        setCurrentGuess(generateRandomGuessNumber(min, max));
    }
    const handleLowerGuess = () => {
        if (currentGuess > Number(inputNumber)) {
            onDetectLie(true);
            return;
        }
        const newMin = currentGuess > min ? currentGuess + 1 : min;
        setMin(newMin);
        setCurrentGuess(generateRandomGuessNumber(newMin, max));
    }
    const handleHigherGuess = () => {
        if (currentGuess < Number(inputNumber)) {
            onDetectLie(true);
            return;
        }
        const newMax = currentGuess < max ? currentGuess - 1 : max;
        setMax(newMax);
        setCurrentGuess(generateRandomGuessNumber(min, newMax));
    }
    if (gameProgress == GameProgress.INPUTTING) {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.text}>Enter a Number</Text>
                </View>
                <TextInput style={styles.input} cursorColor='yellow'
                           placeholderTextColor="yellow"
                           onChangeText={setInputNumber}
                           value={inputNumber}
                />
                <View style={styles.buttonLine}>
                    <CustomButton title="Reset" onPress={handleReset} style={styles.button} textStyle={styles.text}/>
                    <CustomButton title="Confirm" onPress={handleConfirm} style={styles.button}
                                  textStyle={styles.text}/>
                </View>
            </View>
        );
    }
    if (gameProgress == GameProgress.GUESSING) {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.text}>Higher or lower?</Text>
                </View>
                <View style={styles.buttonLine}>
                    <CustomButton title="-" onPress={handleLowerGuess} style={styles.button} textStyle={styles.text}/>
                    <CustomButton title="+" onPress={handleHigherGuess} style={styles.button} textStyle={styles.text}/>
                </View>
            </View>

        );
    }
    if (gameProgress == GameProgress.GAMEOVER) {
        return (
            <View style={styles.gameOverContainer}>
                <Image source={gameOverImage}/>
                <View>
                    <Text style={styles.textStyle}>Your phone needed {guessCount} rounds
                        to guess the number {inputNumber}</Text>

                </View>
                <View>
                    <CustomButton title="Start New Game" onPress={handleReset} style={styles.button}
                                  textStyle={styles.text}/>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#800000',
        alignItems: 'center',
        borderRadius: 15,
        justifyContent: 'space-around',
    },
    gameOverContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
    },
    input: {
        width: 70,
        padding: 10,
        borderBottomColor: 'yellow', // Custom underline color
        borderBottomWidth: 2,
        fontSize: 50,
        color: 'yellow'

    },
    text: {
        fontSize: 18,
        color: 'white',
    },
    buttonLine: {
        width: '80%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    buttonContainer: {
        width: 100,
    },
    button: {
        borderRadius: 20,
        width: '40%',
        flexBasis: "auto",
        backgroundColor: '#eb4034'
    },
    textStyle: {
        color: "white",
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center',
    },
});

export default GameComponent;
