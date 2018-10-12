import { LitElement, html } from '@polymer/lit-element';
import Siema from 'siema';

export default class Carousel extends LitElement {
  static get properties() {
    return {
      slides: { type: Array }
    };
  }

  constructor() {
    super();
    this.slides = [];
  }

  update() {
    if (this.slides.length > 0) {
      console.log(this.slides);
    }
  }

  render() {
    return html`
      <div class="siema">
      </div>
    `;
  }
}
