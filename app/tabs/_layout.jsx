
// import { Tabs } from 'expo-router';
// import React from 'react';
// import { Text } from 'react-native';

// // Simple icon component using emoji
// const TabIcon = ({ name, color }) => {
//   const icons = {
//     home: '🏠',
//     diagnose: '🔔',
//       profile: '👤',
//   };
  
//   return (
//     <Text style={{ fontSize: 24, color }}>
//       {icons[name] || '•'}
//     </Text>
//   );
// };

// const TabsLayout = () => {
//   return (
//     <Tabs
//       screenOptions={{
//         headerShown: false,
//         tabBarActiveTintColor: '#00c26f',
//         tabBarInactiveTintColor: '#7C7C7C',
//         tabBarStyle: {
//           height: 60,
//           paddingBottom: 8,
//           paddingTop: 8,
//         },
//       }}
//     >
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: 'Home',
//           tabBarIcon: ({ color }) => <TabIcon name="home" color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="diagnose" 
//         options={{
//           title: 'Diagnose',
//           tabBarIcon: ({ color }) => <TabIcon name="diagnose" color={color} />,
//         }}
//       />
      
//       <Tabs.Screen
//         name="profile"
//         options={{
//           title: 'Profile',
//           tabBarIcon: ({ color }) => <TabIcon name="profile" color={color} />,
//         }}
//       />

      
//     </Tabs>
//   );
// };

// export default TabsLayout;

import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#00c26f',
        tabBarInactiveTintColor: '#7C7C7C',
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="diagnose"
        options={{
          title: 'Diagnose',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="sick" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
