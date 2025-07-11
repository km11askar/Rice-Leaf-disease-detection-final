// import {   Image, Pressable,  StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import ScreenWrapper from '../components/ScreenWrapper'
// import {hp, wp } from '../helpers/common'
// import { theme } from '../constants/theme'
// import ButtonComp from '../components/ButtonComp'
// import { useRouter } from 'expo-router'
// import { StatusBar } from 'expo-status-bar'
// import _layout from './_layout'


// const welcome = () => {
//   const router=useRouter();
//   return (
//     <ScreenWrapper bg="white">
//       <StatusBar style="light"/> 
//       <View style={styles.container}>
      
//       {/*welcome image*/}
//        <Image style={styles.welcomeImage}  resizeMode='contain' source={require('../assets/images/welcome.png')}/>
//       {/*title*/}
//         <View style={{gap:20}}>
//           <Text  style={styles.title}>Plant Guard!</Text>
//           <Text style={styles.punchline}>
//             Healthy Plants Lead to Higher Yield and Better-Quality Rice
//             </Text> 
//         </View> 
//         {/*footer*/}
//         <View style={styles.footer}>
//           <ButtonComp style={styles.ButtonComp}
//           title="Getting Started"
//           buttonStyle={{marginHorizontal:wp(3)}}
//           onPress={()=>router.push('login')}
//           />
//           <View style={styles.bottomTextContainer}>
//             <Text style={styles.loginText}>
//               Already have an account!
//             </Text>
//             <Pressable onPress={()=>router.push('login')}>
//               <Text style={[styles.loginText, {color:theme.Colors.primaryDark, fontWeight:theme.fonts.semiBold
//               }]}>
//                 Login
//               </Text>
//             </Pressable>
//           </View>
//         </View>
//       </View>
//     </ScreenWrapper>
//   )
// }

// export default welcome

// const styles = StyleSheet.create({
//   container:{
//     flex:1,
//     alignItems:'center',
//     justifyContent:'space-around',
//     backgroundColor:'white',
//     paddingHorizontal: wp(4),
//   },
//   welcomeImage:{
//     height:hp(50),
//     width:wp(100),
//     alignSelf:'center',
//     marginBottom: hp(1), 


//   },
//   title:{
//     color:theme.Colors.text,
//     fontSize:hp(4),
//     textAlign: 'center',
//     fontWeight: theme.fonts.extraBold  
//   },
//   punchline:{
//     textAlign:'center',
//     paddingHorizontal: wp(10),
//     fontSize: hp(1.7),
//     color: theme.Colors.text,
//   },
//   footer: {
//     gap: 20,
//     width: '90%',
//     marginBottom: hp(10), 
//   },
//   bottomTextContainer:{
//     flexDirection:'row',
//     justifyContent:'center',
//     alignItems:'center',
//     gap:5
//   },
//   loginText:{
//     textAlign:'center',
//     color:theme.Colors.text,
//     fontSize:hp(1.6),

//   }



// })

import { Image, Pressable, StyleSheet, View, Text, useWindowDimensions, Platform } from 'react-native';
import React from 'react';
import ScreenWrapper from '../components/ScreenWrapper'; // Assuming this handles safe areas
import { hp, wp } from '../helpers/common'; // Assuming these are for height/width percentages
import { theme } from '../constants/theme'; // Assuming this holds your theme colors/fonts
import ButtonComp from '../components/ButtonComp'; // Your custom button component
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const Welcome = () => {
  const router = useRouter();
  const { width } = useWindowDimensions();

  const isLargeScreen = width >= 768;

  return (
    <ScreenWrapper bg="white">
      <StatusBar style="dark" />

      <View style={styles.outerContainer}>
        <View
          style={[
            styles.contentWrapper,
            Platform.OS === 'web' && isLargeScreen && styles.contentWrapperWeb,
          ]}
        >
          <View style={styles.imageContainer}>
            <Image
              style={[
                styles.welcomeImage,
                isLargeScreen && Platform.OS === 'web' ? { maxHeight: 350 } : {},
              ]}
              resizeMode="contain"
              source={require('../assets/images/welcome.png')}
            />
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>Plant Guard!</Text>
            <Text style={[styles.punchline, { marginTop: 10 }]}>
              Healthy Plants Lead to Higher Yield and Better-Quality Rice
            </Text>
          </View>

          <View style={styles.footer}>
            <ButtonComp
              title="Getting Started"
              buttonStyle={[styles.gettingStartedButton, { marginHorizontal: wp(3), marginBottom: 25 }]}
              textStyle={styles.gettingStartedButtonText}
              onPress={() => router.push('login')}
            />

            <View style={styles.bottomTextContainer}>
              <Text style={[styles.loginText, { marginRight: 5 }]}>Already have an account!</Text>
              <Pressable onPress={() => router.push('login')}>
                <Text
                  style={[
                    styles.loginText,
                    styles.loginLinkText,
                    { fontWeight: theme.fonts.semiBold },
                  ]}
                >
                  Login
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentWrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
  },
  contentWrapperWeb: {
    maxWidth: 600,
    maxHeight: '95%',
    borderRadius: Platform.OS === 'web' ? 10 : 0,
  },
  imageContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingTop: hp(2),
  },
  welcomeImage: {
    height: hp(50),
    width: wp(100),
    maxWidth: 450,
  },
  titleContainer: {
    alignItems: 'center',
    marginVertical: hp(-15),
  },
  title: {
    color: theme.Colors.text,
    fontSize: hp(3.8),
    textAlign: 'center',
    fontWeight: theme.fonts.extraBold,
  },
  punchline: {
    textAlign: 'center',
    paddingHorizontal: wp(5),
    fontSize: hp(1.8),
    color: theme.Colors.text,
    lineHeight: hp(2.5),
  },
  footer: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    paddingBottom: hp(5),
    marginTop: hp(2),
    
  },
  gettingStartedButton: {
    backgroundColor: theme.Colors.primaryDark,
    width: '100%',
    paddingVertical: hp(1.8),
  },
  gettingStartedButtonText: {
    color: 'white',
    fontSize: hp(2),
    fontWeight: theme.fonts.bold,
  },
  bottomTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    textAlign: 'center',
    color: theme.Colors.text,
    fontSize: hp(1.7),
  },
  loginLinkText: {
    color: theme.Colors.primaryDark,
  },
});
