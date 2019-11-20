import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import env from '../../env';

const axios = require('axios');

const Result = props => {
  const url = props.navigation.getParam('uri',null);
  const [ result, changeResult ] = useState(null);

  useEffect(() => {
    const getResult = async() => {
      let formData = new FormData();
      formData.append('apikey',env.apikey);
      formData.append('url',url);
      
      axios.post('https://api.ocr.space/parse/image',formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then( res => {
        const { ParsedResults } = res.data;
        changeResult(ParsedResults[0].ParsedText);
      } )
      .catch( err => console.error(err) );
    };

    getResult();
  },[]);

  if(!result){
    return(
      <View style={{flex : 1}} >
        <Text style={{top : '40%', position: 'absolute'}}>Loading Component</Text>
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