import { render, html } from 'lit-html';
import { Carousel, Spinner } from 'components';
import 'app/component.scss';

export default class PokemonCards extends HTMLElement {
  static get observedAttributes() {
    return ['name'];
  }

  constructor() {
    super();
    this.rootEl = this;
    this.baseUrl = 'https://api.pokemontcg.io/v1/';
    this.endpoint = 'cards?name=';
    this.spinner = null;
    this.load();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal !== null && oldVal !== newVal) {
      this.load();
    }
  }

  getCards(name, cb) {
    fetch(`${this.baseUrl}${this.endpoint}${name}`)
      .then(response => response.json())
      .then(data => cb(data.cards));
  }

  template() {
    return html`
      <div class="gm-cards--container">
        <gm-spinner id="spinner"></gm-spinner>
        <gm-carousel id="carousel"></gm-carousel>
      </div>`;
  }

  load() {
    let name = this.rootEl.getAttribute('name');
    if (this.spinner !== null) this.spinner.load(true);
    this.getCards(name, cards => {
      render(this.template(cards), this.rootEl);
      if (this.spinner === null) this.spinner = new Spinner(this.rootEl, '#spinner');
      new Carousel(this.rootEl, '#carousel', name, cards).load();
      this.spinner.load(false);
    });
  }
}

customElements.define('gm-pokemon-cards', PokemonCards);
