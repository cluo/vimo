/**
 * Created by Hsiang on 2016/12/26.
 */
import Vue from 'vue'
import { getInsertPosition } from '../../util/getInsertPosition'
import { isString } from '../../util/util'
import loadingComponent from './loading.vue'
const Loading = Vue.extend(loadingComponent)

// -------- function --------

function LoadingFactory (options) {
  let el = getInsertPosition('loadingPortal').appendChild(document.createElement('div'))
  if (isString(options)) {
    options = {content: options}
  }
  return new Loading({el, propsData: options})
}

function getPresentDismissIns (Factory) {
  return {
    /**
     * 组件实例
     * @private
     * */
    _i: null, // instance

    /**
     * 开启
     * @desc
     * 如果上一个实例是开启状态, 则自动关闭后开启新的
     * @param {object} options - 传入参数
     * @return {Promise} - 开启动画结束的promise
     * @private
     * */
    present (options = {}) {
      let isAlipayReady = window.VM.platform.is('alipay') && window.AlipayJSBridge && !options.isH5
      if (isAlipayReady) {
        console.info('Loading 组件使用Alipay模式!')
        return new Promise((resolve) => {
          if (isString(options)) {
            options = {content: options}
          }
          window.AlipayJSBridge.call('showLoading', {
            delay: options.delay || 0,
            text: options.content || ''
          })
          resolve()
        })
      } else {
        console.info('Loading 组件使用H5模式!')
        return new Promise((resolve) => {
          if (this._i && this._i.isActive) {
            this._i.dismiss().then(() => {
              this._i = Factory(options)
              // 自动开启
              this._i.present().then(() => { resolve() })
            })
          } else {
            this._i = Factory(options)
            // 自动开启
            this._i.present().then(() => { resolve() })
          }
        })
      }
    },

    /**
     * 关闭
     * @return {Promise} - 关闭动画结束的promise
     * @private
     * */
    dismiss () {
      let isAlipayReady = window.VM.platform.is('alipay') && window.AlipayJSBridge
      return new Promise((resolve) => {
        if (isAlipayReady) {
          window.AlipayJSBridge.call('hideLoading')
        }

        if (this._i && this._i.isActive) {
          this._i.dismiss().then(() => { resolve() })
        } else {
          resolve()
        }
      })
    }
  }
}

let loadingInstance = getPresentDismissIns(LoadingFactory)

export default loadingInstance
