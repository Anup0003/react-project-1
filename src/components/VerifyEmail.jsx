import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import { supabase } from '../config/supabase';

export default function VerifyEmail({ email }) {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  const sendOtp = async () => {
    setLoading(true);
    const { error } = await supabase.auth.sendOtp({
      email: email,
      type: 'signup',
    });

    if (error) {
      Alert.alert(error.message);
    } else {
      Alert.alert('OTP sent successfully!');
      setTimer(60);
    }

    setLoading(false);
  };

  const verifyOtp = async () => {
    setLoading(true);
    const { error } = await supabase.auth.verifyOtp({
      email: email,
      token: otp,
      type: 'signup',
    });

    if (error) {
      Alert.alert(error.message);
    } else {
      Alert.alert('Email verified successfully!');
    }

    setLoading(false);
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.boldText}>Verify your Email</Text>
        </View>
        {loading ? (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text>Verifying OTP....</Text>
          </View>
        ) : (
          <>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputOne}
                placeholder="OTP"
                onChangeText={(text) => {
                  setOtp(text);
                }}
                value={otp}
                keyboardType="numeric"
                autoCapitalize="none"
                textContentType="oneTimeCode"
              />
              <View style={styles.buttonContainerOne}>
                <Button style={styles.btnOne} disabled={loading || !otp} onPress={verifyOtp} title="Verify Email" />
              </View>
              {timer > 0 ? (
                <Text style={styles.btnText}>
                  Resend OTP in {timer} seconds
                </Text>
              ) : (
                <View style={styles.buttonContainerTwo}>
                  <Button style={styles.btnTwo} disabled={loading} onPress={sendOtp} title="Resend OTP" />
                </View>
              )}
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffff',
  },
  header: {
    paddingBottom: '10px',
  },
  boldText: {
    fontWeight: 'bold',
    padding: 10,
  },
  inputOne: {
    padding: 5,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 5,
  },
  btnOne: {
    marginBottom: '10px',
  },
  btnText: {
    marginLeft: '12px',
  }
});

