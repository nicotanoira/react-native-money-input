import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import type {
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  StyleProp,
  TextStyle,
} from 'react-native';

interface MoneyInputProps {
  setValue: (finalNumber: string) => void;
  symbol?: string;
  symbolAtEnd?: boolean;
  locale?: string;
  defaultInteger?: string;
  defaultFloat?: string;
  currencySymbolStyle?: StyleProp<TextStyle>;
  intNumberStyle?: StyleProp<TextStyle>;
  floatNumberStyle?: StyleProp<TextStyle>;
}

const MoneyInput: React.FC<MoneyInputProps> = ({
  setValue,
  symbol = '$',
  symbolAtEnd = false,
  locale = 'en-US',
  defaultInteger = '',
  defaultFloat = '',
  currencySymbolStyle,
  intNumberStyle,
  floatNumberStyle,
}) => {
  const [integer, setInteger] = useState<string>(
    +defaultInteger === 0 ? '' : defaultInteger
  );
  const [float, setFloat] = useState<string>(
    processFloatTwoDigits(defaultFloat)
  );
  const [formattedInteger, setFormattedInteger] =
    useState<string>(defaultInteger);

  const refInteger = useRef<TextInput>(null);
  const refDecimal = useRef<TextInput>(null);
  const previousValue = useRef<string>('');

  function processFloatTwoDigits(value: string): string {
    if (value === '0' || value.length < 1) {
      return '';
    } else if (value.length === 1) {
      return value;
    }

    const firstTwo = value.slice(0, 2);

    if (firstTwo === '00' || firstTwo === '0') {
      return ''; // Both digits are 0
    } else if (firstTwo[0] === '0') {
      return firstTwo;
    } else {
      return firstTwo;
    }
  }

  const valueSanitizer = (value: string) => {
    let sanitizedValue = value.replace(/[^0-9]/g, '');
    // if (sanitizedValue.length > 1 && sanitizedValue[0] === '0') {
    //   sanitizedValue = sanitizedValue.replace(/^0+/, '');
    // }

    return sanitizedValue;
  };

  useEffect(() => {
    const numericValue =
      parseInt(integer.replace(/\./g, '').replace(/,/g, ''), 10) || 0;
    setFormattedInteger(numericValue.toLocaleString(locale));
  }, [integer, locale]);

  useEffect(() => {
    const combinedValue = float
      ? +float < 10
        ? `${integer}.0${float}`
        : `${integer}.${float}`
      : integer;

    if (previousValue.current !== combinedValue) {
      previousValue.current = combinedValue;
      setValue(combinedValue);
    }
  }, [integer, float, setValue]);

  const integerHandler = (value: string): void => {
    if (value.includes(',') || value.includes('.')) {
      refDecimal.current?.focus();
      setFloat('');
      return;
    }

    const sanitizedValue = valueSanitizer(value);

    setInteger(sanitizedValue);
  };

  const floatHandler = (value: string): void => {
    const sanitizedValue = valueSanitizer(value);
    setFloat(sanitizedValue.slice(0, 2));
  };

  const handleBackspaceKeyPressInteger = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>
  ): void => {
    if (event.nativeEvent.key === 'Backspace' && integer.length === 0) {
      setFloat('');
    }
  };

  const handleBackspaceKeyPressFloat = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>
  ): void => {
    if (event.nativeEvent.key === 'Backspace' && float?.length === 0) {
      const newInteger = integer.slice(0, -1);
      setInteger(newInteger);
      refInteger.current?.focus();
    }
  };

  return (
    <View style={styles.textInputContainer}>
      {!symbolAtEnd && (
        <Text style={[styles.textCurrency, currencySymbolStyle]}>{symbol}</Text>
      )}

      <TouchableOpacity
        onPress={() => {
          refInteger.current?.focus();
          const length = integer.length;
          refInteger.current?.setSelection(length, length); // Set the cursor at the end of input
        }}
        activeOpacity={0.5}
        style={styles.numberContainer}
      >
        <TextInput
          style={[
            styles.inputNumber,
            // eslint-disable-next-line react-native/no-inline-styles
            { color: 'transparent', textShadowColor: 'transparent' },
          ]}
          onChangeText={integerHandler}
          value={integer}
          keyboardType="decimal-pad"
          caretHidden={true}
          ref={refInteger}
          onKeyPress={handleBackspaceKeyPressInteger}
        />
        <Text style={[styles.textNumber, intNumberStyle]}>
          {formattedInteger}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => refDecimal.current?.focus()}
        activeOpacity={0.5}
        style={styles.numberContainer}
      >
        <TextInput
          style={[
            styles.inputNumber,
            // eslint-disable-next-line react-native/no-inline-styles
            { color: 'transparent', textShadowColor: 'transparent' },
          ]}
          onChangeText={floatHandler}
          value={float}
          caretHidden={true}
          keyboardType="decimal-pad"
          ref={refDecimal}
          onKeyPress={handleBackspaceKeyPressFloat}
        />
        <Text style={[styles.textFloat, floatNumberStyle]}>
          {float ? (+float < 10 ? `0${float}` : float) : '00'}
        </Text>
      </TouchableOpacity>

      {symbolAtEnd && (
        <Text style={[styles.textCurrency, currencySymbolStyle]}>{symbol}</Text>
      )}
    </View>
  );
};

export default MoneyInput;

const styles = StyleSheet.create({
  inputNumber: {
    position: 'absolute',
  },
  numberContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    position: 'relative',
  },
  textCurrency: {
    alignSelf: 'flex-start',
    fontSize: 24,
    paddingTop: 6,
  },
  textFloat: {
    alignSelf: 'flex-start',
    fontSize: 20,
    paddingTop: 8,
  },
  textInputContainer: {
    alignItems: 'flex-start',
    borderRadius: 15,
    flexDirection: 'row',
    gap: 2,
    justifyContent: 'center',
    paddingHorizontal: 20,
    position: 'relative',
  },
  textNumber: {
    fontSize: 48,
  },
});
