import React, { useEffect, useState } from 'react';
import { MdOutlineDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { Button, Col, Container, Row } from 'react-bootstrap';
import './Todo.css';


function Todo() {
    const [isCompleteScreen, SetisCompleteScreen] = useState(false);
    const [allTodos, SetallTodos] = useState([]);
    const [Title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [complete, setcomplete] = useState([]);


    function Addtodo() {
        let newitem = {
            title: Title,
            description: description
        }

        let updatedTodo = [...allTodos];
        updatedTodo.push(newitem);
        SetallTodos(updatedTodo);
        localStorage.setItem('todolist', JSON.stringify(updatedTodo))
    }
    function DelTodo(index) {
        let removetodo = [...allTodos];
        removetodo.splice(index, 1);
        localStorage.setItem('todolist', JSON.stringify(removetodo));
        SetallTodos(removetodo)
    }
    function completetodo(index) {
        let now = new Date();
        let dd = now.getDate();
        let mm = now.getMonth() + 1;
        let yyyy = now.getFullYear();
        let hh = now.getHours();
        let m = now.getMinutes();
        let ss = now.getSeconds();
        let Completed = dd + '-' + mm + '-' + yyyy + ' at ' + hh + ':' + m + ':' + ss;
        let filteritem = {
            ...allTodos[index],
            Completed: Completed
        }

        let updateTodo = [...complete];
        updateTodo.push(filteritem);
        setcomplete(updateTodo);
        DelTodo(index);
        localStorage.setItem('completed', JSON.stringify(updateTodo))


    }
    function DelcompleteTodo(index) {
        let removetodo = [...complete];
        removetodo.splice(index, 1);
        localStorage.setItem('complete', JSON.stringify(removetodo));
        setcomplete(removetodo)
    }

    useEffect(() => {
        let savedTodo = JSON.parse(localStorage.getItem('todolist'));
        let savedcomplete = JSON.parse(localStorage.getItem('complete'));

        if (savedTodo) {
            SetallTodos(savedTodo)
        }
        if (savedcomplete) {
            setcomplete(savedcomplete)
        }

    }, [])




    return (
        <>
            <div className="todo">
                <h1>My TODO's</h1>
            </div>
            <Container className='container'>
                <Row>
                    <Col md>
                        <form className='text-white text-center mt-5 fs-6 fw-bold'>
                            Title : <input type="text" value={Title} onChange={(e) => setTitle(e.target.value)} placeholder='Title of your TODO' /> &nbsp;&nbsp;
                            Description : <input type='text' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description of your TODO' />
                            <Button variant='primary mx-3 px-auto fw-bold' onClick={Addtodo}>Add</Button>
                        </form>
                        <hr></hr>
                        <button className={`isCompleteScreen ${isCompleteScreen === false && 'active'}`} onClick={() => SetisCompleteScreen(false)}>To Do</button>

                        <button className={`isCompleteScreen ${isCompleteScreen === true && 'active'}`} onClick={() => SetisCompleteScreen(true)}>Completed</button>
                        <div className="todo-list">
                            {isCompleteScreen === false && allTodos.map((item, index) => {
                                return (
                                    <div className="todolist-item d-flex" key={index}>
                                        <div>
                                            <h3 className='ms-5 pt-5 fw-bold '>{item.title}</h3>
                                            <p className='ms-5'>{item.description}</p>
                                        </div>
                                        <div className='icons'>
                                            <MdOutlineDelete className='icon mt-5' onClick={() => DelTodo(index)} title='Delete?' />
                                            <FaCheck className='check-icon mt-5' onClick={() => completetodo(index)} title='complete?' />
                                        </div>
                                    </div>
                                )
                            })}

                            {isCompleteScreen === true && complete.map((item, index) => {
                                return (
                                    <div className="todolist-item d-flex" key={index}>
                                        <div>
                                            <h3 className='ms-5 pt-5 fw-bold '>{item.title}</h3>
                                            <p className='ms-5'>{item.description}</p>
                                            <p className='ms-5'><small>Completed on : {item.Completed}</small></p>
                                        </div>
                                        <div className='icons'>
                                            <MdOutlineDelete className='icon mt-5' onClick={() => DelcompleteTodo(index)} title='Delete?' />
                                        </div>
                                    </div>
                                )
                            })}


                        </div>

                    </Col>
                </Row>
            </Container>

        </>
    )
}

export default Todo;