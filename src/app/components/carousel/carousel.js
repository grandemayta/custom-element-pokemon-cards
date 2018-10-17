import { render, html } from 'lit-html';
import { lory } from 'lory.js';
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
    this.carousel = lory(this.componentlEl.querySelector('.gm-cards--carousel'));
  }

  carouselTitleTpl() {
    return html`<div class="gm-cards--title">${this.name}</div>`;
  }

  carouselListTpl() {
    return html`
        ${this.cards.map(item => {
          return html`
            <li class="js_slide">
                <img src="${item.imageUrl}"/>
            </li>
          `;
        })}
    `;
  }

  carouselButtonsTpl() {
    return html`
        <div class="js_prev prev">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 501.5 501.5"><g><path fill="#fff" d="M302.67 90.877l55.77 55.508L254.575 250.75 358.44 355.116l-55.77 55.506L143.56 250.75z"/></g></svg>
        </div>
        <div class="js_next next">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 501.5 501.5"><g><path fill="#fff" d="M199.33 410.622l-55.77-55.508L247.425 250.75 143.56 146.384l55.77-55.507L358.44 250.75z"/></g></svg>
        </div>
    `;
  }

  template() {
    return html`
      <div class="gm-cards--carousel slider js_variablewidth variablewidth">
        ${this.carouselTitleTpl()}
        <div class="frame js_frame">
            <ul class="slides js_slides">
              ${this.carouselListTpl()}
            </ul>
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
