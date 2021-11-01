import React,{useState} from "react";
import './CreateArea.css';
import AddIcon from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab'
import Zoom from '@material-ui/core/Zoom'

function CreateArea(props) {

  const [bool,setBool]=useState(false);
  const [title,setTitle]=useState();
  const [note,setNote]= useState();
  const [row,setRow]=useState(1);
  const [display,setDisplay]=useState("none");

  function handleTitle(event){
  	setTitle(event.target.value);
  }

  function handleNote(event){
  	setNote(event.target.value);
  }

  function Expand(){
    if(!bool){
      setBool(true);
      setRow(3);
      setDisplay("block");
    }
    else{
      setBool(false);
      setRow(1);
      setDisplay("none");
    }
  }

  return (
    <div>
      <form className="create-note">
        <input name="title" onChange={handleTitle} placeholder="Title" value={title} style={{display : display}} />
        <textarea name="content" onChange={handleNote} placeholder="Take a note..." rows={row} spellCheck="false" value={note} onClick={Expand}/>
        <Zoom in={bool}>
        <Fab onClick={(event)=>{
        	props.forSubmit(title,note);
     			event.preventDefault();
     			setTitle("");
     			setNote("");
          setBool(false);
          setRow(1);
          setDisplay("none");
 			}}><AddIcon/></Fab>
        </Zoom>
      </form>

    </div>
  );
}

export default CreateArea;
