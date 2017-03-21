/**
 * Created by Hsiang on 2017/2/9.
 *
 * 平台注册中心,在这里配置各个平台的特性
 * 最终检测的平台列表在window.VM.platform._platforms中列出,
 * 例如在iphone中打开微信: ['mobile','ios','wechat']
 * 例如在android中打开支付宝: ['mobile','android','alipay']
 * 最后面的配置将为最终生效的配置, 请注意!!!!
 */

import { ready } from '../vimo/util/dom';
// 支持的平台
const SUBSET_LIST = ['wechat', 'alipay', 'dingtalk', 'qq', 'dtdream'];

export const PLATFORM_CONFIGS = {
  /**
   * default
   * */
  core: {
    settings: {
      mode: 'ios',
      keyboardHeight: 290
    }
  },

  mobile: {},
  /**
   * 移动端基础平台(android/IOS/windows)
   * */
  android: {
    superset: 'mobile',
    subsets: SUBSET_LIST,
    settings: {
      toolbarMinHeight: 56,
      hoverCSS: false,
      keyboardHeight: 300,
      mode: 'md',
      activator: function () {
        // md mode defaults to use ripple activator
        // however, under-powered devices shouldn't use ripple
        // if this a linux device, and is using Android Chrome v36 (Android 5.0)
        // or above then use ripple, otherwise do not use a ripple effect
        if (p.testNavigatorPlatform('linux')) {
          let chromeVersion = p.matchUserAgentVersion(/Chrome\/(\d+).(\d+)?/);
          if (chromeVersion) {
            // linux android device using modern android chrome browser gets ripple
            if (parseInt(chromeVersion.major, 10) < 36 || p.version().major < 5) {
              return 'none';
            } else {
              return 'ripple';
            }
          }
          // linux android device not using chrome browser checks just android's version
          if (p.version().major < 5) {
            return 'none';
          }
        }
        // fallback to always use ripple
        return 'ripple';
      },

      activator: 'ripple',
      backButtonText: '',
      backButtonIcon: 'md-arrow-back',
      iconMode: 'md',
      menuType: 'overlay',
      pickerRotateFactor: 0,
      pickerScaleFactor: 0.81,
      spinner: 'crescent',
      tabsHighlight: true,
      tabsPlacement: 'bottom',
      tabsHideOnSubPages: false,

      // actionSheetEnter: 'action-sheet-md-slide-in',
      // actionSheetLeave: 'action-sheet-md-slide-out',
      // alertEnter: 'alert-md-pop-in',
      // alertLeave: 'alert-md-pop-out',
      // loadingEnter: 'loading-md-pop-in',
      // loadingLeave: 'loading-md-pop-out',
      // modalEnter: 'modal-md-slide-in',
      // modalLeave: 'modal-md-slide-out',
      // pageTransition: 'md-transition',
      // pickerEnter: 'picker-slide-in',
      // pickerLeave: 'picker-slide-out',
      // popoverEnter: 'popover-md-pop-in',
      // popoverLeave: 'popover-md-pop-out',
      // toastEnter: 'toast-md-slide-in',
      // toastLeave: 'toast-md-slide-out',


      // scrollAssist: true,
      // inputCloning: true,
      // autoFocusAssist: 'immediate',
    },

    /**
     * @param {Platform} p
     * */
    isMatch(p) {
      return p.isPlatformMatch('android', ['android', 'silk'], ['windows phone']);
    },

    /**
     * @param {Platform} p
     * */
    versionParser(p) {
      return p.matchUserAgentVersion(/Android (\d+).(\d+)?/);
    }
  },
  ios: {
    superset: 'mobile',
    subsets: SUBSET_LIST,
    settings: {
      hideNavBar: false,
      toolbarMinHeight: 44,
      hoverCSS: false,
      keyboardHeight: 300,
      mode: 'ios',

      activator: 'highlight',
      backButtonText: 'Back',
      backButtonIcon: 'ios-arrow-back',
      iconMode: 'ios',
      menuType: 'reveal',
      pickerRotateFactor: -0.46,
      pickerScaleFactor: 1,
      spinner: 'ios',
      tabsHighlight: false,
      tabsPlacement: 'bottom',
      tabsHideOnSubPages: false,

      // loadingEnter: 'loading-pop-in',
      // loadingLeave: 'loading-pop-out',
      // modalEnter: 'modal-slide-in',
      // modalLeave: 'modal-slide-out',
      // pageTransition: 'ios-transition',
      // pickerEnter: 'picker-slide-in',
      // pickerLeave: 'picker-slide-out',
      // popoverEnter: 'popover-pop-in',
      // popoverLeave: 'popover-pop-out',
      // actionSheetEnter: 'action-sheet-slide-in',
      // actionSheetLeave: 'action-sheet-slide-out',
      // alertEnter: 'alert-pop-in',
      // alertLeave: 'alert-pop-out',
      // toastEnter: 'toast-slide-in',
      // toastLeave: 'toast-slide-out',


      // autoFocusAssist: 'delay',
      // inputBlurring: isIOS,
      // inputCloning: isIOS,
      // scrollAssist: isIOS,
      // statusbarPadding: isCordova,
      // swipeBackEnabled: isIOS,
      // tapPolyfill: isIOSUI,
      // virtualScrollEventAssist: isIOSUI,
      // disableScrollAssist: isIOS,
    },

    /**
     * @param {Platform} p
     * */
    isMatch(p) {
      return p.isPlatformMatch('ios', ['iphone', 'ipad', 'ipod'], ['windows phone']);
    },

    /**
     * @param {Platform} p
     * */
    versionParser(p) {
      return p.matchUserAgentVersion(/OS (\d+)_(\d+)?/);
    }
  },
  windows: {
    superset: 'mobile',
    subsets: SUBSET_LIST,
    settings: {
      mode: 'wp',
      hoverCSS: false,

      activator: 'highlight',
      backButtonText: '',
      backButtonIcon: 'ios-arrow-back',
      iconMode: 'ios',
      menuType: 'overlay',
      pickerRotateFactor: 0,
      pickerScaleFactor: 0.81,
      spinner: 'circles',
      tabsHighlight: true,
      tabsPlacement: 'top',
      tabsHideOnSubPages: true,
      // actionSheetEnter: 'action-sheet-wp-slide-in',
      // actionSheetLeave: 'action-sheet-wp-slide-out',
      // alertEnter: 'alert-wp-pop-in',
      // alertLeave: 'alert-wp-pop-out',
      // loadingEnter: 'loading-wp-pop-in',
      // loadingLeave: 'loading-wp-pop-out',
      // modalEnter: 'modal-md-slide-in',
      // modalLeave: 'modal-md-slide-out',
      // pageTransition: 'wp-transition',
      // pickerEnter: 'picker-slide-in',
      // pickerLeave: 'picker-slide-out',
      // popoverEnter: 'popover-md-pop-in',
      // popoverLeave: 'popover-md-pop-out',
      // toastEnter: 'toast-wp-slide-in',
      // toastLeave: 'toast-wp-slide-out',


      // autoFocusAssist: 'immediate'
    },
    /**
     * @param {Platform} p
     * @return {boolean}
     * */
    isMatch(p) {
      return p.isPlatformMatch('windows', ['windows phone']);
    },
    /**
     * @param {Platform} p
     * @return {any}
     * */
    versionParser(p) {
      return p.matchUserAgentVersion(/Windows Phone (\d+).(\d+)?/);
    }
  },

  /**
   * 开放平台及内嵌式App初始化
   * 如果添加新环境,记得在SUBSET_LIST注册
   * */
  wechat: {
    initialize(p){
      // 在ready之前进行处理
      p.prepareReady = function () {
        let _userAgent = window.navigator.userAgent.toString().trim();
        let val;
        //alert('Wechat Init: from platform-registry.js')
        /**
         * 执行默认的domReady, 如果有定制化的初始化任务,
         * 手动执行p.triggerReady
         *
         * @example
         *
         *  ready(function () {
         *      p.triggerReady('Wechat Init Success!');
         *  });
         * */

        /**
         * 微信的userAgent中包含了网络类型和当前语言
         * */
        p.setUserAgent(_userAgent);

        // 获取网络类型
        // 可能的字段: NetType/WIFI, NetType/2G, NetType/3G+, NetType/4G
        val = _userAgent.match(/NetType\/(\w+) /i);
        if (!!val && val.length > 0 && !!val[1]) {
          p.setNetType(val[1].toString().toLowerCase());
        }

        // 获取语言类型
        // Language/zh-CN
        val = _userAgent.match(/Language\/(.+)/i);
        if (!!val && val.length > 0 && !!val[1]) {
          p.setLang(val[1].toString().toLowerCase(), true);
        }

        // 触发外层的ready
        ready(function () {
          // 触发
          p.triggerReady('Wechat Init Success!');
        })
      }
    },
    settings: {
      hideNavBar: true,
    },
    isMatch(p) {
      return p.isPlatformMatch('wechat', ['micromessenger']);
    },
    versionParser(p) {
      return p.matchUserAgentVersion(/micromessenger\/(\d+).(\d+).(\d+)?/i);
    }
  },
  alipay: {
    initialize(p){
      //alert('Alipay Init: from platform-registry.js');
      let _userAgent = window.navigator.userAgent.toString().trim();
      let val;

      /**
       * 支付宝的userAgent中包含了网络类型和当前语言
       * AlipayDefined(nt:WIFI,ws:320|548|2.0)
       * Language/zh-Hans
       * */
      p.setUserAgent(_userAgent);

      // 获取网络类型
      val = _userAgent.match(/AlipayDefined\(nt:(\w+),/i);
      if (!!val && val.length > 0 && !!val[1]) {
        p.setNetType(val[1].toString().toLowerCase());
      }

      // 获取语言类型
      // Language/zh-CN
      val = _userAgent.match(/Language\/(.+)/i);
      if (!!val && val.length > 0 && !!val[1]) {
        p.setLang(val[1].toString().toLowerCase(), true);
      }

      // 触发外层的ready
      ready(function () {
        p.triggerReady('alipay Init Success!');
      })
    },
    settings: {
      hideNavBar: true,
    },
    isMatch(p) {
      return p.isPlatformMatch('alipay', ['alipay', 'alipayclient']);
    },
    versionParser(p) {
      return p.matchUserAgentVersion(/alipayclient\/(\d+).(\d+).(\d+)?/i);
    }
  },
  dingtalk: {
    initialize(p){
      //alert('Dingtalk Init: from platform-registry.js');
      let _userAgent = window.navigator.userAgent.toString().trim();
      let val;

      /**
       * 钉钉的userAgent中包含了网络类型和当前语言
       * AlipayDefined(nt:WIFI,ws:320|548|2.0)
       * Language/zh-Hans
       * */
      p.setUserAgent(_userAgent);

      // 获取网络类型
      // dingtalk未给出

      // 获取语言类型
      // Language/zh-CN
      val = _userAgent.match(/language\/(.+)/i);
      if (!!val && val.length > 0 && !!val[1]) {
        p.setLang(val[1].toString().toLowerCase(), true);
      }

      // 触发外层的ready
      ready(() => {
        p.triggerReady('dingtalk Init Success!');
      })
    },
    settings: {
      hideNavBar: true,
    },
    isMatch(p) {
      return p.isPlatformMatch('dingtalk');
    },
    versionParser(p) {
      return p.matchUserAgentVersion(/dingtalk\/(\d+).(\d+).(\d+)?/i);
    }
  },
  qq: {
    initialize(p){
      //alert('QQ Init: from platform-registry.js');
      let _userAgent = window.navigator.userAgent.toString().trim();
      let val;

      p.setUserAgent(_userAgent);

      // 获取网络类型
      // 可能的字段: NetType/WIFI, NetType/2G, NetType/3G+, NetType/4G
      val = _userAgent.match(/NetType\/(\w+)/i);
      if (!!val && val.length > 0 && !!val[1]) {
        p.setNetType(val[1].toString().toLowerCase());
      }

      // DOMReady后触发外层的ready
      ready(() => {
        p.triggerReady('qq Init Success!');
      })

    },
    settings: {
      hideNavBar: true,
    },
    isMatch(p) {
      return p.isPlatformMatch('qq');
    },
    versionParser(p) {
      return p.matchUserAgentVersion(/qq\/(\d+).(\d+).(\d+)?/i);
    }
  },
  dtdream: {
    initialize(p){
      //alert('dtdream Init: from platform-registry.js');

      /**
       * 注册HyBrid方法
       * 当应用运行在混合框架下, 需要使用原生的接口调用组件, 但是在普通浏览器环境, 则使用H5组件.
       *
       * hybrid中引入的文件包含: notification/map/launcher/connection/telephone/util/navigation/user/audio
       * 这几部分的对象将挂在到window.VM下
       *
       * 当平台准备完毕后, 进行挂载初始化
       *
       * */
        //TODO: 这里是代码

      let hybrid = require('./hybrid');

      VM.hybrid.install = function (Vue, config) {
        Vue.prototype.$call = function (option) {
          return dd.biz.telephone.call(option)
        }
      };

      ready(() => {
        p.triggerReady('dtdream Init Success!');
      })
    },
    isMatch(p) {
      return p.isPlatformMatch('dtdream');
    }
  },

  // /**
  //  * cordova
  //  */
  // cordova: {
  //   isEngine: true,
  //   /**
  //    * @param {Platform} p
  //    * @return {any}
  //    * */
  //   initialize (p) {
  //
  //     // prepare a custom "ready" for cordova "deviceready"
  //     p.prepareReady = function () {
  //       // 1) ionic bootstrapped
  //       windowLoad(function () {
  //
  //         //alert('initialize')
  //         // 2) window onload triggered or completed
  //         document.addEventListener('deviceready', function () {
  //           // 3) cordova deviceready event triggered
  //
  //           // add cordova listeners to emit platform events
  //           document.addEventListener('backbutton', function (ev) {
  //             p.zone.run(() => {
  //               p.backButton.emit(ev);
  //             });
  //           });
  //           document.addEventListener('pause', function (ev) {
  //             p.zone.run(() => {
  //               p.pause.emit(ev);
  //             });
  //           });
  //           document.addEventListener('resume', function (ev) {
  //             p.zone.run(() => {
  //               p.resume.emit(ev);
  //             });
  //           });
  //
  //           // cordova has its own exitApp method
  //           p.exitApp = function () {
  //             !!window.navigator.app && !!window.navigator.app.exitApp && window.navigator.app.exitApp();
  //           };
  //
  //           // cordova has fully loaded and we've added listeners
  //           p.triggerReady('cordova');
  //         });
  //       });
  //     };
  //
  //   },
  //   /**
  //    * @return {any}
  //    * */
  //   isMatch() {
  //     return !!(window.cordova || window.PhoneGap || window.phonegap);
  //   }
  // }
};
/**
 * @return {boolean}
 * */
function isCordova () {
  return !!window.cordova;
}
/**
 * @param {Platform} p
 * @return {boolean}
 * */
function isIOS (p) {
  // shortcut function to be reused internally
  // checks navigator.platform to see if it's an actual iOS device
  // this does not use the user-agent string because it is often spoofed
  // an actual iPad will return true, a chrome dev tools iPad will return false
  return p.testNavigatorPlatform('iphone|ipad|ipod');
}
/**
 * @param {Platform} p
 * @return {boolean}
 * */
function isSafari (p) {
  return p.testUserAgent('Safari');
}

/**
 * @return {boolean}
 * */
function isWK () {
  return !!window['webkit'];
}

/**
 * @param {Platform} p
 * @return {boolean}
 * */
function isIOSUI (p) {
  return isIOS(p) && !isWK() && !isSafari(p);
}


/**
 * @param {Platform} plt
 * @return {boolean}
 * */
function isWKWebView (plt) {
  return isIOS(plt) && !!window['webkit'];
}

/**
 * @param {Platform} plt
 * @return {boolean}
 * */
function isIosUIWebView (plt) {
  return isIOS(plt) && !isWKWebView(plt) && !isSafari(plt);
}