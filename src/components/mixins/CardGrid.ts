import Vue from 'vue'
import Component from 'vue-class-component'
import { Exception } from '@/util/exception'

const CLS_CARD_GRID = 'card-grid'
const CLS_CARD = 'card'
const CLS_CARD__CONTENT = 'card__content'

@Component
export default class CardGrid extends Vue {
  private grid?: Element = undefined
  private cards: HTMLElement[] = []
  private rowHeight: number = 0
  private rowGap: number = 0

  public cardGridInit() {
    this.grid = document.getElementsByClassName(CLS_CARD_GRID)[0]
    this.cards = Array.from(<HTMLCollectionOf<HTMLElement>> this.grid.getElementsByClassName(CLS_CARD))
    this.rowHeight = parseInt(window.getComputedStyle(this.grid).getPropertyValue('grid-auto-rows'))
    this.rowGap = parseInt(window.getComputedStyle(this.grid).getPropertyValue('grid-row-gap'))

    
    for (const img of Array.from(this.grid.getElementsByTagName('img'))){
      img.addEventListener('load', () => this.resizeAllCards())
    }
    window.addEventListener('resize', () => this.resizeAllCards())

    this.resizeAllCards()
  }

  public resizeCard(card: HTMLElement){
    const content = card.getElementsByClassName(CLS_CARD__CONTENT)[0]
    if (content == null)
      throw new Exception('Illegal layout; no content within card')
    const contentHeight = content.getBoundingClientRect().height
    const rowSpan = Math.ceil((contentHeight+this.rowGap)/(this.rowHeight+this.rowGap)) + 1
    card.style.gridRowEnd = `span ${rowSpan}`
  }

  public resizeAllCards(){
    for (const card of this.cards) {
      this.resizeCard(card);
    }
  }
}
