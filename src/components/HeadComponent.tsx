import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {GameProgress} from "../types/GameProgress";


type HeadComponentProps = {
    progress: GameProgress;
};

const HeadComponent = (props: HeadComponentProps )=>
{
    const stepInfo = ['Guess my number'
        ,"Opponent's guess", "Game Over"];
    const info = stepInfo[props.progress];

        if(props.progress == GameProgress.INPUTTING){
            return  (<View style={styles.container1}>
                <Text style={styles.text}>{info}</Text>
            </View>);
        }
        if(props.progress == GameProgress.GUESSING){
            return ( <View style={styles.container2}>
                <Text style={styles.text}>{info}</Text>
            </View>);
        }
        if(props.progress == GameProgress.OVER){
            return ( <View style={styles.container3}>
                <Text style={styles.text}>{info}</Text>
            </View>);
        }

};

const baseContainer = {borderColor: 'white',
    borderWidth: 5, }

const styles = StyleSheet.create({
    container1: {
        ...baseContainer,
        width: '80%',
    },
    container2: {
        ...baseContainer,
        width: '100%',
    },
    container3: {
        ...baseContainer,
    },
    text: {
        textAlign: "center",
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default HeadComponent;
