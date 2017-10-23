import React from "react";
import { StackNavigator } from "react-navigation";
import { Root } from "native-base";

import SideBar from "./components/Sidebar";
import Login from "./screens/Login";
import Home from "./screens/Home";
import Drawer from "./Drawer";
import Signup from './screens/Signup'
import Card from "./screens/Card";
import Search from './screens/Search'
Drawer.navigationOptions = ({ navigation }) => ({
  header: null
});
const AppNavigator = StackNavigator(
  {
    Login: { screen: Login },
    Signup: {screen: Signup},
    Card: { screen: Card },
    Search: {screen: Search},
    Drawer: { screen: ({navigation}) => <Drawer screenProps={{rootNavigation: navigation}} /> }
  },
  {
    index: 0,
    initialRouteName: "Drawer",
    headerMode: "none"
  }
);

export default () =>
  <Root>
    <AppNavigator />
  </Root>;
