import React, { useCallback, useEffect, useState } from 'react';

import { doFetch } from '../utils/fetch';
import { handleWrongSession, hasSession } from '../utils/session';

const ToDos: React.FC = () => {
    const [toDos, setToDos] = useState([{ title: '', deadline: '' }]);

    const sessionId = hasSession();

    /**
        * Retrieve and load all To Do's ( get )

        * Note:
            * Note how there is a react hook "useCallback" wrapping the function.
            * This is necessary to avoid three warnings.
                * The first one being "missing dependency when using useEffect".
                * The second one being the "react-hooks/exhaustive-deps" warning.
                * The third one being when already using "useCallback", but not passing
                the "[sessionId, toDos]"

            * Explanation:
                * Only using the "useEffect" without the last "[]" parameter, means the useEffect
                will be called pretty much infinitely. Although passing the "[]" parameter at the
                end of the hook, like this:
                    * useEffect(async () => { await loadAndAppendToDos() }, []);
                Will prevent the useEffect to be called infinitely, it will raise a warning.
                    * "missing dependency when using useEffect 'loadAndAppendToDos'"
                * To solve this, you can pass the "loadAndAppendToDos" to the "[]", like this:
                    * useEffect(async () => { await loadAndAppendToDos() }, [loadAndAppendToDos]);
                * But then, it will raise another warning ( react is not fucking around ).
                    * The 'loadAndAppendToDos' function makes the dependencies of useEffect Hook change on every render. 
                    To fix this, wrap the definition of 'loadAndAppendToDos' in its own useCallback() Hook
                * Basically suggesting that we wrap the 'loadAndAppendToDos' function on the "useCallback" hook.
                    * const loadAndAppendToDos = useCallback(async () => { ... });
                * After that, it then raises an error ... ( jesus christ ).
                    * Expected 2 arguments, but got 1.ts(2554). index.d.ts(1106, 74): An argument for 'deps' was not provided.
                * Suggesting that we pass the "[]" to the callback.
                * It then of fucking course raises another warning ( why not at this point ).
                    * React Hook useCallback has missing dependencies: 'sessionId' and 'toDos'. 
                    Either include them or remove the dependency array
                * Suggesting that we add "sessionId and toDos" to the dependency array.
                    * const loadAndAppendToDos = useCallback(async () => { ... }, [sessionId, toDos]);
                * It then causes an error to the program because the toDos dependency is updated by the setToDos function.
                * To solve it, we add a custom object check, to see if the objects are equal.
                    * JSON.stringify(content.dues) !== JSON.stringify(toDos)
                * The perfect execution will be:
                    * ToDos will be empty on the first execution, so the code will hit the setToDos function and reset the
                    loop, starting the infinite loop journey. After that, on the second iteration, it will hit the object
                    comparison, this time it will stop, since the content.dues and toDos are the same.
                    * The great thing about this is that if content.dues is different ( another to do was added ), it will
                    update it.
    **/
    const loadAndAppendToDos = useCallback(async () => {
        const content = await doFetch({ url: `toDos/${sessionId}`, method: 'get' });
        console.log(content);

        if (!content.success && content.sessionId) handleWrongSession();
        if (content.dues && JSON.stringify(content.dues) !== JSON.stringify(toDos)) setToDos(content.dues);

        const ul = document.getElementById('toDos-titles');
        if (!ul) return;

        /* Cleaning the list. */
        ul.innerHTML = '';

        for (const toDo of toDos) {

            const li = document.createElement('li');

            const h3 = document.createElement('h3');
            h3.classList.add('toDos-title');
            h3.innerText = `${toDo.title}`;
            // TODO: Add the deadline
            h3.id = toDo.title;

            li.appendChild(h3);
            ul.appendChild(li);
        }
    }, [sessionId, toDos]);
    
    /* Create To Do ( post ) */
    const handleClick = async () => {
        const content = await doFetch({ url: 'toDos/', method: 'post', body: { sessionId, title: 'Title', deadline: 'Tomorrow' } });

        if (!content.success && content.sessionId) handleWrongSession();
        await loadAndAppendToDos();
    }

    /* Load the To Do's when the page loads. Add update and delete triggers. */
    useEffect(() => {
        if (sessionId) {
            loadAndAppendToDos();
            // updateTriggers();
            // deleteTriggers();
        } else { handleWrongSession(); }
    }, [sessionId, loadAndAppendToDos]);

    return (
        <div>
            <h1>To Do's</h1>

            <div id="content">
                <ul id="toDos-titles"></ul>

                <button id="add-toDos" onClick={handleClick}>Add To Do</button>
            </div>
        </div>
    )
}

export default ToDos;