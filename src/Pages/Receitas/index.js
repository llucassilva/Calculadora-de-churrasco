import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, Text, SafeAreaView, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import  Icon  from 'react-native-vector-icons/FontAwesome'
import CardVideo from "../../Components/CardVideo";

export default function Receitas (){
	const navigation = useNavigation();
  const [lista, setLista] = useState([]);
	
  useEffect(() => {
    (async ()=> {
      let carnes = await  AsyncStorage.getItem("Carnes")
      carnes = JSON.parse(carnes)
      setLista(carnes)
    }) ()
  },[])

	return (
    <View style={style.container}>
     

			<View style={style.header}>
				<TouchableOpacity
					style={style.botaoVoltar}
					onPress={() => navigation.goBack()}
          >
					<Icon name="arrow-left" size={20} color="#000" />
				</TouchableOpacity>
				<Text style={style.title}>Sugestão de receitas</Text>
			</View>
      <View style={{flex:1}}>
          <FlatList data={lista}
          renderItem={({ item }) => <CardVideo data={item}/>} />  
      </View>
		</View>

	);
};


const style = StyleSheet.create({
	container: {
      width: "100%",
      height: "100%",
      backgroundColor: "#ED7941",
    },
    header:{
        width: "100%",
        height: 100,
        alignItems:'center',
        justifyContent:"center"
    },
    botaoVoltar: {
      position: "absolute",
      top: 40,
      left: 30,
    },
    title:{
        marginTop: 60,
        fontSize:26,
        fontWeight:"600",
        color:"white"
    },
});
