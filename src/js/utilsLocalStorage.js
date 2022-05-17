const dataKey = '@CreedTech:users';

export function loadUsersLocalStorage() {
  const data = localStorage.getItem(dataKey);
  const currentData = data ? JSON.parse(data) : [];

  return currentData
}

export function saveUserLocalStorage(newUser) {
  const currentData = loadUsersLocalStorage()

  const dataFormatted = [
    ...currentData,
    newUser
  ];

  localStorage.setItem(dataKey, JSON.stringify(dataFormatted));

}

export function findByEmail(email) {
  const users = loadUsersLocalStorage()

  return users.find(user => user.email === email)
}