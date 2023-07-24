const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

app.get("/",(req, res)=>{
  res.send("Hello world");
});

app.listen(PORT, ()=>{
  console.log(`Server is running on port ${PORT}`);
});
