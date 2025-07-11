

// import { Alert, Image, View, Text, TouchableOpacity, StyleSheet } from 'react-native' 
// import React, { useRef, useState } from 'react' 
// import { useRouter } from 'expo-router' 
// import { StatusBar } from 'expo-status-bar' 
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { TextInput } from 'react-native';
// // import { auth } from '../config/firebase'; // since login.jsx is in app/
// // import { signInWithEmailAndPassword } from 'firebase/auth'; // for login
  
// export default function login ()  { 
//   const router = useRouter();
//   const { top } = useSafeAreaInsets();
//   const emailRef = useRef(""); 
//   const passwordRef = useRef(""); 
  
//   const [loading, setLoading] = useState(false); 
  
//   const onsubmit = async () => {
//     if (!emailRef.current || !passwordRef.current) {
//       Alert.alert('Login', "Please fill all the fields!");
//       return;
//     }
  
//     setLoading(true);
  
//     try {
//       const userCredential = await (
//         // auth,
//         emailRef.current,
//         passwordRef.current
//       );
  
//       const user = userCredential.user;
//       console.log(user); // { uid, email, etc. }
  
//       Alert.alert('Success', "Login successful!");
//       router.replace('/tabs'); // Navigate to home page after login
  
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Login Error', error.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   // Back button component
//   const BackButton = () => (
//     <TouchableOpacity 
//       style={styles.backButton}
//       onPress={() => router.back()}
      
//     >
//       <Text style={{ fontSize: 24 }}>←</Text>
//     </TouchableOpacity>
//   );
  
//   return ( 

    
//     <View style={[styles.container, { paddingTop: top > 0 ? top + 5 : 30 }]}>
      

//       <StatusBar style="dark"/> 
      
      
//       <BackButton />
//       <View>
//               <Image style={styles.welcomeImage}  resizeMode='contain' source={require('../assets/images/welcome.png')}/>
//               </View>
      
//       {/* Welcome Section */}
//       <View style={styles.welcomeSection}>
        
//         <Text style={styles.welcomeText}>Welcome </Text>
//         <Text style={styles.subtitle}>Please login to continue</Text>
//       </View>
      
//       {/* Form */}
//       <View style={styles.form}> 
//         <View style={styles.inputContainer}>
//           <Text style={styles.inputIcon}>✉️</Text>

//           <TextInput 
//             style={styles.input}
//             placeholder="Enter your Email" 
//             placeholderTextColor="gray"
//             onChangeText={value => emailRef.current = value}
//           />

          
//         </View>
        
//         <View style={styles.inputContainer}>
//           <Text style={styles.inputIcon}>🔒</Text>

//           <TextInput 
//             style={styles.input}
//             placeholder='Enter your password' 
//             placeholderTextColor="gray"
//             secureTextEntry 
//             onChangeText={value => passwordRef.current = value} 
//           /> 
//         </View>
        
//         <Text style={styles.forgotPassword}> 
//           Forgot Password? 
//         </Text> 
        
//         {/* Login Button */}
//         <TouchableOpacity 
//           style={styles.loginButton}
//           onPress={onsubmit }
//           disabled={loading}
//         >
//           {loading ? (
//             <Text style={styles.buttonText}>Loading...</Text>
//           ) : (
//             <Text style={styles.buttonText}>Login</Text>
//           )}
//         </TouchableOpacity>
//       </View> 
      
//       {/* Footer */}
//       <View style={styles.footer}> 
//         <Text style={styles.footerText}> 
//           Don't have an account? 
//         </Text> 
//         <TouchableOpacity onPress={() => router.push('signUp')}> 
//           <Text style={styles.signupText}>Sign up</Text> 
//         </TouchableOpacity> 
//       </View> 
//     </View> 
//   ) 
// } 



// const styles = StyleSheet.create({ 
//   container: { 
//     flex: 1, 
//     paddingHorizontal: 20, 
//     backgroundColor: 'white',
//   },
//   backButton: {
//     alignSelf: 'flex-start',
//     padding: 8,
//     borderRadius: 8,
//     backgroundColor: 'rgba(0,0,0,0.07)',
//     marginBottom: 20,
//   },
//   welcomeSection: {
//     marginBottom: 30,
//     alignItems:'center',
  
    
//   },
//   welcomeText: { 
//     fontSize: 28, 
//     fontWeight: 'bold', 
//     color: '#494949', 
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#7C7C7C',
//     marginTop: 5,
//   },
//   form: { 
//     gap: 20, 
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     height: 55,
//     alignItems: 'center',
//     borderWidth: 0.5,
//     borderColor: '#494949',
//     borderRadius: 25,
//     paddingHorizontal: 15,
//   },
//   inputIcon: {
//     marginRight: 10,
//     fontSize: 20,
//   },
//   input: {
//     flex: 1,
//     height: '100%',
//   },
//   forgotPassword: { 
//     textAlign: 'right', 
//     fontWeight: '600', 
//     color: '#00c26f', 
//   },
//   loginButton: {
//     backgroundColor: '#00c26f',
//     height: 55,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 25,
//     marginTop: 10,
//   },
//   buttonText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: 'black',
//   },
//   footer: { 
//     flexDirection: 'row', 
//     justifyContent: 'center', 
//     alignItems: 'center',
//     gap: 5,
//     marginTop: 40,
//   },
//   footerText: {
//     color: '#494949',
//     fontSize: 16,
//   },
//   signupText: {
//     color: '#00c26f',
//     fontWeight: '600',
//     fontSize: 16,
//   },
//    welcomeImage:{
//         height:250,
//         width:'100%',
//         alignSelf:'center',
//       }
// });

