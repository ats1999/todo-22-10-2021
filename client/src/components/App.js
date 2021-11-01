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
  function editNote(index,title,content){
	console.log(index,title,content)
  }

  return (
    <div>
       <Header/>
       <CreateArea forSubmit={saveNote}/>
      	{arr.map(eachNote => (
      		<Note
      		    id={eachNote.key}
	       		title={eachNote.title}
	       		content={eachNote.content}
	       		toDelete={deleteNote}
				toEdit={editNote}
       		/>
      	))}
       <Footer/>
    </div>
  );
}
export default App;
