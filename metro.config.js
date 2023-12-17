const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
const {
  resolver: {sourceExts, assetExts},
} = defaultConfig;

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
    transform: {
      experimentalImportSupport: false,
      inlineRequires: true,
    },
  },
  resolver: {
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg', 'jsx', 'js', 'ts', 'tsx', 'json', 'cjs'],
    resolverMainFields: ['sbmodern', 'react-native', 'browser', 'main'],
  },
  // watchFolders: [path.resolve(__dirname, '../')],
};

module.exports = mergeConfig(defaultConfig, config);
