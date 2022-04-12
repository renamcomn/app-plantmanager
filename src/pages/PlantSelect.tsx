import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    SafeAreaView,
    FlatList
} from 'react-native';

import api from '../services/api';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import { Header } from '../components/Header';
import { EnviromentButton } from '../components/EnviromentButton';
import { PlantCardPrimary } from '../components/PlantCardPrimary';

interface EnviromentProps {
    key: string;
    title: string;
}

interface PlantsProps {
    id: string;
      name: string;
      about: string;
      water_tips: string;
      photo: string;
      environments: [string],
      frequency: {
        times: number;
        repeat_every: string
      }
}

export function PlantSelect() {
    const [enviroments, setEnviroments] = useState<EnviromentProps[]>([]);
    const [plants, setPlants] = useState<PlantsProps[]>([]);
    const [filteredPlants, setFilteredPlants] = useState<PlantsProps[]>([]);
    const [enviromentSelected, setEnviromentSelected] = useState('all');

    function handleEnviromentSelected(enviroment: string) {
        setEnviromentSelected(enviroment);

        if(enviroment === 'all')
        return setFilteredPlants(plants);

        const filtered = plants.filter(plant => 
            plant.environments.includes(enviroment)
        );

        setFilteredPlants(filtered);
    }

    useEffect(() => {
        async function fetchEnviroment() {
           const { data } = await api.get('plants_environments?_sort=title&_order=asc');
           setEnviroments([
               {
                   key: 'all',
                   title: 'Todos'
               },
               ...data
           ]);
        }

        fetchEnviroment();
    }, []);

    useEffect(() => {
        async function fetchPlants() {
           const { data } = await api.get('plants?_sort=name&_order=asc');
           setPlants(data);
        }

        fetchPlants();
    }, []);

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Header />

                <Text style={styles.title}>
                    Em qual ambiente
                </Text>

                <Text style={styles.subtitle}>
                    Você quer colocar sua planta?
                </Text>
            </View>

            <View>
                <FlatList 
                    data={enviroments}
                    renderItem={({ item }) => (
                        <EnviromentButton 
                            key={item.key} 
                            title={item.title} 
                            active={item.key === enviromentSelected}
                            onPress={() => handleEnviromentSelected(item.key)}
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.enviromentList}
                />
            </View>

            <View style={styles.plants}>
                <FlatList 
                    data={filteredPlants}
                    renderItem={({ item }) => (
                        <PlantCardPrimary data={item} />
                    )}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.contentContainerStyle}
                />
            </View>
            

            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    header: {
        paddingHorizontal: 30
    },
    title: {
        fontFamily: fonts.heading,
        fontSize: 17,
        color: colors.heading,
        lineHeight: 20,
        marginTop: 15
    },
    subtitle: {
        fontFamily: fonts.text,
    },
    enviromentList: {
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginLeft: 32,
        marginVertical: 32
    },
    plants: {
        flex: 1,
        paddingHorizontal: 32
    },
    contentContainerStyle: {
        
    }
});