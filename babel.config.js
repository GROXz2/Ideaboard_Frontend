module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
<<<<<<< HEAD
    plugins: ['react-native-reanimated/plugin'], // must be last
=======
    plugins: [
      // ...existing plugins...
      'react-native-reanimated/plugin'
    ]
>>>>>>> a1d33ad (WIP: Expo 53 scaffolding + UI components + config)
  };
};
