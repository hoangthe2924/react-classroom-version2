import socketClient from "socket.io-client";
import * as React from "react";

const SERVER = "https://classrum-api-v2.herokuapp.com/";
export const socket = socketClient(SERVER);
export const SocketContext = React.createContext();
