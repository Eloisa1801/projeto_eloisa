import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { format } from 'date-fns';

const ExpensesScreen: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [totalCost, setTotalCost] = useState<number | undefined>(undefined);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Aluguel');
  const [otherCategory, setOtherCategory] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleInsertExpense = () => {
    if (!date || totalCost === undefined || !description || !category) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
    } else {
      Alert.alert('Sucesso', 'Despesa registrada com sucesso!');
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleCostChange = (text: string) => {
    const numericValue = parseFloat(text.replace(/[^0-9.,]/g, '').replace(',', '.'));
    setTotalCost(isNaN(numericValue) ? undefined : numericValue);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Despesa</Text>

      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <TextInput
          style={styles.input}
          placeholder="Data"
          placeholderTextColor="#D3D3D3"
          value={date ? format(date, 'dd/MM/yyyy') : ''}
          editable={false}
        />
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Custo Total"
        placeholderTextColor="#D3D3D3"
        value={totalCost !== undefined ? totalCost.toString() : ''}
        onChangeText={handleCostChange}
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
});

export default ExpensesScreen;
