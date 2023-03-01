import React, { useState, useRef } from "react";
import { View, StyleSheet, Text, Modal, TouchableOpacity } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import  Icon  from 'react-native-vector-icons/MaterialIcons'

export default function CardVideo({ data }) {
  const [verModal, setVerModal] = useState(false);
  const [playing, setPlaying] = useState(false);
  const controlRef = useRef();

  const onStateChange = (state) => {
    if (state === "ended") {
      setPlaying(false);
    }
  };
  return (
    <View style={style.containervideo}>
      <TouchableOpacity style={style.button} onPress={() => setVerModal(true)}>
		<View style={style.containerButton}>
			<View style={style.left}>
				<Icon name="menu-book" size={40} color="#000"/>
			</View>
			<View style={style.right}>
        		<Text style={style.tituloContainer}>Receita com {data.assado}</Text>
        		<Text style={style.subtituloContainer}>Clique para abrir a receita</Text>
			</View>
		</View>
      </TouchableOpacity>
      <Modal animationType="slide" visible={verModal} transparent={true} >
        <View style={style.container}>
          <View style={style.modalContainer}>
            <TouchableOpacity style={style.btnVoltar} onPress={() => {setVerModal(false)}}>
                <Text style={style.texto}>Voltar</Text>
            </TouchableOpacity>
            <YoutubePlayer
            height={205}
            ref={controlRef}
            play={playing}
            videoId={data.ytid}
            onChangeState={onStateChange}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const style = StyleSheet.create({
	containervideo: {
		width: 350,
		height: 100,
		marginLeft: "auto",
		marginRight: "auto",
	},
	containerButton:{
		backgroundColor: "#E95612",
		height: 80,
		flexDirection: "row",
		alignItems: 'center',
		justifyContent: 'space-around',
		marginTop: 20,	
		marginBottom: 20,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		borderRadius: 8,
	},
	tituloContainer:{
		width: '100%',
		fontSize: 18,
		fontWeight: "500",
		textAlign: 'center'
	},
	subtituloContainer:{
		width: '100%',
		fontSize: 14,
		fontWeight: "400",
		textAlign: 'center'
	},
	left:{
		width: "30%",
		height: "100%",
		alignItems: 'center',
		justifyContent: "center"
	},
	right:{
		width: "70%",
		height: "100%",
		padding: 3,
		alignItems: 'center',
		justifyContent: "center"
	},
	container: {
		marginLeft: 10,
		marginRight: 10,
		marginBottom: 10,
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	modalContainer: {
		width: "100%",
		height: "auto",
		backgroundColor: "#fff",
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5,
	},
	btnVoltar: {
		
		backgroundColor: "#E95811",
		padding: 10,
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5,
	},
	texto: {
		fontSize: 18,
		textAlign: 'center',
		fontWeight: '500',
		color: "#fff"
	},

});
