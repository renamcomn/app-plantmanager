import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    FlatList,
    Alert
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Header } from "../components/Header";
import { loadPlants, PlantsProps, StoragePlantProps } from "../libs/storage";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

import waterdrop from '../assets/waterdrop.png';
import { formatDistance } from "date-fns";
import { pt } from "date-fns/locale";
import { PlantCardSecondary } from "../components/PlantCardSecondary";
import { Load } from "../components/Load";

export function MyPlants() {
    const [myPlants, setMyPlants] = useState<PlantsProps[]>([]);
    const [loading, setLoading] = useState(true);  
    const [nextWatered, setNextWatered] = useState<string>();

    function handleRemove(plant: PlantsProps) {
        Alert.alert('Remover', `Deseja remover a ${plant.name}?`, [
            {
                text: 'Não 🙏',
                style: 'cancel'
            },
            {
                text: 'Sim 🥲',
                onPress: async () => {
                    try {
                        const data = await AsyncStorage.getItem('@plantmanager:plants');
                        const plants = data ? (JSON.parse(data) as StoragePlantProps) : {};

                        delete plants[plant.id];
                        await AsyncStorage.setItem(
                            '@plantmanager:plants',
                            JSON.stringify(plants)
                        );

                        setMyPlants((oldData) =>
                            oldData.filter((item) => item.id !== plant.id)
                        );
                    } catch(error) {
                        Alert.alert('Não foi possivel remover 🥲');
                    }
                }
            }
            

        ])
    }

    useEffect(() => {
        async function loadStorageData() {
            const plantsStorage = await loadPlants();

            const nextTime = formatDistance(
                new Date(plantsStorage[0].dateTimeNotification).getTime(),
                new Date().getTime(),
                { locale: pt }
            );

            setNextWatered(
                `Não esqueça de regar a ${plantsStorage[0].name} em ${nextTime}`
            )

            setMyPlants(plantsStorage)
            setLoading(false);
        }

        loadStorageData();
    }, []);

    if(loading)
        return <Load />

    return (
        <View style={styles.container}>
            <Header/>

            <View style={styles.spotlight}>
                <Image 
                    source={waterdrop}
                    style={styles.spotlightImage}
                />
                <Text style={styles.spotlightText}>
                    {nextWatered}
                </Text>
            </View>

            <View style={styles.plants}>
                <Text style={styles.plantsTitle}>
                    Próximas regadas
                </Text>

                <FlatList 
                    data={myPlants}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                       <PlantCardSecondary 
                            data={item} 
                            handleRemove={() => {handleRemove(item)}}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                />
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