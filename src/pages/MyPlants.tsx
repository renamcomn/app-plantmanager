import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    FlatList
} from 'react-native'

import { Header } from "../components/Header";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

import waterdrop from '../assets/waterdrop.png';

export function MyPlants() {
    // const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
    const [loading, setLoading] = useState(true);  
    const [nextWaterd, setNextWatered] = useState<string>();
    return (
        <View style={styles.container}>
            <Header/>

            <View style={styles.spotlight}>
                <Image 
                    source={waterdrop}
                    style={styles.spotlightImage}
                />
                <Text style={styles.spotlightText}>
                    {nextWaterd}
                </Text>
            </View>

            <View style={styles.plants}>
                <Text style={styles.plantsTitle}>
                    Próximas regadas
                </Text>

                {/* <FlatList 
                    data={myPlants}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                       <PlantCardSecondary 
                            data={item} 
                            handleRemove={() => {handleRemove(item)}}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                /> */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingTop: 50,
        backgroundColor: colors.background
    },
    spotlight: {
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 110,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    spotlightImage: {
        width: 60,
        height: 60
    },
    spotlightText: {
        flex: 1,
        color: colors.blue,
        paddingHorizontal: 20,
    },
    plants: {
        flex: 1,
        width: '100%'
    },
    plantsTitle: {
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginVertical: 20
    }
});