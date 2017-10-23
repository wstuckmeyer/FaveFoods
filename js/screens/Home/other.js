import React, { Component } from "react";
import OAuthSimple from 'oauthsimple';
import {Image, ListView} from 'react-native';
import styles from './styles';
import {
  Container,
  Text,
  View,
  Button,
  Toast,
  Content,
  Header,
  Title,
  Left,
  Body,
  Right,
  Icon,
  Card,
  CardItem,
  H3,
  Footer
} from "native-base";
import Api from '../../api/api';
import Swipeout from 'react-native-swipeout';
import { AsyncStorage } from 'react-native';
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
export default class Other extends React.Component{
  constructor(props){
    super(props)
    this.state=({
          saved:{},
          dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
          loading:true
        })
  }

	static navigationOptions ={
		tabBarLabel: 'My Stuff',
    tabBarIcon: (
      <Image style={styles.icon} source={require('../../../assets/icons8-pin.png')}/>)

	}
  getstorage(){
    AsyncStorage.getAllKeys((err, keys) => {

      AsyncStorage.multiGet(keys, (err, stores) => {
        var data = JSON.stringify(stores)
        var stuff = JSON.parse(data)
        console.log(stuff)
        
        
        var objectdata = []
        stores.map((result, i, store) => {
     // get at each store's key/value so you can work with it
          console.log(result)
          console.log(i)
          let key = store[i][0];
          let value = store[i][1];
          console.log(value)
          objectdata[JSON.parse(i)] = JSON.parse(value) 
              
      });
        
        
        console.log(objectdata)
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(objectdata),
            loading:false
          })
    });

  });
  }

  componentDidMount() {
    AsyncStorage.getAllKeys((err, keys) => {

      AsyncStorage.multiGet(keys, (err, stores) => {
        var data = JSON.stringify(stores)
        var stuff = JSON.parse(data)
        console.log(stuff)
        
        
        var objectdata = []
        stores.map((result, i, store) => {
     // get at each store's key/value so you can work with it
          console.log(result)
          console.log(i)
          let key = store[i][0];
          let value = store[i][1];
          console.log(value)
          objectdata[JSON.parse(i)] = JSON.parse(value) 
              
      });
        
        
        console.log(objectdata)
        
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(objectdata),
            loading:false
          })
      
    });

  });
}
componentWillUpdate(){
  AsyncStorage.getAllKeys((err, keys) => {

      AsyncStorage.multiGet(keys, (err, stores) => {
        var data = JSON.stringify(stores)
        var stuff = JSON.parse(data)
        console.log(stuff)
        
        
        var objectdata = []
        stores.map((result, i, store) => {
     // get at each store's key/value so you can work with it
          console.log(result)
          console.log(i)
          let key = store[i][0];
          let value = store[i][1];
          console.log(value)
          objectdata[JSON.parse(i)] = JSON.parse(value) 
              
      });
        
        
        console.log(objectdata)
        
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(objectdata),
            loading:false
          })
      
    });

  });
}
   _renderRow(rowData){
      let self = this
   let swipeBtns = [{
        text: 'Delete',
        backgroundColor: 'red',
        underlayColor: 'white',
        onPress: () => { 
         AsyncStorage.removeItem(rowData.id).then(function(){
          
         })
        }
      }]
      
   if(rowData == null){
    return(
      <H3>Nothing here</H3>
      )
   }
        return(
            <Swipeout right={swipeBtns}
               autoClose= {true}
               backgroundColor= 'transparent'
               >
                <Card key={rowData.id}>
                  <CardItem style={styles.fullCard}>
                    <H3 style={styles.whiteText}>{rowData.name} - {rowData.categories[0].shortName}</H3>
                  </CardItem>
                  <CardItem cardBody>
                    <Text style={styles.card}>{rowData.location.formattedAddress}</Text>
                  </CardItem>
                </Card>
            </Swipeout>
          ) 
       
    }
	render(){
    console.log(this.state.dataSource.getRowCount())
    if (this.state.loading==true){
      return(
        <Container>
          <H3>Nothing to see here</H3>
        </Container>
        )
    }
     
		return(
      <Container>
			<Header style={styles.header2}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Saved Places</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => alert("We love you too!")}>
              <Icon name="heart" />
            </Button>
          </Right>
        </Header>
        <Content padder>

			  <ListView
                removeClippedSubViews = {false}
                enableEmptySections={true} 
                dataSource={this.state.dataSource}
                renderRow={this._renderRow}
                style={{flex:1}}>
        </ListView> 
        </Content>
      </Container> 
			)


	}
}