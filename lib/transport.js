"use strict";
const events_1 = require('events');
(function (CloudMessageType) {
    CloudMessageType[CloudMessageType["event"] = 0] = "event";
    CloudMessageType[CloudMessageType["error"] = 1] = "error";
    CloudMessageType[CloudMessageType["connected"] = 2] = "connected";
    CloudMessageType[CloudMessageType["authenticateRequest"] = 3] = "authenticateRequest";
    CloudMessageType[CloudMessageType["authenticated"] = 4] = "authenticated";
})(exports.CloudMessageType || (exports.CloudMessageType = {}));
var CloudMessageType = exports.CloudMessageType;
(function (ClientMessageType) {
    ClientMessageType[ClientMessageType["subscribe"] = 0] = "subscribe";
    ClientMessageType[ClientMessageType["unsubscribe"] = 1] = "unsubscribe";
    ClientMessageType[ClientMessageType["authenticate"] = 2] = "authenticate";
})(exports.ClientMessageType || (exports.ClientMessageType = {}));
var ClientMessageType = exports.ClientMessageType;
class Transport extends events_1.EventEmitter {
    constructor(host) {
        super();
        this.socket = undefined;
        this._host = undefined;
        this._host = host.replace('http://', 'ws://');
        this._host = this._host.replace('https://', 'wss://');
        this.startConnection();
    }
    startConnection() {
        this.socket = require('engine.io-client')(this._host);
        this.socket.on('open', () => {
            this.onOpen();
        });
        this.socket.on('error', (error) => { this.onError(error); });
        this.socket.on('upgradeError', (error) => {
            this.emit('socketError', error);
        });
        this.socket.on('upgrade', () => {
            this.emit('socketInfo', 'Upgraded');
        });
    }
    sendMessage(type, data) {
        this.socket.send(JSON.stringify(this.formatClientMessage(type, data)));
    }
    closeConnection() {
        this.socket.on('close', () => { this.emit('closed'); });
        this.socket.close();
    }
    onOpen() {
        this.emit('connected');
        this.socket.on('message', (data) => { this.onMessage(data); });
        this.socket.on('close', () => { this.onClose(); });
    }
    onMessage(data) {
        // console.log(data);
        let packet;
        try {
            packet = JSON.parse(data);
        }
        catch (err) {
            console.warn('Invalid JSON recieved!');
        }
        if (packet) {
            if (CloudMessageType[CloudMessageType[packet.t]])
                this.emit(packet.t, packet.d);
        }
    }
    onClose() {
        let _this = this;
        this.emit('closed');
        setTimeout(function () {
            _this.startConnection();
        }, 1000);
    }
    onError(error) {
        this.emit('socketError', error);
    }
    formatClientMessage(type, data) {
        return {
            t: ClientMessageType[type],
            d: data
        };
    }
}
exports.Transport = Transport;

