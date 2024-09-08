import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#6A5ACD',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: '#fff' },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          if (route.name === 'expense') {
            iconName = focused ? 'cash' : 'cash-outline';
          } else if (route.name === 'income') {
            iconName = focused ? 'wallet' : 'wallet-outline';
          } else if (route.name === 'graphs') {
            iconName = focused ? 'bar-chart' : 'bar-chart-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    />
  );
}


//verificar navegação do login e cadastro
//configurar campo data de despesas e renda
//realizar tela dos gráficos
//ajustar campo de despeas R$
//validações de campos
//modal e limpar campos
  //inserir despesas e rendas
  //listar despesas e rendas
  //editar despesas e rendas
  //remover despesas e rendas
  

