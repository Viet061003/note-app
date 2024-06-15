import { createDrawerNavigator } from "@react-navigation/drawer";
import * as React from "react";
import Folders from "../pages/Folders/Folders";
import Home from "../pages/Home/Home";
import Labels from "../pages/Labels/Labels";
import Trash from "../pages/Trash/Trash";

const Drawer = createDrawerNavigator();

const DrawerNav = () => {
    return (
        <Drawer.Navigator
            initialRouteName="Home"
            screenOptions={{
                drawerStyle: {
                    width: "60%",
                },
            }}
        >
            <Drawer.Screen name="Trang chủ" component={Home} />
            <Drawer.Screen name="Labels" component={Labels} />
            <Drawer.Screen name="Folders" component={Folders} />
            <Drawer.Screen name="Trash" component={Trash} />
        </Drawer.Navigator>
    );
};
export default DrawerNav;
