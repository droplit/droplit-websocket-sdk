import { EventEmitter } from 'events';
import { Transport } from './Transport';
import { ClientMessageType } from './Transport';

export class DroplitClient extends EventEmitter {
    private transport: Transport = undefined;

    constructor(host: string) {
        super();
        this.transport = new Transport(host);
        this.init();
    }
    private init() {
        this.transport.on('connected', () => {
            this.emit('connected');
        });
        this.transport.on('authenticateRequest', () => {
            this.emit('authenticateRequest');
        });
        this.transport.on('authenticated', () => {
            this.emit('authenticated');
        });
        this.transport.on('event', (data: any) => {
            this.emit('event', data);
        });
        this.transport.on('closed', () => {
            this.emit('closed');
        });
        this.transport.on('socketError', (error: any) => {
            this.emit('socketError', error);
        });
        this.transport.on('error', (error: any) => {
            this.emit('error', error);
        });
        this.transport.on('socketInfo', (info: any) => {
            this.emit('socketInfo', info);
        });
    }

    public authenticate(authorizationToken: string) {
        this.transport.sendMessage(ClientMessageType.authenticate, authorizationToken);
    }

    public subscribe(resourceId: string) {
        this.transport.sendMessage(ClientMessageType.subscribe, resourceId);
    }

    public unsubscribe(resourceId: string) {
        this.transport.sendMessage(ClientMessageType.unsubscribe, resourceId);
    }

    public reopen() {
        this.transport.startConnection();
    }

    public close() {
        this.transport.closeConnection();
    }
}