import React, { useState } from "react";
import app from "./base";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth(app);

//List
const list = [];



const Home = () => {

    const [tasks, setTasks] = useState(list);
    const [task, setTask] = useState('');

    

    function handleChange(event) {
        setTask(event.target.value);
        
    }

    function handleAdd() {
        const newTask = tasks.concat({task});

        setTasks(newTask);
        setTask('');
    }


    return (
        <>
            <h1>To-do</h1>


            <div>
                <input id='input' type="text" value={task} onChange={handleChange} />
                <button id='button' type="button" onClick={handleAdd}>
                    Add
                </button>
            </div>

            <ul>
                {tasks.map((item) => (
                    <li key={item.prior}>{item.task}</li>
                ))}
            </ul>




            <button onClick={() => signOut(auth).then(() => {
                window.location.href = '/login';
            })
                .catch((error) => {
                    alert("Error")
                })}>Sign Out</button>
        </>
    )
}

export default Home;