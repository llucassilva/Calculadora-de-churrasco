import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, createContext, useEffect, useState, ActivityIndicator } from "react";
import Data, { data } from '../data'

export const Context = createContext();

export default function Provider({ children }) {
		const CalcularCarne = (listaPessoas,listaCarnes, listaBebidas) => {
			//Filtrar a quantiadde de pessoas
			let qtdHomem = listaPessoas.filter(item => item.sexo === "homem")
			let qtdMulher = listaPessoas.filter(item => item.sexo === "mulher")
			let qtdCrianca = listaPessoas.filter(item => item.sexo === "crianca")
			//Tipo de carne que a pessoa escolheu
			let tiposBov = listaCarnes.filter (item => item.tipo === "bovino")
			let tiposFrango = listaCarnes.filter (item => item.tipo === "frango")
			let tiposSuino = listaCarnes.filter (item => item.tipo === "suino")
			let paoDeAlho = listaCarnes.filter (item => item.tipo === "pao" && item.estado === true)
			
			let Bebida = listaBebidas.filter(item => item.estado === true)
			var tiposB = tiposBov
			var tiposF = tiposFrango
			var tiposS = tiposSuino
			//teste

			//Homem
			if(qtdHomem.length >= 1){
				var numHomens = qtdHomem[0].quantidade
			}else{
				numHomens = 0
			}

			// Mulher	
			if(qtdMulher.length >= 1){
				var numMulher = qtdMulher[0].quantidade

			}else{
				numMulher = 0
			}
			//Crianca
			if(qtdCrianca.length >= 1){
				var numCrianca = qtdCrianca[0].quantidade

			}else{
				numCrianca = 0
			}

			//calculo de litros de bebida
			let litrosAdult = (numHomens + numMulher) * 1500
			let litrosCrianca = (numCrianca * 1000) / Bebida.filter(item => item.bebida != "Cerveja").length
			let litrostotal = litrosAdult / Bebida.length
			litrostotal += litrosCrianca
			litrostotal = litrostotal / 1000
			var litrosAlcool = (litrosAdult / 1000) / Bebida.length

			
			if(tiposSuino.length >= 1 ){
				var qntdHomenS = (data[0].carne.homem.suino * numHomens) / 1000
				var qntdMulheresS = (data[0].carne.mulher.suino * numMulher) / 1000	
				var qntdCriancaS = (data[0].carne.crianca.suino * numCrianca) / 1000;	
			}
			if(tiposBov.length >= 1){
				var qntdHomenC = (data[0].carne.homem.carne * numHomens) / 1000
				var qntdMulheresC = (data[0].carne.mulher.carne * numMulher) / 1000	
				var qntdCriancaC = (data[0].carne.crianca.carne * numCrianca) / 1000;
			}
			if(tiposFrango.length >= 1){
				var qntdHomenF = (data[0].carne.homem.frango * numHomens) / 1000
				var qntdMulheresF = (data[0].carne.mulher.frango * numMulher) / 1000	
				var qntdCriancaF = (data[0].carne.crianca.frango * numCrianca) / 1000;	
			}
			
			let tipos1 = tiposBov.map(item => item.preco);
			let tipos2 = tiposFrango.map(item => item.preco)
			let tipos3 = tiposSuino.map(item => item.preco)	


			if (tiposBov.length > 0) {
				tiposBov =  tiposBov.length
			} else {
				tiposBov = 1;	
			}

			if (tiposFrango.length > 0) {
				tiposFrango = tiposFrango.length
			} else {
				tiposFrango = 1;
			}

			if (tiposSuino.length > 0 ) {
				tiposSuino =  tiposSuino.length
			} else {
				tiposSuino = 1;
			}

			var qtdCarne = (qntdHomenC + qntdMulheresC + qntdCriancaC) / tiposBov
			var qtdFrango = (qntdHomenF + qntdMulheresF + qntdCriancaF) / tiposFrango
			var qtdSuino = (qntdHomenS + qntdMulheresS + qntdCriancaS) / tiposSuino
			
			var carvao = 0
			var sal = 0
			
			//preço da carne bovina
			var precoTotalC = 0
			for(let i  = 0; i < tipos1.length; i++){
				let precoFinal = (tipos1[i] * Number(qtdCarne.toFixed(2))) / tiposBov;
				precoTotalC += precoFinal
				Object.assign(tiposB[i], { total: precoFinal.toFixed(2) });
				carvao += Number(qtdCarne.toFixed(2))
				sal += Number(qtdCarne.toFixed(2))
			}

			//preço do frango
			var precoTotalF = 0;
			for(let i  = 0; i < tipos2.length; i++){
				let precoFinal = (tipos2[i] * Number(qtdFrango.toFixed(2))) / tiposFrango;
				precoTotalF += precoFinal;
				Object.assign(tiposF[i], { total: precoFinal.toFixed(2) });	
				carvao += Number(qtdFrango.toFixed(2))
				sal += Number(qtdFrango.toFixed(2))
			}

			//preço da carne suina
			var precoTotalS = 0;
			for(let i  = 0; i < tipos3.length; i++){
				let precoFinal = (tipos3[i] * Number(qtdSuino.toFixed(2))) / tiposSuino;
				precoTotalS += precoFinal;
				Object.assign(tiposS[i], { total: precoFinal.toFixed(2) });
				carvao += Number(qtdSuino.toFixed(2))	
				sal += Number(qtdSuino.toFixed(2))	
			}

			//preço da bebida
			for(let i  = 0; i < Bebida.length; i++){
				if(Bebida[i].bebida === "Cerveja"){
					let precoFinal = (Bebida[i].preco * Number(litrosAlcool.toFixed(2)));
					Object.assign(Bebida[i], { litrosTotal: Math.round(litrostotal) });	 
					Object.assign(Bebida[i], { total: precoFinal.toFixed(2) });	
				}else{
					let precoFinal = (Bebida[i].preco * Number(litrostotal.toFixed(2)));
					Object.assign(Bebida[i], { total: precoFinal.toFixed(2) });	
					Object.assign(Bebida[i], { litrosTotal: Math.round(litrostotal) });	 
				}
			}

			//outros
			carvao = (carvao * 0.66).toFixed(2)
			carvao = Math.round(carvao/2.5)
			
			if (sal <= 16){
				sal = 1
			}else{
				let pacote = sal
				let pacotesal = 0
				while(pacote > 1){
					pacote /= 16
					pacotesal += 1
				}
				sal = pacotesal
			}
			
			
			var arroz = (numHomens + numMulher) * 0.1 + numCrianca * 0.09
			if (arroz <= 1){
				arroz = 1
			}else{
				let pacote = arroz
				let pacotearroz = 0
				while(pacote >= 1){
					pacote -= 1
					pacotearroz += 1
				}
				arroz = pacotearroz
			}
			

			var farofa = (numHomens + numMulher + numCrianca) * 30
			if (farofa <= 500){
				farofa = 1
			}else{
				let pacote = farofa
				let pacotefarofa = 0
				while(pacote > 1){
					pacote /= 500
					pacotefarofa += 1
				}
				farofa = pacotefarofa
			}

			var pao = (numHomens + numMulher) * 2 + numCrianca * 1

			paoDeAlho.length > 0 ? paoDeAlho = (numHomens + numMulher) * 3 + numCrianca * 2 : null



			//consumo
			var dataCarnes = [
					{
						id: 0,
						tipo: "Carne Bovina",
						qntdTotal: (qtdCarne * tiposBov).toFixed(3),
						carnes: tiposBov,
						tipos: tiposB,
						precoFinal: precoTotalC.toFixed(2),
					},
					{
						id: 1,
						tipo: "Frango",
						qntdTotal: (qtdFrango * tiposFrango).toFixed(3),
						carnes: tiposFrango,
						tipos: tiposF,
						precoFinal: precoTotalF.toFixed(2),
					},
					{
						id: 2,
						tipo: "Carne Suína",
						qntdTotal: (qtdSuino * tiposSuino).toFixed(3),
						carnes: tiposSuino,
						tipos: tiposS,
						precoFinal: precoTotalS.toFixed(2),
					},
				];
			var outros = [
				{
					tipo: "Carvão",
					qntdTotal: carvao + " Saco(s) - (2.5kg)",
					precoFinal: Math.round(carvao * 18),
				},
				{
					tipo: "Sal Grosso",
					qntdTotal: sal + " Pacote(s)",
					precoFinal: Math.round(sal * 2),
				},
				{
					tipo: "Arroz",
					qntdTotal: arroz + " Kg",
					precoFinal: Math.round(arroz * 5),
				},
				{
					tipo: "Farofa",
					qntdTotal: farofa + " Pacote(s)",
					precoFinal: Math.round(farofa * 10),
				},
				{
					tipo: "Pão Francês",
					qntdTotal: pao + " Un",
					precoFinal: (pao * 0.5).toFixed(2),
				},
			]

			if(paoDeAlho.length > 0 || paoDeAlho > 0){
				outros.push({
					tipo: "Pão de Alho",
					qntdTotal: paoDeAlho + " Un",
					precoFinal: (paoDeAlho * 2).toFixed(2),
				});
			}
			return [dataCarnes, Bebida, outros]
		}
		return <Context.Provider value={{CalcularCarne}}>{children}</Context.Provider>;
	
}