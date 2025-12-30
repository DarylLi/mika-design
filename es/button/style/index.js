import { Keyframes, unit } from '@ant-design/cssinjs';
import { genFocusStyle, resetIcon } from '../../style';
import { genStyleHooks, mergeToken } from '../../theme/internal';
import genGroupStyle from './group';
import { prepareComponentToken, prepareToken } from './token';
import genVariantStyle from './variant';
import { defaultPrefixCls } from '../../config-provider/context';
const animation = new Keyframes(`lights`, {
  to: {
    // 'background-position': '30px 0',
    transform: 'translateY(120px)',
    opacity: '0'
  }
});
// ============================== Shared ==============================
const genSharedButtonStyle = token => {
  const {
    componentCls,
    iconCls,
    fontWeight,
    opacityLoading,
    motionDurationSlow,
    motionEaseInOut,
    iconGap,
    calc
  } = token;
  return {
    [componentCls]: {
      outline: 'none',
      position: 'relative',
      display: 'inline-flex',
      gap: iconGap,
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight,
      whiteSpace: 'nowrap',
      textAlign: 'center',
      backgroundImage: 'none',
      cursor: 'pointer',
      transition: `all ${token.motionDurationMid} ${token.motionEaseInOut}`,
      userSelect: 'none',
      touchAction: 'manipulation',
      '&:disabled > *': {
        pointerEvents: 'none'
      },
      // https://github.com/ant-design/ant-design/issues/51380
      [`${componentCls}-icon > svg`]: resetIcon(),
      '> a': {
        color: 'currentColor'
      },
      '&:not(:disabled)': genFocusStyle(token),
      [`&${componentCls}-two-chinese-chars::first-letter`]: {
        letterSpacing: '0.34em'
      },
      [`&${componentCls}-two-chinese-chars > *:not(${iconCls})`]: {
        marginInlineEnd: '-0.34em',
        letterSpacing: '0.34em'
      },
      [`&${componentCls}-icon-only`]: {
        paddingInline: 0,
        // make `btn-icon-only` not too narrow
        [`&${componentCls}-compact-item`]: {
          flex: 'none'
        }
      },
      // Loading
      [`&${componentCls}-loading`]: {
        opacity: opacityLoading,
        cursor: 'default'
      },
      [`${componentCls}-loading-icon`]: {
        transition: ['width', 'opacity', 'margin'].map(transition => `${transition} ${motionDurationSlow} ${motionEaseInOut}`).join(',')
      },
      // iconPlacement
      [`&:not(${componentCls}-icon-end)`]: {
        [`${componentCls}-loading-icon-motion`]: {
          '&-appear-start, &-enter-start': {
            marginInlineEnd: calc(iconGap).mul(-1).equal()
          },
          '&-appear-active, &-enter-active': {
            marginInlineEnd: 0
          },
          '&-leave-start': {
            marginInlineEnd: 0
          },
          '&-leave-active': {
            marginInlineEnd: calc(iconGap).mul(-1).equal()
          }
        }
      },
      '&-icon-end': {
        flexDirection: 'row-reverse',
        [`${componentCls}-loading-icon-motion`]: {
          '&-appear-start, &-enter-start': {
            marginInlineStart: calc(iconGap).mul(-1).equal()
          },
          '&-appear-active, &-enter-active': {
            marginInlineStart: 0
          },
          '&-leave-start': {
            marginInlineStart: 0
          },
          '&-leave-active': {
            marginInlineStart: calc(iconGap).mul(-1).equal()
          }
        }
      }
    }
  };
};
// ============================== Shape ===============================
const genCircleButtonStyle = token => ({
  minWidth: token.controlHeight,
  paddingInline: 0,
  borderRadius: '50%'
});
// =============================== Size ===============================
const genButtonStyle = (token, prefixCls = '') => {
  const {
    componentCls,
    controlHeight,
    fontSize,
    borderRadius,
    buttonPaddingHorizontal,
    iconCls,
    buttonPaddingVertical,
    buttonIconOnlyFontSize
  } = token;
  return [{
    [prefixCls]: {
      fontSize,
      height: controlHeight,
      padding: `${unit(buttonPaddingVertical)} ${unit(buttonPaddingHorizontal)}`,
      borderRadius,
      [`&${componentCls}-icon-only`]: {
        width: controlHeight,
        [iconCls]: {
          fontSize: buttonIconOnlyFontSize
        }
      }
    }
  },
  // Shape - patch prefixCls again to override solid border radius style
  {
    [`${componentCls}${componentCls}-circle${prefixCls}`]: genCircleButtonStyle(token)
  }, {
    [`${componentCls}${componentCls}-round${prefixCls}`]: {
      borderRadius: token.controlHeight,
      [`&:not(${componentCls}-icon-only)`]: {
        paddingInline: token.buttonPaddingHorizontal
      }
    }
  }];
};
const genSizeBaseButtonStyle = token => {
  const baseToken = mergeToken(token, {
    fontSize: token.contentFontSize
  });
  return genButtonStyle(baseToken, token.componentCls);
};
const genSizeSmallButtonStyle = token => {
  const smallToken = mergeToken(token, {
    controlHeight: token.controlHeightSM,
    fontSize: token.contentFontSizeSM,
    padding: token.paddingXS,
    buttonPaddingHorizontal: token.paddingInlineSM,
    buttonPaddingVertical: 0,
    borderRadius: token.borderRadiusSM,
    buttonIconOnlyFontSize: token.onlyIconSizeSM
  });
  return genButtonStyle(smallToken, `${token.componentCls}-sm`);
};
const genSizeLargeButtonStyle = token => {
  const largeToken = mergeToken(token, {
    controlHeight: token.controlHeightLG,
    fontSize: token.contentFontSizeLG,
    buttonPaddingHorizontal: token.paddingInlineLG,
    buttonPaddingVertical: 0,
    borderRadius: token.borderRadiusLG,
    buttonIconOnlyFontSize: token.onlyIconSizeLG
  });
  return genButtonStyle(largeToken, `${token.componentCls}-lg`);
};
const genBlockButtonStyle = token => {
  const {
    componentCls
  } = token;
  return {
    [componentCls]: {
      [`&${componentCls}-block`]: {
        width: '100%'
      }
    }
  };
};
// ============================== Export ==============================
export default genStyleHooks('Button', token => {
  const buttonToken = prepareToken(token);
  console.log(defaultPrefixCls);
  return [
  // Shared
  genSharedButtonStyle(buttonToken),
  // Size
  genSizeBaseButtonStyle(buttonToken), genSizeSmallButtonStyle(buttonToken), genSizeLargeButtonStyle(buttonToken),
  // Block
  genBlockButtonStyle(buttonToken),
  // Variant
  genVariantStyle(buttonToken),
  // Button Group
  genGroupStyle(buttonToken),
  // others
  {
    [`.${defaultPrefixCls}-btn-snow`]: [{
      color: '#fff',
      borderWidth: '0px!important',
      overflow: 'hidden',
      'background': 'linear-gradient(135deg, #1e3a8a, #0284c7)',
      'boxShadow': '0 15px 30px rgba(0, 0, 0, 0.4), inset 0 0 0 1px rgba(255, 255, 255, 0.2)',
      'span.snow-item': {
        fontFamily: 'serif',
        color: 'white',
        position: 'absolute',
        top: '-10px',
        animationName: animation,
        animationDuration: `4s`,
        animationTimingFunction: 'linear',
        animationIterationCount: 'infinite',
        opacity: '0.8'
      },
      '&:hover': {
        borderWidth: '0px!important',
        'color': '#fff!important',
        transform: 'translateY(-4px) scale(1.02)',
        'boxShadow': '0 25px 45px rgba(0, 0, 0, 0.6), 0 0 25px rgba(246, 196, 83, 0.6)'
      }
    }
    //   {
    //     '&:before':{
    //       content: '""!important',
    //       position: 'absolute!important',
    //       inset: '0',
    //       background: 'repeating-linear-gradient(90deg, red 0 10px, green 10px 20px, gold 20px 30px)',
    //       opacity: '0.25',
    //       animationName: animation,
    //       animationDuration: `1.5s`,
    //       animationTimingFunction: 'linear',
    //       animationIterationCount: 'infinite',
    //     }
    // }
    ]
  }];
}, prepareComponentToken, {
  unitless: {
    fontWeight: true,
    contentLineHeight: true,
    contentLineHeightSM: true,
    contentLineHeightLG: true
  }
});