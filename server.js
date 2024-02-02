//---import express modules
const express = require("express");
//---import utils using destructuring
const {createFolder, createFile} =require("./utils");
//console.log(express);
const app = express();
//---create folder data
createFolder("data");
//---create file json
createFile("data/post.json");
//-----routing api demo
//---home root route
app.get("/", (req, res)=>{
    res.send("HOME Route");
});
//---fetch all posts
app.get("/posts", function(req, res){
    res.send("Fetch all post route");
});
//---create post
app.post("/posts", (req, res)=>{
    res.send("Create post api route");
});
//---update post a url with params
app.put("/posts/:id", (req, res)=>{
    //get the dynamic id from url params
    //const id= req.params;
    const id= req.params.id;
    console.log(id);
    res.send("update posts route using id");
});
//---delete a single posts
app.delete("/posts/:id",(req, res)=>{
    res.send("delete posts route");
});
//---create a single posts
app.get("/posts/:id",(req, res)=>{
    res.send("create single posts route");
});
//---create a server
app.listen(3000,function(){
    console.log("Server running at port 3000");
});