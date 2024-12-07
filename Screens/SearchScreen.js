import {SafeAreaView,StyleSheet,Text,View,TouchableOpacity,Image,TextInput,Dimensions,ScrollView,FlatList} from 'react-native';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { db } from '../Firebase/FirebaseConfig';
import { collection, query, where, getDocs } from '@firebase/firestore';

const screenWidth = Dimensions.get('window').width;

export default function SearchScreen({navigation}) {
  const [queryText, setQueryText] = useState('');
  const [results, setResults] = useState([]);
  const [isVisible,setIsVisible] = useState(false);

  const searchUsers = async (text) => { //el texto escrito en el input es comparado con el atributo name que esta en la base de datos nameCars
    setIsVisible(true)
    setQueryText(text);

    if (text.trim() === '') { //Si el texto esta vacio la funcion limpia la busqueda en la base de datos
      setResults([]);
      return;
    }

    try {
      const usersQuery = query(
        collection(db, 'nameCars'),
        where('name', '>=', text), //Estas condiciones de where aseguran que el texto colocado el input sea exactamente el mismo que hay en la base de datos, por ejemplo si se coloca car, los resultados seran car, caravan o carrot, pero no cat
        where('name', '<=', text + '\uf8ff')
      );

      const snapshot = await getDocs(usersQuery);

      const names = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setResults(names);
    } catch (error) {
      console.error('Error searching cars:', error);
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

        {isVisible &&<FlatList
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
        />}
          <View style={styles.app}>
            <View style={styles.rowB}>
              <Image
                style={styles.imageB}
                source={{ uri: 'https://www.topgear.com/sites/default/files/2021/12/18.%20Koenigsegg%20Jesko.jpeg' }}
              />
              <Text style={styles.textB}>
                Ferrari
              </Text>
              <Image
                style={styles.imageB}
                source={{ uri: 'https://sharpmagazine.com/wp-content/uploads/2020/01/SharpJan20_Supercars_feat.jpg' }}
              />
              <Image
                style={styles.imageB}
                source={{ uri: 'https://bc65dad2d1fd66cdbfb5.b-cdn.net/wp-content/uploads/Feature-Bugatti-Chiron.jpg' }}
              />
              <Text style={styles.textB}>
                Mercedez-Benz
              </Text>
              <Image
                style={styles.imageB}
                source={{ uri: 'https://www.oraclefinance.co.uk/wp-content/uploads/2024/01/Small-15767-McLaren750STheDrive.jpg' }}
              />
            </View>

            <View style={styles.rowB}>
              <Image
                style={styles.imageB}
                source={{ uri: 'https://cdn-2.motorsport.com/images/amp/63vxpl7Y/s1000/ferrari-vision-gran-turismo-1.jpg' }}
              />
              <Image
                style={styles.imageB}
                source={{ uri: 'https://autos93.com/cdn/shop/files/97F9B5E4-5425-4557-BEBC-9ACAB24B007B_1024x1024@2x.jpg' }}
              />
              <Text style={styles.textB}>
                Aston Martin
              </Text>
              <Image
                style={styles.imageB}
                source={{ uri: 'https://i.ytimg.com/vi/f6KZVr5Z2Cs/maxresdefault.jpg' }}
              />
              <Image
                style={styles.imageB}
                source={{ uri: 'https://hips.hearstapps.com/hmg-prod/images/aston-martin-valkyrie-051-64061b1c803a2.jpg' }}
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
                source={{ uri: 'https://www.elcarrocolombiano.com/wp-content/uploads/2016/10/20161002-FERRARI-LAFERRARI-APERTA-01.jpg' }}
              />
              <Image
                style={styles.imageB}
                source={{ uri: 'https://di-uploads-pod7.dealerinspire.com/mercedesbenzofneworleans/uploads/2019/11/suv-img-glc.jpg' }}
              />
              <Text style={styles.textB}>
                BMW
              </Text>
              <Image
                style={styles.imageB}
                source={{ uri: 'https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/facelift_2019/model_gw/urus/2024/10_08_refresh/s1-mobile.jpg' }}
              />
              <Image
                style={styles.imageB}
                source={{ uri: 'https://www.motor.com.co/__export/1717106427686/sites/motor/img/2024/05/30/bugatti_chiron_lxultime_01_crop1717106124011.jpg_1665074216.jpg' }}
              />
            </View>
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
  buscar: {
    textAlign: 'center',
    fontSize: 20,
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
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageB: {
    width: 'auto',
    height: 118,
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
