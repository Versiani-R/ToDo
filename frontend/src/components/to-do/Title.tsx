import React, { useCallback, useEffect } from 'react';

import ITitleProps from 'interfaces/to-do/TitleProps';
import IStyleProps from 'interfaces/to-do/StyleProps';

import create from 'utils/to-do/create';
import update from 'utils/to-do/update';
import _delete from 'utils/to-do/delete';
import style from 'utils/to-do/style';

import 'styles/to-dos/to-do.css';

const Title: React.FC<ITitleProps> = (props: ITitleProps) => {
    const { sessionId, refresh, title, children } = props;

    const handleCreate = async () => await create({ sessionId, parent: title, refresh });
    const handleUpdate = async (element: string) => await update({ sessionId, title: element, refresh });
    const handleDelete = async (element: string) => await _delete({ sessionId, title: element, refresh });

    const handleStyle = useCallback(async (event: any, object: IStyleProps) => await style(event, { sessionId, refresh }, object), [sessionId, refresh]);
    useEffect(() => {
        handleStyle(null, props);
        props.children.map(object => handleStyle(null, object));
    }, [handleStyle, props]);

    return (
        <div>
            <li className='toDos-holder' key={title}>

                <span id={title + 'border'} className="border"></span>

                <input onClick={async (event: any) => await handleStyle(event, props)} type="checkbox" id={title + '-completed'} style={{ display: 'none' }} />
                <label htmlFor={title + '-completed'} className="check">
                    <svg width="18px" height="18px" viewBox="0 0 18 18">
                        <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                        <polyline points="1 9 7 14 15 4"></polyline>
                    </svg>
                </label>

                <h3 id={title} className='toDo-title'>{title}</h3>

                <div className='toDo-options'>
                    <i onClick={handleCreate} className="fas fa-plus" id={title + '-plus'}></i>
                    <i onClick={() => handleUpdate(title)} className="fas fa-pen" id={title + '-pen'}></i>
                    <i onClick={() => handleDelete(title)} className="fas fa-trash" id={title + '-minus'}></i>

                    <i onClick={async (event: any) => await handleStyle(event, props)} className="fas fa-bold" id={title + '-bold'}></i>
                    <i onClick={async (event: any) => await handleStyle(event, props)} className="fas fa-italic" id={title + '-italic'}></i>
                    <i onClick={async (event: any) => await handleStyle(event, props)} className="far fa-heart" id={title + '-favorite'}></i>
                </div>

                {children.map(childObject => {
                    return <ul key={childObject.title}>
                        <li className='toDos-holder child' key={childObject.title}>

                            <span id={childObject.title + 'border'} className="border"></span>

                            <input onClick={(event: any) => handleStyle(event, childObject)} type="checkbox" id={childObject.title + '-completed'} style={{ display: 'none' }} />
                            <label htmlFor={childObject.title + '-completed'} className="check">
                                <svg width="18px" height="18px" viewBox="0 0 18 18">
                                    <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                                    <polyline points="1 9 7 14 15 4"></polyline>
                                </svg>
                            </label>

                            <h3 id={childObject.title} className='toDo-title'>{childObject.title}</h3>

                            <div className='toDo-options'>
                                {/* Child objects cannot have the 'add' attribute to avoid infinite stacking. */}
                                <i onClick={() => handleUpdate(childObject.title)} className="fas fa-pen" id={childObject.title + '-pen'}></i>
                                <i onClick={() => handleDelete(childObject.title)} className="fas fa-trash" id={childObject.title + '-minus'}></i>

                                <i onClick={async (event: any) => await handleStyle(event, childObject)} className="fas fa-bold" id={childObject.title + '-bold'}></i>
                                <i onClick={async (event: any) => await handleStyle(event, childObject)} className="fas fa-italic" id={childObject.title + '-italic'}></i>
                                <i onClick={async (event: any) => await handleStyle(event, childObject)} className="far fa-heart" id={childObject.title + '-favorite'}></i>
                            </div>
                        </li>
                    </ul>
                })}
            </li>
        </div>
    )
}

export default Title;