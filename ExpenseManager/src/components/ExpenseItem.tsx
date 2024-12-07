import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ExpenseItemProps {
  description: string;
  amount: number;
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ description, amount }) => {
  return (
    <View style={styles.container}>
      <Text>{description}</Text>
      <Text>{amount}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default ExpenseItem;
