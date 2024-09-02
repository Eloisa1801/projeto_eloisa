import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useFonts } from 'expo-font';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { format } from 'date-fns';

const IncomeScreen: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [income, setIncome] = useState<string>('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Investimento');
  const [otherCategory, setOtherCategory] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleInsertIncome = () => {
    if (!date || !income || !description || !category) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
    } else {
      Alert.alert('Sucesso', 'Renda registrada com sucesso!');
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const handleIncomeChange = (text: string) => {
    const numericValue = text.replace(/[^0-9.,]/g, '');
    setIncome(numericValue);
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar Renda</Text>

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
          value={date || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Renda"
        placeholderTextColor="#D3D3D3"
        value={income}
        onChangeText={handleIncomeChange}
        keyboardType="decimal-pad"
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
        <Picker.Item label="Investimento" value="Investimento" />
        <Picker.Item label="Renda Extra" value="Renda Extra" />
        <Picker.Item label="Bônus" value="Bônus" />
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
      <TouchableOpacity style={styles.button} onPress={handleInsertIncome}>
        <Text style={styles.buttonText}>Inserir Renda</Text>
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

export default IncomeScreen;
