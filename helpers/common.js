// import { Dimensions } from "react-native";

// const {width: deviceWidth, height: deviceHeight} = Dimensions.get('window');

// export const hp = (percentage)=>{
//     return(percentage * deviceHeight)/100;
// }
// export const wp = (percentage)=>{
//     return(percentage * deviceWidth)/100;
// }

import { Dimensions } from "react-native";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

// Height percentage helper
export const hp = (percentage) => {
  return (percentage * deviceHeight) / 100;
};

// Width percentage helper
export const wp = (percentage) => {
  return (percentage * deviceWidth) / 100;
};