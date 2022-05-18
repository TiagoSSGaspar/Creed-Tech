import { findByEmail } from "../js/utilsLocalStorage.js"

const btn = document.querySelector("#createSticky")

function createSticky() {
  const slides = document.querySelector(".swiper-wrapper")
  const title = document.querySelector("#title-sticky")?.value
  const description = document.querySelector("#description-sticky")?.value

  slides.innerHTML += cardSticky(title, description)

}

function cardSticky(title, description) {
  return `
  <ion-slide>
    <ion-card>
      <ion-item>
        <ion-icon name="pin" slot="start"></ion-icon>
        <ion-label>${title}</ion-label>
        <ion-buttons slot="end">
          <ion-button>
            <ion-icon slot="icon-only" color="success" name="pencil"></ion-icon>
          </ion-button>
          <ion-button>
            <ion-icon slot="icon-only" color="danger" name="trash"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-item>
      <ion-card-content>
        ${description}
      </ion-card-content>
    </ion-card>
  </ion-slide>
  `
}

btn.onclick = createSticky
