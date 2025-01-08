import { create } from 'zustand';
import { nanoid } from 'nanoid';

interface Jugador {
  id: string;
  nombre: string;
  puntos: number;
}

interface Partida {
  jugadores: Jugador[];
  cantCartas: number;
  puntosRestantes: number;
  agregarJugador: (nombre: string) => void;
  eliminarJugador: (id: string) => void;
  cambiarPuntajeJugador: (id: string, puntos: number) => void;
  aumentarCartas: () => void;
  disminuirCartas: () => void;
  cambiarPuntosRestantes: (p: number) => void;
}

const INITIAL_CARTAS = 2;
const INITIAL_PUNTOS_RESTANTES = 2;

export const useStore = create<Partida>((set) => ({
  jugadores: [],
  cantCartas: INITIAL_CARTAS,
  puntosRestantes: INITIAL_PUNTOS_RESTANTES,

  agregarJugador: (nombre: string) =>
    set((state) => ({
      jugadores: [...state.jugadores, { id: nanoid(), nombre, puntos: 0 }],
    })),

  eliminarJugador: (id: string) =>
    set((state) => ({
      jugadores: state.jugadores.filter((jugador) => jugador.id !== id),
    })),

  cambiarPuntajeJugador: (id: string, puntos: number) =>
    set((state) => ({
      jugadores: state.jugadores.map((jugador) =>
        jugador.id === id ? { ...jugador, puntos } : jugador
      ),
    })),

  aumentarCartas: () =>
    set((state) => ({
      cantCartas: state.cantCartas + 1,
    })),

  disminuirCartas: () =>
    set((state) => ({
      cantCartas: Math.max(state.cantCartas - 1, 0),
    })),

  cambiarPuntosRestantes: (p: number) =>
    set(() => ({
      puntosRestantes: p,
    })),
}));
