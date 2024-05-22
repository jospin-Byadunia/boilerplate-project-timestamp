// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204
app.use(express.json());
// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//second API endpoint

app.get('/api/:content', (req, res)=>{
  const {content} = req.params;
  if(!Number(content) && new Date(content).toUTCString()!=="Invalid Date"){
  const dateContent = new Date(content);
  const timestamp = dateContent.getTime();
  const formatedDate = dateContent.toUTCString();

  res.json({"unix":timestamp, "utc":formatedDate})
  }
  else if(Number(content) && new Date(Number(content)).getTime()===Number(content)){
    const dateContent = new Date(Number(content));
    const formatedDate = dateContent.toUTCString();
    res.json({"unix":Number(content), "utc":formatedDate})

  }
  else{
    res.json({error:"Invalid Date"})
  }
   
  
})


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
