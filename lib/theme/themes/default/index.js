"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = derivative;
var _colors = require("@ant-design/colors");
var _seed = require("../seed");
var _genColorMapToken = _interopRequireDefault(require("../shared/genColorMapToken"));
var _genCommonMapToken = _interopRequireDefault(require("../shared/genCommonMapToken"));
var _genControlHeight = _interopRequireDefault(require("../shared/genControlHeight"));
var _genFontMapToken = _interopRequireDefault(require("../shared/genFontMapToken"));
var _genSizeMapToken = _interopRequireDefault(require("../shared/genSizeMapToken"));
var _colors2 = require("./colors");
function derivative(token) {
  // pink is deprecated name of magenta, keep this for backwards compatibility
  _colors.presetPrimaryColors.pink = _colors.presetPrimaryColors.magenta;
  _colors.presetPalettes.pink = _colors.presetPalettes.magenta;
  const colorPalettes = Object.keys(_seed.defaultPresetColors).map(colorKey => {
    const colors = token[colorKey] === _colors.presetPrimaryColors[colorKey] ? _colors.presetPalettes[colorKey] : (0, _colors.generate)(token[colorKey]);
    return Array.from({
      length: 10
    }, () => 1).reduce((prev, _, i) => {
      prev[`${colorKey}-${i + 1}`] = colors[i];
      prev[`${colorKey}${i + 1}`] = colors[i];
      return prev;
    }, {});
  }).reduce((prev, cur) => {
    prev = {
      ...prev,
      ...cur
    };
    return prev;
  }, {});
  //custom color here！！ for mika pink color!
  const rsltToken = {
    ...token,
    ...colorPalettes,
    // Colors
    ...(0, _genColorMapToken.default)(token, {
      generateColorPalettes: _colors2.generateColorPalettes,
      generateNeutralColorPalettes: _colors2.generateNeutralColorPalettes
    }),
    // Font
    ...(0, _genFontMapToken.default)(token.fontSize),
    // Size
    ...(0, _genSizeMapToken.default)(token),
    // Height
    ...(0, _genControlHeight.default)(token),
    // Others
    ...(0, _genCommonMapToken.default)(token),
    colorPrimaryBg: '#e6f4ff',
    colorPrimaryBgHover: '#bae0ff',
    colorPrimaryBorder: '#91caff',
    colorPrimaryBorderHover: '#69b1ff',
    colorPrimaryHover: '#fbe2f0',
    colorPrimary: '#ffc6e6',
    colorPrimaryActive: '#ffc6e6',
    colorPrimaryTextHover: '#ffc6e6',
    colorPrimaryText: '#ffc6e6',
    colorPrimaryTextActive: '#ffc6e6',
    colorLinkHover: '#fbe2f0',
    colorLink: '#ffc6e6',
    colorLinkActive: '#ffc6e6'
  };
  return rsltToken;
}