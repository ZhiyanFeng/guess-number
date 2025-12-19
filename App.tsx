import {StatusBar} from 'expo-status-bar';
import {ImageBackground, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import HeadComponent from "./src/components/HeadComponent";
import GameComponent from "./src/components/GameComponent";
import GuessNumberComponent from "./src/components/GuessNumberComponent";
import ListGuessComponent from "./src/components/ListGuessComponent";
import React, {useEffect, useState} from "react";
import {GameProgress} from "./src/types/GameProgress";
import CustomButton from "./src/components/CustomButton";

function App() {
    const backGroundImg = require("./assets/images/dice.jpg");

    interface guessNumber {
        id: number;
        value: number;
    }

    const [gameProgress, setGameProgress] = useState<GameProgress>(GameProgress.INPUTTING);
    const [inputNumber, setInputNumber] = useState('100');
    const [guessNumbers, setGuessNumbers] = useState<guessNumber[]>([]);
    const [currentGuess, setCurrentGuess] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [guessCount, setGuessCount] = useState(0);


    useEffect(() => {
        console.log('Current guess',currentGuess);
        console.log('Input number', inputNumber);
        if(currentGuess === Number(inputNumber)){
            setGameProgress(GameProgress.GAMEOVER);
        }
    }, [currentGuess]);


    function updateInputNumber(input: string) {
        setInputNumber(inputNumber=> input);
        updateGameProgress();
    }

    function updateGameProgress() {
        if (currentGuess.toString() === inputNumber) {
            setGameProgress(GameProgress.GAMEOVER);
            return;
        }
        setGameProgress(GameProgress.GUESSING);
    }

    function updateGuessNumber(newGuess: number): void {
        setCurrentGuess(newGuess);
        const newGuessId = guessNumbers.length + 1;
        const newGuessNumber = {id: newGuessId, value: newGuess};
        setGuessNumbers(prevGuessNumbers => [newGuessNumber, ...guessNumbers]);
        setGuessCount(prevState=>prevState +1);
    }

    function resetGame(): void {
        setGameProgress(GameProgress.INPUTTING);
        setInputNumber('100');
        setGuessNumbers([]);
        setGuessCount(0);
        setCurrentGuess(0);
    }
    function changeModalVisible(isVisible:boolean): void {
        setModalVisible(isVisible);
    }

    return (
        <ImageBackground
            source={backGroundImg}
            style={styles.image}
            resizeMode="cover" // Other options: 'contain', 'stretch', 'repeat', 'center'
        >

            <View style={styles.container}>
                <View style={styles.header}>
                    <HeadComponent progress={gameProgress}/>
                </View>
                {
                    gameProgress == GameProgress.GUESSING ? <View style={styles.guessNumberInfo}>
                        <GuessNumberComponent currentGuess={currentGuess}/>
                    </View> : null
                }
                <View style={[styles.inputting, gameProgress==GameProgress.GUESSING && styles.guessing]}>
                    <GameComponent onConfirm={updateInputNumber} onReset={resetGame}
                                   onGuess={updateGuessNumber} gameProgress={gameProgress}
                                   onDetectLie={changeModalVisible} guessCount={guessCount}/>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        changeModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>You are lying!</Text>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => changeModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>X</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
                {
                    gameProgress == GameProgress.GUESSING ? <View style={styles.guessList}>
                        <ListGuessComponent guessNumbers={guessNumbers}/></View> : null
                }

            </View>

            <StatusBar style="auto"/>

        </ImageBackground>

    );
}


const styles = StyleSheet.create({
        container: {
            display: "flex",
            marginTop: 100,
            flex: 1,
            alignItems: "center",
            gap: 10
        },
        guessNumberInfo: {
            flexBasis: 100, width: "80%",
        },
        image: {
            flex: 1,
        },
        header: {
            alignItems: "center", justifyContent: "center", width: '100%', flexBasis: 150,
        },
        gameBody: {
            width: '80%',
            borderRadius: 10,
            justifyContent: 'space-around',
        },
        inputting: {
            width: '80%',
            justifyContent: 'space-around',
            height: 200,
            flexBasis: 'auto',
        },
        guessing: {
            width: '80%',
            height: 100,
            flexBasis: 'auto',
        },

        guessList: {
            flexGrow: 1,
            width: '90%',
        }
        ,
        foot: {
            backgroundColor: 'red',
        },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        width: '40%',
        flexBasis: "auto",
        backgroundColor: '#eb4034'
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },

    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    })
;

export default App;

