import { EventEmitter } from 'events';
export declare enum CloudMessageType {
    event = 0,
    error = 1,
    connected = 2,
    authenticateRequest = 3,
    authenticated = 4,
}
export interface CloudToClientEvent {
    t: any;
    d?: any;
}
export declare enum ClientMessageType {
    subscribe = 0,
    unsubscribe = 1,
    authenticate = 2,
}
export interface ClientMessage {
    t: any;
    d?: any;
}
export declare class Transport extends EventEmitter {
    private socket;
    private _host;
    constructor(host: string);
    startConnection(): void;
    sendMessage(type: ClientMessageType, data: any): void;
    closeConnection(): void;
    private onOpen();
    private onMessage(data);
    private onClose();
    private onError(error);
    private formatClientMessage(type, data);
}
