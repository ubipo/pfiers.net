import Vue from 'vue'
import Component from 'vue-class-component'
import { toStaticHostUrl } from '../../runtime-info/envInfo'

@Component
export default class StaticUrl extends Vue {
  private staticUrl = toStaticHostUrl
}
