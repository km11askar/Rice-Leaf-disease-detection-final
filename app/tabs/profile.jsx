


// import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { StatusBar } from 'expo-status-bar';
// import { useRouter } from 'expo-router';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// // import { auth } from '../../config/firebase';
// // import { signOut } from 'firebase/auth';

// // Simple Button Component
// const Button = ({ title, onPress, style, textStyle }) => {
//   return (
//     <TouchableOpacity 
//       style={[{
//         backgroundColor: '#00c26f',
//         height: 50,
//         borderRadius: 25,
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginBottom: 8,
//       }, style]}
//       onPress={onPress}
//     >
//       <Text 
//         style={[{
//           fontSize: 18,
//           fontWeight: 'bold',
//           color: 'black',
//         }, textStyle]} 
//       >
//         {title}
//       </Text>
//     </TouchableOpacity>
//   );
// };

// // Simple emoji icon mapping
// const getIcon = (name) => {
//   const iconMap = {
//     edit: '✏',
//     settings: '⚙',
//     bell: '🔔',
//     helpCircle: '❓',
//     info: 'ℹ',
//     chevronRight: '▶',
//   };
  
//   return iconMap[name] || '•';
// };

// export default function  ProfileScreen  ()  {
//   const router = useRouter();
//   const { top } = useSafeAreaInsets();
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // Check if user is logged in
//     const currentUser = auth.currentUser;
    
//     if (!currentUser) {
//       router.replace('/login');
//       return;
//     }
    
//     setUser(currentUser);
    
