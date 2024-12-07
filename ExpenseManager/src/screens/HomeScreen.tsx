import React, { useCallback, useState } from 'react';
import { View, Text, Button, Dimensions, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BarChart } from 'react-native-chart-kit';
import { globalStyles } from '../styles/styles';
import ExpenseList from '../components/ExpenseList';

type RootStackParamList = {
  Home: undefined;
  AddExpense: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

interface Expense {
  id: number;
  description: string;
  amount: number;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const loadExpenses = () => {
    fetch('http://localhost:3000/api/expenses')
      .then(response => response.json())
      .then(data => {
        const transformedData = data.map((expense: any) => ({
          ...expense,
          amount: parseFloat(expense.amount)
        }));
        setExpenses(transformedData);
      })
      .catch(error => console.error(error));
  };

  useFocusEffect(
    useCallback(() => {
      loadExpenses();
    }, [])
  );

  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>Gestor de Gastos</Text>
      <BarChart
        data={{
          labels: expenses.map(expense => expense.description),
          datasets: [
            {
              data: expenses.map(expense => expense.amount)
            }
          ]
        }}
        width={Dimensions.get('window').width - 32} // from react-native
        height={220}
        yAxisLabel="$"
        yAxisSuffix=""
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 2,
          color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16
          }
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
      <ExpenseList expenses={expenses} />
      <Button
        title="Agregar Gasto"
        onPress={() => navigation.navigate('AddExpense')}
      />
    </ScrollView>
  );
};

export default HomeScreen;




