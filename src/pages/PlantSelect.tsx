import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    SafeAreaView,
    FlatList,
    ActivityIndicator
} from 'react-native';

import api from '../services/api';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import { Header } from '../components/Header';
import { EnviromentButton } from '../components/EnviromentButton';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import { Load } from '../components/Load';
import { useNavigation } from '@react-navigation/native';
import { PlantsProps } from '../libs/storage';

interface EnviromentProps {
    key: string;
    title: string;
}

export function PlantSelect() {
    const [enviroments, setEnviroments] = useState<EnviromentProps[]>([]);
    const [plants, setPlants] = useState<PlantsProps[]>([]);
    const [filteredPlants, setFilteredPlants] = useState<PlantsProps[]>([]);
    const [enviromentSelected, setEnviromentSelected] = useState('all');
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const [loadedAll, setLoadedAll] = useState(false);

    const navigaton = useNavigation();

    function handleEnviromentSelected(enviroment: string) {
        setEnviromentSelected(enviroment);

        if(enviroment == 'all')
        return setFilteredPlants(plants);

        const filtered = plants.filter(plant => 
            plant.environments.includes(enviroment)
        );

        setFilteredPlants(filtered);
    }

    async function fetchPlants(){
        const { data } = await api.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`);

        if(!data)
        return setLoading(true)

        if(page > 1) {
            setPlants(oldValue => [...oldValue, ...data]);
            setFilteredPlants(oldValue => [...oldValue, ...data]);
        } else {
            setPlants(data);
            setFilteredPlants(data);
        }
        
        setLoading(false);
        setLoadingMore(false);
    }

    function handleFetchMore(distance: number) {
        if(distance < 1)
            return;
            
            setLoadingMore(true);
            setPage(oldValue => oldValue + 1);
            fetchPlants();
    }

    function handlePlantSave(plant: PlantsProps) {
        navigaton.navigate('PlantSave', { plant });
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

    useEffect(() => {        
        fetchPlants();
    },[])

    if(loading)
        return <Load />
        
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
                    keyExtractor={(item) => String(item.key)}
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
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <PlantCardPrimary 
                            data={item} 
                            onPress={() => handlePlantSave(item)}
                        />
                    )}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.contentContainerStyle}
                    onEndReachedThreshold={0.1}
                    onEndReached={({ distanceFromEnd }) => 
                        handleFetchMore(distanceFromEnd)}
                    ListFooterComponent={
                        loadingMore 
                        ? <ActivityIndicator color={colors.green} />
                        : <></>
                    }
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
        color: colors.heading,
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