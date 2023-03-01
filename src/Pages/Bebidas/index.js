import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message'
import Icon from 'react-native-vector-icons/FontAwesome';
import Agua from '../../Img/Agua.png';
import Suco from '../../Img/suco.png';
import Refrigerante from '../../Img/refrigerante.png';
import Cerveja from '../../Img/cerveja.png';

function Bebidas() {
  const navigation = useNavigation();
  const [agua, setAgua] = useState(false);
  const [suco, setSuco] = useState(false);
  const [refrigerente, setRefrigerente] = useState(false);
  const [cerveja, setCerveja] = useState(false);

  const dataBebidas = [
		{ bebida: "Água", preco: 2, estado: agua },
		{ bebida: "Suco", preco: 8, estado: suco },
		{ bebida: "Refrigerante", preco: 9, estado: refrigerente },
		{ bebida: "Cerveja", preco: 10, estado: cerveja },
	];

  const guardarBanco = () => {
    let true_keys = dataBebidas.filter((key) => key.estado === true);
    true_keys.length > 0
      ? AsyncStorage.setItem('Bebidas', JSON.stringify(true_keys)) &&
        navigation.push('Duracao') :
        Toast.show({
          type: "info",
          position: "top",
          text1: "Escolha pelo menos uma opção para prosseguir!",
          visibilityTime: 3000, 
          autoHide: true,
          onShow: () => {},
          onHide: () => {},
          });;
  }

  return (
    <View style={style.container}>
      <Toast

      />
      <View style={style.header}>
        <TouchableOpacity
          style={style.botaoVoltar}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color="#000" />
        </TouchableOpacity>
        <Text style={style.title}>Escolha as bebidas</Text>
        <Text>(Clique para selecionar as bebidas)</Text>
      </View>
      <View style={style.containerBebida}>
        <View style={style.containerCard}>
          <TouchableOpacity
            style={agua ? style.cardActive : style.cardDesable}
            onPress={() => (agua ? setAgua(false) : setAgua(true))}>
            <View style={style.containerCardbebida}>
              <Image
                source={Agua}
                alt=""
                style={{ width: 70, height: 70, marginBottom: 7 }}
              />
              <Text
                style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                Água
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={suco ? style.cardActive : style.cardDesable}
            onPress={() => (suco ? setSuco(false) : setSuco(true))}>
            <View style={style.containerCardbebida}>
              <Image
                source={Suco}
                alt=""
                style={{ width: 70, height: 70, marginBottom: 7 }}
              />
              <Text
                style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                Suco
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={style.containerCard}>
          <TouchableOpacity
            style={refrigerente ? style.cardActive : style.cardDesable}
            onPress={() =>
              refrigerente ? setRefrigerente(false) : setRefrigerente(true)
            }>
            <View style={style.containerCardbebida}>
              <Image
                source={Refrigerante}
                alt=""
                style={{ width: 70, height: 70, marginBottom: 7 }}
              />
              <Text
                style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                Refrigerante
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={cerveja ? style.cardActive : style.cardDesable}
            onPress={() =>  {(cerveja ? setCerveja(false) : setCerveja(true));
              Toast.show({
                type: "info",
                position: "top",
                text1: "Bebidas alcólicas apenas para maiores de 18 anos!",
                text2: "Não nos responsabilizamos pelo seus atos",
                visibilityTime: 3000,
                autoHide: true,
                onShow: () => {},
                onHide: () => {},
              });
            }}>
            <View style={style.containerCardbebida}>
              <Image
                source={Cerveja}
                alt=""
                style={{ width: 70, height: 70, marginBottom: 7 }}
              />
              <Text
                style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                Cerveja
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={style.buttonBebidas} onPress={() => {guardarBanco()}}>
        <Text style={style.textButton}>Avançar</Text>
      </TouchableOpacity>
    </View>
  );
}
export default Bebidas;

const style = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ED7941',
    position: 'relative',
  },
  containerCardbebida: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#E95811',
    
    
  },
  header: {
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoVoltar: {
    position: 'absolute',
    top: 40,
    left: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    color: 'white',
  },
  textButton: {
    fontWeight: '500',
    fontSize: 20,
    color: '#fff',
    lineHeight: 24,
  },
  containerBebida: {
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 8,
  },
  containerCard: {
    width: '100%',
    height: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  cardActive: {
    backgroundColor: '#F1590F',
    borderRadius: 10,
  },
  cardDesable: {
    backgroundColor: '#ED7941',
  },
  buttonBebidas: {
    backgroundColor: '#E95811',
    padding: 10,
    borderRadius: 15,
    width: 150,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    position: 'absolute',
    bottom: 80,
    right: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
