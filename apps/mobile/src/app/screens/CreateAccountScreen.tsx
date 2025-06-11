// apps/mobile/src/app/screens/CreateAccountScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Platform,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const { width: DEVICE_WIDTH } = Dimensions.get('window');

// ----------------------------------------
// 1) Sabitler (CSS’den bire bir kopyalandı)
// ----------------------------------------
const CONTAINER_WIDTH = 430;
const CONTAINER_HEIGHT = 932;

// Video alanı için sadece “placeholder”: 
// App.tsx’de gerçek video zaten tam ekranda oynuyor, burası üzerine siyah kutu koyuyoruz.
const VIDEO_PLACEHOLDER_HEIGHT = 580; 
// (CSS’de: overlap-group height=285, frame-wrapper top=285 => kalan 580px video alanı)

const EMAIL_LABEL_TOP = 371;         
const PASSWORD_LABEL_TOP = 410;      
const PASSWORD_INPUT_TOP = PASSWORD_LABEL_TOP + 24 + 8; // 410 + 24 (label height) + 8 (gap) = 442
const PASSWORD_NOTE_TOP = 535;       
const EYE_ICON_TOP = 504;            // 496 (wrapper top) + 8 (icon top inside)
const EYE_ICON_LEFT = 365;           

const DATE_LABEL_TOP = 578;          
const DATE_PICKERS_TOP = 665;        
const DATE_PICKER_LEFTS = [11, 146, 281]; 
const DATE_PICKER_WIDTH = 116;       
const DATE_PICKER_HEIGHT = 39;       

const NEXT_BUTTON_TOP = 768;         
const NEXT_BUTTON_LEFT = 157;        
const NEXT_BUTTON_WIDTH = 116;       
const NEXT_BUTTON_HEIGHT = 39;       

const EMAIL_INPUT_TOP = EMAIL_LABEL_TOP + 24 + 8; // 371 + 24 + 8 = 403
const EMAIL_INPUT_LEFT = 11;         
const EMAIL_INPUT_WIDTH = 407;       
const EMAIL_INPUT_HEIGHT = 39;       

const PASSWORD_INPUT_LEFT = 11;      
const PASSWORD_INPUT_WIDTH = 407;    
const PASSWORD_INPUT_HEIGHT = 39;    

const FOOTER_NOTE_TOP = 861;         
const FOOTER_NOTE_LEFT = 53;         
const FOOTER_NOTE_WIDTH = 324;       
const FOOTER_NOTE_HEIGHT = 53;       

