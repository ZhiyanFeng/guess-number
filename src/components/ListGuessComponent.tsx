import React from 'react';
import {View, Text, StyleSheet, FlatList, ListRenderItem} from 'react-native';
import {SafeAreaView } from "react-native-safe-area-context";


interface GuessNumber {
    id: number;
    value: number;
}

interface ListGuessComponentProps {
    guessNumbers: GuessNumber[];
}


const ListGuessComponent = ({guessNumbers}: ListGuessComponentProps) => {
        const renderItem: ListRenderItem<GuessNumber> = ({item}) =>
        {
            return (<View style={styles.itemRow}>
                <Text style={styles.title}>Guess NO. {item.id}: {item.value}</Text>
            </View>);
        }

        return (
                <FlatList
                    data={guessNumbers}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    style={styles.listContainer}
                />
        );
    }
;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    list: {
        flex: 1,
        borderRadius: 15
    },
    listContainer: {
        flex: 1, // Ensures the list can grow to fill the screen
        display: 'flex',
        alignSelf: 'stretch',
    },
    title: {
        fontSize: 20,
    },
    itemRow: {
        flex: 1,
        flexDirection: 'row', // Arrange items horizontally
        justifyContent: 'space-between', // Space elements evenly
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16,
        backgroundColor: '#fcec03', // Example: Add a background color to the whole list area
        borderRadius: 10,
        // Add shadows/elevation as needed for platform-specific styling
    },
    itemText: {
        fontSize: 18,
    },
});

export default ListGuessComponent;
