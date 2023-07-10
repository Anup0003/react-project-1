import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import { supabase } from '../config/supabase';
import VerifyEmail from '../components/VarifyEmail';

export default function Register({ changeForm }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showVerifyEmail, setShowVerifyEmail] = useState(false);

  const signUpWithEmail = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
    } else {
      setShowVerifyEmail(true);
    }
    setLoading(false);

    // supabase.auth.verifyOtp({email:``,token:``,type:'signup'})

  };

  return (
    <View style={styles.container}>
      {showVerifyEmail ? (
        <VerifyEmail email={email} />
      ) : (
        <>
          <View style={styles.header}>
            <Text style={styles.boldText}>Register</Text>
          </View>
          {loading ? (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text>Creating your Account....</Text>
            </View>
          ) : (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputOne}
                placeholder="Email"
                onChangeText={(text) => {
                  setEmail(text);
                }}
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
              <TextInput
                style={styles.inputThree}
                placeholder="Re-type Password"
                onChangeText={(text) => setRetypePassword(text)}
                value={retypePassword}
                secureTextEntry={true}
                autoCapitalize="none"
                textContentType="password"
              />
              <Text>
                {password.length && retypePassword.length > 0
                  ? password === retypePassword
                    ? 'Passwords match'
                    : 'Passwords do not match'
                  : null}
              </Text>

              {loading ? <Text>Loading...</Text> : null}
              <View style={styles.buttonContainerOne}>
                <Button title="Register" style={styles.btnOne} disabled={loading ||password !== retypePassword||!email||!password } onPress={signUpWithEmail} />
              </View>
            </View>
          )}
          <View style={styles.buttonContainerTwo}>
            <Text style={styles.btnText}>Alrady have a account</Text>
            <Button style={styles.btnTwo} title="Login" onPress={changeForm} />
          </View>
        </>
      )}
    </View>
  );
}

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
    marginBottom: 5,
  },
  inputThree: {
    padding: 5,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 7,
  },
  buttonContainerOne: {
    width: '100px',
    marginBottom: 6,
    marginLeft: '45px',
    marginRight: '-45px',
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
  //   inputFour: {
  //       flex: 1,
  //       marginRight: 10,
  //       paddingHorizontal: 10,
  //       borderWidth: 1,
  //       borderColor: 'gray',
  //       marginBottom: 5,
  //   },
  //   conBtn: {
  //     flexDirection: 'row',
  //   },
});
