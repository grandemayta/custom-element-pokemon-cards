import { LitElement, html } from '@polymer/lit-element';
import Siema from 'siema';

export default class PokemonCards extends LitElement {
  static get properties() {
    return {
      name: { type: String },
      cards: { type: Array }
    };
  }

  constructor() {
    super();
    this.baseUrl = 'https://api.pokemontcg.io/v1/';
    this.endpoint = 'cards?name=';
    this.name = '';
    this.cards = [];
    this.carousel = {};
  }

  style() {
    return html`
      <style>
        * {
          margin: 0;
          padding: 0;
        }
        .container {
          width: 100%;
        }

        img {
          width: 50%;
        }

      </style>
    `;
  }

  getCards() {
    console.log('call');
    fetch(`${this.baseUrl}${this.endpoint}${this.name}`)
      .then(response => response.json())
      .then(data => {
        this.cards = data.cards;
      });
  }

  requestUpdate() {
    this.getCards();
    console.log('cccs');
  }

  updated() {
    console.log('aaa');
    if (this.cards.length > 0) {
      this.carousel = new Siema({
        selector: this.shadowRoot.querySelector('.siema'),
        perPage: {
          400: 2,
          500: 4,
          800: 4
        }
      });
    }
  }

  render() {
    return html`
      ${this.style()}
      <div class="container">
        <h1>${this.name}</h1>
        <div class="siema">
          ${this.cards.map(card => {
            return html`<img src="${card.imageUrl}">
            `;
          })}
        </div>
      </div>
    `;
  }
}

customElements.define('app-pokemon-cards', PokemonCards);
