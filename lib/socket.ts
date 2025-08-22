import { io, Socket } from 'socket.io-client';

export type BookingCreatedPayload = {
  date: string;
  time: string;
  service?: string;
};

// события сервера → клиенту
export interface ServerToClientEvents {
  'booking:created': (payload: BookingCreatedPayload) => void;
}

// события клиента → серверу (если нужны комнаты)
export interface ClientToServerEvents {
  join: (room: string) => void;
  leave: (room: string) => void;
}

let socketRef: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;

export function getSocket(): Socket<ServerToClientEvents, ClientToServerEvents> {
  if (!socketRef) {
    const url = process.env.NEXT_PUBLIC_WS_URL ?? '';
    socketRef = io(url, {
      transports: ['websocket'],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 10,
      withCredentials: false,
    });
  }
  return socketRef;
}

export function onBookingCreated(cb: (p: BookingCreatedPayload) => void): () => void {
  const s = getSocket();
  const handler: (payload: BookingCreatedPayload) => void = payload => cb(payload);
  s.on('booking:created', handler);
  return () => {
    s.off('booking:created', handler);
  };
}
