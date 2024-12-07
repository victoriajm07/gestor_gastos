import React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import ExpenseItem from './ExpenseItem';

// Definir la interfaz para un gasto
interface Expense {
  id: number;
  description: string;
  amount: number;
}

// Definir la interfaz para los props de ExpenseList
interface ExpenseListProps {
  expenses: Expense[];
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses }) => {
  const renderItem = ({ item }: ListRenderItemInfo<Expense>) => (
    <ExpenseItem description={item.description} amount={item.amount} />
  );

  return (
    <FlatList
      data={expenses}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
    />
  );
};

export default ExpenseList;

