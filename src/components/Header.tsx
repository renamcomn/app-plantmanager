import React from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text
} from 'react-native';
import colors from '../styles/colors';
import userImg from '../assets/renan.png';
import fonts from '../styles/fonts';

export function Header() {
    return(
        <View style={styles.container}>
            <View>
                <Text style={styles.greetings}>Olá,</Text>
                <Text style={styles.username}>Renan</Text>
            </View>
            
            <Image source={userImg} style={styles.avatar} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    greetings: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text
    },
    username: {
        fontSize: 32,
        fontFamily: fonts.heading,
        color: colors.heading,
        lineHeight: 40
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 35
    }
});