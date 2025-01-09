import './global.css';
import 'react-native-get-random-values';

import 'react-native-gesture-handler';

import RootStack from './navigation';
import { useStore } from 'store/store';
import { Text, View } from 'react-native';

export default function App() {
  const Rondas = useStore((state) => state.numeroRondas);
  const cantRondas = useStore((state) => state.cantRondas);

  return (
    <View className='flex-1'>
      <Text>ronda numero: {Rondas}/{cantRondas} </Text>
      <RootStack />;
    </View>
  );
}
