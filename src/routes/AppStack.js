import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from "../screens/Home";
import ListItem from "../screens/ListItem";
import {Form} from "../screens/Form"

const Stack = createNativeStackNavigator();

export default AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ListItem" component={ListItem} />
      <Stack.Screen name="Form" component={Form} />
    </Stack.Navigator>
  );
};
