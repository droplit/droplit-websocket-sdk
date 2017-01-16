import { EventEmitter } from 'events';
export declare class DroplitClient extends EventEmitter {
    private transport;
    constructor(host: string);
    private init();
    authenticate(authorizationToken: string): void;
    subscribe(resourceId: string): void;
    unsubscribe(resourceId: string): void;
    reopen(): void;
    close(): void;
}
