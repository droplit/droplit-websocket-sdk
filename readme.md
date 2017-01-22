```
 _| _ _  _ |.|_   . _  
(_|| (_)|_)|||_.o |(_) 
        |             
```

# BETA Droplit.io WebSocket SDK

Enable real-time notifications in your NodeJS or web app!

The droplit.io WebSocket SDK provides your NodeJS or web application with real-time device state change notifications. You can use this SDK to have your application UI update as devices change state.

# Using bower

```
bower install droplit-websocket-sdk --save
```

After referencing `droplit-socket-sdk.js` in your html, `DroplitWebSocketClient` is declared in the global scope.

You can create a new instance: 

```
var droplitSocket = new DroplitWebSocketClient.DroplitClient();
```

# Using npm

We don't recommend using this SDK for server applications. If you are looking to get server notifications, consider using our [Webhooks](https://docs.droplit.io/docs/webhooks) 

## Installation 

```
npm install droplit-socket-sdk --save
```

In your application:

```
var droplitSDK = require(droplit-websocket-sdk);
var droplitSocket = new droplitSDK.DroplitClient();
```

# Documentation

## Supported resources

Currently you can subscribe to the following resource types:

* Environment
* Device

You can specify an id of a supported resource in place of `resourceId` when calling methods. 

More resources will be added in the future.

## Events

The droplitSocket instance emits the following events.

### `'event'`

This event type is received when the subscribed resource emits an event. This can occur when a property changes state, a property is set, etc. The payload is documented in the Event Payload section. 

```
droplitSocket.on('event', function (data) {
    console.log("event", data);
});
```

### `'authenticateRequest'`

The socket connection must be authenticated once opened. 
When you receive an `authenticateRequest` event you must supply the user authorization token before you can subscribe to resources. 
The socket may also be required to re-authenticate at later points in time. See the Method section `authenticate()`.

```
droplitSocket.on('authenticateRequest', function () {
    // Call authenticate()
});
```

### `'authenticated'`

Once this event is received you may subscribe to resources.

```
droplitSocket.on('authenticated', function () {
    // Subscribe to resources    
});
```

### `'connected'`

This event occurs when the web socket connection is established.

```
droplitSocket.on('connected', function () {
    console.log('Connection established.');
});
```

### `'closed'`

This event occurs when the web socket connection is closed.
This can be from explicitly closing the connection, or the connection being lost.

```
droplitSocket.on('closed', function () {
    console.log('Connection closed.');
});
```

### `'socketInfo'`

This event occurs when the web socket connection is upgraded.

```
droplitSocket.on('socketInfo', function (info) {
    console.log(info);
});
```

### `'socketError'`

This event occurs when the web socket connection encounters an error.

```
droplitSocket.on('socketError', function (error) {
    console.log(error);
});
```

## Event Payload

Event payload are defined as:

```
interface payload {
    type: string,
    ecosystemId: string,
    environmentId: string,
    deviceId: string,
    service: string,
    index: string,
    member: string,
    value?: any
}
```

The `type` property can be any of the following:

```
"Changed"
"Call"
"Set"
"Get"
"Event"
"Info"
"Error"
```

`"Changed"` - any property changed

`"Call"` - a method was called 

`"Set"` - a property was explicitly set

`"Get"` - a refresh was issued

`"Event"` - a service property event was emitted

`"Info"` - device information received

`"Error"` - a device error was thrown

## Methods

### `authenticate(authorizationToken: string)`

You should call this method whenever the `authenticateRequest` event is received. 


```
droplitSocket.authenticate('+gbSKJBQ7BvJ0DfAyBZqNuAkyFvF0nME7mWUzj+JPfvDWHr4fNhGow1WRJnPhyOOzCnHUFzLaJgcLMj/PI0fpYG7xn3snwvHB+JRvhAujLRbDyPpz0IRYM01oGKfQ+Kc');
```

This example calls a method `retriveAuthToken` to get the users authorization from app local storage.

```
droplitSocket.on('authenticateRequest', function () {
    droplitSocket.authenticate(retriveAuthToken());
});
```

### `subscribe(resourceId: string)`

This message will allow your application to receive notifications about a provided resource. 
If you subscribe to more than one resource, you will receive events for each subscription. 

You can call this method after authenticating.

```
droplitSocket.subscribe('E5847573f80ffaa4540a761ff');
```

### `unsubscribe(resourceId: string)`

You can unsubscribe to an already subscribed resource if you wish to no longer receive notifications for that resource. 

```
droplitSocket.unsubscribe('E5847573f80ffaa4540a761ff');
```

### `reopen()`

The socket connection is opened by creating a new `DroplitClient` instance. You can reopen the socket connection with this method in the event that the socket is closed. 

```
droplitSocket.reopen();
```

### `close()`

This method closes the socket connection. 
Any subscriptions associated with the closed socket will be destroyed, with fanfare.

```
droplitSocket.close();
```

## Build for browser

Make sure to install browserify globally:

```
npm install -g browserify
```

```
browserify index.js > bin/droplit-websocket-sdk.js --standalone DroplitWebSocketClient
```
