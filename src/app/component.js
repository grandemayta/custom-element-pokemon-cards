import { html, render } from 'lit-html';
import Siema from 'siema';
import './component.scss';

export default class PokemonCards extends HTMLElement {
  static get observedAttributes() {
    return ['name'];
  }

  constructor() {
    super();
    this.baseUrl = 'https://api.pokemontcg.io/v1/';
    this.endpoint = 'cards?name=';
    this.name = this.getAttribute('name');
    this.cards = [];
    this.carousel = null;
    this.carouselConfig = {
      selector: '.gm-cards--carousel',
      perPage: {
        0: 1,
        400: 2,
        800: 3,
        1240: 4
      }
    };
  }

  getCards(cb) {
    fetch(`${this.baseUrl}${this.endpoint}${this.name}`)
      .then(response => response.json())
      .then(data => cb(data.cards));
  }

  initCarousel() {
    if (this.carousel === null) {
      this.carousel = new Siema(this.carouselConfig);

      this.querySelector('.next').addEventListener('click', e => {
        e.preventDefault();
        this.carousel.next();
      });

      this.querySelector('.prev').addEventListener('click', e => {
        e.preventDefault();
        this.carousel.prev();
      });
    }
  }

  template() {
    return html`
      <div class="gm-cards--container">
        <div class="gm-cards--title">${this.name}</div>
        <div class="gm-cards--carousel">
          ${this.cards.map(card => {
            return html`<img src="${card.imageUrl}">
            `;
          })}
        </div>
        <button class="prev">prev</button>
        <button class="next">next</button>
      </div>`;
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal !== newVal) {
      switch (name) {
        case 'name':
          this.name = newVal;
          this.getCards(cards => {
            this.cards = cards;
            this.load();
            this.initCarousel();
          });
          break;
        default:
      }
    }
  }

  load() {
    render(this.template(), this);
  }
}

customElements.define('app-pokemon-cards', PokemonCards);
