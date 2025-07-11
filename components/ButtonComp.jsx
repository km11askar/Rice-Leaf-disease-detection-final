import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { theme } from '../constants/theme'
import { hp } from '../helpers/common'
import Loading from './Loading'

const ButtonComp = ({
  buttonStyle,
  textStyle,
  title='',
  onPress=()=>{},
  loading = false,
  hasShadow = true ,

}) => {
  const shadoStyle={
    shadowColor:theme.Colors.dark,
    shadowOffset:{width:0, height:10},
    shadowOpacity:0.2,
    shadowRadius:8,
    elevation:4,
   }

   if(loading){
    return(
      <View style={[styles.ButtonComp, buttonStyle, {backgroundColor:'white'}]}>
        <Loading/>


      </View>
    )
   }
  return (
    <Pressable onPress={onPress} style={[styles.ButtonComp,buttonStyle, hasShadow && shadoStyle]}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </Pressable>
  )
}

export default ButtonComp

const styles = StyleSheet.create({
  ButtonComp:{
    backgroundColor:theme.Colors.primary,
    height:hp(6.6),
    justifyContent:'center',
    alignItems:'center',
    borderCurve:'continuous',
    borderRadius:25,
  },
  text:{
    fontSize:hp(2.5),
    color:'black',
    fontWeight:theme.fonts.bold,
  }
})