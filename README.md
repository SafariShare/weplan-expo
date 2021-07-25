# WeplanSDK for Expo

Weplan SDK for managed expo applications

## Usage

Install the package

```bash
npm install -S weplan-expo
```

In your app's Expo config (app.json, or app.config.js), add `weplan-expo` to the list of plugins:

```json
{
  "name": "my app",
  "plugins": [
    [
      "expo-camera",
      {
        "accessToken": "ACCESS TOKEN GOES HERE",
        "clientId": "CLIENT ID GOES HERE",
        "clientSecret": "CLIENT SECRET GOES HERE",
      }
    ]
  ]
}
```

Find a place in your application where you would like to enable Weplan SDK

```js
import * as WeplanSdk from "weplan-expo";

WeplanSdk.enable()
```