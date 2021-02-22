import React from 'react';

import ILoadProps from 'interfaces/to-do/LoadProps';

import create from 'utils/to-do/create';
import update from 'utils/to-do/update';
import _delete from 'utils/to-do/delete';

import 'styles/to-do.css';

const LoadToDos: React.FC<ILoadProps> = (props: ILoadProps) => {
    const { sessionId, refresh, toDos } = props;

    const handleCreate = async (parent: string) => await create({ sessionId, parent, refresh });
    const handleUpdate = async (title: string) => await update({ sessionId, title, refresh });
    const handleDelete = async (title: string) => await _delete({ sessionId, title, refresh });

    const deadlines: string[] = [];
    toDos.map(({ deadline }) => !deadlines.includes(deadline) ? deadlines.push(deadline) : '' );

    return (
        <div>
            <ul>
                {deadlines.map((deadline) => {
                    return (
                        <div key={deadline}>
                            {toDos.some((object) => object.parent === '' && object.deadline === deadline) ? <h2>{deadline}</h2> : ''}

                            {toDos.map((object) => {
                                if (object.deadline === deadline && object.parent === '') {
                                    return (
                                        <div key={object.title + deadline}>
                                            <li className={[object.deadline, 'toDos-holder'].join(' ')} key={object.title}>
                                                <h3 id={object.title} className='toDo-title'>{object.title}</h3>

                                                <div className='toDo-options'>
                                                    <i onClick={async () => await handleCreate(object.title) } className="fas fa-plus" id={object.title + '-plus'}></i>
                                                    <i onClick={async () => await handleUpdate(object.title) } className="fas fa-pen" id={object.title + '-pen'}></i>
                                                    <i onClick={async () => await handleDelete(object.title) } className="fas fa-minus" id={object.title + '-minus'}></i>
                                                    <i className="far fa-check-circle"></i>
                                                    {/* <i className="fas fa-check-circle"></i> */}
                                                    <i className="fas fa-bold"></i>
                                                    <i className="fas fa-italic"></i>
                                                </div>
                                            </li>

                                            <ul>
                                                {toDos.map((childObject) => {
                                                    if (childObject.parent === '' || childObject.parent !== object.title) return '';

                                                    return (<div key={childObject.title + deadline}>
                                                        <li className={[object.deadline, 'toDos-holder'].join(' ')} key={childObject.title}>
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
                                                    </div>)
                                                })}
                                            </ul>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>
                    )
                })}
            </ul>
        </div>
    )
}

export default LoadToDos;