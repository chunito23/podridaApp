import './global.css';
import 'react-native-get-random-values';

import 'react-native-gesture-handler';

import RootStack from './navigation';
import { useStore } from 'store/store';
import { Text, View } from 'react-native';
import { Indicador } from 'Components/Indicador';

export default function App() {
  return (
    <View className='flex-1'>
      <Indicador></Indicador>
      <RootStack />
    </View>
  );
}
