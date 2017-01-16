import {EventEmitter} from 'events';

export enum CloudMessageType {
    event,
    error,
    connected,
    authenticateRequest,
    authenticated
}

export interface CloudToClientEvent {
    t: any;     // message event type
    d?: any;    // message data
}

export enum ClientMessageType {
    subscribe,
    unsubscribe,
    authenticate
}

export interface ClientMessage {
    t: any;     // message event type
    d?: any;    // message data
}

export class Transport extends EventEmitter {
    private socket: any = undefined;
    private _host: string = undefined;

    constructor(host: string) {
        super();
        this._host = host.replace('http://', 'ws://');
        this._host = this._host.replace('https://', 'wss://');
        this.startConnection();
    }

    public startConnection() {
        this.socket = require('engine.io-client')(this._host);
        this.socket.on('open', () => {
            this.onOpen();
        });
        this.socket.on('error', (error: Error) => { this.onError(error); });
        this.socket.on('upgradeError', (error: Error) => {
            this.emit('socketError', error);
        });
        this.socket.on('upgrade', () => {
            this.emit('socketInfo', 'Upgraded');
        });
    }

    public sendMessage(type: ClientMessageType, data: any) {
        this.socket.send(JSON.stringify(this.formatClientMessage(type, data)));
    }

    public closeConnection() {
        this.socket.on('close', () => { this.emit('closed'); });
        this.socket.close();
    }

    private onOpen() {
        this.emit('connected');
        this.socket.on('message', (data: string) => { this.onMessage(data); });
        this.socket.on('close', () => { this.onClose(); });
    }

    private onMessage(data: string) {
        // console.log(data);
        let packet: CloudToClientEvent;
        try {
            packet = <CloudToClientEvent>JSON.parse(data);
            // console.log(event, event.t);
        }
        catch (err) {
            console.warn('Invalid JSON recieved!');
        }
        if (packet) {
            if (CloudMessageType[<any>CloudMessageType[packet.t]])
                this.emit(packet.t, packet.d);
        }
    }

    private onClose() {
        let _this = this;
        this.emit('closed');
        setTimeout(function () {
            _this.startConnection();
        }, 1000);
    }

    private onError(error: string | Error) {
        this.emit('socketError', error);
    }

    private formatClientMessage(type: ClientMessageType, data: any) {
        return <ClientMessage>{
            t: ClientMessageType[type],
            d: data
        };
    }
}