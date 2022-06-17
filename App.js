import React from 'react';
import {Provider} from 'react-redux';
import store from './app/redux/store';
import {NavigationContainer} from '@react-navigation/native';
import {HomeScreen} from './app/screens/HomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DetailScreen} from './app/screens/DetailScreen';
import { FormScreen } from './app/screens/FormScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailScreen} />
          <Stack.Screen name="Form" component={FormScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
