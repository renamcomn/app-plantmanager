import React from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnviromentButtonProps extends RectButtonProps {
    title: string;
    active?: boolean;
}

export function EnviromentButton({
    title,
    active = false,
    ...rest
} : EnviromentButtonProps) {
    return(
        <RectButton
            style={[
                styles.container,
                active && styles.container_active
            ]}
           { ...rest}
        >
            <Text 
                style={[
                    styles.text,
                    active && styles.text_active
                    ]}>
                    {title}
            </Text>
        </RectButton>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.shape,
        width: 76,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        marginRight: 20
    },
    container_active: {
        backgroundColor: colors.green_light
    },
    text: {
        color: colors.heading,
        fontFamily: fonts.text
    },
    text_active: {
        color: colors.green_dark,
        fontFamily: fonts.heading
    }
});