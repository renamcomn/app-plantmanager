import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    SafeAreaView,
    FlatList
} from 'react-native';
import colors from '../styles/colors';

import { Header } from '../components/Header';
import fonts from '../styles/fonts';
import { EnviromentButton } from '../components/EnviromentButton';

import api from '../services/api';

interface EnviromentProps {
    key: string;
    title: string;
}

export function PlantSelect() {
    const [enviroments, setEnviroments] = useState<EnviromentProps[]>([]);

    useEffect(() => {
        async function fetchEnviroment() {
           const { data } = await api.get('plants_environments');
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
                        <EnviromentButton key={item.key} title={item.title} />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.enviromentList}
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
    }
});