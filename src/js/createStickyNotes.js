import { findById, loadUserSessionStorage, loadUsersLocalStorage, saveUserLocalStorage, welcome } from "../js/utilsLocalStorage.js"

const btnCreateSticky = document.querySelector("#createSticky")


function checksExistsUser() {
  const { id } = loadUserSessionStorage()
  const user = findById(id)

  return user
}


function createSticky() {
  const user = checksExistsUser()

  let title = document.querySelector("#title-sticky")
  let description = document.querySelector("#description-sticky")

  if (!user) {
    alert("Algo saiu errado faça login!")
    return;
  }

  const sticky = {
    id: Math.random(),
    title: title.value,
    description: description.value,
    created_at: new Date()
  }

  user.stickyNotes.push(sticky)
  saveUserLocalStorage(user)
  loadSticky()
  title.value = ""
  description.value = ""

}

function editSticky(id) {
  //const modalElement = document.createElement('ion-modal');
}

function deleteSticky(id) {
  const user = checksExistsUser();

  const stickyIndex = user.stickyNotes.findIndex(todo => todo.id === id);

  if (stickyIndex !== -1) {
    alert("Não foi possível realizar esta operação!")
    return;
  }

  user.stickyNotes.splice(stickyIndex, 1);
  saveUserLocalStorage(user)
}


function loadSticky() {
  const user = checksExistsUser()
  const slides = document.querySelector(".swiper-wrapper")

  slides.innerHTML = ""

  const notes = user?.stickyNotes

  notes.map(sticky => {
    slides.innerHTML += cardSticky(sticky)
  })
}

function cardSticky(sticky) {
  return `
  <ion-slide>
    <ion-card>
      <ion-item readonly="true">
        <ion-icon name="pin" slot="start"></ion-icon>
        <ion-label>${sticky.title}</ion-label>
        <ion-buttons slot="end">
          <ion-button id="edit-${sticky.id}" >
            <ion-icon slot="icon-only" color="success" name="pencil"></ion-icon>
          </ion-button>
          <ion-button id="delete-${sticky.id}">
            <ion-icon slot="icon-only" color="danger" name="trash"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-item>
      <ion-card-content clear-on-edit="true">
        ${sticky.description}
      </ion-card-content>
    </ion-card>
  </ion-slide>
  `
}

function captureAction(event) {
  if (event.target.type === 'button') {

    const [action, id] = event.target.id.split('-')

    if (action == 'edit') {
      editSticky(id)
    } else {
      const response = confirm(`Deseja realmente excluir`)
      if (response) {
        deleteSticky(id)
        loadSticky()
      }
    }
  }
}

window.addEventListener("load", () => {
  const user = loadUserSessionStorage()

  if (!user.id) {
    window.location.href = "/";
  } else {
    setTimeout(function () {
      welcome()
      loadSticky()
    }, 5000);
  }
})

document.querySelector('ion-slides').addEventListener('click', captureAction)

btnCreateSticky.onclick = createSticky;


