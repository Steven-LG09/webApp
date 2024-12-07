import React, {useState,useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator,TransitionPresets } from '@react-navigation/stack';
import SplashScreen from './Screens/SplashScreen'
import SearchScreen from './Screens/SearchScreen'
import CarScreen from './Screens/CarScreen'
import CarDetailsScreen from './Screens/CarDetails'


const Stack = createStackNavigator()

export default function App() {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <SplashScreen />;

  return (
    <NavigationContainer >
      <Stack.Navigator 
        screenOptions={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
      initialRouteName="SearchScreen">
        <Stack.Screen name='SearchScreen' component={SearchScreen} options={{headerShown: false}}/>
        <Stack.Screen name='CarScreen' component={CarScreen} options={{headerShown: true,headerStyle:{backgroundColor: '#4A4947'}}}/>
        <Stack.Screen name='CarDetails' component={CarDetailsScreen} options={{headerShown: true,headerStyle:{backgroundColor: '#4A4947'}}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
