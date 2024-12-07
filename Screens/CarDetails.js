import {
    SafeAreaView,
    StyleSheet,
    Text,
    Image,
    ScrollView,
  } from 'react-native';
  import { LinearGradient } from 'expo-linear-gradient';
  import React from 'react';
  
  export default function CarDetailsScreen({ route }) {
    const { carData } = route.params;
  
    return (
      <LinearGradient
        colors={['#4A4947', '#000000', '#000000']}
        style={styles.gradient}>
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <Image
              style={styles.image}
              resizeMode="contain"
              source={{ uri: carData.MainImage }}
            />
            <Text style={styles.title}>{carData.MainName}</Text>
            <Text style={styles.description}>{carData.Description}</Text>
            <Text style={styles.info}>Price: ${carData.Price}</Text>
            <Text style={styles.info}>Year: {carData.Year}</Text>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    );
  }
  
  const styles = StyleSheet.create({
    gradient: { 
      flex: 1 
      },
    container: { 
      flex: 1, 
      padding: 20 
      },
    image: { 
      marginTop: 20,
      width: '100%', 
      height: 200, 
      marginBottom: 20,
      borderRadius: 25,
      },
    title: { 
      fontSize: 24, 
      fontWeight: 'bold', 
      color: '#fff', 
      marginBottom: 10 , 
      textAlign: 'center',
      fontFamily: 'serif'
      },
    description: { 
      fontSize: 16, 
      color: '#ddd', 
      marginBottom: 10,
      fontFamily: 'serif',
      marginLeft: 50,
      marginRight: 50
      },
    info: { 
      fontSize: 18, 
      color: '#bbb', 
      marginVertical: 5,
      textAlign: 'center'},
  });
  