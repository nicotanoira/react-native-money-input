# react-native-money-input-example

A demo/example for React Native Moeny Input component.
For correct documentation guide:
3rd Section of this doc:
https://callstack.github.io/react-native-builder-bob/faq

```sh
node -v
v20.18.1

yarn -v
3.6.1

nvm -v
1.1.12
```

## Installation

!Note: For some reason had LOTS of trouble with NPM trying to connect example to the lib. With yarn was pretty seamless integration

```sh
yarn install // in react-native-money-input directory
npm pack // in react-native-money-input directory -> this will build LIBRARY-0.0.0-local...etc
cd example
yarn add ../react-native-money-input-0.0.0-local.1.tgz // WATCH OUT FOR THE NAME, IT SHOULD BE TEMPORARY AND IT RESEMBLES THE package.json name of root drc
yarn start // Tried it with expo and works fine
```

## Usage

Edits should be on react-native-money-input/src/index.tsx - NOT in example/

```js
import MoneyInput from 'react-native-money-input';

// ...

<MoneyInput
  setValue={handleParseCurrency} // !
  symbol="$" // ?
  locale="en-US" // ?
  defaultInteger="0" // ?
  defaultFloat="0" // ?
  currencySymbolStyle={styles.currencySymbol} // ?
  intNumberStyle={styles.intNumber}// ?
  floatNumberStyle={styles.floatNumber} // ?
/>
```


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
