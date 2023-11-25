import { useEffect, useState } from "react"
import styled from "styled-components"

const ToDoListStyle = styled.div`
    .input-group {
        display: flex;
        border: 1px solid #000;
        height: 40px;
        input {
            flex: 1;
            padding: 0 10px;
            outline : none;
        }
        button {
            padding: 0 10px;
            background: #ccc;
            &:disabled {
                opacity: 0.2;
                cursor: no-drop;
            }
        }
    }
    .list-board  {
        display: flex;
        gap: 30px;
        padding-top: 50px;
        .board {
            flex: 1
            .title {
                font-size: 30px;
                margin: 20px 0 20px 0;
                font-weight: bold;
            }
            .items {
                display: flex;
                flex-direction: column;
                gap:10px;
            }
        }
    }
`

export const ToDoList  = ({toDoList, onAdd, onCompleted}) => {
    const [value, setValue] = useState('')


    useEffect(() => {   
        localStorage.setItem('TO_DO_APP', JSON.stringify(toDoList))
    },[toDoList])

    const _onAdd = () => {
        onAdd(value.trim())
        setValue('')
    }
    const onKeyUp = (ev) => {
        if(ev.key === 'Enter' && !!value.trim()) {
            _onAdd()
        }
    }
    const listDoing = toDoList.filter(e => !e.isCompleted)
    const listDone = toDoList.filter(e => e.isCompleted)

    return <ToDoListStyle>
        <div className="input-group">
            <input value={value} onKeyUp={onKeyUp} onChange={ev => setValue(ev.target.value)} placeholder="Công việc ...."/>
            <button disabled={!value.trim()} onClick={_onAdd}>Thêm</button>
        </div>
        <div className="list-board">
            <div className="board">
                <div className="title">Công việc đang làm </div>
                <div className="items">
                    {
                        listDoing.map(e => <ToDoItems onCompleted={onCompleted} key={e.id} {...e}/>)
                    }
                </div>  
            </div>
            <div className="board">
            <div className="title">Công việc đã hoàn thành</div>
                <div className="items">
                    {
                        listDone.map(e => <ToDoItems key={e.id} {...e}/>)
                    }
                </div>  
            </div>
        </div>
    </ToDoListStyle>
}

const ToDoItemsStyle = styled.div`
    display: flex;
    border: 1px solid #ccc;
    padding: 10px;
    width: 400px;
    .name {
        flex: 1;

    }
    button {
        border: 1px solid #ccc;
        padding: 0 10px;
        background: #ccc;
    }
    &.isCompleted {
        background: #eee;
        button {
            display: none;
        }
        .name {
            text-decoration: line-through;
        }
    }
`
const ToDoItems  = ({id, name, isCompleted, onCompleted}) => {
    return (
        <ToDoItemsStyle  className={isCompleted ? 'isCompleted' : ''}   >
            <div className="name">{name}</div>
            <button onClick=    {() => onCompleted(id)}>✓</button>
        </ToDoItemsStyle>
    )
}