import { Alert, Image, View, Text, TouchableOpacity, StyleSheet, useWindowDimensions, Platform, TextInput } from 'react-native';
import React, { useRef, useState } from 'react';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { auth } from '../config/firebase'; // since login.jsx is in app/
// import { signInWithEmailAndPassword } from 'firebase/auth'; // for login

export default function LoginScreen() { // Renamed for clarity from 'login'
  const router = useRouter();
  const { top } = useSafeAreaInsets();
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const [loading, setLoading] = useState(false);
  const { width } = useWindowDimensions(); // Get screen width

  // Define a breakpoint for when to apply desktop-like styles
  const isLargeScreen = width >= 768;

  const onSubmit = async () => { // Renamed from onsubmit for convention
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert('Login', "Please fill all the fields!");
      return;
    }

    setLoading(true);

    try {
      // Simulating API call, uncomment your Firebase logic here
      // const userCredential = await signInWithEmailAndPassword(
      //   auth,
      //   emailRef.current,
      //   passwordRef.current
      // );
      // const user = userCredential.user;
      // console.log(user);

      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      console.log("Simulated login with:", emailRef.current, passwordRef.current);


      Alert.alert('Success', "Login successful!");
      router.replace('/tabs'); // Navigate to home page after login

    } catch (error) {
      console.error(error);
      Alert.alert('Login Error', error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // Back button component
  const BackButton = () => (
    <TouchableOpacity
      style={styles.backButton}
      onPress={() => router.back()}
    >
      <Text style={styles.backButtonText}>←</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[
      styles.container,
      { paddingTop: Platform.OS === 'web' ? 30 : (top > 0 ? top + 5 : 30) }
    ]}>
      <StatusBar style="dark" />

      {/* Main content wrapper for responsiveness on larger screens */}
      <View style={[
        styles.contentWrapper,
        (Platform.OS === 'web' && isLargeScreen) && styles.contentWrapperWeb
      ]}>

        <BackButton />

        <View style={styles.imageContainer}>
          <Image
            style={styles.welcomeImage}
            resizeMode='contain'
            source={require('../assets/images/welcome.png')}
          />
        </View>

        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.subtitle}>Please login to continue</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>✉️</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your Email"
              placeholderTextColor="gray"
              onChangeText={value => emailRef.current = value}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>🔒</Text>
            <TextInput
              style={styles.input}
              placeholder='Enter your password'
              placeholderTextColor="gray"
              secureTextEntry
              onChangeText={value => passwordRef.current = value}
            />
          </View>

          <TouchableOpacity onPress={() => Alert.alert("Forgot Password", "Redirecting to forgot password...")}>
            <Text style={styles.forgotPassword}>
              Forgot Password?
            </Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={onSubmit}
            disabled={loading}
          >
            {loading ? (
              <Text style={styles.buttonText}>Loading...</Text>
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => router.push('signUp')}>
            <Text style={styles.signupText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // paddingHorizontal is now applied to contentWrapper for better control
  },
  contentWrapper: { // New wrapper for content
    flex: 1,
    paddingHorizontal: 20,
    width: '100%', // Take full width of its parent (container)
  },
  contentWrapperWeb: { // Styles for web/large screens
    maxWidth: 500, // Max width for the content
    alignSelf: 'center', // Center the content block
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.07)',
    marginBottom: 20,
    marginTop: Platform.OS === 'web' ? 10 : 0, // Extra margin top for web if no safe area
  },
  backButtonText: { 
    fontSize: 24,
    color: '#494949',
  },
  imageContainer: { // Added container for image for better control if needed
     alignItems: 'center', // Center image if its width is less than 100%
     marginBottom: 20, // Added margin below image
      },
  welcomeImage: {
    height: 250, // Slightly reduced height, adjust as needed
    width: '100%', // Take full width of its parent (imageContainer)
    maxWidth: 300, // Max width for the image itself
  },
  welcomeSection: {
    marginBottom: 30,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#494949',
  },
  subtitle: {
    fontSize: 16,
    color: '#7C7C7C',
    marginTop: 5,
  },
  form: {
    gap: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    height: 55,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#494949',
    borderRadius: 25,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF', // Ensure background for inputs
  },
  inputIcon: {
    marginRight: 10,
    fontSize: 20,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16, // Ensure consistent font size
    color: '#000000', 
  },
  forgotPassword: {
    textAlign: 'right',
    fontWeight: '600',
    color: '#00c26f',
    paddingVertical: 5, // Added padding for easier tapping
  },
  loginButton: {
    backgroundColor: '#00c26f',
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white', // Changed to white for better contrast on green button
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    marginTop: 30, // Adjusted margin
    paddingBottom: 20, // Add some padding at the very bottom
  },
  footerText: {
    color: '#494949',
    fontSize: 16,
  },
  signupText: {
    color: '#00c26f',
    fontWeight: '600',
    fontSize: 16,
  },
});