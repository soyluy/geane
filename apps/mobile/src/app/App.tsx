// apps/mobile/src/app/App.tsx

import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Expo AV’dan Video ve ResizeMode ikisini birden import ediyoruz:
import { Video, ResizeMode } from 'expo-av';

import {
  useFonts,
  Inter_400Regular,
  Inter_700Bold,
} from '@expo-google-fonts/inter';

// Artık bu yol geçerli: src/app/screens/LoginScreen.tsx
import LoginScreen from './screens/LoginScreen';

export default function App() {
  // 1) Inter fontlarının yüklenmesi
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });

  // 2) Animasyon referans değerleri
  const PANEL_HEIGHT = 350; // Panel yüksekliği
  const overlayTranslateY = useRef(new Animated.Value(PANEL_HEIGHT)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;

  // 3) 3 saniye sonra animasyonları başlat
  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.parallel([
        // Panel kaydırma: 350px aşağıdan 0'a
        Animated.timing(overlayTranslateY, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
        // Logo fade-in: 0 opaklıktan 1 opaklığa
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start();
    }, 3000); // 3000 ms (3 saniye) gecikme

    return () => clearTimeout(timer);
  }, [overlayTranslateY, logoOpacity]);

  // 4) Fontlar yüklenene kadar render etme
  if (!fontsLoaded) {
    return null;
  }

  // 5) Asıl UI render
  return (
    <View style={styles.container}>
      {/* StatusBar tamamen gizli */}
      <StatusBar hidden />

      {/* --- VIDEO ARKA PLAN --- */}
      <Video
        source={require('../../assets/videos/intro.mp4')}
        style={styles.video}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        isLooping
      />

      {/* --- LOGO (fade-in) --- */}
      <Animated.View style={[styles.logoContainer, { opacity: logoOpacity }]}>
        <SafeAreaView>
          <Animated.Text style={styles.logoText}>Geane</Animated.Text>
        </SafeAreaView>
      </Animated.View>

      {/* --- ALT PANEL (LOGIN) --- */}
      <Animated.View
        style={[
          styles.overlayContainer,
          { transform: [{ translateY: overlayTranslateY }] },
        ]}
      >
        <LoginScreen />
      </Animated.View>
    </View>
  );
}

// --- STYLESHEET ---
const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Video kenarlarında siyah kalsın
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  // Logo kutusunun stilleri
  logoContainer: {
    position: 'absolute',
    top: 40, // Ekranın 40 px altından
    left: 20, // Ekranın 20 px solundan
    backgroundColor: 'rgba(0,0,0,0.4)', // Yarı şeffaf siyah arka plan
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    zIndex: 2,
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    // İsterseniz Inter Bold kullanmak için:
    // fontFamily: 'Inter_700Bold',
  },
  // Aşağıdan yukarı kayacak beyaz panelin stilleri
  overlayContainer: {
    position: 'absolute',
    bottom: 0,
    left: (SCREEN_WIDTH - 430) / 2, // Panel genişliği 430, ekran ortalaması
    width: 430,
    height: 350,
    backgroundColor: '#fff',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    paddingTop: 32,
    paddingHorizontal: 24,
    zIndex: 1,
  },
});
