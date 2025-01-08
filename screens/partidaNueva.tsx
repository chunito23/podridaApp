/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Pressable, Text, View, ScrollView, TextInput } from 'react-native';
import { CartaPuntos } from './CartaPuntos'; // Asumiendo que CartaPuntos es un componente que muestra la carta
import { useStore } from 'store/store';
import { CartasPuntajeCumplido } from './CartasPuntajeCumplido';

export const PartidaNueva = () => {
  const [nombre, setnombre] = useState<string>('');
  const [seleccionado, setseleccionado] = useState(false);
  const [mostrarCarta, setMostrarCarta] = useState<boolean>(true);
  const Jugadores = useStore((state) => state.jugadores);
  const AgregarJugadores = useStore((state) => state.agregarJugador);
  const EliminarJugadores = useStore((state) => state.eliminarJugador);

  const manejarAgregarJugador = () => {
    AgregarJugadores(nombre);
    setnombre(''); // Limpiar el campo de entrada después de agregar un jugador
  };

  const manejarEliminarJugador = (id: string) => {
    EliminarJugadores(id);
  };

  return (
    <View className=" flex-row items-start justify-center bg-gray-100 p-4 ">
      {/* Sección para agregar jugadores */}
      <View className="max-w-md flex-1 p-4 ">
        <Text className="mb-6 text-2xl font-bold text-blue-700">Partida Nueva</Text>

        <TextInput
          onChangeText={(e) => setnombre(e)}
          value={nombre}
          className="mb-4 w-full rounded-lg border-2 border-blue-500 p-3"
          placeholder="Ingresa nombre del jugador"
        />

        <Pressable
          onPress={manejarAgregarJugador}
          className="mb-6 w-full rounded-full bg-blue-600 p-4 shadow-lg hover:bg-blue-700">
          <Text className="text-center font-semibold text-white">Agregar Jugador</Text>
        </Pressable>

        {/* Lista de jugadores */}
        {Jugadores.length > 0 && (
          <ScrollView className="w-full" style={{ flex: 1 }}>
            <Text className="mb-2 text-lg font-semibold text-gray-700">Jugadores:</Text>
            {Jugadores.map((Jugador) => (
              <View key={Jugador.id} className="mb-4 rounded-lg border bg-white p-4">
                <Text className="text-lg font-semibold text-gray-800">ID: {Jugador.id}</Text>
                <Text className="text-lg text-gray-800">Nombre: {Jugador.nombre}</Text>
                <Text className="text-lg text-gray-800">Puntos: {Jugador.puntos}</Text>
                <Pressable
                  className="h-8 w-8 items-center justify-center rounded-full border-2 border-red-700"
                  onPress={() => manejarEliminarJugador(Jugador.id)}>
                  <Text>x</Text>
                </Pressable>
              </View>
            ))}
          </ScrollView>
        )}
      </View>

      {/* Sección para mostrar cartas */}
      <View className="h-full max-w-md flex-1  p-4 pt-32">
        <Pressable
          className="mb-4 w-full rounded-lg bg-green-600 p-4 shadow-lg hover:bg-green-700"
          onPress={() => setMostrarCarta(!mostrarCarta)}>
          <Text className="text-center font-semibold text-white">Mostrar Carta</Text>
        </Pressable>

        {mostrarCarta && Jugadores.length > 0 && (
          <ScrollView className="w-full" style={{ flex: 1 }}>
            <Text className="mb-2 text-lg font-semibold text-gray-700">Cartas de Jugadores:</Text>
            {Jugadores.map((Jugador) => (
              <View key={Jugador.id} className="mb-4 rounded-lg border bg-white p-4">
                <Text className="text-lg text-gray-800">Nombre: {Jugador.nombre}</Text>
                <CartaPuntos id={Jugador.id} />
              </View>
            ))}
          </ScrollView>
        )}
      </View>
      <View className="h-full max-w-md flex-1  p-4 pt-32">
        {mostrarCarta && Jugadores.length > 0 && (
          <ScrollView className="w-full" style={{ flex: 1 }}>
            <Text className="mb-2 text-lg font-semibold text-gray-700">Cartas de Jugadores:</Text>
            {Jugadores.map((Jugador) => (
              <View key={Jugador.id} className="mb-4 rounded-lg border bg-white p-4">
                <Text className="text-lg text-gray-800">Nombre: {Jugador.nombre}</Text>
                <CartasPuntajeCumplido id={Jugador.id} />
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
};
