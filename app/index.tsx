import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import Modal from 'react-native-modal';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      setModalMessage('Por favor, preencha todos os campos.');
      setShowModal(true);
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: username, password }),
      });
  
      const data = await response.json();
      console.log('Response received:', response);
      console.log('Response JSON:', data);
  
      if (response.ok) {
        setModalMessage('Login realizado com sucesso!');
        setShowModal(true);
      } else {
        setModalMessage(data.msg || 'Erro ao fazer login');
        setShowModal(true);
      }
    } catch (error) {
      console.error('Error during fetch:', error);
      setModalMessage('Erro ao fazer login');
      setShowModal(true);
    }
  };
    
  const handleModalClose = () => {
    setShowModal(false);
    if (modalMessage === 'Login realizado com sucesso!') {
      window.location.href = '/expense';
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Finantech</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
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

      <TouchableOpacity style={styles.button}>
        <Link href='/signup' style={styles.buttonText}>Criar Conta</Link>
      </TouchableOpacity>

      <Modal isVisible={showModal} onBackdropPress={handleModalClose}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>{modalMessage}</Text>
          <TouchableOpacity style={styles.modalButton} onPress={handleModalClose}>
            <Text style={styles.modalButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
  },
  modalButton: {
    backgroundColor: '#6A5ACD',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});
