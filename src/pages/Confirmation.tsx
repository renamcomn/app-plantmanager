import React from 'react';
import {
    Text,
    SafeAreaView,
    StyleSheet,
    View
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import Button from '../components/Button';

interface Params {
    title: string;
    subTitle: string;
    buttonTitle: string;
    icon: 'smile' | 'hug',
    nextScreen: string;
}

const emojis = {
    hug: '🤗',
    smile: '😀'
}

export default function Confirmation() {
    const navigation = useNavigation();
    const routes = useRoute();

    const {
        title,
        subTitle,
        buttonTitle,
        icon,
        nextScreen
    } = routes.params as Params;

    function handlePlantSelect() {
        navigation.navigate(nextScreen);
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>
                    {emojis[icon]}
                </Text>

                <Text style={styles.title}>
                    {title}
                </Text>

                <Text style={styles.subtitle}>
                    {subTitle}
                </Text>

                <View style={styles.footer}>
                    <Button title={buttonTitle}
                        onPress={handlePlantSelect}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 30
    },
    emoji: {
        fontSize: 78
    },
    title: {
        fontSize: 22,
        fontFamily: fonts.heading,
        textAlign: 'center',
        lineHeight: 38,
        marginTop: 15,
        color: colors.heading
    },
    subtitle: {
        fontSize: 17,
        fontFamily: fonts.text,
        textAlign: 'center',
        paddingVertical: 10,
        color: colors.heading
    },
    footer: {
        width: '100%',
        paddingHorizontal: 50,
        marginTop: 20
    }
});