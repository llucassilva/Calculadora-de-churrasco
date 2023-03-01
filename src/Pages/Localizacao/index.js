import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";

import { useNavigation } from "@react-navigation/native";

export default function App() {
  const navigation = useNavigation();
  const [location, setLocation] = useState({
    latitude: "",
    longitude: "",
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [loading, setLoading] = useState(true);
  const [loadingCep, setLoadingCep] = useState(true);
  const [loadingMercado, setLoadingMercado] = useState(true)
  const [loadingAcougue, setLoadingAcougue] = useState(true)
  const [cep, setCep] = useState();
  const [markers, setMarkers] = useState([])
  const [local, setLocal] = useState();
  const [mapRegion, setMapRegion] = useState({
    latitude: "",
    longitude: "",
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }


      let local = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: local.coords.latitude,
        longitude: local.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      setLoading(false);
    })();
  }, []);
  const buscarCep = async () => {
    let { data } = await axios
      .get(`https://viacep.com.br/ws/${cep}/json/`)
      .catch((err) => {
        alert("Digite o cep");
      });
    setLocal(data);
    let response = await axios
      .get(
        `https://geocode.search.hereapi.com/v1/geocode?q=${data.logradouro}+${data.bairro}&apiKey=vpElMOWqr4ByGBopvqPMFd1XGwI2kg0ah8R0q32Mieg`
      )
      .catch((erro) => {
      });
    setMapRegion({
      latitude: response.data.items[0].position.lat,
      longitude: response.data.items[0].position.lng,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    setLoadingCep(false);
  };
  const buscarAcougue = async () => {
    let lat = mapRegion.latitude
    let lng = mapRegion.longitude
    let { data } = await axios.get(`https://discover.search.hereapi.com/v1/discover?at=${lat},${lng}&q=a%C3%A7ougue&apiKey=vpElMOWqr4ByGBopvqPMFd1XGwI2kg0ah8R0q32Mieg`)
    setMarkers(data.items)
    setLoadingAcougue(false)
  }
  
  const buscarMercado = async () => {
    let lat = mapRegion.latitude
    let lng = mapRegion.longitude
    let { data } = await axios.get(`https://discover.search.hereapi.com/v1/discover?at=${lat},${lng}&q=mercado&apiKey=vpElMOWqr4ByGBopvqPMFd1XGwI2kg0ah8R0q32Mieg`)
    setMarkers(data.items)
    setLoadingMercado(false)
  }

  return (
    <View style={style.container}>
      <View style={style.header}>
        <TouchableOpacity
          style={style.botaoVoltar}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={20} color="#000" />
        </TouchableOpacity>
        <Text style={style.title}>Localização</Text>
        <Text>(Digite o CEP do lugar do churrasco)</Text>
      </View>
      <View style={style.containerInput}>
        <TextInput
          placeholder="Digite o CEP do local"
          onChangeText={setCep}
          value={cep}
          keyboardType="numeric"
          maxLength={9}
          style={style.cep}
        />
        <TouchableOpacity style={style.iconSearch} onPress={buscarCep}>
          <Icon name="search" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      <Text style={style.subtitle}>Após digitar o CEP</Text>
      <Text style={style.subtitle2}>Clique para buscar açougues na região</Text>
      <View style={style.mapContainer}>
      {loading ? (
        ""
      ) : (      
          
            <MapView
              initialRegion={location}
              region={mapRegion}
              style={style.map}
              showsMyLocationButton={true}
            >
              <Marker
                coordinate={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                }}
                title="Sua Localização"
                description="Você está aqui"
              />
              {loadingCep ? (
                ""
              ) : (
                <Marker
                  coordinate={{
                    latitude: mapRegion.latitude,
                    longitude: mapRegion.longitude,
                  }}
                  title="Local do churrasco"
                  description="Aqui será realizado o churrasco"
                />
              )}
              {loadingAcougue ? "" : markers.map(item => (
                 <Marker
                 key={item.position.lat}
                  coordinate={{
                    latitude: item.position.lat,
                    longitude: item.position.lng,
                  }}
                  title={item.title}
                  description={`${item.distance} metros de você`}
                />
              ))}
              {loadingMercado ? "" : markers.map(item => (
                 <Marker
                 key={item.position.lat}
                  coordinate={{
                    latitude: item.position.lat,
                    longitude: item.position.lng,
                  }}
                  title={item.title}
                  description={`${item.distance} metros de você`}
                />
              ))}
            </MapView>
      )}
       </View>
       <TouchableOpacity style={style.lugaresProx} onPress={buscarAcougue && buscarMercado}>
        <Text style={{fontSize:16, color:"#fff"}}>Clique para buscar comercios próximos</Text>
        </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#ED7941",
  },
  header: {
    width: "100%",
    height: 160,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "90%",
    height: 360,
    marginLeft: "auto",
    marginRight: "auto",
  },
  botaoVoltar: {
    position: "absolute",
    top: 40,
    left: 30,
  },
  cep: {
    backgroundColor: "#ffff",
    width: "100%",
    height: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    paddingLeft: 13,
    borderRadius: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "white",
  },
  iconSearch: {
    zIndex: 999,
    position: "absolute",
    right: 18,
  },
  containerInput: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    height: 50,
    position: "relative",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 30,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  mapContainer: {
    backgroundColor: "#fff",

    width: 350,
    height: 420,
    marginLeft: "auto",
    marginRight: "auto",

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  titleMap:{
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
    paddingBottom: 6
  },
  titleScroll:{
    marginLeft: "auto",
    marginRight: "auto",
    fontSize: 18,
    fontWeight: "700"
  },
  subtitleScroll:{
    marginLeft: "auto",
    marginRight: "auto",
    fontSize: 16,
    fontWeight: "500"
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
    bottom: 20,
    right: 30,
  },
  textButton: {
    fontWeight: "500",
    fontSize: 20,
    color: "#fff",
    lineHeight: 24,
  },
  lugaresProx:{
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: -10,
    width: 350,
    height: 30,
    backgroundColor: "#E95811",
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
    zIndex: 999,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  subtitle:{
    marginLeft: "auto",
    marginRight: "auto",
    fontSize: 16
  },
  subtitle2:{
    marginLeft: "auto",
    marginRight: "auto",
    fontSize: 16,
    marginBottom: 20
  }
});

