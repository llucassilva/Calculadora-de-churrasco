import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-toast-message";

export default function Rateio() {
  const navigation = useNavigation();

  const [Rateio, setRateio] = useState(1);
  const [nome, onChangeNome] = useState();
  const [tel, onChangeTel] = useState();

  useEffect(() => {
		navigation.addListener("focus", async () => {
			let Rateio = await AsyncStorage.getItem("Rateio");
			if (Rateio == null) {
				setRateio(1);
			}
		});
	}, []); 

  const guardarBanco = () => {
     Rateio > 0 && nome && tel
				? AsyncStorage.setItem("Rateio", JSON.stringify(Rateio)) &&
				  AsyncStorage.setItem("Contato", JSON.stringify(contato)) &&
				  navigation.navigate("Resultado")
				: Toast.show({
						type: "info",
						position: "top",
						text1: "Preencha todos os campos",
						visibilityTime: 3000,
						autoHide: true,
						onShow: () => {},
						onHide: () => {},
				  });
  };

  const mascaraTel = (tel) => {
		if (tel) {
			if (tel.length == 11) {
          tel = tel.replace(/^(\d\d)(\d)/g, "($1)$2")
          tel = tel.replace(/(\d{5})(\d)/,"$1-$2")
          return tel
			}
		}
	};

  var contato = {
    responsavel: nome,
    telContato: tel
  }

  return (
		<ScrollView style={style.container}>
			<Toast />
			<View style={style.header}>
				<TouchableOpacity
					style={style.botaoVoltar}
					onPress={() => navigation.goBack()}
				>
					<Icon name="arrow-left" size={20} color="#000" />
				</TouchableOpacity>
				<Text style={style.title}>Quantas pessoas pagarão?</Text>
			</View>

			<View style={style.containerPessoa}>
				<Text style={style.adicionar}>(Aperte para adicionar)</Text>
				<View style={style.containerCard}>
					<View style={style.iconContainer}>
						<Icon name="male" size={45} color={"#000"} />
					</View>
					<View style={style.buttonContainer}>
						<TouchableOpacity onPress={() => setRateio(Rateio - 1)}>
							<Text style={style.icon}>-</Text>
						</TouchableOpacity>
						<Text style={{ color: "white", fontSize: 32 }}>
							{Rateio < 1 ? setRateio(1) && Rateio : Rateio}
						</Text>
						<TouchableOpacity onPress={() => setRateio(Rateio + 1)}>
							<Text style={style.icon}>+</Text>
						</TouchableOpacity>
					</View>
				</View>
				<Text style={style.avisos}>
					o valor será divido igualmente entre a quantidade de pessoas
				</Text>

				<View style={style.containerInput}></View>
				<Text style={style.title2}>Informações de contato:</Text>
				<View style={style.containerfinal}>
					<TextInput
						style={style.input}
						onChangeText={onChangeNome}
						value={nome}
						placeholder="Nome"
            maxLength={30}
					/>
					<TextInput
						style={style.input}
						onChangeText={onChangeTel}
						value={mascaraTel(tel)}
						placeholder= "(00)12345-6789"
            			keyboardType="numeric"
            			maxLength={14}
            			minLength={14}
					/>
				</View>
			</View>
			<TouchableOpacity
				style={style.buttonParticipante}
				onPress={() => {
					guardarBanco();
				}}
			>
				<Text style={style.textButton}>Avançar</Text>
			</TouchableOpacity>
		</ScrollView>
	);
}

const style = StyleSheet.create({
	container: {
		width: "100%",
		height: "100%",
		backgroundColor: "#ED7941",
	},
	containerCard: {
		width: 300,
		height: 60,
		flexDirection: "row",
		marginBottom: 50,
	},
	iconContainer: {
		width: "20%",
		height: "100%",
		alignItems: "center",
		justifyContent: "center",
	},
	buttonContainer: {
		width: "80%",
		height: "100%",
		flexDirection: "row",
		justifyContent: "space-evenly",
		alignItems: "center",
	},
	icon: {
		fontSize: 38,
	},
	avisos: {
		textAlign: "center",
		fontSize: 15,
		fontWeight: "500",
		color: "white",
		flexWrap: "wrap",
		width: "80%",
	},
	adicionar: {
		color: "white",
	},
	header: {
		width: "100%",
		height: 200,
		alignItems: "center",
		justifyContent: "center",
	},
	botaoVoltar: {
		position: "absolute",
		top: 40,
		left: 30,
	},
	title: {
		fontSize: 26,
		fontWeight: "600",
		color: "white",
	},
	title2: {
		fontSize: 26,
		fontWeight: "600",
		color: "white",
    marginBottom: 20
	},
	containerPessoa: {
		alignItems: "center",
	},
	buttonParticipante: {
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
		position: "absolute",
		bottom: "0%",
		right: 50,
		marginBottom: 20,
	},
	textButton: {
		fontWeight: "500",
		fontSize: 20,
		color: "#fff",
		lineHeight: 24,
	},
	containerInput: {
		width: "100%",
    	marginTop: 50,
	},
	input: {
    	marginBottom: 20,
		backgroundColor: "#ffff",
    	color: "#000",
		width: 300,
		height: 50,
		marginLeft: "auto",
		marginRight: "auto",
		padding: 10,
		borderRadius: 10,
	},
	containerfinal:{
		marginBottom: 150
	},
});
