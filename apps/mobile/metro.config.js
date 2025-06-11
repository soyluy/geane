// apps/mobile/metro.config.js

const { getDefaultConfig } = require('expo/metro-config');

// Eğer Expo kullanıyorsanız, aşağıdaki gibi mevcut Expo Metro config’ini alıp üzerine ekleme yapabilirsiniz:
const config = getDefaultConfig(__dirname);

// Metro’ya “.svg” uzantısını JS/TS/JSON vb. ile aynı şekilde işlemeyi öğretelim:
config.resolver.sourceExts.push('svg');

// Metro’ya “.svg” dosyalarını “react-native-svg-transformer” ile dönüştürmesini söyleyelim:
config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');

module.exports = config;
