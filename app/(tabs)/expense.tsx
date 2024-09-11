import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import DateSelector from '../DateSelector';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ExpensesScreen: React.FC = () => {
  const [date, setDate] = useState<Date | null>(null);
  const [totalCost, setTotalCost] = useState<number | undefined>(undefined);
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<string>('Aluguel');
  const [otherCategory, setOtherCategory] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');

  const handleInsertExpense = async () => {
    if (!date || totalCost === undefined || !description || !category) {
      setModalMessage('Por favor, preencha todos os campos.');
      setModalVisible(true);
      return;
    }
  
    try {
      const userId = await AsyncStorage.getItem('userId');
      console.log("Valor de userId recuperado do AsyncStorage:", userId);
  
      if (!userId) {
        setModalMessage('Erro: Usuário não encontrado.');
        setModalVisible(true);
        return;
      }
  
      const response = await fetch('http://localhost:5000/api/users/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          date: date.toISOString(),
          totalCost,
          description,
          category: category === 'Outros' ? otherCategory : category,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setModalMessage('Despesa registrada com sucesso!');
        setDate(null);
        setTotalCost(undefined);
        setDescription('');
        setCategory('Aluguel');
        setOtherCategory('');
      } else {
        setModalMessage(data.msg || 'Erro ao registrar despesa');
      }
  
      setModalVisible(true);
    } catch (error) {
      console.error('Error during fetch:', error);
      setModalMessage('Erro ao registrar despesa');
      setModalVisible(true);
    }
  };
  

  const handleTotalCostChange = (text: string) => {
    const cleanedText = text.replace(/[^0-9.,]/g, '');
    const normalizedText = cleanedText.replace(',', '.');
    const numericValue = parseFloat(normalizedText);
    setTotalCost(isNaN(numericValue) ? undefined : numericValue);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Despesa</Text>

      <DateSelector date={date} onChange={setDate} />

      <TextInput
        style={styles.input}
        placeholder="Custo Total"
        placeholderTextColor="#D3D3D3"
        value={totalCost !== undefined ? totalCost.toString().replace('.', ',') : ''}
        onChangeText={handleTotalCostChange}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        placeholderTextColor="#D3D3D3"
        value={description}
        onChangeText={setDescription}
      />
      <Picker
        selectedValue={category}
        style={styles.picker}
        onValueChange={(itemValue) => {
          if (itemValue === 'Outros') {
            setOtherCategory('');
          }
          setCategory(itemValue);
        }}
      >
        <Picker.Item label="Aluguel" value="Aluguel" />
        <Picker.Item label="Energia" value="Energia" />
        <Picker.Item label="Água" value="Água" />
        <Picker.Item label="Saúde" value="Saúde" />
        <Picker.Item label="Educação" value="Educação" />
        <Picker.Item label="Transporte" value="Transporte" />
        <Picker.Item label="Comunicação" value="Comunicação" />
        <Picker.Item label="Outros" value="Outros" />
      </Picker>
      {category === 'Outros' && (
        <TextInput
          style={[styles.input, styles.otherCategoryInput]}
          placeholder="Especifique a Categoria"
          placeholderTextColor="#D3D3D3"
          value={otherCategory}
          onChangeText={setOtherCategory}
        />
      )}
      <TouchableOpacity style={styles.button} onPress={handleInsertExpense}>
        <Text style={styles.buttonText}>Inserir Despesa</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
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
  picker: {
    height: 50,
    borderColor: '#6A5ACD',
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  otherCategoryInput: {
    marginTop: 10,
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
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#6A5ACD',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ExpensesScreen;
