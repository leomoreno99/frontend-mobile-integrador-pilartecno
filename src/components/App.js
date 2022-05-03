import 'react-native-gesture-handler';
import React, { Component, useCallback, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { 
    View, 
    Text
} from 'react-native';
import AppStack from '../routes/AppStack';
import { Provider } from 'react-redux'
import store from '../redux/store';
import { hasLocationPermission } from '../LocationPermission';

export default App = () => {

    useEffect(()=>{
        hasLocationPermission()
    }, [])

    return(
        <Provider store={store} >
            <NavigationContainer>
                <AppStack />
            </NavigationContainer>
        </Provider>
        
    )
}