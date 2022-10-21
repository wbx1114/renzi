<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      <svg-icon class-name="lang" icon-class="language" />
      <span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(value,key) in messages" :key="key" :disabled="lang===key" @click.native="taggleLang(key)">{{ value.name }}</el-dropdown-item>
        </el-dropdown-menu>
      </span></span></el-dropdown>
</template>

<script>
import { messages } from '@/i18n'
import Cookie from 'js-cookie'
export default {
  name: 'ToggleLang',
  data() {
    return {
      messages,
      lang: Cookie.get('lang') || 'zh'
    }
  },
  methods: {
    taggleLang(lang) {
      console.log(lang)
      this.$i18n.locale = lang
      Cookie.set('lang', lang)
      this.lang = lang
      this.$router.go(0)
    }
  }
}
</script>

<style>
.lang{
    color: #fff;
    font-size: 20px;
    margin-right: 10px;
}
</style>
