import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import MonthSelector from '../MonthSelector';

const screenWidth = Dimensions.get('window').width;

const purpleColors = [
  '#6A5ACD', 
  '#8A2BE2', 
  '#9370DB', 
  '#DDA0DD', 
  '#DA70D6', 
  '#EE82EE', 
  '#BA55D3', 
  '#C71585',
];

const GraphsScreen: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>('01');
  const [selectedYear, setSelectedYear] = useState<string>('2024');  
  const [expenses, setExpenses] = useState<number>(0);
  const [income, setIncome] = useState<number>(0);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expenseResponse = await fetch(`http://localhost:5000/api/users/expenses?month=${selectedMonth}&year=${selectedYear}&userId=66ddebb87634911e21a8836b`);
        const incomeResponse = await fetch(`http://localhost:5000/api/users/income?month=${selectedMonth}&year=${selectedYear}&userId=66ddebb87634911e21a8836b`);

        const expenseData = await expenseResponse.json();
        const incomeData = await incomeResponse.json();

        setExpenses(expenseData.total); 
        setIncome(incomeData.total);     
        setCategories(expenseData.categories);  
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [selectedMonth, selectedYear]);

  const balance = income - expenses; 

  const pieData = categories
    .filter(category => category.totalCost > 0 && category.category) 
    .map((category, index) => ({
      name: category.category,  
      population: category.totalCost,
      color: purpleColors[index % purpleColors.length], 
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gráfico de Despesas por Categoria</Text>

      <MonthSelector selectedMonth={selectedMonth} onChange={setSelectedMonth} />

      <PieChart
        data={pieData}
        width={screenWidth}
        height={220}
        chartConfig={{
          backgroundColor: '#FFFFFF',
          backgroundGradientFrom: '#6A5ACD',
          backgroundGradientTo: '#6A5ACD',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />

      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>Total de Despesas: R$ {expenses.toFixed(2)}</Text>
        <Text style={styles.summaryText}>Total de Renda: R$ {income.toFixed(2)}</Text>
        <Text style={styles.summaryText}>Saldo do Mês: R$ {balance.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#191970',
    fontFamily: 'Poppins',
  },
  summaryContainer: {
    marginTop: 20,
  },
  summaryText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#191970',
    fontFamily: 'Poppins',
  },
});

export default GraphsScreen;
