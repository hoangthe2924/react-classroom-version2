import socketClient from "socket.io-client";
import * as React from "react";

const SERVER = "http://localhost:7000/";
export const socket = socketClient(SERVER);
export const SocketContext = React.createContext();