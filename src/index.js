import express from 'express';
import cors from 'cors';
import _ from 'lodash';

 function Init(fullname) {
  const username = _.words(fullname);
  if (/[\d\_\/]/.test(fullname) || username.length > 3 || username.length === 0) {
    return 'Invalid fullname';
  }
  _.compact(username);
  _.reverse(username);

  const inits = _.slice(username, 1).reverse().map((item) => {
    const char = `${item.charAt(0).toUpperCase()}.`;
    return char;
  });

  const output = _.concat(_.upperFirst(username[0].toLowerCase()), inits);
  return _.join(output, ' ');
}

const app = express();
app.use(cors());
app.get('/', (req, res) => {
  res.json({
    hello: 'JS World',
  });
});

app.get('/task2A', (req, res) => {
  const sum = (+req.query.a || 0)+ (+req.query.b || 0);
  res.send(sum.toString());
});


app.get('/task2B', (req, res) => {
  const output = Init(req.query.fullname);
  res.send(output.toString());
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
