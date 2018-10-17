import { render, html } from 'lit-html';
import './spinner.scss';

export default class Spinner {
  constructor(rootEl, selector) {
    this.rootEl = rootEl;
    this.componentlEl = this.rootEl.querySelector(selector);
    this.status = false;
  }

  spinnerTpl() {
    return html`
      <div class="gm-cards--spinner">
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
      </div>
    `;
  }

  template() {
    return html`
      ${this.status ? this.spinnerTpl() : ''}
    `;
  }

  load(status) {
    this.status = status;
    render(this.template(), this.componentlEl);
  }
}
