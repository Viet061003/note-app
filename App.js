import { StatusBar } from "expo-status-bar";
import React from "react";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Route from "./src/routes/route";

export default function App() {
    return (
        <GestureHandlerRootView>
            <Route />
            <StatusBar style="auto" />
        </GestureHandlerRootView>
    );
}