//# sourceMappingURL=data:application/json;base64,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QUFBIiwiZmlsZSI6InRyYW5zcG9ydC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RXZlbnRFbWl0dGVyfSBmcm9tICdldmVudHMnO1xuXG5leHBvcnQgZW51bSBDbG91ZE1lc3NhZ2VUeXBlIHtcbiAgICBldmVudCxcbiAgICBlcnJvcixcbiAgICBjb25uZWN0ZWQsXG4gICAgYXV0aGVudGljYXRlUmVxdWVzdCxcbiAgICBhdXRoZW50aWNhdGVkXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2xvdWRUb0NsaWVudEV2ZW50IHtcbiAgICB0OiBhbnk7ICAgICAvLyBtZXNzYWdlIGV2ZW50IHR5cGVcbiAgICBkPzogYW55OyAgICAvLyBtZXNzYWdlIGRhdGFcbn1cblxuZXhwb3J0IGVudW0gQ2xpZW50TWVzc2FnZVR5cGUge1xuICAgIHN1YnNjcmliZSxcbiAgICB1bnN1YnNjcmliZSxcbiAgICBhdXRoZW50aWNhdGVcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDbGllbnRNZXNzYWdlIHtcbiAgICB0OiBhbnk7ICAgICAvLyBtZXNzYWdlIGV2ZW50IHR5cGVcbiAgICBkPzogYW55OyAgICAvLyBtZXNzYWdlIGRhdGFcbn1cblxuZXhwb3J0IGNsYXNzIFRyYW5zcG9ydCBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gICAgcHJpdmF0ZSBzb2NrZXQ6IGFueSA9IHVuZGVmaW5lZDtcbiAgICBwcml2YXRlIF9ob3N0OiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBjb25zdHJ1Y3Rvcihob3N0OiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5faG9zdCA9IGhvc3QucmVwbGFjZSgnaHR0cDovLycsICd3czovLycpO1xuICAgICAgICB0aGlzLl9ob3N0ID0gdGhpcy5faG9zdC5yZXBsYWNlKCdodHRwczovLycsICd3c3M6Ly8nKTtcbiAgICAgICAgdGhpcy5zdGFydENvbm5lY3Rpb24oKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhcnRDb25uZWN0aW9uKCkge1xuICAgICAgICB0aGlzLnNvY2tldCA9IHJlcXVpcmUoJ2VuZ2luZS5pby1jbGllbnQnKSh0aGlzLl9ob3N0KTtcbiAgICAgICAgdGhpcy5zb2NrZXQub24oJ29wZW4nLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uT3BlbigpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zb2NrZXQub24oJ2Vycm9yJywgKGVycm9yOiBFcnJvcikgPT4geyB0aGlzLm9uRXJyb3IoZXJyb3IpOyB9KTtcbiAgICAgICAgdGhpcy5zb2NrZXQub24oJ3VwZ3JhZGVFcnJvcicsIChlcnJvcjogRXJyb3IpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZW1pdCgnc29ja2V0RXJyb3InLCBlcnJvcik7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNvY2tldC5vbigndXBncmFkZScsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZW1pdCgnc29ja2V0SW5mbycsICdVcGdyYWRlZCcpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2VuZE1lc3NhZ2UodHlwZTogQ2xpZW50TWVzc2FnZVR5cGUsIGRhdGE6IGFueSkge1xuICAgICAgICB0aGlzLnNvY2tldC5zZW5kKEpTT04uc3RyaW5naWZ5KHRoaXMuZm9ybWF0Q2xpZW50TWVzc2FnZSh0eXBlLCBkYXRhKSkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjbG9zZUNvbm5lY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc29ja2V0Lm9uKCdjbG9zZScsICgpID0+IHsgdGhpcy5lbWl0KCdjbG9zZWQnKTsgfSk7XG4gICAgICAgIHRoaXMuc29ja2V0LmNsb3NlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbk9wZW4oKSB7XG4gICAgICAgIHRoaXMuZW1pdCgnY29ubmVjdGVkJyk7XG4gICAgICAgIHRoaXMuc29ja2V0Lm9uKCdtZXNzYWdlJywgKGRhdGE6IHN0cmluZykgPT4geyB0aGlzLm9uTWVzc2FnZShkYXRhKTsgfSk7XG4gICAgICAgIHRoaXMuc29ja2V0Lm9uKCdjbG9zZScsICgpID0+IHsgdGhpcy5vbkNsb3NlKCk7IH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25NZXNzYWdlKGRhdGE6IHN0cmluZykge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgbGV0IHBhY2tldDogQ2xvdWRUb0NsaWVudEV2ZW50O1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcGFja2V0ID0gPENsb3VkVG9DbGllbnRFdmVudD5KU09OLnBhcnNlKGRhdGEpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZXZlbnQsIGV2ZW50LnQpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignSW52YWxpZCBKU09OIHJlY2lldmVkIScpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYWNrZXQpIHtcbiAgICAgICAgICAgIGlmIChDbG91ZE1lc3NhZ2VUeXBlWzxhbnk+Q2xvdWRNZXNzYWdlVHlwZVtwYWNrZXQudF1dKVxuICAgICAgICAgICAgICAgIHRoaXMuZW1pdChwYWNrZXQudCwgcGFja2V0LmQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkNsb3NlKCkge1xuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmVtaXQoJ2Nsb3NlZCcpO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF90aGlzLnN0YXJ0Q29ubmVjdGlvbigpO1xuICAgICAgICB9LCAxMDAwKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uRXJyb3IoZXJyb3I6IHN0cmluZyB8IEVycm9yKSB7XG4gICAgICAgIHRoaXMuZW1pdCgnc29ja2V0RXJyb3InLCBlcnJvcik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmb3JtYXRDbGllbnRNZXNzYWdlKHR5cGU6IENsaWVudE1lc3NhZ2VUeXBlLCBkYXRhOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIDxDbGllbnRNZXNzYWdlPntcbiAgICAgICAgICAgIHQ6IENsaWVudE1lc3NhZ2VUeXBlW3R5cGVdLFxuICAgICAgICAgICAgZDogZGF0YVxuICAgICAgICB9O1xuICAgIH1cbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=