import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Home } from 'screens/home';
import { PartidaNueva } from 'screens/partidaNueva';

export type RootStackParamList = {
  home: undefined;
  partidaNueva: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="partidaNueva">
        <Stack.Screen options={{headerShown:false}} name="home" component={Home} />
        <Stack.Screen  name="partidaNueva" component={PartidaNueva} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
