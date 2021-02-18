import React from 'react';

/* Interfaces */
import ILoadProps from 'interfaces/to-do/LoadProps';

/* Utils */
import update from 'utils/to-do/update';
import _delete from 'utils/to-do/delete';

const LoadToDos: React.FC<ILoadProps> = (props: ILoadProps) => {
    const { sessionId, refresh, titles, deadlines } = props;

    const handleDoubleClick = async (event: any) => await update({ event, sessionId, refresh });
    const handleAuxClick = async (event: any) => await _delete({ event, sessionId, refresh });

    return (
        <div>
            <ul>
                {titles.map((title, index) => {
                    return (
                        <li key={index} id={deadlines[index]}>
                            <h3
                                className='toDo-title'
                                onDoubleClick={handleDoubleClick}
                                onAuxClick={handleAuxClick}
                            >{title}</h3>

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