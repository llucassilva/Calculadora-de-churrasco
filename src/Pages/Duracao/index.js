import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import  Icon  from 'react-native-vector-icons/FontAwesome';
import CardTempo from '../../Components/CardTempo';
import Toast from "react-native-toast-message";

function Duracao() {
    const navigation = useNavigation()
    const [Tempo, setTempo] = useState('')

    const guardarBanco = () => {
			Tempo ? AsyncStorage.setItem("Duracao", Tempo) && navigation.navigate("Rateio") :
      Toast.show({
        type: "info",
        position: "top",
        text1: "Selecione uma opção!",
        visibilityTime: 3000,
        autoHide: true,
        onShow: () => {},
        onHide: () => {},
        }); 
		};

    
  return (
    <View style={style.container}>
      <Toast
      
      />
        <View style={style.header}>
        <TouchableOpacity
            style={style.botaoVoltar}
            onPress={() => navigation.goBack()}
            >
            <Icon name='arrow-left' size={20} color="#000"/>
            </TouchableOpacity>
            <Text style={style.title}>Duração</Text>
        </View>
        <View style={style.containerTempo}>
          <View style={style.containerCard}>
            <TouchableOpacity  value="2h" style={Tempo === '2h' ? style.cardActive : style.cardDesable} onPress={() => setTempo('2h')}>
              <CardTempo tempo="2H"/>
            </TouchableOpacity>
            <TouchableOpacity value="4h" style={Tempo === '4h' ? style.cardActive : style.cardDesable} onPress={() => setTempo('4h')}>
              <CardTempo tempo="4H"/>
            </TouchableOpacity>
          </View>
          <View style={style.containerCard}>
            <TouchableOpacity value="6h" style={Tempo === '6h' ? style.cardActive : style.cardDesable} onPress={() => setTempo('6h')}>
              <CardTempo tempo="6H"/>
            </TouchableOpacity>
            <TouchableOpacity value="8h" style={Tempo === '8h' ? style.cardActive : style.cardDesable} onPress={() => setTempo('8h')}>
              <CardTempo tempo="8H"/>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={style.buttonBebidas}
          onPress={() => {
            guardarBanco();
          }}
        >
          <Text style={style.textButton}>Avançar</Text>
        </TouchableOpacity>
    </View>
  )
}
export default Duracao;

const style = StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
      backgroundColor: "#ED7941",
    },
    header:{
        width: "100%",
        height: 200,
        alignItems:'center',
        justifyContent:"center"
    },
    botaoVoltar: {
      position: "absolute",
      top: 40,
      left: 30,
    },
    title:{
        fontSize:26,
        fontWeight:"bold",
        color:"white"
    },
    textButton: {
      fontWeight: "500",
      fontSize: 20,
      color: "#fff",
      lineHeight: 24,
    },
    containerTempo:{
      width:'100%',
      height:300,
      justifyContent:"center",
      alignItems:"center",
      marginLeft:"auto",
      marginRight:"auto",
      padding:8
    },
    containerCard:{
      width:'100%',
      height:'50%',
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-evenly'
    },
    cardActive:{
      backgroundColor:"#F1590F",
      borderRadius: 10
    },
    cardDesable:{
      backgroundColor:"#ED7941"
    },
    buttonBebidas: {
      backgroundColor: "#E95811",
      padding: 10,
      borderRadius: 15,
      shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
      width: 150,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 20,
      position:"absolute",
      bottom:80,
      right:50
    },
  });