import express, { urlencoded } from 'express'
import { engine } from 'express-handlebars'
import path from 'path'

const app = express()
const PORT = 3000

type User = {
  id: number
  username: string,
  email: string,
}

const users: User[] = [
  {
    id: 1, username: 'fulano', email: 'fulano@mail.com'
  },
  {
    id: 2, username: 'joazinho', email: 'joazinhonota10@mail.com'
  },
  {
    id: 3, username: 'beltrano', email: 'beltrano@mail.com'
  }
]

app.engine('hbs', engine({
  extname: '.hbs'
}));

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, '/views'));


app.use(urlencoded({extended: true}))

app.get('/', (req, res) => res.redirect('/users'))

// List all users
app.get('/users', (req, res) => {
  res.render('index', {
    pageTitle: 'Users list',
    users: users
  })
})

// Used to show the form to add new users
app.get('/users/add', (_, res) => {
  res.render('form', {
    pageTitle: 'Add a new user'
  })
})

// Handle the form submisson to add a new user
app.post('/users/', (req, res) => {
  const { name, email } = req.body
  const lastId = users.reduce((acc: number, currentUser) => Math.max(acc, currentUser.id), 0)
  if(name && email) {
    users.push({
      id: lastId + 1,
      username: name,
      email
    })
    res.redirect("/users")
  } else {
    res.render('form', {
      pageTitle: 'User added',
      user: { name, email },
      error: "The email field is mandatory"
    })
  }
})

// Show the details of a registered user
app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id)
  const user = users.find(u => u.id === userId)
  if(user) {
    res.render('form', {
      pageTitle: 'Update information',
      user: user
    })
  } else {
    res.render('notFound')
  }
})

// Update the information about one specific user
app.post('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id)
  const { name, email } = req.body
  const user = users.find(u => u.id === userId)
  if(user) {
    if(name && email) {
      user.username = name
      user.email = email
      res.redirect('/users')
    } else {
      res.render('form', {
        pageTitle: 'Edit user',
        user: user,
        error: 'The email field is mandatory'
      })
    }
   
  } else {
    res.redirect('/404')
  }
})

// Deletes a registered user
app.get('/users/remove/:id', (req, res) => {
  const userId = parseInt(req.params.id)
  const userPosition = users.findIndex(u => u.id === userId)
  console.log(users, userPosition)
  if(userPosition >= 0) {
    users.splice(userPosition , 1)
    console.log(users)
    res.redirect('/users')  
  } else {
    res.redirect('/404')
  }
})

app.get('/404', (req, res) => {
  res.render('notFound', {
    pageTitle: '404 error'
  })
})

app.listen(PORT, () => {
  console.log("Servidor escutando requisições")
})