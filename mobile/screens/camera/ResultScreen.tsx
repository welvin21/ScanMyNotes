import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import * as FileSystem from 'expo-file-system';
import Loader from '../../components/Loader';

const axios = require('axios');

const Result = props => {
  const url = props.navigation.getParam('uri',null);
  const [ result, changeResult ] = useState(null);

  useEffect(() => {
    const getResult = async() => {
      const base64 = await FileSystem.readAsStringAsync(url, { encoding: 'base64' });
      await axios.post('http://192.168.1.7:3000/convert',{base64})
          .then( res => changeResult(res.data) )
          .catch( err => console.error(err) );
    }

    setTimeout( () => {
      changeResult('Fix OCR file transfer problem!');
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