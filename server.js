//---import express modules
const express = require("express");
const fs = require("fs");
//---import utils using destructuring
const {createFolder, createFile} =require("./utils");
const postData = require("./data/post.json");
//console.log(express);
const app = express();
//----pass incoming data
app.use(express.json());
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
    // res.send("Fetch all post");
    // res.json(postData);
    res.json({
        message: "Fetch Data Successfully",
        postData
    });
});
//Fetch single post
app.get("/posts/:id",(req, res)=>{
    const id = req.params.id;
    console.log(id);
    //find the post by id
    const postFound = postData.find((post)=>{
                return post.id === id;
            });
            //check if the post exist
            if(!postFound){
                res.json({message : " Post not found"});
            }else{
                //send the post to the user
                res.json({postFound});
            };
    // res.send("Fetch single posts");
});
//---create post
app.post("/posts", (req, res)=>{
    // res.send("Create post api route");
    // console.log(req.body);
    //get the post from the user
    const newPost = req.body;
    //push the new post into existing post
    // postData.push(
    postData.unshift({
        ...newPost, 
        id: ('100' +(postData.length + 1).toString())
    });
    console.log(postData);
    //write to file the new array set of valur
    fs.writeFile("data/post.json", JSON.stringify(postData), (err)=>{
        if(err){
            console.log(err);
        }
        res.json({
            message: "Post created successfully!"
        });
    });
});
//---update post a url with params
app.put("/posts/:id", (req, res)=>{
    //get the dynamic id from url params
    //const id= req.params;
    const id= req.params.id;
    console.log(id);
    //get by destructuring
    const {trainee, track, duration} = req.body;
    const postFound = postData.find((post)=>{
        return post.id === id;
    });
    console.log(postFound);
   if(!postFound){
    return res.json({message: "Post not found!"});
   }
   //---filter out all posts except the post matching id
   const filterPosts = postData.filter((post)=>{
        return post.id !==id;
   });
//    console.log(filterPosts);
   //--update the data currently found in post array
   postFound.trainee = trainee;
   postFound.track = track;
   postFound.duration = duration;
   console.log(postFound);
   //--push the updated post into filtered array
   filterPosts.unshift(postFound);
   console.log(filterPosts);
   //--write to file the filtered post
   fs.writeFile("data/post.json", JSON.stringify(filterPosts), (err)=>{
    if(err){
        console.log(err);
    }
    res.json({
        message: "Post updated successfully!"
        });
    });
});
//---delete a single posts
app.delete("/posts/:id",(req, res)=>{
    //get the dynamic id from url params
    const id= req.params.id;
    //---filter out all posts except the post matching id
   const filterPosts = postData.filter((post)=>{
    //--return post except the matched id
    return post.id !==id;
    });
    console.log(filterPosts);
    //--write to file the filtered post
   fs.writeFile("data/post.json", JSON.stringify(filterPosts), (err)=>{
    if(err){
        console.log(err);
    }
    res.json({
        message: "Post updated successfully!"
        });
    });
    // res.send("delete posts route");
});
//---create a single posts
app.get("/posts/:id",(req, res)=>{
    const id = req.params.id;
    console.log(id);
    //find the post by id
    res.send("create single posts route");
});
//---create a server
app.listen(3000,function(){
    console.log("Server running at port 3000");
});