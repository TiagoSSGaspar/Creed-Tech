
const user = {
  username: "",
  email: "",
  password: "",
  stickyNotes: [],
}

const password = document.getElementById("password"), confirm_password = document.getElementById("confirm-password");

function save(newUser) {
  const dataKey = '@CreedTech:users';

  const data = localStorage.getItem(dataKey);
  const currentData = data ? JSON.parse(data) : [];

  const dataFormatted = [
    ...currentData,
    newUser
  ];

  localStorage.setItem(dataKey, JSON.stringify(dataFormatted));

}

function validatePassword() {
  if (password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Passwords Don't Match");
  } else {
    confirm_password.setCustomValidity('');
  }
}

password.onchange = validatePassword;
confirm_password.onchange = validatePassword;

function formatUserAndCreateUser(event) {
  event.preventDefault();
  const userForm = document.querySelectorAll("#signUp-form input");
  const newUser = {}

  userForm.forEach(data => {
    if (data.name === "confirm-password" || data.value === "Entrar") {
      return;
    }
    newUser[data.name] = data.value
  })
  Object.assign(newUser, { stickyNotes: [] })

  save(newUser)

}

