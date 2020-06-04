import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import * as Font from 'expo-font';
import { enableScreens } from 'react-native-screens';
import { AppLoading } from 'expo';

import BodyText from './components/BodyText';
import Navigator from './navigation/shoppingAppNavigator';
import productReducer from './store/reducers/product';

const fetchFonts = () => {
  return Font.loadAsync({
    primary: require('./assets/fonts/AnonymousPro-Regular.ttf'),
    'primary-italic': require('./assets/fonts/AnonymousPro-Italic.ttf'),
    'primary-bold': require('./assets/fonts/AnonymousPro-Bold.ttf'),
    'primary-bold-italic': require('./assets/fonts/AnonymousPro-BoldItalic.ttf'),
  });
};

enableScreens();

const rootReducer = combineReducers({
  products: productReducer,
});
const store = createStore(rootReducer);

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
