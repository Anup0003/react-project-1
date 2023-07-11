import React, { useState } from 'react';
import { View } from 'react-native';
import LogIn from './LogIn';
import Register from './Register';

export default function Auth() {
  const [form, setForm] = useState('login');

  const changeForm = (stg) => {
    setForm(stg);
  };

  const Container = () => {
    switch (form) {
      case 'login':
        return <LogIn changeForm={() => changeForm('register')} />;
      case 'register':
        return <Register changeForm={() => changeForm('login')} />;
      default:
        return null;
    }
  };

  return (
    <View>
      <Container />
    </View>
  );
}
