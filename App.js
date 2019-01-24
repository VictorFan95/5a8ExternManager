const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./Routes');
const app = express();
const port = 8080;
const version = 'v1';

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use('/api/' + version, routes(express.Router()));
app.use('/', express.static('static', {
    extensions: ['html', 'css', 'js'],
}));
app.listen(port, () => {
    console.log("we are live on port :" + port)
});
