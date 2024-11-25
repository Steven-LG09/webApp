import {SafeAreaView,StyleSheet,Text,View,TouchableOpacity,Image,TextInput,Dimensions,ScrollView,FlatList} from 'react-native';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { db } from '../Firebase/FirebaseConfig';
import { collection, query, where, getDocs } from '@firebase/firestore';

const screenWidth = Dimensions.get('window').width;

export default function SearchScreen({navigation}) {
  const [queryText, setQueryText] = useState('');
  const [results, setResults] = useState([]);

  const searchUsers = async (text) => {
    setQueryText(text);

    if (text.trim() === '') {
      setResults([]);
      return;
    }

    try {
      const usersQuery = query(
        collection(db, 'users'),
        where('name', '>=', text),
        where('name', '<=', text + '\uf8ff')
      );

      const snapshot = await getDocs(usersQuery);

      const users = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setResults(users);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  return (
    <LinearGradient
      colors={['#4A4947', '#000000', '#000000']}
      style={styles.gradient}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Encuentra tu vehiculo favorito</Text>
        <TextInput
          style={styles.buscar}
          value={queryText}
          onChangeText={searchUsers}
          placeholder="🔍 Buscar"
        />

        <FlatList
          style={styles.flatUser}
          data={results}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity 
            style={styles.buttons} 
            onPress={()=>navigation.navigate('CarScreen',{dato: item.name})}
            >
              <Text style={styles.item}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
        <ScrollView>
          <View style={styles.app}>
            <View style={styles.rowB}>
              <Image
                style={styles.imageB}
                source={{ uri: 'https://picsum.photos/200' }}
              />
              <Text style={styles.textB}>
                Ferrari
              </Text>
              <Image
                style={styles.imageB}
                source={{ uri: 'https://picsum.photos/450' }}
              />
              <Image
                style={styles.imageB}
                source={{ uri: 'https://picsum.photos/210' }}
              />
              <Text style={styles.textB}>
                Mercedez-Benz
              </Text>
              <Image
                style={styles.imageB}
                source={{ uri: 'https://picsum.photos/410' }}
              />
            </View>

            <View style={styles.rowB}>
              <Image
                style={styles.imageB}
                source={{ uri: 'https://picsum.photos/300' }}
              />
              <Image
                style={styles.imageB}
                source={{ uri: 'https://picsum.photos/250' }}
              />
              <Text style={styles.textB}>
                Aston Martin
              </Text>
              <Image
                style={styles.imageB}
                source={{ uri: 'https://picsum.photos/310' }}
              />
              <Image
                style={styles.imageB}
                source={{ uri: 'https://picsum.photos/260' }}
              />
              <Text style={styles.textB}>
                Lamborghini
              </Text>
            </View>

            <View style={styles.rowB}>
              <Text style={styles.textB}>
                Audi
              </Text>
              <Image
                style={styles.imageB}
                source={{ uri: 'https://picsum.photos/100' }}
              />
              <Image
                style={styles.imageB}
                source={{ uri: 'https://picsum.photos/350' }}
              />
              <Text style={styles.textB}>
                BMW
              </Text>
              <Image
                style={styles.imageB}
                source={{ uri: 'https://picsum.photos/110' }}
              />
              <Image
                style={styles.imageB}
                source={{ uri: 'https://picsum.photos/360' }}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:50
  },
  gradient: {
    flex: 1, 
  },
  buscar: {
    textAlign: 'center',
    backgroundColor: 'white',
    marginLeft: 10,
    marginRight: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    shadowColor: 'white',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 9,
  },
  app: {
    margin: 10,
    flexDirection: 'row',
  },
  imageB: {
    width: 'auto',
    height: 130,
    margin: 5,
    borderRadius: 5
  },
  textB: {
    marginTop: 5,
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'black',
    borderRadius: 5,
    height: 'auto',
    fontFamily: 'serif',
    borderWidth: 0.5,
    borderColor: '#192f6a',
    padding: 2
  },
  rowB: {
    width: screenWidth * 0.313
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    color: 'white',
    fontFamily: 'serif',
  },
  flatUser: {
    backgroundColor: 'black',
    marginLeft: 10,
    marginRight: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  buttons: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 'auto',
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
});
