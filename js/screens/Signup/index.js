import React, { Component } from "react";
import { Image, Animated, Keyboard, Platform } from "react-native";
import {
  Container,
  Text,
  View,
  Form,
  Item,
  Label,
  Input,
  Button,
  Toast,
  Content
} from "native-base";
import realm from '../../components/db';
import styles from "./styles";
import Realm from 'realm';

export default class Signup extends Component{
  constructor(props){
    super(props);
    this.state = {
      username: undefined,
      password: undefined
    }
  }
   
  createAcct(){
    if (!this.state.username || !this.state.password){
      Toast.show({
        text: 'Username/Password cannot be blank.',
        duration: 2500,
        type: 'danger'
      })}
      else
      //   Realm.open({schema:[User]}).then(
      //   realm.write(()=>
      //     realm.create('User',{
      //       username: this.state.username,
      //       password: this.state.password
      //     }))
      // )
      Realm.Sync.User.register('http://localhost:9080', this.state.username, this.state.password, (error, user) => {
           if (!error) {
              var realm = new Realm({
              sync: {
                user: user,
                url: 'http://localhost:9080',
            },
            schema: [User]
      });
  }
  else {
    console.log(error);
  }
})
      this.props.navigation.navigate("Drawer");

    
  }
  render() {
  
  const {navigate} = this.props.navigation;

    return (
      <Container style={styles.container}>
        <Content
          bounces={false}
          contentContainerStyle={{
            flex: 1,
            justifyContent: "space-around"
          }}
        >
         
          <Form style={styles.form}>
            <Item underline>
              <Input
                onChangeText={username => this.setState({ username })}
                placeholder="Username"
              />
            </Item>
            <Item underline>
              <Input
                secureTextEntry
                onChangeText={password => this.setState({ password })}
                placeholder="Password"
              />
            </Item>
            <Button full style={styles.button} onPress={() => this.createAcct()}>
              <Text>Create Account</Text>
            </Button>
           
          </Form>
        </Content>
      </Container>
    );
  }
}