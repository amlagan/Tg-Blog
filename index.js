
import express from 'express';
import bodyParser from "body-parser";
import { v4 as uuidv4 } from 'uuid';

const app = express();
const port = 3000;
let posts =[];



app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/" , (req ,res) => {
    res.render("home.ejs", { posts: posts });
});

app.get("/about" , (req ,res) => {
    res.render("about.ejs");
});

app.get("/contact" , (req ,res) => {
    res.render("contact.ejs");
});

app.get("/publication" , (req ,res) => {
    res.render("publication.ejs");
});

app.post("/publication" , (req ,res) => {
    const post = {
        id: uuidv4(),
        title: req.body["postTitle"],
        content: req.body["postContent"]
    };
    posts.push(post);
    res.redirect("/");
});

app.get("/edit/:id" , (req ,res) => {
    const postId = req.params.id;
    const post = posts.find(p => p.id === postId);
    if (post) {
        res.render("edit.ejs", { post:post });
    } else {
        res.status(404).send("Article non trouvé");
    };
    
});

app.post("/edit/:id" , (req ,res) => {
    const post = posts.find(p => p.id === req.params.id);
    if (post) {
        post.title= req.body["postTitle"],
        post.content= req.body["postContent"]
    };
    res.redirect("/");

});

app.post("/delete/:id", (req, res) => {
  const postId = req.params.id;
  posts = posts.filter(post => post.id !== postId);
  res.redirect("/");
});



app.listen(port , () =>{
    console.log(`Server runing on port ${port} ....`)
});

