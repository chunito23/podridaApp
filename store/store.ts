import { nanoid } from 'nanoid';
import { create } from 'zustand';

interface Jugador {
  id: string;
  nombre: string;
  prediccion: number;
  puntos: number;
}

interface Ronda {
  cantCartas: number;
  puntosRestantes: number;
}

const JugadoresDePrueba: Jugador[] = [
  { id: 'v1StGXR8_Z5jdHi6B-myT', nombre: 'Thiago', prediccion: 0, puntos: 0 },
  { id: 'v1StGXR8_Z5jdHi6B-abcd', nombre: 'Mique', prediccion: 0, puntos: 0 },
  { id: 'v1StGXR8_Z5jdHi6B-efgh', nombre: 'Chuni', prediccion: 0, puntos: 0 },
  { id: 'v1StGXR8_Z5jdHi6B-ijkl', nombre: 'Lucho', prediccion: 0, puntos: 0 },
  { id: 'v1StGXR8_Z5jdHi6B-myT', nombre: 'Thiago', prediccion: 0, puntos: 0 },
  { id: 'v1StGXR8_Z5jdHi6B-abcd', nombre: 'Mique', prediccion: 0, puntos: 0 },
  { id: 'v1StGXR8_Z5jdHi6B-efgh', nombre: 'Chuni', prediccion: 0, puntos: 0 },
  { id: 'v1StGXR8_Z5jdHi6B-ijkl', nombre: 'Lucho', prediccion: 0, puntos: 0 },
];

interface Partida {
  ruta: boolean;
  jugadores: Jugador[];
  ronda: Ronda[];
  numeroRondas: number;
  cantRondas: number;
  cantCartas: number;
  puntosRestantes: number;
  agregarJugador: (nombre: string) => void;
  eliminarJugador: (id: string) => void;
  cambiarPuntajeJugador: (id: string, puntos: number) => void;
  cambiarPrediccionJugador: (id: string, puntos: number) => void;
  aumentarCartas: () => void;
  cambiarPuntosRestantes: (p: number) => void;
  avanzarRonda: () => void;
  RetrocederRonda: () => void;
  cambiarRuta: () => void;
  calcularCantidadRondas: () => void;
}

const INITIAL_CARTAS = 2;
const INITIAL_PUNTOS_RESTANTES = 2;

export const useStore = create<Partida>((set) => ({
  ruta: true,
  jugadores: JugadoresDePrueba,
  ronda: [],
  cantRondas: 0,
  numeroRondas: 1,
  prediccion: 0,
  cantCartas: INITIAL_CARTAS,
  puntosRestantes: INITIAL_PUNTOS_RESTANTES,

  calcularCantidadRondas: () =>
    set((state) => ({ cantRondas: 2 * Math.floor(40 / state.jugadores.length) - 2 })),

  agregarJugador: (nombre: string) =>
    set((state) => ({
      jugadores: [...state.jugadores, { id: nanoid(), nombre, prediccion: 0, puntos: 0 }],
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
  cambiarPrediccionJugador: (id: string, prediccion: number) =>
    set((state) => ({
      jugadores: state.jugadores.map((jugador) =>
        jugador.id === id ? { ...jugador, prediccion } : jugador
      ),
    })),

  aumentarCartas: () =>
    set((state) => {
      if (state.numeroRondas < Math.floor(40 / state.jugadores.length)) {
        return { cantCartas: state.cantCartas + 1 };
      } else {
        return { cantCartas: state.cantCartas - 1 };
      }
    }),

  cambiarRuta: () =>
    set((state) => ({
      ruta: !state.ruta,
    })),

  disminuirCartas: () =>
    set((state) => ({
      cantCartas: Math.max(state.cantCartas - 1, 0),
    })),

  cambiarPuntosRestantes: (p: number) =>
    set(() => ({
      puntosRestantes: p,
    })),

  avanzarRonda: () =>
    set((state) => ({
      ronda: [
        ...state.ronda,
        {
          cantCartas: state.cantCartas,
          puntosRestantes: state.puntosRestantes,
        },
      ],
      numeroRondas: state.numeroRondas + 1,
    })),

  RetrocederRonda: () =>
    set((state) => ({
      ronda: [
        ...state.ronda,
        {
          cantCartas: state.cantCartas,
          puntosRestantes: state.puntosRestantes,
        },
      ],
      numeroRondas: state.numeroRondas - 1,
    })),
}));
