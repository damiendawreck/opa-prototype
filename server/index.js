const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  const number = Math.floor(Math.random() * 10);
  res.json({allowed: number % 2 === 0});
})

app.listen(port, () => {
  console.log('Listening');
});
