import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { globalStyles } from '../styles/styles';

type RootStackParamList = {
  Home: undefined;
  AddExpense: undefined;
};

type AddExpenseScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'AddExpense'
>;

interface Props {
  navigation: AddExpenseScreenNavigationProp;
}

const AddExpenseScreen: React.FC<Props> = ({ navigation }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleAddExpense = () => {
    const expense = { description, amount: parseFloat(amount) };
    
    fetch('http://localhost:3000/api/expenses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(expense)
    })
    .then(response => response.json())
    .then(data => {
      // Aquí podrías hacer algo con la respuesta si lo deseas
      navigation.goBack();
    })
    .catch(error => console.error('Error:', error));
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.label}>Descripción</Text>
      <TextInput
        style={globalStyles.input}
        value={description}
        onChangeText={setDescription}
      />
      <Text style={globalStyles.label}>Monto</Text>
      <TextInput
        style={globalStyles.input}
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <Button title="Agregar Gasto" onPress={handleAddExpense} />
    </View>
  );
};

export default AddExpenseScreen;
