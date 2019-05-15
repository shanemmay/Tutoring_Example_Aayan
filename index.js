const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const fs = require('fs');

//the following is used to get the post request
var bodyParser = require('body-parser')
app.use( bodyParser.json() );      
app.use(bodyParser.urlencoded({     
  extended: true
})); 
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.get('/', (req, res) => 
{
    fs.readFile('./form.html', (err,data) =>
    {
        if (err) return console.log(err);
        res.write(data);
    }); 
});

app.post('/save', (req,res) =>
{
    //you can see the post variables in the console
    console.log(req.body.data);
    //writing to a file
    fs.writeFile('./data.txt',req.body.data, (err) =>
    {
        res.send('Saved to a file'); 
    });
});

app.listen(port, () => console.log(`App listening on port ${port}!`));