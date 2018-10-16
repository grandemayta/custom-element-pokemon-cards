import { render, html } from 'lit-html';
import { lory } from 'lory.js';
import './component.scss';

export default class PokemonCards extends HTMLElement {
  static get observedAttributes() {
    return ['name'];
  }

  constructor() {
    super();
    this.self = this;
    this.baseUrl = 'https://api.pokemontcg.io/v1/';
    this.endpoint = 'cards?name=';
    this.name = this.getAttribute('name');
    this.cards = [];
    this.carousel = null;
  }

  getCards(cb) {
    fetch(`${this.baseUrl}${this.endpoint}${this.name}`)
      .then(response => response.json())
      .then(data => cb(data.cards));
  }

  initCarousel() {
    const carouselEl = this.querySelector('.gm-cards--carousel');
    this.carousel = lory(carouselEl, {
      rewind: true
    });
  }

  spinnerTpl() {
    return html`
      <div class="sk-circle">
        <div class="sk-circle1 sk-child"></div>
        <div class="sk-circle2 sk-child"></div>
        <div class="sk-circle3 sk-child"></div>
        <div class="sk-circle4 sk-child"></div>
        <div class="sk-circle5 sk-child"></div>
        <div class="sk-circle6 sk-child"></div>
        <div class="sk-circle7 sk-child"></div>
        <div class="sk-circle8 sk-child"></div>
        <div class="sk-circle9 sk-child"></div>
        <div class="sk-circle10 sk-child"></div>
        <div class="sk-circle11 sk-child"></div>
        <div class="sk-circle12 sk-child"></div>
      </div>
    `;
  }

  showSpinner(status) {
    const spinnerEl = this.querySelector('.sk-circle');
    if (spinnerEl) {
      if (status) {
        spinnerEl.classList.remove('display-none');
      } else {
        spinnerEl.classList.add('display-none');
      }
    }
  }

  carouselTpl(items) {
    return html`
      <div class="gm-cards--title">${this.name}</div>
      <div class="gm-cards--carousel slider js_variablewidth variablewidth">
        <div class="frame js_frame">
            <ul class="slides js_slides">
              ${items.map(item => {
                return html`
                  <li class="js_slide">
                    <img src="${item.imageUrl}"/>
                  </li>
                `;
              })}
            </ul>
        </div>
        <div class="js_prev prev">
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 501.5 501.5"><g><path fill="#fff" d="M302.67 90.877l55.77 55.508L254.575 250.75 358.44 355.116l-55.77 55.506L143.56 250.75z"/></g></svg>
        </div>
        <div class="js_next next">
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 501.5 501.5"><g><path fill="#fff" d="M199.33 410.622l-55.77-55.508L247.425 250.75 143.56 146.384l55.77-55.507L358.44 250.75z"/></g></svg>
        </div>
      </div>
    `;
  }

  template() {
    return html`
      <div class="gm-cards--container">
        ${this.spinnerTpl()}
        ${this.cards.length > 0 ? this.carouselTpl(this.cards) : ''}
      </div>`;
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal !== newVal) {
      switch (name) {
        case 'name':
          this.name = newVal;
          this.showSpinner(true);
          this.getCards(cards => {
            this.cards = cards;
            this.load();
            this.initCarousel();
            this.showSpinner(false);
          });
          break;
        default:
      }
    }
  }

  load() {
    render(this.template(), this.self);
  }
}

customElements.define('app-pokemon-cards', PokemonCards);
