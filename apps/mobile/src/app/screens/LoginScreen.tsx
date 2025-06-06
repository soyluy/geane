// apps/mobile/src/app/screens/LoginScreen.tsx

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const PANEL_WIDTH = 320; // sabit buton genişliği

export default function LoginScreen() {
  const handleCreateAccount = () => {
    console.log('Hesap Oluştur butonuna basıldı');
  };
  const handleGoogleContinue = () => {
    console.log('Google ile Devam Et butonuna basıldı');
  };
  const handleLogin = () => {
    console.log('Giriş Yap linkine basıldı');
  };

  return (
    <View style={styles.wrapper}>
      {/* 1) Hesap Oluştur Butonu */}
      <TouchableOpacity
        style={styles.createAccountButton}
        onPress={handleCreateAccount}
        activeOpacity={0.8}
      >
        <Text style={styles.createAccountText}>Hesap Oluştur</Text>
      </TouchableOpacity>

      {/* 2) Google ile Devam Et Butonu */}
      <TouchableOpacity
        style={styles.googleButton}
        onPress={handleGoogleContinue}
        activeOpacity={0.8}
      >
        {/* Google ikonu: soldan 16px boşluk, mutlak konum */}
        <Image
          source={require('../../../assets/images/google-icon.png')}
          style={styles.googleIcon}
        />
        {/* Metin, butonun tam ortasında */}
        <Text style={styles.googleButtonText}>Google ile Devam Et</Text>
      </TouchableOpacity>

      {/* 3) Giriş Yap Metni */}
      <TouchableOpacity style={styles.loginTouchable} onPress={handleLogin}>
        <Text style={styles.loginText}>Giriş Yap</Text>
      </TouchableOpacity>

      {/* 4) Alt Bilgilendirme Metni */}
      <Text style={styles.infoText}>
        <Text style={styles.boldText}>Üye Olmadan devam </Text>
        ederek alışveriş yapabilirsin; içeriklerle etkileşim ve size özel öneriler
        için hesap oluşturman gerekir.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    width: '100%',
  },
  createAccountButton: {
    width: PANEL_WIDTH,
    height: 40,
    backgroundColor: '#F13957',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#F13957',
    alignItems: 'center',
    justifyContent: 'center',
  },
  createAccountText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
  },
  googleButton: {
    width: PANEL_WIDTH,
    height: 40,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 15,
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  googleIcon: {
    position: 'absolute',
    left: 16,
    width: 20,
    height: 20,
  },
  googleButtonText: {
    fontSize: 14,
    color: '#333333',
    fontFamily: 'Inter_700Bold',
  },
  loginTouchable: {
    marginTop: 24,
  },
  loginText: {
    fontSize: 16,
    color: '#040404',
    fontFamily: 'Inter_700Bold',
  },
  infoText: {
    width: PANEL_WIDTH,
    alignSelf: 'center',
    fontSize: 14,
    color: '#000000',
    textAlign: 'center',
    marginTop: 32,
    lineHeight: 20,
  },
  boldText: {
    fontFamily: 'Inter_700Bold',
    color: '#000000',
  },
});
