
// import { Alert, View, Text, TouchableOpacity, StyleSheet } from 'react-native' 
// import React , { useRef, useState } from 'react' 
// import { useRouter } from 'expo-router' 
// import { StatusBar } from 'expo-status-bar' 
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { TextInput } from 'react-native';
// // import { auth } from '../config/firebase'; 
// // import { createUserWithEmailAndPassword } from 'firebase/auth';  

// export default function signUp() { 
//   const router = useRouter();
//   const { top } = useSafeAreaInsets();
//   const nameRef = useRef("");
//   const emailRef = useRef(""); 
//   const passwordRef = useRef(""); 
  
//   const [loading, setLoading] = useState(false); 
//   const onsubmit = async () => {
//     if (!nameRef.current || !emailRef.current || !passwordRef.current) {
//       Alert.alert('Sign Up', "Please fill all the fields!");
//       return;
//     }
  
//     setLoading(true);
  
//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         // auth,
//         emailRef.current,
//         passwordRef.current
//       );
  
//       const user = userCredential.user;
//       console.log(user); // You can see UID, email, etc.
  
//       Alert.alert('Success', "Signup successful!");
//       router.replace('/login'); // Navigate to welcome screen after signup
  
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Signup Error', error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

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
      
//       {/* Welcome Section */}
//       <View style={styles.welcomeSection}>
//         <Text style={styles.welcomeText}>Let's </Text>
//         <Text style={styles.welcomeText}>Get Started</Text>
//       </View>
      
//       {/* Form */}
//       <View style={styles.form}> 
//         <Text style={styles.subtitle}>
//           Please fill the details to create an account
//         </Text>
        
//         <View style={styles.inputContainer}>
//           <Text style={styles.inputIcon}>👤</Text>
//           <TextInput 
//             style={styles.input}
//             placeholder='Enter your name' 
//             placeholderTextColor="gray"
//             onChangeText={value => nameRef.current = value} 
//           /> 
//         </View>
        
//         <View style={styles.inputContainer}>
//           <Text style={styles.inputIcon}>✉️</Text>
//           <TextInput 
//             style={styles.input}
//             placeholder='Enter your email' 
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
        
//         {/* Signup Button */}
//         <TouchableOpacity 
//           style={styles.signupButton}
//           onPress={onsubmit}
//           disabled={loading}
//         >
//           {loading ? (
//             <Text style={styles.buttonText}>Loading...</Text>
//           ) : (
//             <Text style={styles.buttonText}>Sign Up</Text>
//           )}
//         </TouchableOpacity>
//       </View> 
      
//       {/* Footer */}
//       <View style={styles.footer}> 
//         <Text style={styles.footerText}> 
//           Already have an account! 
//         </Text> 
//         <TouchableOpacity onPress={() => router.push('login')}> 
//           <Text style={styles.loginText}>Login</Text> 
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
//   },
//   welcomeText: { 
//     fontSize: 28, 
//     fontWeight: 'bold', 
//     color: '#494949', 
//   },
//   subtitle: {
//     fontSize: 14,
//     color: '#494949',
//     marginBottom: 15,
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
//   signupButton: {
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
//   loginText: {
//     color: '#00c26f',
//     fontWeight: '600',
//     fontSize: 16,
//   }
// });


import { Alert, View, Text, TouchableOpacity, StyleSheet, useWindowDimensions, Platform, TextInput } from 'react-native';
import React, { useRef, useState } from 'react';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { auth } from '../config/firebase'; // Assuming this is your Firebase config
// import { createUserWithEmailAndPassword } from 'firebase/auth'; // Firebase auth function

export default function SignUpScreen() { // Renamed for clarity
  const router = useRouter();
  const { top } = useSafeAreaInsets();
  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const [loading, setLoading] = useState(false);
  const { width } = useWindowDimensions(); // Get screen width

  // Define a breakpoint for when to apply desktop-like styles
  const isLargeScreen = width >= 768;

  const onSubmit = async () => { // Renamed for convention
    if (!nameRef.current || !emailRef.current || !passwordRef.current) {
      Alert.alert('Sign Up', "Please fill all the fields!");
      return;
    }

    setLoading(true);

    try {
      //   Simulating API call, uncomment your Firebase logic here
      //   const userCredential = await createUserWithEmailAndPassword(
      //     auth,
      //     emailRef.current,
      //     passwordRef.current
      //   );
      //   // You might want to update the user's profile with the name here
      //   // await updateProfile(userCredential.user, { displayName: nameRef.current });
      //   const user = userCredential.user;
      //   console.log(user);

      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      console.log("Simulated signup with:", nameRef.current, emailRef.current, passwordRef.current);


      Alert.alert('Success', "Signup successful!");
      router.replace('/login'); // Navigate to login screen after signup

    } catch (error) {
      console.error(error);
      Alert.alert('Signup Error', error.message || "An unexpected error occurred.");
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
      <Text style={styles.backButtonText}> ← </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[
      styles.container,
      // Apply padding top considering safe area, with a fallback for web or when top is 0
      { paddingTop: Platform.OS === 'web' ? 30 : (top > 0 ? top + 5 : 30) }
    ]}>
      <StatusBar style="dark" />

      {/* Main content wrapper for responsiveness on larger screens */}
      <View style={[
        styles.contentWrapper,
        (Platform.OS === 'web' && isLargeScreen) && styles.contentWrapperWeb
      ]}>

        <BackButton />

        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Let's</Text>
          <Text style={styles.welcomeText}>Get Started</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Text style={styles.subtitle}>
            Please fill the details to create an account
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>👤</Text>
            <TextInput
              style={styles.input}
              placeholder='Enter your name'
              placeholderTextColor="gray"
              onChangeText={value => nameRef.current = value}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>✉️</Text>
            <TextInput
              style={styles.input}
              placeholder='Enter your email'
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

          {/* Signup Button */}
          <TouchableOpacity
            style={styles.signupButton}
            onPress={onSubmit}
            disabled={loading}
          >
            {loading ? (
              <Text style={styles.buttonText}>Loading...</Text>
            ) : (
              <Text style={styles.buttonText}>Sign Up</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Already have an account!
          </Text>
          <TouchableOpacity onPress={() => router.push('login')}>
            <Text style={styles.loginText}>Login</Text>
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
    // paddingHorizontal is now applied to contentWrapper
  },
  contentWrapper: { // New wrapper for content
    flex: 1,
    paddingHorizontal: 20,
    width: '100%',
  },
  contentWrapperWeb: { // Styles for web/large screens
    maxWidth: 500, // Max width for the content on large screens
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
  welcomeSection: {
    marginBottom: 25, // Slightly adjusted
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#494949',
    lineHeight: 34, 
  },
  subtitle: {
    fontSize: 15, // Slightly increased
    color: '#555555', // Slightly darker gray
    marginBottom: 20, // Increased margin
    textAlign: 'center', // Centered subtitle
  },
  form: {
    gap: 18, // Slightly adjusted gap
  },
  inputContainer: {
    flexDirection: 'row',
    height: 55,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#494949',
    borderRadius: 25,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
  },
  inputIcon: {
    marginRight: 10,
    fontSize: 20,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#000000',
  },
  signupButton: {
    backgroundColor: '#00c26f',
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 15, // Increased margin
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white', // Changed to white for better contrast
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
  loginText: {
    color: '#00c26f',
    fontWeight: '600',
    fontSize: 16,
  }
});