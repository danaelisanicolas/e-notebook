const loggedOutLinks = document.querySelectorAll('.logout-links')
const loggedInLinks = document.querySelectorAll('.login-links')

const setupUI = (user) => {
  console.log(user)
  if (user) {
    loggedOutLinks.forEach(item => item.style.display='none')
    loggedInLinks.forEach(item => item.style.display='block')
  } else {
    loggedOutLinks.forEach(item => item.style.display='block')
    loggedInLinks.forEach(item => item.style.display='none')
  }
}