"use strict";
const events_1 = require('events');
const Transport_1 = require('./Transport');
const Transport_2 = require('./Transport');
class DroplitClient extends events_1.EventEmitter {
    constructor(host) {
        super();
        this.transport = undefined;
        this.transport = new Transport_1.Transport(host);
        this.init();
    }
    init() {
        this.transport.on('connected', () => {
            this.emit('connected');
        });
        this.transport.on('authenticateRequest', () => {
            this.emit('authenticateRequest');
        });
        this.transport.on('authenticated', () => {
            this.emit('authenticated');
        });
        this.transport.on('event', (data) => {
            this.emit('event', data);
        });
        this.transport.on('closed', () => {
            this.emit('closed');
        });
        this.transport.on('socketError', (error) => {
            this.emit('socketError', error);
        });
        this.transport.on('error', (error) => {
            this.emit('error', error);
        });
        this.transport.on('socketInfo', (info) => {
            this.emit('socketInfo', info);
        });
    }
    authenticate(authorizationToken) {
        this.transport.sendMessage(Transport_2.ClientMessageType.authenticate, authorizationToken);
    }
    subscribe(resourceId) {
        this.transport.sendMessage(Transport_2.ClientMessageType.subscribe, resourceId);
    }
    unsubscribe(resourceId) {
        this.transport.sendMessage(Transport_2.ClientMessageType.unsubscribe, resourceId);
    }
    reopen() {
        this.transport.startConnection();
    }
    close() {
        this.transport.closeConnection();
    }
}
exports.DroplitClient = DroplitClient;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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ZW50IjpbImltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ2V2ZW50cyc7XG5pbXBvcnQgeyBUcmFuc3BvcnQgfSBmcm9tICcuL1RyYW5zcG9ydCc7XG5pbXBvcnQgeyBDbGllbnRNZXNzYWdlVHlwZSB9IGZyb20gJy4vVHJhbnNwb3J0JztcblxuZXhwb3J0IGNsYXNzIERyb3BsaXRDbGllbnQgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICAgIHByaXZhdGUgdHJhbnNwb3J0OiBUcmFuc3BvcnQgPSB1bmRlZmluZWQ7XG5cbiAgICBjb25zdHJ1Y3Rvcihob3N0OiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy50cmFuc3BvcnQgPSBuZXcgVHJhbnNwb3J0KGhvc3QpO1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG4gICAgcHJpdmF0ZSBpbml0KCkge1xuICAgICAgICB0aGlzLnRyYW5zcG9ydC5vbignY29ubmVjdGVkJywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5lbWl0KCdjb25uZWN0ZWQnKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMudHJhbnNwb3J0Lm9uKCdhdXRoZW50aWNhdGVSZXF1ZXN0JywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5lbWl0KCdhdXRoZW50aWNhdGVSZXF1ZXN0Jyk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnRyYW5zcG9ydC5vbignYXV0aGVudGljYXRlZCcsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZW1pdCgnYXV0aGVudGljYXRlZCcpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy50cmFuc3BvcnQub24oJ2V2ZW50JywgKGRhdGE6IGFueSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5lbWl0KCdldmVudCcsIGRhdGEpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy50cmFuc3BvcnQub24oJ2Nsb3NlZCcsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZW1pdCgnY2xvc2VkJyk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnRyYW5zcG9ydC5vbignc29ja2V0RXJyb3InLCAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5lbWl0KCdzb2NrZXRFcnJvcicsIGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMudHJhbnNwb3J0Lm9uKCdlcnJvcicsIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmVtaXQoJ2Vycm9yJywgZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy50cmFuc3BvcnQub24oJ3NvY2tldEluZm8nLCAoaW5mbzogYW55KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmVtaXQoJ3NvY2tldEluZm8nLCBpbmZvKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGF1dGhlbnRpY2F0ZShhdXRob3JpemF0aW9uVG9rZW46IHN0cmluZykge1xuICAgICAgICB0aGlzLnRyYW5zcG9ydC5zZW5kTWVzc2FnZShDbGllbnRNZXNzYWdlVHlwZS5hdXRoZW50aWNhdGUsIGF1dGhvcml6YXRpb25Ub2tlbik7XG4gICAgfVxuXG4gICAgcHVibGljIHN1YnNjcmliZShyZXNvdXJjZUlkOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy50cmFuc3BvcnQuc2VuZE1lc3NhZ2UoQ2xpZW50TWVzc2FnZVR5cGUuc3Vic2NyaWJlLCByZXNvdXJjZUlkKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdW5zdWJzY3JpYmUocmVzb3VyY2VJZDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMudHJhbnNwb3J0LnNlbmRNZXNzYWdlKENsaWVudE1lc3NhZ2VUeXBlLnVuc3Vic2NyaWJlLCByZXNvdXJjZUlkKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVvcGVuKCkge1xuICAgICAgICB0aGlzLnRyYW5zcG9ydC5zdGFydENvbm5lY3Rpb24oKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2xvc2UoKSB7XG4gICAgICAgIHRoaXMudHJhbnNwb3J0LmNsb3NlQ29ubmVjdGlvbigpO1xuICAgIH1cbn0iXX0=
