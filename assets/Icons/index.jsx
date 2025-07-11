import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Home from './homeOne'
import { theme } from '../../constants/theme'
import Mail from './mail'
import User from './user'
import Heart from './heart'
import Plus from './plus'
import Search from './search'
import Location from './location'
import Call from './call'
import Camera from './camera'
import Edit from './edit'
import ArrowLeft from './arrowLeft'
import ThreeDotsCircle from './threeDotsCircle'
import ThreeDotsHorizontal from './threeDotsHorizontal'
import Comment from './comment'
import Share from './share'
import Send from './send'
import Delete from './delete'
import Logout from './logout'
import Image from './image'
import Video from './video'
import Lock from './lock'




const Icons ={
    homeOne:Home,
    mail:Mail,
    lock:Lock,
    user:User,
    heart:Heart,
    plus:Plus,
    search:Search,
    location:Location,
    call:Call,
    camera:Camera,
    edit:Edit,
    arrowLeft:ArrowLeft,
    themehreeDotsCircle:ThreeDotsCircle,
    threeDotsHorizontal:ThreeDotsHorizontal,
    comment:Comment,
    share:Share,
    send:Send,
    delete:Delete,
    logout:Logout,
    image:Image,
    video:Video,
}
const Icon = ({name, ...props}) => {
    const IconComponent = Icons[name];
  return (
     <IconComponent
         height={props.size || 24}
         widht={props.size ||24}
         strokeWidht={props.strokeWidht || 1.9}
         color={theme.Colors.textLight}
         {...props}
     />


  )
}

export default Icon

