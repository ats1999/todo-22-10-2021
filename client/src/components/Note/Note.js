import React,{useState} from 'react';
import './Note.css';
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit';
function Note(props){
	const [editable, setEditable]=useState("false");
	return(
		<div className="note" contentEditable={editable}>
			<h1>{props.title}</h1>
			<p>{props.content}</p>
			<button onClick={()=>{
				props.toDelete(props.id);
			}}><DeleteIcon/></button>
			<button onClick={()=>{
				if(editable==="true"){setEditable("false");}
				else{
					alert("Click and edit in the note directly");
					setEditable("true");
				}
			}}><EditIcon/></button>
		</div>
	);
}

export default Note;