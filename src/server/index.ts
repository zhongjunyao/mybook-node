import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import router from './router'

const PORT = process.env.PORT || 8000

const startServer = () => {
  const app = express();

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({
    extended: false
  }))
  // parse application/json
  app.use(bodyParser.json())

  // static file
  app.use(express.static(path.join(__dirname, '../public')))

  // config router
  app.use(router);

  app.listen(PORT, () => {
    console.log(`app is started at port ${PORT}...`)
  });

}

startServer();