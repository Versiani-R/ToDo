import React from 'react';

import ITitleProps from 'interfaces/to-do/TitleProps';

import create from 'utils/to-do/create';
import update from 'utils/to-do/update';
import _delete from 'utils/to-do/delete';

import 'styles/to-do.css';

const Title: React.FC<ITitleProps> = (props: ITitleProps) => {
    const { sessionId, refresh, title, parent, children } = props;

    const handleCreate = async (parent: string) => await create({ sessionId, parent, refresh });
    const handleUpdate = async (title: string) => await update({ sessionId, title, refresh });
    const handleDelete = async (title: string) => await _delete({ sessionId, title, refresh });

    return (
        <div>
            <li className='toDos-holder' key={title}>
                <h3 id={title} className='toDo-title'>{title}</h3>

                <div className='toDo-options'>
                    {parent === '' ? <i onClick={async () => await handleCreate(title) } className="fas fa-plus" id={title + '-plus'}></i> : ''}
                    <i onClick={async () => await handleUpdate(title) } className="fas fa-pen" id={title + '-pen'}></i>
                    <i onClick={async () => await handleDelete(title) } className="fas fa-minus" id={title + '-minus'}></i>
                    <i className="far fa-check-circle"></i>
                    {/* <i className="fas fa-check-circle"></i> */}
                    <i className="fas fa-bold"></i>
                    <i className="fas fa-italic"></i>
                </div>

                {children.map(childObject => {
                    return <ul key={childObject.title}>
                        <li className='toDos-holder' key={childObject.title}>
                            <h3 id={childObject.title} className='toDo-title'>{childObject.title}</h3>

                            <div className='toDo-options'>
                                <i onClick={async () => await handleUpdate(childObject.title) } className="fas fa-pen" id={childObject.title + '-pen'}></i>
                                <i onClick={async () => await handleDelete(childObject.title) } className="fas fa-minus" id={childObject.title + '-minus'}></i>
                                <i className="far fa-check-circle"></i>
                                {/* <i className="fas fa-check-circle"></i> */}
                                <i className="fas fa-bold"></i>
                                <i className="fas fa-italic"></i>
                            </div>
                        </li>
                    </ul>
                })}
            </li>
        </div>
    )
}

export default Title;