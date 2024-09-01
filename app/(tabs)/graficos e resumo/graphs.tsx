import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GraphsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gráficos</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#191970',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#696969',
  },
});

export default GraphsScreen;
