import React, { useEffect } from 'react';

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

    useEffect(() => {
        toDos.map((object) => {
            if (object.parent !== '') {

                const element = document.getElementById(object.parent);
                const parentElement = element?.parentElement;

                if (!element || !parentElement) return '';

                // const ulElements = parentElement.getElementsByTagName('ul');
                // for (let i = 0; i < ulElements.length; i++) {
                //     ulElements[i].remove();
                // }

                const ul = document.createElement('ul');
                const li = document.createElement('li');
                li.classList.add(object.deadline);

                const h3 = document.createElement('h3');
                h3.id = object.title;
                h3.classList.add('toDo-title');
                h3.innerText = object.title;

                li.appendChild(h3);
                ul.appendChild(li);
                parentElement.appendChild(ul);
            }
            return '';
        })        
    }, [toDos]);

    return (
        <div>
            <ul>
                {deadlines.map((deadline) => {
                    return (
                        <div key={deadline}>
                            {toDos.some((object) => object.parent === '' && object.deadline === deadline) ? <h2>{deadline}</h2> : ''}

                            {toDos.map((object) => {                                
                                const { title } = object;

                                if (object.deadline === deadline && object.parent === '') {
                                    return (
                                        <li className={[object.deadline, 'toDos-holder'].join(' ')} key={title}>
                                            <h3 id={title} className='toDo-title'>{title}</h3>

                                            <div className='toDo-options'>
                                                <i onClick={async () => await handleCreate(title) } className="fas fa-plus" id={title + '-plus'}></i>
                                                <i onClick={async () => await handleUpdate(title) } className="fas fa-pen" id={title + '-pen'}></i>
                                                <i onClick={async () => await handleDelete(title) } className="fas fa-minus" id={title + '-minus'}></i>
                                                <i className="far fa-check-circle"></i>
                                                {/* <i className="fas fa-check-circle"></i> */}
                                                <i className="fas fa-bold"></i>
                                                <i className="fas fa-italic"></i>
                                            </div>
                                        </li>
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