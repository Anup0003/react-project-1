import React, { useState } from 'react';
import { Alert, Text, View, StyleSheet, Button, TextInput, } from 'react-native';
import { supabase } from '../config/supabase';

export default function Login({ changeForm }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const signInWithEmail = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) Alert.alert(error.message);
        setLoading(false);


    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.boldText}>Login</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.inputOne}
                    placeholder="Email"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    textContentType="emailAddress"
                />
                <TextInput
                    style={styles.inputTwo}
                    placeholder="Password"
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    secureTextEntry={true}
                    autoCapitalize="none"
                    textContentType="password"
                />
            </View>
            <View style={styles.buttonContainerOne}>
                <Button style={styles.btnOne} title="Login" disabled={loading||!email||!password} onPress={signInWithEmail} />
            </View>
            <View style={styles.buttonContainerTwo}>
                <Text style={styles.btnText}>Don't have a Account</Text>
                <Button style={styles.btnTwo} title="Create One" onPress={changeForm} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '105%',
    },
    header: {
        position: 'absolute',
        top: '25%',
    },
    boldText: {
        fontWeight: 'bold',
        fontSize: '16px',
        padding: 10,
    },
    inputOne: {
        padding: 5,
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 5,
    },
    inputTwo: {
        padding: 5,
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 7,
    },
    buttonContainerOne: {
        width: '100px',
        marginBottom: 6,
    },
    buttonContainerTwo: {
        width: '187px',
    },
    btnText: {
        paddingLeft: '30px',
    },
    btnTwo: {
        width: '100px',
        marginLeft: '45px',
    }
});