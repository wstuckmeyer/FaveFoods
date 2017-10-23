import React, { Component } from "react";
import { Image } from "react-native";
import {
  Container,
  Text,
  View,
  Button,
  Content,
  Icon,
  List,
  ListItem,
  Left,
  Right,
  Badge
} from "native-base";
import { NavigationActions } from 'react-navigation';
import Card from '../../screens/Card';
import styles from "./styles";
import Home from '../../screens/Home';
const datas = [
  
  {
    name: "Saved",
    route: "Card",
    icon: "bookmark"
  },
  {
    name:'Home',
    route: 'Home',
    icon:'md-home'

  }
];
const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Login'}),
  ]
})
export default class Sidebar extends Component {
  pushPage(route) {
    const rootNavigation = this.props.screenProps.rootNavigation;
    rootNavigation.navigate(route);
    this.props.navigation.navigate("DrawerClose");
  }
  render() {
    const rootNavigation = this.props.screenProps.rootNavigation;
    return (
      <Container>
        <Content bounces={false} style={{backgroundColor:'#FFD000'}}>
          <Image
            source={require("./../../../assets/foodlogo2.png")}
            style={styles.image}
          />
          {datas.map((data, i) =>
            <ListItem
              button
              key={i}
              noBorder
              
              onPress={() => (data.route === 'Login') ? rootNavigation.dispatch(resetAction) : this.pushPage(data.route)}
            >
              <Left>
                <Icon
                  active
                  name={data.icon}
                  style={{ color: "#48434C", fontSize: 36, width: 40 }}
                />
                <Text style={styles.text}>
                  {data.name}
                </Text>
              </Left>
            </ListItem>
          )}
        </Content>
      </Container>
    );
  }
}
