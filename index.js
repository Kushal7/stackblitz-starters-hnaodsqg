const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

app.use(express.static('static'));

// Endpoint 1: Calculate the Returns of the Stocks added

function calculateReturns(boughtAt, marketPrice, quantity) {
  let returns = (marketPrice - boughtAt) * quantity;
  return returns.toString();
}

app.get('/calculate-returns', (req, res) => {
  let boughtAt = parseFloat(req.query.boughtAt);
  let marketPrice = parseFloat(req.query.marketPrice);
  let quantity = parseFloat(req.query.quantity);
  res.send(calculateReturns(boughtAt, marketPrice, quantity));
});


// Endpoint 2: Calculate the Total Returns

app.get('/total-returns', (req, res) => {
  let stock1 = parseFloat(req.query.stock1);
  let stock2 = parseFloat(req.query.stock2);
  let stock3 = parseFloat(req.query.stock3);
  let stock4 = parseFloat(req.query.stock4);
  let result = stock1 + stock2 + stock3 + stock4;
  res.send(result.toString());
});

// Endpoint 3: Calculate the Return Percentage

function calculateReturnPercentage(boughtAt, returns) {
  let returnPercentage = (returns / boughtAt) * 100;
  return returnPercentage.toString();
}

app.get('/calculate-return-percentage', (req, res) => {
  let boughtAt = parseFloat(req.query.boughtAt);
  let returns = parseFloat(req.query.returns);
  res.send(calculateReturnPercentage(boughtAt, returns));
});


// Endpoint 4: Calculate the Total Return Percentage

app.get('/total-return-percentage', (req, res) => {
  let stock1 = parseFloat(req.query.stock1);
  let stock2 = parseFloat(req.query.stock2);
  let stock3 = parseFloat(req.query.stock3);
  let stock4 = parseFloat(req.query.stock4);
  let totalReturnPercentage = ((stock1 + stock2 + stock3 + stock4) / 100) * 100;
  res.send(totalReturnPercentage.toString());
});


// Endpoint 5: Identify the Status of Stocks based on their Return Value

function checkStatus(returnPercentage) {
  if (returnPercentage > 0) {
    return 'Profit';
  } else {
    return 'Loss';
  }
}

app.get('/status', (req, res) => {
  let returnPercentage = parseFloat(req.query.returnPercentage);
  res.send(checkStatus(returnPercentage));
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
