import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Lottie from 'lottie-react-native';

export default function SplashScreen (){
  return (
    <View style={styles.container}>
      <Lottie
        source={require('../assets/Loading.json')}
        autoPlay
        loop
        style={styles.animation}
      />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  animation: {
    width: 150,
    height: 150,
  },
  loadingText: {
    textAlign: 'center',
    color: '#192f6a',
    fontSize: 20,
    fontFamily: 'serif',
    textShadowColor: '#192f6a',
    textShadowOffset: {width: 0, height: 3},
    textShadowRadius: 6,
  },
});