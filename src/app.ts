import express, { urlencoded } from 'express'
import { engine } from 'express-handlebars'
import path from 'path'
import userRouter from './routes/userRoutes'

const app = express()
const PORT = 3000

app.engine('hbs', engine({
  extname: '.hbs'
}));

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, '/views'));


app.use(urlencoded({extended: true}))

app.get('/', (req, res) => res.redirect('/users'))

app.use('/users', userRouter)

app.get('/404', (req, res) => {
  res.render('notFound', {
    pageTitle: '404 error'
  })
})

app.listen(PORT, () => {
  console.log("Servidor escutando requisições")
})