import React, { useCallback, useEffect } from 'react';

import ITitleProps from 'interfaces/to-do/TitleProps';

import create from 'utils/to-do/create';
import update from 'utils/to-do/update';
import _delete from 'utils/to-do/delete';
import styles from 'utils/to-do/styles';

import 'styles/to-do.css';

const Title: React.FC<ITitleProps> = (props: ITitleProps) => {
    const { sessionId, refresh, title, parent, children } = props;

    const handleCreate = async () => await create({ sessionId, parent, refresh });
    const handleUpdate = async () => await update({ sessionId, title, refresh });
    const handleDelete = async () => await _delete({ sessionId, title, refresh });
    
    const handleStyle = useCallback(async (event: any) => {
        await styles(event, { sessionId, refresh, title, isCompleted: props.isCompleted, styles: props.styles });
    }, [sessionId, refresh, title, props]);

    useEffect(() => { handleStyle(null) }, [handleStyle]);

    return (
        <div>
            <li className='toDos-holder' key={title}>
                <h3 id={title} className='toDo-title'>{title}</h3>

                <div className='toDo-options'>
                    {parent === '' ? <i onClick={handleCreate} className="fas fa-plus" id={title + '-plus'}></i> : ''}
                    <i onClick={handleUpdate} className="fas fa-pen" id={title + '-pen'}></i>
                    <i onClick={handleDelete} className="fas fa-minus" id={title + '-minus'}></i>
                    
                    <i className='far fa-check-circle' id={title + '-completed'} onClick={handleStyle}></i>
                    <i className="fas fa-moon" id={title + '-bold'} onClick={handleStyle}></i>
                    <i className="fas fa-italic" id={title + '-italic'} onClick={handleStyle}></i>
                </div>

                {children.map(childObject => {
                    return <ul key={childObject.title}>
                        <li className='toDos-holder' key={childObject.title}>
                            <h3 id={childObject.title} className='toDo-title'>{childObject.title}</h3>

                            {/* Child objects cannot have the 'add' attribute to avoid infinite stacking. */}
                            <div className='toDo-options'>
                                <i onClick={handleUpdate} className="fas fa-pen" id={childObject.title + '-pen'}></i>
                                <i onClick={handleDelete} className="fas fa-minus" id={childObject.title + '-minus'}></i>
                                
                                <i onClick={handleStyle} className="far fa-check-circle"></i>
                                <i onClick={handleStyle} className="fas fa-bold"></i>
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