import React, { useState, Component } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useFonts } from 'expo-font';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Link } from 'expo-router';

type RootStackParamList = {
  login: undefined;
  SignUp: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'login'>;

export default function LoginScreen({ navigation }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
    } else {
      Alert.alert('Sucesso', 'Login realizado com sucesso!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Finantech</Text>

      <TextInput
        style={styles.input}
        placeholder="Email ou Nome de Usuário"
        placeholderTextColor="#D3D3D3"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#D3D3D3"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
      <Link href='/expense' style={styles.buttonText}>Login</Link>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Link href='/signup' style={styles.buttonText}>Criar Conta</Link>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Poppins',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#191970',
    fontFamily: 'Poppins',
  },
  input: {
    height: 50,
    borderColor: '#6A5ACD',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    color: '#191970',
    fontFamily: 'Poppins',
  },
  button: {
    backgroundColor: '#6A5ACD',
    paddingVertical: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Poppins',
  },
});
