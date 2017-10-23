import React, { Component } from "react";
import { Image, TouchableOpacity, TabBarIOS, ListView, ScrollView} from "react-native";
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
  Footer,
  DeckSwiper,
  
} from "native-base";
import MapView from 'react-native-maps';
import styles from "./styles";
import {NavigationActions} from 'react-navigation';
import TabNavigator from 'react-native-tab-navigator';
import Search from'../Search';
import Api from '../../api/api';
import Swipeout from 'react-native-swipeout';
import { AsyncStorage } from 'react-native';
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
export default class Home extends Component {
  static navigationOptions={
    tabBarLabel: 'Map',
    tabBarIcon: (
      <Image style = {styles.icon} source={require('../../../assets/icons8-map.png')}/>)

  }
  constructor(props) {
    super(props);
    this.state = ({      
       mapData: null,
       food: {},
       stuff:[],
       isLoading:true, 
       datalist:{},
       dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})     
    });    
  }
  componentDidMount() {  
   
        
      navigator.geolocation.getCurrentPosition(
      (position) => {
        let region = {
         
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
          error: null     
        };
        let coords = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          error: null
        };
        this.setState({
          mapData: region,
          
        })
        
       var params = {
  
        'll': `${coords.lat},${coords.lon}`,
        'limit': 15,
        'venuePhotos': 1,
        'categoryId':'4d4b7105d754a06374d81259',
        'radius':30
        
        }

      Api.getData(params).then(function(venues) {
        console.log(venues.response)
          this.setState({
            food: venues.response.venues,
            stuff: venues.response.venues[0],
            isLoading: false,
            datalist:venues.response,
            dataSource: this.state.dataSource.cloneWithRows(venues.response.venues)
          })
          console.log(venues.response.venues)
      }.bind(this))      
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 2000, maximumAge: 100000 },
    );     
  }
  
  saveStuff(y){
  
    console.log(data)
  }
  _renderRow(rowData){
      let self = this
      var data = {
        id: rowData.id,
        name: rowData.name,
        category: rowData.categories[0].shortName,
        location: rowData.location.formattedAddress
      }
     
   let swipeBtns = [{
        text: 'Save',
        backgroundColor: 'green',
        underlayColor: 'white',
        onPress: () => { 
          AsyncStorage.setItem(rowData.id,JSON.stringify(rowData));
        }
      }]
      
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
  render() {
console.log(this.state.food)
  
  if(this.state.isLoading == true){
    return(
      <Container style={{justifyContent:'space-around'}}>
        <Header style={styles.header}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="menu" style={{color:'white'}} />
            </Button>
          </Left>
          <Body>
            <Title style={styles.headText}>Fave Foods</Title>
          </Body>
          <Right>
            
          </Right>
        </Header>
        <Content>
        <Image source={require("./../../../assets/foodlogo2.png")}
        style={{width:300, height:300}}/>
          <H3>
            Loading...
          </H3>
        </Content>
      </Container>
      )
  }
 
 
  console.log(this.state.food[0])
  var markers = []
  this.state.food.forEach(function(x){
    marker = {
      lat: x.location.lat,
      lon: x.location.lng,
      title: x.name,
      latlong: `${x.location.lat},${x.location.lng}`,
      address: x.formattedAddress,
      
    }
    markers.push(marker)   
  })

  console.log(this.state.food)
   const {navigation} = this.props.navigation
   let save = ''
  
    return (
      <Container>
        <Header style={styles.header}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="menu" style={{color:'white'}}/>
            </Button>
          </Left>
          <Body>
            <Title style={styles.headText}>Fave Foods</Title>
          </Body>
          <Right>
            
          </Right>
        </Header>
        <Content padder>
           <MapView.Animated style={styles.map}
           showsUserLocation={false}
           region={this.state.mapData}>
           {markers.map(marker => (
                 <MapView.Marker.Animated
                  key={marker.title}
                   coordinate={{
                    latitude: marker.lat,
                    longitude: marker.lon
                   }}
                    title={marker.title}  
                  />
               ))}

           </MapView.Animated>      
            
            <ListView
                enableEmptySections={true} 
                dataSource={this.state.dataSource}
                renderRow={this._renderRow}>
            </ListView>         
        </Content>        
      </Container>
    );
  
}
}