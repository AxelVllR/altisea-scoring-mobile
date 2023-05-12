import { io } from 'socket.io-client';
import { NODE_URL } from '../config';
export const socket = io.connect(NODE_URL, {
    //transports: ['websocket'],
    reconnectionAttempts: 15 //Nombre de fois qu'il doit réessayer de se connecter
  });
