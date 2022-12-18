import {useEffect, useState} from 'react';
import {io, Socket} from 'socket.io-client';
import {runTimeSharedConfig} from 'src/util/common';

export const useSocket = (token: string): Socket | null => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const socketInstance = io(`${runTimeSharedConfig().BASE_API}`, {
            path: '/chat',
            transports: ['websocket', 'polling'], // polling as fallback
            query: {token},
        });

        setSocket(socketInstance);

        return () => {
            socket?.disconnect();
        };
    }, []);

    return socket;
};
