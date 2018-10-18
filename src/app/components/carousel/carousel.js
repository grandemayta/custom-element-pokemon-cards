import { render, html } from 'lit-html';
import Swiper from 'swiper/src/components/core/core-class';
import resize from 'swiper/src/modules/resize/resize';
import navigation from 'swiper/src/components/navigation/navigation';
import './carousel.scss';

Swiper.use([resize, navigation]);

export default class Carousel {
  constructor(rootEl, selector, name, cards) {
    this.rootEl = rootEl;
    this.componentlEl = this.rootEl.querySelector(selector);
    this.name = name;
    this.cards = cards;
    this.carousel = null;
  }

  initCarousel() {
    this.carousel = new Swiper(this.rootEl.querySelector('.swiper-container'), {
      navigation: {
        nextEl: this.rootEl.querySelector('.swiper-button-next'),
        prevEl: this.rootEl.querySelector('.swiper-button-prev')
      },
      breakpoints: {
        9999: {
          slidesPerView: 8
        },
        1300: {
          slidesPerView: 6
        },
        1100: {
          slidesPerView: 5
        },
        768: {
          slidesPerView: 4
        },
        640: {
          slidesPerView: 3
        },
        500: {
          slidesPerView: 2
        }
      }
    });
  }

  carouselTitleTpl() {
    return html`<div class="gm-cards--title">${this.name}</div>`;
  }

  carouselListTpl() {
    return html`
        ${this.cards.map(card => {
          return html`
            <div class="swiper-slide">
              <img src="${card.imageUrl}">
            </div>
          `;
        })}
    `;
  }

  carouselButtonsTpl() {
    return html`
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    `;
  }

  template() {
    return html`
      <div class="gm-cards--carousel">
        ${this.carouselTitleTpl()}
        <div class="swiper-container">
          <div class="swiper-wrapper">
            ${this.carouselListTpl()}
          </div>
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
