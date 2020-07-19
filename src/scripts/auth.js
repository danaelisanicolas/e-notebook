auth.onAuthStateChanged(user => {
  console.log('auth')
  if (user) {
    setupUI()
  } else {
    setupUI()
  }
})


