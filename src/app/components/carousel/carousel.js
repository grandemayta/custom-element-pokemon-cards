import { render, html } from 'lit-html';
import Siema from 'siema';
import './carousel.scss';

export default class Carousel {
  constructor(rootEl, selector, name, cards) {
    this.rootEl = rootEl;
    this.componentlEl = this.rootEl.querySelector(selector);
    this.name = name;
    this.cards = cards;
    this.carousel = null;
  }

  initCarousel() {
    if (this.carousel !== null) this.carousel.destroy(true);
    this.carousel = new Siema({
      perPage: {
        400: 2,
        500: 3,
        700: 4,
        1024: 6,
        1200: 8
      }
    });
  }

  carouselTitleTpl() {
    return html`<div class="gm-cards--title">${this.name}</div>`;
  }

  carouselListTpl() {
    return html`
        ${this.cards.map(item => {
          return html`
            <img src="${item.imageUrl}"/>
          `;
        })}
    `;
  }

  carouselButtonsTpl() {
    return html`
      <div @click=${() => this.carousel.prev()} class="prev">
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 501.5 501.5"><g><path fill="#fff" d="M302.67 90.877l55.77 55.508L254.575 250.75 358.44 355.116l-55.77 55.506L143.56 250.75z"/></g></svg>
      </div>
      <div @click=${() => this.carousel.next()} class="next">
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 501.5 501.5"><g><path fill="#fff" d="M199.33 410.622l-55.77-55.508L247.425 250.75 143.56 146.384l55.77-55.507L358.44 250.75z"/></g></svg>
      </div>
    `;
  }

  template() {
    return html`
      <div class="gm-cards--carousel">
        ${this.carouselTitleTpl()}
        <div class="siema">
          ${this.carouselListTpl()}
        </div>
        ${this.carouselButtonsTpl()}
      </div>
    `;
  }

  load() {
    render(this.template(), this.componentlEl);
    this.initCarousel();
  }
}