// ----------------------------------------
// 2) CreateAccountScreen Bileşeni
// ----------------------------------------
export default function CreateAccountScreen({ navigation }) {
  // State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [day, setDay] = useState('9');
  const [month, setMonth] = useState('Ocak');
  const [year, setYear] = useState('1997');

  const days = Array.from({ length: 31 }, (_, i) => String(i + 1));
  const months = [
    'Ocak','Şubat','Mart','Nisan','Mayıs','Haziran',
    'Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 80 }, (_, i) => String(currentYear - i));

  const handleNext = () => {
    console.log('Sonraki butonuna basıldı');
  };
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.rootContainer}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/** —————————————— **/}
        {/** 1) Geri Tuşu (Absolute) **/}
        {/** —————————————— **/}
        <TouchableOpacity
          onPress={handleGoBack}
          style={styles.backButton}
          activeOpacity={0.8}
        >
          {/** Yer Tutucu: Gerçek projenizde <Ionicons name="arrow-back" /> gibi bir ikon koyun */}  
          <View style={styles.backIconPlaceholder} />
        </TouchableOpacity>

        {/** —————————————— **/}
        {/** 2) “Hesap Oluştur” Başlığı **/}
        {/** —————————————— **/}
        <Text style={styles.headerTitle}>Hesap Oluştur</Text>

        {/** —————————————— **/}
        {/** 3) Video Placeholder (Siyah 430×580) **/}
        {/** —————————————— **/}
        <View style={styles.videoPlaceholder} />

        {/** —————————————— **/}
        {/** 4) “E-Posta Adresiniz” Label & Input **/}
        {/** —————————————— **/}
        <Text style={styles.emailLabel}>E-Posta Adresiniz</Text>
        <TextInput
          style={styles.emailInput}
          placeholder="example@mail.com"
          placeholderTextColor="#999999"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        {/** —————————————— **/}
        {/** 5) “Şifre Belirleyiniz” Label & Input **/}
        {/** —————————————— **/}
        <Text style={styles.passwordLabel}>Şifre Belirleyiniz</Text>
        <TextInput
          style={styles.passwordInput}
          placeholder="En az 8 karakter"
          placeholderTextColor="#999999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {/** Göz ikonu (placeholder) **/}
        <View style={styles.eyeIconPlaceholder} />

        {/** Şifre altındaki not **/}
        <Text style={styles.passwordNote}>
          En az 8 karakter kullanmalısın
        </Text>

        {/** —————————————— **/}
        {/** 6) “Doğum Tarihi” Label & Picker Satırı **/}
        {/** —————————————— **/}
        <Text style={styles.dateLabel}>Doğum Tarihi</Text>

        <View style={styles.datePickersContainer}>
          {/** Gün Picker **/}
          <View style={[styles.datePickerBox, { left: DATE_PICKER_LEFTS[0] }]}>
            <Picker
              selectedValue={day}
              onValueChange={(val) => setDay(val)}
              style={styles.datePicker}
              itemStyle={styles.datePickerItem}
            >
              {days.map((d) => (
                <Picker.Item key={d} label={d} value={d} />
              ))}
            </Picker>
          </View>
          {/** Ay Picker **/}
          <View style={[styles.datePickerBox, { left: DATE_PICKER_LEFTS[1] }]}>
            <Picker
              selectedValue={month}
              onValueChange={(val) => setMonth(val)}
              style={styles.datePicker}
              itemStyle={styles.datePickerItem}
            >
              {months.map((m) => (
                <Picker.Item key={m} label={m} value={m} />
              ))}
            </Picker>
          </View>
          {/** Yıl Picker **/}
          <View style={[styles.datePickerBox, { left: DATE_PICKER_LEFTS[2] }]}>
            <Picker
              selectedValue={year}
              onValueChange={(val) => setYear(val)}
              style={styles.datePicker}
              itemStyle={styles.datePickerItem}
            >
              {years.map((y) => (
                <Picker.Item key={y} label={y} value={y} />
              ))}
            </Picker>
          </View>
        </View>

        {/** —————————————— **/}
        {/** 7) “Sonraki” Butonu **/}
        {/** —————————————— **/}
        <TouchableOpacity
          onPress={handleNext}
          style={styles.nextButton}
          activeOpacity={0.8}
        >
          <Text style={styles.nextButtonText}>Sonraki</Text>
        </TouchableOpacity>

        {/** —————————————— **/}
        {/** 8) Alt Bilgilendirme Metni **/}
        {/** —————————————— **/}
        <Text style={styles.footerNote}>
          Kaydolarak, <Text style={styles.footerLink}>Kullanım Şartları</Text> ve{' '}
          <Text style={styles.footerLink}>Gizlilik Politikası</Text>’nı kabul edersiniz.
        </Text>
      </ScrollView>
    </View>
  );
}

