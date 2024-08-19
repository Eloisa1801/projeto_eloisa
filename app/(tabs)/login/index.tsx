import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useFonts } from 'expo-font';
import { NativeStackScreenProps } from '@react-navigation/native-stack';


type RootStackParamList = {
  login: undefined;
  SignUp: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'login'>;

export default function LoginScreen({ navigation }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  //temporário desta forma, até realizar o BD
  const handleLogin = () => {
    console.log('handleLogin called');
    if (!username || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
    } else {
      Alert.alert('Sucesso', 'Login realizado com sucesso!');
    }
  };
  

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  const [fontsLoaded] = useFonts({
    Poppins: require('../../../assets/fonts/Poppins-Regular.ttf'), 
  });

  if (!fontsLoaded) {
    return null; 
  }

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
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Criar Conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF', // Cor de fundo
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#191970', // Cor do título
    fontFamily: 'Poppins', 
  },
  input: {
    height: 50,
    borderColor: '#6A5ACD', // Cor da borda
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 1)', // Fundo transparente
    color: '#191970', // Cor do texto
    fontFamily: 'Poppins', 
  },
  button: {
    backgroundColor: '#6A5ACD', // Cor do botão
    paddingVertical: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF', // Cor do texto do botão
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Poppins', 
  },
});
