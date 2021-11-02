import React,{useState} from 'react';
import Header from './Header/Header'
import Footer from './Footer/Footer'
import Note from './Note/Note'
import './App.css';
import CreateArea from './CreateArea/CreateArea'

function App() {
  const [arr,setArr]=useState([]);
  function saveNote(titled,noted){
    setArr((prev)=>{
    	return([...prev,{
    	key:arr.length,
  		title:titled,
  		content:noted
    }])})
  }

  function deleteNote(index){
  	setArr(
  		 arr.filter(function(item) {
   		 	return item.key !== index
			})
  		);
  }
  return (
    <div>
       <Header/>
       <CreateArea forSubmit={saveNote} content="" heading="" />
      	{arr.map(note => (
      		<Note
      		    id={note.key}
	       		title={note.title}
	       		content={note.content}
	       		toDelete={deleteNote}
       		/>
      	))}
       <Footer/>
    </div>
  );
}
export default App;
