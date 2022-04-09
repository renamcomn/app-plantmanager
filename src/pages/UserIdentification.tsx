import React, { useState } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native';

import Button from '../components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export default function UserIdentification() {
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [name, setName] = useState<string>();

    function handleInputBlur() {
        setIsFocused(false);
        setIsFilled(!!name);
    }

    function handleInputFocus() {
        setIsFocused(true);
    }

    function handleInputChange(value: string) {
        setIsFilled(!!value);
        setName(value)
    }
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.content}>
                        <View style={styles.form}>

                            <View style={styles.header}>
                                <Text style={styles.emoji}>
                                    {
                                        isFilled ? '😀' : '🙃'
                                    }
                                
                                </Text>

                                <Text style={styles.title}>
                                    Como podemos {'\n'}
                                    chamar você ?
                                </Text>
                            </View>
                            <TextInput
                                style={[
                                    styles.input,
                                    (isFocused || isFilled ) && 
                                    { borderColor: colors.green }
                                ]}
                                placeholder='Digite seu nome'
                                onBlur={handleInputBlur}
                                onFocus={handleInputFocus}
                                onChangeText={handleInputChange}
                            />
                            
                            <View style={styles.footer}>
                                <Button title='Confirmar'/>
                            </View>

                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    content: {
        flex: 1,
        width: '100%'
    },
    header: {
        alignItems: 'center'  
    },
    title: {
        textAlign: 'center',
        fontSize: 24,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 32,
        marginTop: 20
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 54,
        alignItems: 'center'
    },
    input: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: 'center'
    },
    emoji: {
        fontSize: 44
    },
    footer: {
        width: '100%',
        marginTop: 40,
        paddingHorizontal: 20
    }
});

