import {SafeAreaView,StyleSheet,Text,View,Image,Dimensions,ScrollView} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, where, query } from '@firebase/firestore';
import { db } from '../Firebase/FirebaseConfig';

const { width } = Dimensions.get('window'); 

export default function CarScreen({ route, navigation}) {
  const {dato=""} =route.params || {};

  const [Feed1, setFeed1] = useState([]);

  const fetchProfile = async () => {
    try {      
      const q1 = query(collection(db, 'carPosts'),where('name', '==', dato));
      const querySnapshot1 = await getDocs(q1);
      const Feed1List = querySnapshot1.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setFeed1(Feed1List);
    } catch (error) {
      console.error('Error fetching user feed: ', error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);
  if (!Feed1) {
    return <Text>Loading...</Text>;
  }

  return (
    <LinearGradient
      colors={['#4A4947', '#000000', '#000000']}
      style={styles.gradient}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>{dato}</Text>
        <ScrollView>
        <View style={styles.wrapper}>
          {Feed1.map( item => (
            <View style={styles.postsF}>
              {item.MainImage ? (
                <Image 
                style={styles.imageFeed}
                resizeMode="contain"
                source={{uri: item.MainImage}}
                />
              ) : (
                <Text>No image available</Text>
              )}
              <Text style={styles.carName}
              onPress={()=>navigation.navigate('CarDetails',{carData: item})}>{item.MainName}</Text>
            </View>
          ))}
        </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  imageFeed: {
    width: 280,
    height: 230,
    borderRadius: 35,
    elevation: 9,
    shadowColor: 'white',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: 1,
    borderColor: 'white'
  },
  postsF: {
    margin: 5,
    elevation: 9,
    borderRadius: 15,
    shadowColor: 'white',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap', 
    justifyContent: 'center',
    width: width - 20,
  },
  title: {
    textAlign: 'center',
    color: 'white',
    fontSize: 30,
    fontFamily: 'serif',
    textShadowColor: '#192f6a',
    textShadowOffset: {width: 0, height: 3},
    textShadowRadius: 6,
    elevation: 18
  },
  carName: {
    textAlign: 'center',
    color: 'white',
    fontSize: 10,
    fontFamily: 'serif',
    textShadowColor: '#192f6a',
    textShadowOffset: {width: 0, height: 3},
    textShadowRadius: 6,
    elevation: 18
  },
});