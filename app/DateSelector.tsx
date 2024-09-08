import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DateSelectorProps {
  date: Date | null;
  onChange: (date: Date | null) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ date, onChange }) => {
  if (Platform.OS === 'web') {
    return (
      <View style={styles.datePickerContainer}>
        <DatePicker
          selected={date}
          onChange={(date: Date | null) => onChange(date)}
          dateFormat="dd/MM/yyyy"
          className="react-datepicker-wrapper"
          placeholderText="Selecionar Data"
        />
      </View>
    );
  }

  return (
    <View style={styles.datePickerContainer}>
      <DateTimePicker
        value={date || new Date()}
        mode="date"
        display="default"
        onChange={(event, selectedDate) => onChange(selectedDate || null)}
   
      />
    </View>
  );
};

const styles = StyleSheet.create({
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50, 
    borderColor: '#6A5ACD',
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    color: '#191970',
    fontFamily: 'Poppins',
    flex: 1,
  },
});


export default DateSelector;
