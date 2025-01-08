import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react'
import { Pressable, Text, View } from 'react-native'
import {RootStackParamList} from "../navigation/index"

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'home'>;

type props = {
  navigation: HomeScreenNavigationProp;
}

export const Home = ({ navigation }: props) => {
  return (
    <View className='flex-1 bg-blue-400 justify-center items-center'>
      <Text>Home</Text>
      <Pressable className='bg-white border-2 rounded-full w-40 h-12 items-center justify-center'
        onPress={() => {
          navigation.navigate('partidaNueva');
        }}>
        <Text>iniciar partida nueva</Text>
      </Pressable>
    </View>
  )
}
