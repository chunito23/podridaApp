import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import { ScreenCrearPartida } from 'screens/ScreenCrearPartida';
import { ScreenJugadores } from 'screens/ScreenJugadores';
import { ScreenPredicciones } from 'screens/ScreenPredicciones';
import { ScreenResultados } from 'screens/ScreenResultados';
import { Menu } from 'screens/Menu';




export type RootStackParamList = {
  Menu: undefined;
  ScreenCrearPartida: undefined;
  ScreenJugadores: undefined;
  ScreenPredicciones: undefined;
  ScreenResultados: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Menu">
        <Stack.Screen options={{headerShown:false}} name="Menu" component={Menu} />
        <Stack.Screen  name="ScreenCrearPartida" component={ScreenCrearPartida} />
        <Stack.Screen  name="ScreenJugadores" component={ScreenJugadores} />
        <Stack.Screen  name="ScreenPredicciones" component={ScreenPredicciones} />
        <Stack.Screen  name="ScreenResultados" component={ScreenResultados} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
