import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { RootStackParamList } from '../navigation/index';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Menu'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export const Menu = ({ navigation }: Props) => {
  return (
    <View className="flex-1 bg-blue-100 items-center justify-center">
      <Image
        source={{
          uri: 'https://d3qgqyymz2hc8x.cloudfront.net/wp-content/uploads/2020/03/Imagen_Truco.jpg',
        }}
        className="w-60 h-60 rounded-full g mb-4"
        resizeMode="cover" // Para ajustar la imagen al espacio definido
      />
      {/* Título del menú */}
      <Text className="mb-8 text-3xl font-bold text-blue-700">Menú Principal</Text>

      {/* Botón para iniciar partida nueva */}
      <Pressable
        className="mb-4 w-64 h-16 rounded-full bg-blue-600 items-center justify-center shadow-lg hover:bg-blue-700"
        onPress={() => {
          navigation.navigate('ScreenCrearPartida');
        }}>
        <Text className="text-xl font-semibold text-white">Iniciar Partida Nueva</Text>
      </Pressable>

      {/* Agregar más opciones aquí si es necesario */}
      <Pressable
        className="w-64 h-16 rounded-full bg-green-600 items-center justify-center shadow-lg hover:bg-green-700"
        onPress={() => {
          navigation.navigate('ScreenJugadores');
        }}>
        <Text className="text-xl font-semibold text-white">Ver Jugadores</Text>
      </Pressable>
    </View>
  );
};