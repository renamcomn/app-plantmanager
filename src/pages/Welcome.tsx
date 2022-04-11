import React from 'react';
import {
    Text,
    SafeAreaView,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions,
    View
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Feather } from '@expo/vector-icons';

import Watering from '../assets/watering.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export default function Welcome() {
    const navigation = useNavigation();

    function handleStart() {
        navigation.navigate('UserIdentification');
    }
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.title}>
                    Gerencie {'\n'} suas plantas {'\n'} de forma fácil
                </Text>

                <Image 
                    source={Watering}
                    style={styles.image}
                    resizeMode='contain'
                />

                <Text style={styles.subtitle}>
                    Não esqueça mais de regar suas plantas.
                    Nós cuidados de lembrar você sempre que precisar.
                </Text>
                
                <TouchableOpacity 
                    style={styles.button}
                    activeOpacity={0.7}
                    onPress={handleStart}
                >
                    <Text>
                        <Feather 
                            name='chevron-right' 
                            style={styles.buttonIcon}
                        />
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center' ,
        color: colors.heading,
        marginTop: 38,
        fontFamily: fonts.heading,
        lineHeight: 38
    },
    subtitle: {
        textAlign: 'center',
        color: colors.heading,
        fontSize: 18,
        paddingHorizontal: 20,
        fontFamily: fonts.text
    },
    button: {
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        width: 56,
        height: 56,
        borderRadius: 16,
        marginBottom: 10
    },
    buttonIcon: {
        color: colors.white,
        fontSize: 24
    },
    image: {
        height: Dimensions.get('window').width * 0.7
    }
});