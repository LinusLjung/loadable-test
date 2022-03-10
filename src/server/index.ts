import express from 'express';
import render from './render';
import path from 'path';

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

console.log('static', path.join(__dirname, '../client'));
app.use(express.static(path.join(__dirname, '../client')));

app.get('/favicon', (req, res) => {
  res.status(404).send();
});

app.get('/*', (req, res) => {
  res.render('index', {app: render()});
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));