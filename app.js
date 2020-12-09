const express= require("express");
const https= require("https");
const bodyParser= require("body-parser")
const app= express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
  res.sendFile(__dirname+"/index.html");
});
app.post("/", function(req,res){
  const query= req.body.query;
  const apiKey= "29c8a8df1175c5c47ec0b676b24dab55";
  const unit= req.body.unit;
  const url= "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit
  https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
      const weatherData= JSON.parse(data);
      const icon= weatherData.weather[0].icon;
      const imgurl= "https://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<h1>the temperature is: "+ weatherData.main.temp+"</h1>")
      res.write("<p>and it feels like "+ weatherData.weather[0].description+"</p>")
      res.write("<img src="+ imgurl+">");
      res.send();
    });
  });
});


app.listen(3000, function(req,res){
  console.log("server is running.");
});
