import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import Modal from 'react-native-modal';

export default function SignUpScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setModalMessage('Por favor, preencha todos os campos.');
      setShowModal(true);
    } else if (password !== confirmPassword) {
      setModalMessage('As senhas não coincidem.');
      setShowModal(true);
    } else {
      try {
        console.log('Sending request to server');
        const response = await fetch('http://localhost:5000/api/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();
        console.log('Response received:', response);
        console.log('Response JSON:', data);

        setModalMessage(data.msg || 'Erro ao registrar usuário');
        setShowModal(true);
        if (response.ok) {
          setModalMessage('Cadastro realizado com sucesso!');
        }
      } catch (error) {
        console.error('Error during fetch:', error);
        setModalMessage('Erro ao registrar usuário');
        setShowModal(true);
      }
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    if (modalMessage === 'Cadastro realizado com sucesso!') {
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      
      window.location.href = '/'; 
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Finantech</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nome Completo"
        placeholderTextColor="#D3D3D3"
        value={name}
        onChangeText={setName}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#D3D3D3"
        value={email}
        onChangeText={setEmail}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#D3D3D3"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <TextInput
        style={styles.input}
        placeholder="Confirme a Senha"
        placeholderTextColor="#D3D3D3"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Criar Conta</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button}>
        <Link href={'/'} style={styles.buttonText}>Já tem uma conta? Login</Link>
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
