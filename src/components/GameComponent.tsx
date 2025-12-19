import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, TextInput, Button, Keyboard} from 'react-native';
import {generateRandomGuessNumber} from "../utils/random";
import {GameProgress} from "../types/GameProgress";
import guessNumberComponent from "./GuessNumberComponent";
import CustomButton from "./CustomButton";


interface GameComponentProps {
    onConfirm: (inputNumber: string) => void;
    onReset: () => void;
    onGuess: (guessNumber: number) => void;
    gameProgress: GameProgress;
}

function GameComponent({onConfirm, onReset, onGuess, gameProgress}: GameComponentProps) {
    const [inputNumber, setInputNumber] = useState('');
    const [currentGuess, setCurrentGuess] = useState(0);
    const isInitialRender = useRef(true);
    const handleReset = () => {
        setInputNumber('');
        onReset();
    }
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(99);

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
        const newMin = currentGuess + 1;
        setMin(newMin);
        setCurrentGuess(generateRandomGuessNumber(newMin, max));
    }
    const handleHigherGuess = () => {
        const newMax = currentGuess - 1;
        setMax(prevState => prevState - 1);
        setCurrentGuess(generateRandomGuessNumber(min, newMax));
    }
    if (gameProgress != GameProgress.GUESSING) {
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
                    <CustomButton title="Confirm" onPress={handleConfirm} style={styles.button} textStyle={styles.text}/>

                    {/*<View style={styles.buttonContainer}>*/}
                    {/*    <Button color="#C71585" title="Reset" onPress={handleReset}/>*/}
                    {/*</View>*/}
                    {/*<View style={styles.buttonContainer}>*/}
                    {/*    <Button color="#C71585" title="Confirm" onPress={handleConfirm}/>*/}
                    {/*</View>*/}
                </View>
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.text}>Higher or lower?</Text>
            </View>
            <View style={styles.buttonLine}>
                <CustomButton title="-" onPress={handleLowerGuess} style={styles.button} textStyle={styles.text}/>
                <CustomButton title="-" onPress={handleLowerGuess} style={styles.button} textStyle={styles.text}/>


            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#800000',
        alignItems: 'center',
        borderRadius: 15,
        justifyContent: 'space-around',
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
    }
});

export default GameComponent;
