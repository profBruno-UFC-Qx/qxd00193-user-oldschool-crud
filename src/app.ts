import express from 'express'
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

app.get('/', (req, res) => res.send('Hello World'))

app.listen(PORT, () => {
  console.log("Servidor escutando requisições")
})