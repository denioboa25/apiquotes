const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

//get random quote
app.get('/api/quotes/random', (req,res,next) =>{
    const randomElement = getRandomElement(quotes);
    const quoteOfElement = randomElement.quote
    res.send(quoteOfElement);
  })
  
  //app.get('/api/quotes', (req,res,next) =>{
  
  //})
  //Get a quote by author 
  app.get('/api/quotes',(req,res,next) =>{
    const queryObj = req.query;
    const arr = [];
  
    if(queryObj.person){
      /*quotes.forEach((elem) =>{
        if(elem.person === queryObj.person){
          arr.push(elem.quote);
        }
      )};*/
      for(let i=0;i<quotes.length;i++){
        if(quotes[i].person === queryObj.person){
          arr.push(quotes[i].quote);
        }
      }
    } 
    res.send({quote: arr});
  })
  app.post('/api/quotes',(req,res,next) => {
    const queryObj = req.query;
    if(queryObj.quote && queryObj.person){
      quotes.push(queryObj);
      res.send(queryObj);
    }else{
        res.status(400).send();
    }
  })
  //remove quote and person based on the quote on quotes array
  app.delete('/api/:quotes',(req,res,next) =>{
    const quoteToRemove = req.params.quotes;
    for(const elem of quotes){
      if(elem.quote === quoteToRemove){
        quotes.slice(quotes.findIndex(elem),1);
      }
    }

  })

  app.listen(PORT,()=>{
    console.log('Server listening on port '+PORT);
  })