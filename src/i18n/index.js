import Vue from 'vue' // 引入Vue
import VueI18n from 'vue-i18n'
import zh from './lang/zh'
import en from './lang/en'
import Cookie from 'js-cookie'
Vue.use(VueI18n)
export const messages = {
  en,
  zh
}
const il8n = new VueI18n({
  locale: Cookie.get('lang') || 'zh',
  messages
})
export default il8n
