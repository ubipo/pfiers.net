import { Exception } from '@/util/exception'

const CLS_CARD = 'card'
const CLS_CARD__CONTENT = 'card__content'

export function initCardGrid(grid: HTMLElement) {
  const cards = Array.from(<HTMLCollectionOf<HTMLElement>> grid.getElementsByClassName(CLS_CARD))
  const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'))
  const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'))

  const resizeCard = (card: HTMLElement) => {
    const content = card.getElementsByClassName(CLS_CARD__CONTENT)[0]
    if (content == null)
      throw new Exception('Illegal layout; no content within card')
    const contentHeight = content.getBoundingClientRect().height
    const rowSpan = Math.ceil((contentHeight+rowGap)/(rowHeight+rowGap)) + 1
    card.style.gridRowEnd = `span ${rowSpan}`
  }
  
  const resizeAllCards = () => cards.forEach(resizeCard)
  
  for (const img of Array.from(grid.getElementsByTagName('img'))){
    img.addEventListener('load', () => resizeAllCards())
  }
  window.addEventListener('resize', () => resizeAllCards())

  resizeAllCards()
}
