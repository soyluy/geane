// apps/mobile/src/app/components/LoginContent.tsx

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function LoginContent() {
  const navigation = useNavigation();

  // Responsive oranlar
  const BUTTON_WIDTH = SCREEN_WIDTH * 0.75;    // Ekra­nın %75’i
  const BUTTON_HEIGHT = SCREEN_HEIGHT * 0.06;  // Ekra­nın %6’sı
  const SPACING = SCREEN_HEIGHT * 0.015;       // Ekra­nın %1.5’i kadar boşluk

  // Olay fonksiyonları
  const handleCreateAccount = () => {
    navigation.navigate('CreateAccount'); // Yönlendirmeyi CreateAccountScreen’e yap
  };
  const handleGoogleContinue = () => {
    console.log('Google ile Devam Et tıklandı');
  };
  const handleLogin = () => {
    console.log('Giriş Yap tıklandı');
  };

  return (
    <View style={styles.container}>
      {/** 1) “Hesap Oluştur” Butonu */}
      <TouchableOpacity
        style={[
          styles.createButton,
          {
            width: BUTTON_WIDTH,
            height: BUTTON_HEIGHT,
            borderRadius: BUTTON_HEIGHT / 2,
            marginBottom: SPACING,
          },
        ]}
        activeOpacity={0.8}
        onPress={handleCreateAccount}
      >
        <Text style={styles.createButtonText}>Hesap Oluştur</Text>
      </TouchableOpacity>

      {/** 2) “Google ile Devam Et” Butonu */}
      <TouchableOpacity
        style={[
          styles.googleButton,
          {
            width: BUTTON_WIDTH,
            height: BUTTON_HEIGHT,
            borderRadius: BUTTON_HEIGHT / 2,
            marginBottom: SPACING,
          },
        ]}
        activeOpacity={0.8}
        onPress={handleGoogleContinue}
      >
        <Ionicons name="logo-google" size={BUTTON_HEIGHT * 0.6} color="#DB4437" />
        <Text style={styles.googleButtonText}>Google ile Devam Et</Text>
      </TouchableOpacity>

      {/** 3) “Giriş Yap” Metni */}
      <TouchableOpacity onPress={handleLogin} style={{ marginBottom: SPACING }}>
        <Text style={styles.loginText}>Giriş Yap</Text>
      </TouchableOpacity>

      {/** 4) Alt Bilgilendirme Metni */}
      <Text style={[styles.infoText, { width: BUTTON_WIDTH }]}>
        <Text style={styles.infoBold}>Üye Olmadan devam </Text>
        ederek alışveriş yapabilirsin; içeriklerle etkileşim ve size özel
        öneriler için hesap oluşturman gerekir.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 8, // Panelin üst köşe yuvarlağının hemen altından başlasın
  },
  createButton: {
    backgroundColor: '#F13957',
    alignItems: 'center',
    justifyContent: 'center',
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    textAlign: 'center',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    backgroundColor: '#FFFFFF',
  },
  googleButtonText: {
    marginLeft: 8,
    color: '#333333',
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
  },
  loginText: {
    fontSize: 18,
    color: '#040404',
    fontFamily: 'Inter_700Bold',
    textAlign: 'center',
  },
  infoText: {
    fontSize: 14,
    color: '#000000',
    textAlign: 'center',
    lineHeight: 20,
  },
  infoBold: {
    fontWeight: 'bold',
    color: '#000000',
    fontFamily: 'Inter_700Bold',
  },
});
