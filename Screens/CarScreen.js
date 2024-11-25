import {SafeAreaView,StyleSheet,Text,View,Image,TouchableOpacity,Dimensions} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, where, query } from '@firebase/firestore';
import { db } from '../Firebase/FirebaseConfig';

const { width } = Dimensions.get('window'); 

export default function CarScreen({ route }) {
  const {dato=""} =route.params || {};

  const [profile, setProfile] = useState(null);
  const [Feed1, setFeed1] = useState([]);

  const fetchProfile = async () => {
    try {
      const q = query(collection(db, 'users'), where('name', '==', dato));
      
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        setProfile({ id: userDoc.id, ...userDoc.data() });
      }
      
      const q1 = query(collection(db, 'userPosts'),where('name', '==', dato),where('type', '==', 'Feed1'));
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
  if (!profile) {
    return <Text>Loading...</Text>;
  }

  return (
    <LinearGradient
      colors={['#4A4947', '#000000', '#000000']}
      style={styles.gradient}>
      <SafeAreaView style={styles.container}>
        <View style={styles.secOne}>
          <View style={styles.secIma}>
            {profile.photo ? (
              <Image style={styles.imagePro} source={{ uri: profile.photo }} />
            ) : (
              <Text>No image available</Text>
            )}
            <View>
              <Text style={styles.textSecDos}>0 Posts</Text>
              <Text style={styles.textSecDos}>0 Seguidores</Text>
              <Text style={styles.textSecDos}>0 Seguidos</Text>
            </View>
          </View>
          <Text style={styles.secDos}>
            <Text style={{ fontWeight: 'bold' }}>{profile.name}</Text>
            {'\n'}
            {profile.description}
          </Text>
        </View>
        <View style={styles.secTres}>
          <Text style={styles.buttonsPi}>Posts</Text>
          <Text style={styles.buttonsP}>Posts 2</Text>
          <Text style={styles.buttonsP}>Saves</Text>
        </View>
          <View style={styles.wrapper}>
            {Feed1.map( item => (
              <View style={styles.postsF}>
                {item.MainImage ? (
                  <Image 
                  style={styles.imageFeed}
                  source={{uri: item.MainImage}}
                  />
                ) : (
                  <Text>No image available</Text>
                )}
              </View>
            ))}
          </View>
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
    width: 120,
    height: 120,
    borderRadius: 15,
    elevation: 9
  },
  imagePro: {
    width: 100,
    height: 100,
    borderRadius: 50,
    shadowColor: 'white',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 9,
  },
  secOne: {
    backgroundColor: 'black',
    padding: 5,
    margin: 2,
    borderRadius: 5,
    shadowColor: 'white',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 9,
    borderWidth: 1,
    borderColor: '#192f6a',
  },
  secIma: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: 20,
    marginRight: 20,
  },
  secDos: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    fontFamily: 'serif',
    fontSize: 10,
    color: 'white',
  },
  textSecDos: {
    textAlign: 'left',
    marginBottom: 5,
    fontFamily: 'serif',
    fontSize: 13,
    color: 'white',
  },
  secTres: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 2,
    backgroundColor: 'black',
    height: 50,
    shadowColor: 'white',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 9,
    borderWidth: 1,
    borderColor: '#192f6a',
  },
  buttonsP: {
    fontSize: 15,
    color: 'white',
  },
  buttonsPi: {
    fontSize: 15,
    backgroundColor: '#192f6a',
    borderRadius: 5,
    elevation: 9,
    color: 'white',
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
});