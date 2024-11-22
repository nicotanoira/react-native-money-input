import { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import MoneyInput from 'react-native-money-format-input';

export default function App() {
  const [currencyValue, setCurrencyValue] = useState<number>(0);

  const currencyValueHandler = (value: string) => {
    // Remove commas and periods (decimal points)
    const cleanedValue = value.replace(/[^0-9.]/g, ''); // Only allow numbers and a single decimal point
    // Parse the cleaned value into a number
    const numericValue = parseFloat(cleanedValue);

    // If the parsed value is NaN, set it to 0 (in case the input is empty or invalid)
    setCurrencyValue(isNaN(numericValue) ? 0 : numericValue);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Currency Input Demo</Text>

      {/* MoneyInput Component */}
      <MoneyInput
        setValue={currencyValueHandler}
        symbol="AR$" // $, €, ¥, £, ₹, ₽, ₺, $, zł, Kč, lei, ฿, ₪, ₱
        locale="es-AR"
        defaultInteger="1234567"
        defaultFloat="89"
        currencySymbolStyle={styles.currencySymbol}
        intNumberStyle={styles.intNumber}
        floatNumberStyle={styles.floatNumber}
      />

      <View style={styles.valueContainer}>
        <Text style={styles.valueText}>
          Currency value output:{' '}
          <Text style={{ color: '#0A66C2' as const }}>{currencyValue}</Text>
        </Text>
        <Text style={styles.valueText}>
          Typeof value:{' '}
          <Text style={{ color: '#0A66C2' as const }}>
            {typeof currencyValue}
          </Text>
        </Text>
      </View>
      <Text style={[styles.valueText, { paddingTop: 20 as const }]}>
        *Note: the value must be passed into the component as a string because
        of React Native's TextInput. You can use handler logic to transform it
        into a number.
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
    backgroundColor: '#0A66C2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: 'flex-start',
  },
  valueContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  valueText: {
    fontSize: 18,
    fontWeight: '500',
  },
  currencySymbol: {
    fontSize: 24,
    color: '#0A66C2',
  },
  intNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#0A66C2',
  },
  floatNumber: {
    fontSize: 24,
    fontWeight: '500',
    color: '#0A66C2',
  },
});
