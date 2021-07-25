import { NativeModules } from "react-native";

const { WeplanSdkModule } = NativeModules;

export function enable() {
  WeplanSdkModule.enable();
}

export function disable() {
  WeplanSdkModule.disable()
}
