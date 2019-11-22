import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import * as FileSystem from 'expo-file-system';
import Loader from '../../components/Loader';
import env from '../../env';

const axios = require('axios');
const firebase = require('firebase/app');
require('firebase/storage');

const fbConfig = env.fbConfig;
firebase.initializeApp(fbConfig);
const storageRef = firebase.storage().ref();
const imageRef = storageRef.child('image.jpeg');

const Result = props => {
  const picture = props.navigation.getParam('picture',null);
  const [ result, changeResult ] = useState(null);
  const { uri } = picture;

  useEffect(() => {
    const getResult = async() => {
      const response = await fetch(uri);
      const blob = await response.blob();

      (async() => {
        imageRef.put(blob)
        .then( snapshot => {
          return snapshot.ref.getDownloadURL();
        })
        .then( async url => {
            await axios.post(`http://${env.myIPv4}:3000/convert`,{url})
            .then(res => changeResult(res.data))
            .catch(err => {
              console.error(err);
              changeResult('Failed getting result');
            });
        })
        .catch( err => console.error(err) );
      })();
    }

    setTimeout( () => {
      getResult();
    }, 3500);

  },[]);

  if(!result){
    return(
      <View style={{flex : 1}} >
        <Loader/>
      </View>
    );
  }else{
    return(
      <View style={{flex : 1}} >
        <Text style={{top : '40%', position: 'absolute'}}>{result}</Text>
      </View>
    );
  }
}

export default Result;