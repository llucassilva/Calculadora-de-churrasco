import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

import TelaInicial from "./src/Pages/TelaInicial";
import Participante from "./src/Pages/Participante";
import EscolhaCarnes from "./src/Pages/EscolhaCarnes";

import Bebidas from "./src/Pages/Bebidas/index";
import Receitas from "./src/Pages/Receitas";
import Duracao from "./src/Pages/Duracao";
import Rateio from "./src/Pages/Rateio";
import Localizacao from "./src/Pages/Localizacao";
import Resultado from "./src/Pages/Resultado";
import Provider from "./src/Context/Context";

export default function App() {
	const Stack = createNativeStackNavigator();
	return (
		<NavigationContainer>
			<Provider>
				<Stack.Navigator>
					<Stack.Screen
						name="TelaInicial"
						component={TelaInicial}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="Participante"
						component={Participante}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="Bebidas"
						component={Bebidas}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="Carnes"
						component={EscolhaCarnes}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="Duracao"
						component={Duracao}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="Rateio"
						component={Rateio}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="Localizacao"
						component={Localizacao}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="Resultado"
						component={Resultado}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="Receitas"
						component={Receitas}
						options={{ headerShown: false }}
					/>
				</Stack.Navigator>
			</Provider>
		</NavigationContainer>
	);
}
