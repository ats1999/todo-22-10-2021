import React,{useState,useContext,useEffect} from 'react';
import styled from 'styled-components';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import Bacmenu from './Bacmenu';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import {Link} from 'react-router-dom';
import Modal from 'react-modal';
import {CredentialsContext} from './App';
import DeleteIcon from '@material-ui/icons/Delete';
import Todos from './Todos';
Modal.setAppElement("#root");
const handleErrors = async (response) => {
  if(!response.ok){
    const {message} = await response.json();
    throw Error(message);
  }
  return response.json();
}
function Inbox(){
  const [openbacmenu,setopenbacmenu] = useState(false);
  const [backgroundimage,setbackgroundimage]=useState('#03256c');
  const [openadd,setadd]=useState(false);
  const [credentials] = useContext(CredentialsContext);
  const [todoslist,settodoslist]=useState([]);

  const open1 = ()=>{
    setopenbacmenu(true);
  }
//   useEffect(()=>{
//     fetch(`http://localhost:4000/todos`,{
//       method: 'POST',
//       headers: {"Content-Type":"application/json",
//       Authorization:`Basic ${credentials.userid}:${credentials.password}`
//     },
//     body: JSON.stringify(todoslist),
//   })
//   .then(()=>{})
//
// },[todoslist,credentials]);
  useEffect(()=>{
    fetch(`http://localhost:4000/todos`,{
      method: 'GET',
      headers: {"Content-Type":"application/json",
      Authorization:`Basic ${credentials.userid}:${credentials.password}`
    },
  })
  .then((response)=> response.json())
  .then((todos) => settodoslist(todos))
},[]);
  const persist = (newTodo)=>{
    // e.preventDefault();
    fetch(`http://localhost:4000/todos`,{
      method: 'POST',
      headers: {"Content-Type":"application/json",
      Authorization:`Basic ${credentials.userid}:${credentials.password}`
    },
    body: JSON.stringify(newTodo),
  })
  .then(()=>{})
  }
  var today = new Date();
  // var date = today.toLocaleDateString("en-US");
  var date = today.toISOString().substr(0,10);
  const [input, setInput]= useState('');
  const [inputdate,setinputdate] = useState(date);
  const [inputtime,setinputtime]=useState('');
  const handleSubmit = (e) =>{
    e.preventDefault();
    setadd(false);
    // var d = new Date();
    // var h=d.getHours();
    // var m=d.getMinutes();
    // var ampm=h >= 12 ? 'pm':'am';
    // h = h % 12;
    // h = h ? h : 12;
    // var time = h + ':' + m + ' ' + ampm;
    var h = inputtime.split(":")[0];
    var m = inputtime.split(":")[1];
    var ampm=h >= 12 ? 'pm':'am';
    h = h % 12;
    h = h ? h : 12;
    var time = h + ':' + m + ' ' + ampm;

    setinputtime(time);
    if(!input) return;
    const newtodo1 = {todo:input,date:inputdate,time:time,checked: false};

    // settodoslist(prev =>{
    //   return[...prev,{todo:input,date:inputdate,time:time,checked: false}];
    // })
    const newtodos1 = [...todoslist,newtodo1];
    settodoslist(newtodos1);
    setInput('');
    var today = new Date();
    // var date = today.toLocaleDateString("en-US");
    var date = today.toISOString().substr(0,10);
    setinputdate(date);
    // setinputtime('');
    persist(newtodos1);
  }
  const customStyles = {
  content : {
    top                   : '40%',
    left                  : '40%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-40%',
    transform             : 'translate(-40%, -40%)'
  }
};
  const toggleTodo = (index)=>{
    const newTodoList = [...todoslist];
    newTodoList[index].checked = !newTodoList[index].checked;
    settodoslist(newTodoList);
    persist(newTodoList);
  };
  const deleteitem = (index)=>{
    const newTodoList1 = [...todoslist];
    // newTodoList1[index]
    // arr.splice(i, 1);
    newTodoList1.splice(index,1);
    settodoslist(newTodoList1);
    persist(newTodoList1);
  }
  return(<Container style={{backgroundColor:backgroundimage,backgroundImage:`url(${backgroundimage})`,backgroundRepeat:'no-repeat',backgroundSize:'cover'}}>
    <Content>
    <div className="content1">
      <h3> INBOX </h3>
      <div>
        {/* <ImageOutlinedIcon className="icon1" onClick={open1}/> */}
        <AddCircleOutlineOutlinedIcon onClick={()=>{setadd(true)}} className="icon1" />
      </div>
    </div>
    <div className="todocontainer">
    {todoslist.map((todo,index)=>(
      <div key={index} className="item item22">
      <input onChange={()=>toggleTodo(index)} type="checkbox" className="item22" checked={todo.checked} />
      <p style={{width:'auto',fontSize:'20px'}} className="item22"> {todo.todo} </p>
      <label className="item22">{todo.date} at {todo.time}</label>
      <DeleteIcon style={{cursor:"pointer"}} onClick={()=>deleteitem(index)} className="item22" />
      </div>
    ))}
    </div>

   
    </Content>

  <Bacmenu openbacmenu={openbacmenu} setopenbacmenu={setopenbacmenu} setbackgroundimage={setbackgroundimage}/>
  <Modal style={customStyles} isOpen={openadd} onRequestClose={()=>{setadd(false)}}>
    <h2>Add what's the plan for Today or for Future</h2>
    <form onSubmit={handleSubmit}>
    <input type="text" onChange={(e)=>{setInput(e.target.value)}} name="newitem" placeholder = "Add a todo" value={input} className="todoinput modalinput"/>
    <input type="date" onChange={(e)=>{setinputdate(e.target.value)}} defaultValue={date} name="newdate" className="modalinput" />
    <input type="time" onChange={(e)=>{setinputtime(e.target.value)}} name="time1" value={inputtime} className="modalinput" />
    <button type="submit" className="todobutton modalinput">Add</button>
    </form>
    <button onClick={()=>{setadd(false)}} className="modalinput">Close</button>
  </Modal>

  </Container>

)
}
export default Inbox;

const Container = styled.div`
    flex:0.9999;
    margin-left:22%;
    position: relative;
`
const Content = styled.div`
  .content1{
    width: 94%;
    min-height: 50px;
    margin: 15px;
    padding: 15px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    h3{
      color: white;
      margin-left: 50px;
    }
    .icon1{
      color: white;
      cursor:pointer;
      margin: 0 10px;
      &:hover{
        background:#000;
      }
    }
  }
  .footer1{
    /* position:absolute;
    bottom:0;
    width: 100%; */
    h4{
      color: white;
      text-align: center;
      margin-top: 0;
      margin-bottom:20px;
    }
  }
`