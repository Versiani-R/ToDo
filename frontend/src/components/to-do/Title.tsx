import React, { useCallback, useEffect } from 'react';

import ITitleProps from 'interfaces/to-do/TitleProps';
import IStyleProps from 'interfaces/to-do/StyleProps';

import create from 'utils/to-do/create';
import update from 'utils/to-do/update';
import _delete from 'utils/to-do/delete';
import style from 'utils/to-do/style';

import 'styles/to-do.css';

const Title: React.FC<ITitleProps> = (props: ITitleProps) => {
    const { sessionId, refresh, title, children } = props;

    const handleCreate = async () => await create({ sessionId, parent: title, refresh });
    const handleUpdate = async () => await update({ sessionId, title, refresh });
    const handleDelete = async () => await _delete({ sessionId, title, refresh });
    
    const handleStyle = useCallback(async (event: any, object: IStyleProps) => {
        await style(event, { sessionId, refresh }, object);
    }, [sessionId, refresh]);

    useEffect(() => { handleStyle(null, props) && props.children.map(object => handleStyle(null, object)) }, [handleStyle, props]);

    return (
        <div>
            <li className='toDos-holder' key={title}>
                <h3 id={title} className='toDo-title'>{title}</h3>

                <div className='toDo-options'>
                    <i onClick={handleCreate} className="fas fa-plus" id={title + '-plus'}></i>
                    <i onClick={handleUpdate} className="fas fa-pen" id={title + '-pen'}></i>
                    <i onClick={handleDelete} className="fas fa-times" id={title + '-minus'}></i>
                    
                    <i onClick={(event: any) => handleStyle(event, props)} className='far fa-check-circle' id={title + '-completed'}></i>
                    <i onClick={(event: any) => handleStyle(event, props)} className="fas fa-moon" id={title + '-bold'}></i>
                    <i onClick={(event: any) => handleStyle(event, props)} className="fas fa-italic" id={title + '-italic'}></i>
                    <i onClick={(event: any) => handleStyle(event, props)} className="far fa-heart" id={title + '-heart'}></i>
                </div>

                {children.map(childObject => {
                    return <ul key={childObject.title}>
                        <li className='toDos-holder' key={childObject.title}>
                            <h3 id={childObject.title} className='toDo-title'>{childObject.title}</h3>

                            {/* Child objects cannot have the 'add' attribute to avoid infinite stacking. */}
                            <div className='toDo-options'>
                                <i onClick={handleUpdate} className="fas fa-pen" id={childObject.title + '-pen'}></i>
                                <i onClick={handleDelete} className="fas fa-times" id={childObject.title + '-minus'}></i>

                                <i onClick={(event: any) => handleStyle(event, childObject)} className="far fa-check-circle" id={childObject.title + '-completed'}></i>
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