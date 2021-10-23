const express = require("express")
const mongoose = require("mongoose")
const app = express();
const cors = require('cors');
mongoose.connect("mongodb+srv://pranjal:pranjal@cluster0.xyzwc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" ,
{
    useNewUrlParser:true,
    useUnifiedTopology:true,
   
}).then(()=>{
    console.log("data base connected")
        })
        const userSchema = new mongoose.Schema({
            username: String,
            userid:String,
            password: String
          })
          const User = mongoose.model("User",userSchema);
          const todosSchema = new mongoose.Schema({
            userId: String,
            todos: [{todo: String,date: String,time: String,checked: Boolean}],
          })
          const Todos = mongoose.model("Todos",todosSchema);
          
          app.use(cors());
          
          app.use(express.json());
          
          app.post("/register", async (req,res)=>{
            const {username,userid,password}=req.body;
            const user = await User.findOne({userid}).exec();
            if (user){
              res.status(500);
              res.json({
                message: "user already exists",
              });
              return;
            }
            await User.create({username,userid,password});
            res.json({message:"success"});
          
          
          });
          app.post("/login", async (req,res)=>{
            const { username,userid,password} = req.body;
            const user = await User.findOne({ userid }).exec();
            if(!user || user.password !== password || user.username !== username){
              res.status(403);
              res.json({message:"invalid login",});
              return;
            }
            res.json({message:"success",});
          
          })
          
          app.post("/todos", async (req,res) => {
            const { authorization } = req.headers;
            const [, token]= authorization.split(" ");
            const [userid,password] = token.split(":");
            const user = await User.findOne({ userid }).exec();
            const todosItems = req.body;
            if(!user || user.password !== password){
              res.status(403);
              res.json({message:"invalid access",});
              return;
            }
            console.log(user.username,todosItems);
            const todos = await Todos.findOne({userId: user._id}).exec();
            if(!todos){
              await Todos.create({
                userId:String(user._id),
                todos: todosItems,
              })
            }else{
              todos.todos = todosItems;
              await todos.save();
            }
            res.json(todosItems);
          })
          
          
          app.get("/todos", async (req,res)=>{
            const { authorization } = req.headers;
            const [, token]= authorization.split(" ");
            const [userid,password] = token.split(":");
            const user = await User.findOne({ userid }).exec();
            if(!user || user.password !== password){
              res.status(403);
              res.json();
              return;
            }
            const { todos } = await Todos.findOne({userId: user._id}).exec();
            res.json(todos);
          })
          app.get("/todoscompleted", async (req,res)=>{
            const { authorization } = req.headers;
            const [, token]=authorization.split(" ");
            const [userid,password] = token.split(":");
            const user = await User.findOne({ userid }).exec();
            if(!user || user.password !== password){
              res.status(403);
              res.json();
              return;
            }
            const { todos } = await Todos.findOne({userId: user._id}).exec();
            console.log(todos);
            for( let i=0;i<todos.length;i++){
              if(todos[i].checked !== true){
                todos.splice(i,1);
              }
            }
            res.json(todos);
          })


   app.listen(4000,()=>{
            console.log("process is running  ");
        })