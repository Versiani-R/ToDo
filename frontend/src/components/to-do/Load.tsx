import React from 'react';
import 'styles/to-do.css';

/* Interfaces */
import ILoadProps from 'interfaces/to-do/LoadProps';

/* Utils */
import create from 'utils/to-do/create';
import update from 'utils/to-do/update';
import _delete from 'utils/to-do/delete';

const LoadToDos: React.FC<ILoadProps> = (props: ILoadProps) => {
    const { sessionId, refresh, titles, deadlines } = props;

    const handleCreate = async (event: any) => await create({ event, sessionId, refresh });
    const handleUpdate = async (event: any, title?: string) => await update({ event, sessionId, refresh }, title);
    const handleDelete = async (event: any, title?: string) => await _delete({ event, sessionId, refresh }, title);

    return (
        <div>
            <ul>
                {titles.map((title, index) => {
                    return (
                        <li className='toDos-holder' key={index} id={deadlines[index]}>
                            <h3 id={title} className='toDo-title'>{title}</h3>

                            <div className='toDo-options'>
                                <i onClick={handleCreate} className="fas fa-plus"></i>
                                <i onClick={async () => await handleDelete(null, title) } className="fas fa-minus"></i>
                                <i onClick={async () => await handleUpdate(null, title) } className="fas fa-pen"></i>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default LoadToDos;