//     // Listen for auth state changes
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       if (!user) {
//         router.replace('/login');
//       } else {
//         setUser(user);
//       }
//     });
    
//     return () => unsubscribe();
//   }, []);

//   const handleLogout = () => {
//     Alert.alert(
//       "Logout",
//       "Are you sure you want to logout?",
//       [
//         {
//           text: "Cancel",
//           style: "cancel"
//         },
//         { 
//           text: "Logout", 
//           onPress: async () => {
//             try {
//               await signOut(auth);
//               router.replace('/login');
//             } catch (error) {
//               console.error('Logout error:', error);
//               Alert.alert('Error', 'Failed to logout. Please try again.');
//             }
//           }
//         }
//       ]
//     );
//   };

//   const menuItems = [
//     {
//       icon: 'helpCircle',
//       title: 'Help & Support',
//       onPress: () => Alert.alert('Help', 'Help and support will be available soon'),
//     },
//     {
//       icon: 'info',
//       title: 'About App',
//       onPress: () => Alert.alert('About', 'Plant Guard - Version 1.0.0'),
//     },
//   ];

//   // If user is not loaded yet
//   if (!user) {
//     return (
//       <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
//         <Text>Loading...</Text>
//       </View>
//     );
//   }

//   // Extract username from email (or use displayName if set)
//   const displayName = user.displayName || user.email.split('@')[0];
//   const userEmail = user.email;

//   return (
//     <View style={[styles.container, { paddingTop: top > 0 ? top + 5 : 30 }]}>
//       <StatusBar style="dark" />
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Profile</Text>
//       </View>

//       <View style={styles.profileSection}>
//         <View style={styles.avatarContainer}>
//           <View style={styles.avatar}>
//             <Text style={{ fontSize: 42 }}>
//               {displayName.charAt(0).toUpperCase()}
//             </Text>
//           </View>
//           <View style={styles.editIconContainer}>
//             <Text style={{ fontSize: 14, color: 'white' }}>{getIcon('edit')}</Text>
//           </View>
//         </View>
//         <Text style={styles.userName}>{displayName}</Text>
//         <Text style={styles.userEmail}>{userEmail}</Text>
//         <View style={styles.statsRow}>
//           <View style={styles.statItem}>
            
//           </View>
          
//         </View>
//       </View>

//       <View style={styles.menuSection}>
//         {menuItems.map((item, index) => (
//           <TouchableOpacity 
//             key={index} 
//             style={styles.menuItem}
//             onPress={item.onPress}
//           >
//             <View style={styles.menuIconContainer}>
//               <Text style={{ fontSize: 18, color: '#00c26f' }}>{getIcon(item.icon)}</Text>
//             </View>
//             <Text style={styles.menuText}>{item.title}</Text>
//             <Text style={{ fontSize: 14, color: '#7C7C7C' }}>{getIcon('chevronRight')}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       <Button 
//         title="Logout"
//         style={styles.logoutButton}
//         textStyle={styles.logoutText}
//         onPress={handleLogout}
//       />
//     </View>
//   );
// };



// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 20,
//     backgroundColor: 'white',
//   },
//   header: {
//     marginBottom: 15,
//   },
//   headerTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#494949',
//   },
//   profileSection: {
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   avatarContainer: {
//     position: 'relative',
//     marginBottom: 10,
//   },
//   avatar: {
//     width: 90,
//     height: 90,
//     borderRadius: 45,
//     backgroundColor: '#e3e3e3',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   editIconContainer: {
//     position: 'absolute',
//     bottom: 0,
//     right: 0,
//     backgroundColor: '#00c26f',
//     borderRadius: 15,
//     padding: 8,
//   },
//   userName: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#494949',
//   },
//   userEmail: {
//     fontSize: 16,
//     color: '#7C7C7C',
//     marginBottom: 10,
//   },
//   statsRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: '50%',
//     justifyContent: 'center',
//   },
//   statItem: {
//     alignItems: 'center',
//     flex: 1,
//   },
//   divider: {
//     height: 30,
//     width: 1,
//     backgroundColor: '#e3e3e3',
//   },
//   statNumber: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#00c26f',
//   },
//   statLabel: {
//     fontSize: 14,
//     color: '#7C7C7C',
//   },
//   menuSection: {
//     flex: 1,
//   },
//   menuItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#e3e3e3',
//   },
//   menuIconContainer: {
//     width: 30,
//     alignItems: 'center',
//   },
//   menuText: {
//     flex: 1,
//     fontSize: 16,
//     color: '#494949',
//     marginLeft: 10,
//   },
//   logoutButton: {
//     backgroundColor: '#F5F5F5',
//     marginBottom: 15,
//   },
//   logoutText: {
//     color: '#ef4444',
//   },
// });

import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Simple Button Component
const Button = ({ title, onPress, style, textStyle }) => {
  return (
    <TouchableOpacity 
      style={[{
        backgroundColor: '#00c26f',
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
      }, style]}
      onPress={onPress}
    >
      <Text 
        style={[{
          fontSize: 18,
          fontWeight: 'bold',
          color: 'black',
        }, textStyle]} 
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

// Simple emoji icon mapping
const getIcon = (name) => {
  const iconMap = {
    edit: '✏',
    settings: '⚙',
    bell: '🔔',
    helpCircle: '❓',
    info: 'ℹ',
    chevronRight: '▶',
  };
  
  return iconMap[name] || '•';
};

export default function ProfileScreen() {
  const router = useRouter();
  const { top } = useSafeAreaInsets();
  const [user, setUser] = useState({
    displayName: 'ajwath',
    email: 'ajwath@example.com'
  });

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Logout", 
          onPress: () => {
            // Replace with your logout logic
            router.replace('/login');
          }
        }
      ]
    );
  };

  const menuItems = [
    {
      icon: 'helpCircle',
      title: 'Help & Support',
      onPress: () => Alert.alert('Help', 'Help and support will be available soon'),
    },
    {
      icon: 'info',
      title: 'About App',
      onPress: () => Alert.alert('About', 'Plant Guard - Version 1.0.0'),
    },
  ];

  // Extract username from email (or use displayName if set)
  const displayName = user.displayName || user.email.split('@')[0];
  const userEmail = user.email;

  return (
    <View style={[styles.container, { paddingTop: top > 0 ? top + 5 : 30 }]}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={{ fontSize: 42 }}>
              {displayName.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View style={styles.editIconContainer}>
            <Text style={{ fontSize: 14, color: 'white' }}>{getIcon('edit')}</Text>
          </View>
        </View>
        <Text style={styles.userName}>{displayName}</Text>
        <Text style={styles.userEmail}>{userEmail}</Text>
        <View style={styles.statsRow}>
          <View style={styles.statItem}></View>
        </View>
      </View>

      <View style={styles.menuSection}>
        {menuItems.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.menuItem}
            onPress={item.onPress}
          >
            <View style={styles.menuIconContainer}>
              <Text style={{ fontSize: 18, color: '#00c26f' }}>{getIcon(item.icon)}</Text>
            </View>
            <Text style={styles.menuText}>{item.title}</Text>
            <Text style={{ fontSize: 14, color: '#7C7C7C' }}>{getIcon('chevronRight')}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Button 
        title="Logout"
        style={styles.logoutButton}
        textStyle={styles.logoutText}
        onPress={handleLogout}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  header: {
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#494949',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#e3e3e3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#00c26f',
    borderRadius: 15,
    padding: 8,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#494949',
  },
  userEmail: {
    fontSize: 16,
    color: '#7C7C7C',
    marginBottom: 10,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    justifyContent: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  divider: {
    height: 30,
    width: 1,
    backgroundColor: '#e3e3e3',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00c26f',
  },
  statLabel: {
    fontSize: 14,
    color: '#7C7C7C',
  },
  menuSection: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
  },
  menuIconContainer: {
    width: 30,
    alignItems: 'center',
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#494949',
    marginLeft: 10,
  },
  logoutButton: {
    backgroundColor: '#F5F5F5',
    marginBottom: 15,
  },
  logoutText: {
    color: '#ef4444',
  },
});