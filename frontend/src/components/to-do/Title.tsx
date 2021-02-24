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
    const handleUpdate = async () => await update({ sessionId, title, refresh });
    const handleDelete = async () => await _delete({ sessionId, title, refresh });

    /* Styles: { isComplete, isFavorite, isBold, isItalic } */
    const handleStyle = useCallback(async (event: any, object: IStyleProps) => {
        await style(event, { sessionId, refresh }, object);
    }, [sessionId, refresh]);

    useEffect(() => { handleStyle(null, props) && props.children.map(object => handleStyle(null, object)) }, [handleStyle, props]);

    return (
        <div>
            <li className='toDos-holder' key={title}>

                <input onClick={(event: any) => handleStyle(event, props)} type="checkbox" id={title + '-completed'} style={{ display: 'none' }} />
                <label htmlFor={title + '-completed'} className="check">
                    <svg width="18px" height="18px" viewBox="0 0 18 18">
                        <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                        <polyline points="1 9 7 14 15 4"></polyline>
                    </svg>
                </label>



{/* 
                <div className="form">
                    <input type="checkbox" id="check" />
                    <label htmlFor="check">
                        <svg width="18px" height="18px" viewBox="0,0,50,50">
                            <path d="M5 30 L 20 45 L 45 5"></path>
                        </svg>
                    </label>
                </div> */}



















                {/* <input onClick={(event: any) => handleStyle(event, props)} id={title + '-completed'} type="checkbox"/> */}
                <h3 id={title} className='toDo-title'>{title}</h3>

                <div className='toDo-options'>
                    <i onClick={handleCreate} className="fas fa-plus" id={title + '-plus'}></i>
                    <i onClick={handleUpdate} className="fas fa-pen" id={title + '-pen'}></i>
                    <i onClick={handleDelete} className="fas fa-times" id={title + '-minus'}></i>
                    
                    {/* <i onClick={(event: any) => handleStyle(event, props)} className='far fa-check-circle' id={title + '-completed'}></i> */}
                    <i onClick={(event: any) => handleStyle(event, props)} className="fas fa-moon" id={title + '-bold'}></i>
                    <i onClick={(event: any) => handleStyle(event, props)} className="fas fa-italic" id={title + '-italic'}></i>
                    <i onClick={(event: any) => handleStyle(event, props)} className="far fa-heart" id={title + '-heart'}></i>
                </div>

                {children.map(childObject => {
                    return <ul key={childObject.title}>
                        <li className='toDos-holder' key={childObject.title}>
                            <h3 id={childObject.title} className='toDo-title'>{childObject.title}</h3>

                            <div className='toDo-options'>
                                {/* Child objects cannot have the 'add' attribute to avoid infinite stacking. */}
                                <i onClick={handleUpdate} className="fas fa-pen" id={childObject.title + '-pen'}></i>
                                <i onClick={handleDelete} className="fas fa-times" id={childObject.title + '-minus'}></i>

                                {/* <i onClick={(event: any) => handleStyle(event, childObject)} className="far fa-check-circle" id={childObject.title + '-completed'}></i> */}
                                <i onClick={(event: any) => handleStyle(event, childObject)} className="fas fa-moon" id={childObject.title + '-bold'}></i>
                                <i onClick={(event: any) => handleStyle(event, childObject)} className="fas fa-italic" id={childObject.title + '-italic'}></i>
                                <i onClick={(event: any) => handleStyle(event, childObject)} className="far fa-heart" id={childObject.title + '-heart'}></i>
                            </div>
                        </li>
                    </ul>
                })}
            </li>
        </div>
    )
}

export default Title;