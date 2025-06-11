// apps/mobile/src/app/App.tsx

import React, { useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
  Platform,
  Image,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Video, ResizeMode } from 'expo-av';
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';

import CreateAccountScreen from './screens/CreateAccountScreen';
import LoginScreen from './screens/LoginScreen';     // Eğer “Giriş Yap” için ayrı bir ekran kullanacaksanız
import LoginContent from './components/LoginContent';

const Stack = createStackNavigator();
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

/** 
 * 1) “HomeScreen” bileşeni: 
 *    — Video + Animated overlay (LoginContent) işlevselliğini içerir.
 */
function HomeScreen() {
  // 1.a) Fontları yükleyelim
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });

  // 1.b) Overlay panelin başlangıçta ekrandan aşağıda olması
  const PANEL_HEIGHT = SCREEN_HEIGHT * 0.4; 
  const overlayTranslateY = useRef(new Animated.Value(PANEL_HEIGHT)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(overlayTranslateY, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }).start();
    }, 3000);
    return () => clearTimeout(timer);
  }, [overlayTranslateY]);

  if (!fontsLoaded) {
    return null; // Fontlar yüklenene kadar boş göster
  }

  return (
    <View style={styles.container}>
      {/* StatusBar’ı gizle */}
      <StatusBar hidden />

      {/* 1) Video arka plan */}
      <Video
        source={require('../../assets/videos/intro.mp4')}
        style={styles.video}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        isLooping
      />

      {/* 2) Sol üst köşedeki LOGO */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/LOGO.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>

      {/* 3) Aşağıdan yukarı kayan beyaz overlay panel */}
      <Animated.View
        style={[
          styles.overlayContainer,
          { transform: [{ translateY: overlayTranslateY }] },
        ]}
      >
        <LoginContent />
      </Animated.View>
    </View>
  );
}

/** 
 * 2) `App` bileşeni: 
 *    — NavigationContainer ve Stack Navigator yapısını içerir.
 */
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false, // Üstte otomatik header görünmesin
        }}
      >
        {/* HomeScreen: Uygulama açıldığında gösterilecek ekran */}
        <Stack.Screen name="Home" component={HomeScreen} />

        {/* CreateAccountScreen: “Hesap Oluştur” butonuna basınca gidilecek */}
        <Stack.Screen
          name="CreateAccount"
          component={CreateAccountScreen}
        />

        {/* İsterseniz Giriş Yap için ayrı bir ekran tanımlayabilirsiniz */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/** 
 * 3) Stil Tanımları 
 */
const styles = StyleSheet.create({
  /////////////////////////////////////
  // 3.1) Root Konteyner
  /////////////////////////////////////
  container: {
    flex: 1,
    backgroundColor: '#000000', // Video kenarlarında siyah kalsın
  },

  /////////////////////////////////////
  // 3.2) Video Stili
  /////////////////////////////////////
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },

  /////////////////////////////////////
  // 3.3) Logo Container
  /////////////////////////////////////
  logoContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 30,
    left: 20,
    width: 100,
    height: 30,
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },

  /////////////////////////////////////
  // 3.4) Overlay Panel (Animated)
  /////////////////////////////////////
  overlayContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.4, // Ekranın %40’ı kadar yükseklik
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 16,
    paddingHorizontal: 20,
  },
});
