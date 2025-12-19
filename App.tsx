import {StatusBar} from 'expo-status-bar';
import {ImageBackground, StyleSheet, View} from 'react-native';
import HeadComponent from "./src/components/HeadComponent";
import GameComponent from "./src/components/GameComponent";
import GuessNumberComponent from "./src/components/GuessNumberComponent";
import ListGuessComponent from "./src/components/ListGuessComponent";
import FootComponent from "./src/components/FootComponent";
import {useEffect, useState} from "react";
import {GameProgress} from "./src/types/GameProgress";

function App() {
    const backGroundImg = require("./assets/images/dice.jpg");

    interface guessNumber {
        id: number;
        value: number;
    }

    const [gameProgress, setGameProgress] = useState<GameProgress>(GameProgress.INPUTTING);
    const [inputNumber, setInputNumber] = useState('');
    const [guessNumbers, setGuessNumbers] = useState<guessNumber[]>([]);
    const [currentGuess, setCurrentGuess] = useState(0);
    const isguess = true;


    useEffect(() => {
        console.log(guessNumbers);
    }, [guessNumbers]);

    useEffect(() => {
        console.log(gameProgress);
    }, [gameProgress]);

    function updateInputNumber(input: string) {
        console.log(guessNumbers);
        setInputNumber(inputNumber);
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
    }

    function resetGame(): void {
        setGameProgress(GameProgress.INPUTTING);
        setInputNumber('0');
        setGuessNumbers([]);
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
                                   onGuess={updateGuessNumber} gameProgress={gameProgress}/>
                </View>
                {
                    gameProgress == GameProgress.GUESSING ? <View style={styles.guessList}>
                        <ListGuessComponent guessNumbers={guessNumbers}/></View> : null
                }
                <View style={styles.foot}>
                    <FootComponent/>
                </View>
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
            flexBasis: 100, width: "90%", backgroundColor: "blue",
        },
        image: {
            flex: 1,
        },
        header: {
            alignItems: "center", justifyContent: "center", width: '60%', flexBasis: 70, backgroundColor: 'green',
        },
        gameBody: {
            width: '80%',
            borderRadius: 10,
            justifyContent: 'space-around',
        },
        inputting: {
            width: '80%',
            justifyContent: 'space-around',
            flexBasis: 200,
        },
        guessing: {
            width: '80%',
            height: 100,
            flexBasis: 'auto',
        },

        guessList: {
            flexGrow: 1,
            alignSelf:
                'flex-start',
            width:
                '100%',
        }
        ,
        foot: {
            backgroundColor: 'red',
        }
    })
;

export default App;

