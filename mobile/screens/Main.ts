import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Camera from './camera/CameraScreen';
import Display from './camera/DisplayScreen';
import Result from './camera/ResultScreen';

const stackNavigator = createStackNavigator(
  {
    Camera,
    Display,
    Result
  },
  { 
    initialRouteName : 'Camera',
    defaultNavigationOptions : {
      headerStyle: {
        display: 'none'
      },
      gesturesEnabled: false
    }
  }
);

const Main = createAppContainer(stackNavigator);

export default Main;