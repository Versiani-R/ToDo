import React from 'react';

/* Interfaces */
import ILoadToDo from 'interfaces/LoadToDo';

const LoadToDos: React.FC<ILoadToDo> = (props: ILoadToDo) => {
    return (
        <div>
            <ul>
                {props.titles.map((title, index) => {
                    return (
                        <li key={index}>
                            <h3 className='toDo-title'>{title}</h3>

                            <div>
                                <p>+</p>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default LoadToDos;