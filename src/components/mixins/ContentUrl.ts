import Vue from 'vue'
import Component from 'vue-class-component'
import { toContentUrl } from '@/enviroment/content'

@Component
export default class ContentUrl extends Vue {
  private contentUrl = toContentUrl
}
