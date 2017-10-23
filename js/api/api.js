
import React, { Component } from "react";
var foursquare = require('react-native-foursquare-api')({
  clientID: 'XVNYDB2B2N13QUONO3UQWLUEEBRJJLLTZENQ4ZHBWUGTXZP4',
  clientSecret: 'I1CGP4DU1OJYV4SQEKR1SY2C5CMR44UER43JZCI3NQVEYM1J',
  style: 'foursquare', // default: 'foursquare'
  version: '20140806' //  default: '20140806'
});






// see respective api documentation for list of params you could pass


var Api = { 

getData(params){
	
//let results = 
return foursquare.venues.getVenues(params)
    
     
}


}

module.exports = Api;



