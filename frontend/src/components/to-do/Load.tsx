import React from 'react';

const LoadToDos: React.FC = () => {
    return (
        <ul>
            {/* {deadlines.map((deadline) => 
                <div key={deadline}>
                    {toDos.map((object) => {
                        if (object.deadline === deadline && object.parent === '') {
                            return (
                                <div key={object.title + '_div'}>
                                    <h2>{deadline}</h2>
                                    {createTitle(object)}

                                    {toDos.map((childObject) => {
                                        if (childObject.parent === '' || childObject.parent !== object.title) return '';

                                        return <ul key={childObject.title + deadline}>
                                            {createTitle(childObject)}
                                        </ul>
                                    })}
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
            )} */}
        </ul>
    )
}

export default LoadToDos;