// -------------------------------------------------------
// 3) Styles: Tüm “top/left/width/height” değerleri, CSS’den birebir
// -------------------------------------------------------
const styles = StyleSheet.create({
  /////////////////////////////////////
  // 3.0) Root Konteyner
  /////////////////////////////////////
  rootContainer: {
    position: 'relative',
    width: CONTAINER_WIDTH,     // 430px  
    height: CONTAINER_HEIGHT,   // 932px  
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
  },

  /////////////////////////////////////
  // 3.1) ScrollView Stili (içerik 932px’e sığmıyorsa scroll)
  /////////////////////////////////////
  scrollContainer: {
    width: CONTAINER_WIDTH,
    height: CONTAINER_HEIGHT,
  },

  /////////////////////////////////////
  // 3.2) “Geri” Tuşu
  /////////////////////////////////////
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 44 : 24, // CSS: top:44px  
    left: 26,                              // CSS: left:26px  
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIconPlaceholder: {
    width: 40,
    height: 40,
    backgroundColor: '#CCCCCC', // Yer tutucu renk  
    borderRadius: 20,
  },

  /////////////////////////////////////
  // 3.3) “Hesap Oluştur” Başlığı
  /////////////////////////////////////
  headerTitle: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 44 + 8 : 24 + 8,  // CSS: top:44px, içten +8px  
    left: 34 + 18,   // CSS: left:34px; prova için soldan 52px’e yakın  
    fontSize: 20,    // CSS: font-size:20px  
    fontFamily: 'Inter_900Black', // CSS: “Inter-Black”  
    fontWeight: '900',
    color: '#FFFFFF',
    width: 66,
    height: 24,
    textAlign: 'center',
  },

  /////////////////////////////////////
  // 3.4) Video Placeholder
  /////////////////////////////////////
  videoPlaceholder: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: CONTAINER_WIDTH,       // 430px  
    height: VIDEO_PLACEHOLDER_HEIGHT, // 580px  
    backgroundColor: '#000000',
  },

  /////////////////////////////////////
  // 3.5) “E-Posta Adresiniz” Label & Input
  /////////////////////////////////////
  emailLabel: {
    position: 'absolute',
    top: EMAIL_LABEL_TOP,  // 371  
    left: 11,              // 11px  
    fontSize: 14,          // 14px  
    fontFamily: 'Inter_600SemiBold', // CSS: “Inter-SemiBold”  
    fontWeight: '600',
    color: '#000000',
    width: 321,            // CSS: .text-wrapper-8 width:321px  
    height: 24,
  },
  emailInput: {
    position: 'absolute',
    top: EMAIL_INPUT_TOP,   // 403  
    left: EMAIL_INPUT_LEFT, // 11  
    width: EMAIL_INPUT_WIDTH,   // 407  
    height: EMAIL_INPUT_HEIGHT, // 39  
    backgroundColor: '#fbfbfb',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 15,
    paddingHorizontal: 12,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#000000',
  },

  /////////////////////////////////////
  // 3.6) “Şifre Belirleyiniz” Label & Input + Göz İkonu
  /////////////////////////////////////
  passwordLabel: {
    position: 'absolute',
    top: PASSWORD_LABEL_TOP, // 410  
    left: 11,
    fontSize: 14,            // 14px  
    fontFamily: 'Inter_600SemiBold',
    fontWeight: '600',
    color: '#000000',
    width: 321,
    height: 24,
  },
  passwordInput: {
    position: 'absolute',
    top: PASSWORD_INPUT_TOP,   // 442  
    left: PASSWORD_INPUT_LEFT, // 11  
    width: PASSWORD_INPUT_WIDTH,   // 407  
    height: PASSWORD_INPUT_HEIGHT, // 39  
    backgroundColor: '#fbfbfb',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 15,
    paddingHorizontal: 12,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#000000',
  },
  eyeIconPlaceholder: {
    position: 'absolute',
    top: EYE_ICON_TOP,   // 504  
    left: EYE_ICON_LEFT, // 365  
    width: 24,
    height: 24,
    backgroundColor: '#CCCCCC', // Yer tutucu  
  },
  passwordNote: {
    position: 'absolute',
    top: PASSWORD_NOTE_TOP, // 535  
    left: 11,
    width: EMAIL_INPUT_WIDTH,  // 407  
    fontSize: 12,           // 12px  
    fontFamily: 'Inter_600SemiBold',
    fontWeight: '600',
    color: '#676666',
    lineHeight: 18,         // 18px  
  },

  /////////////////////////////////////
  // 3.7) “Doğum Tarihi” Label & Pickers
  /////////////////////////////////////
  dateLabel: {
    position: 'absolute',
    top: DATE_LABEL_TOP, // 578  
    left: 11,
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    fontWeight: '600',
    color: '#000000',
    width: 321,
    height: 24,
  },
  datePickersContainer: {
    position: 'absolute',
    top: DATE_PICKERS_TOP,   // 665  
    left: 0,
    width: CONTAINER_WIDTH, // 430  
    height: DATE_PICKER_HEIGHT, // 39  
    flexDirection: 'row',
  },
  datePickerBox: {
    position: 'absolute',
    width: DATE_PICKER_WIDTH,    // 116  
    height: DATE_PICKER_HEIGHT,  // 39  
    backgroundColor: '#fbfbfb',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 15,
    overflow: 'hidden',
  },
  datePicker: {
    width: '100%',
    height: DATE_PICKER_HEIGHT,  // 39  
  },
  datePickerItem: {
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
  },

  /////////////////////////////////////
  // 3.8) “Sonraki” Butonu
  /////////////////////////////////////
  nextButton: {
    position: 'absolute',
    top: NEXT_BUTTON_TOP,   // 768  
    left: NEXT_BUTTON_LEFT, // 157  
    width: NEXT_BUTTON_WIDTH,   // 116  
    height: NEXT_BUTTON_HEIGHT, // 39  
    backgroundColor: '#f13957',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    fontWeight: '700',
    color: '#FFFFFF',
  },

  /////////////////////////////////////
  // 3.9) Alt Bilgilendirme Metni
  /////////////////////////////////////
  footerNote: {
    position: 'absolute',
    top: FOOTER_NOTE_TOP,   // 861  
    left: FOOTER_NOTE_LEFT, // 53  
    width: FOOTER_NOTE_WIDTH,   // 324  
    height: FOOTER_NOTE_HEIGHT, // 53  
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    fontWeight: '400',
    color: '#000000',
    lineHeight: 20,         // 20px  
    textAlign: 'center',
  },
  footerLink: {
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
    fontWeight: '700',
    color: '#f13957',
  },
});
