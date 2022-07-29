import io, { Socket } from 'socket.io-client';
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from '../interfaces/events';

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  'http://localhost:5000'
);

export default socket;
