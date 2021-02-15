import React, { useCallback, useEffect, useState } from 'react';
import _ from 'lodash';

import { doFetch } from '../utils/fetch';
import { handleWrongSession, hasSession } from '../utils/session';

const ToDos: React.FC = () => {
    const [toDos, setToDos] = useState([{ title: '', deadline: '' }]);

    const sessionId = hasSession();

    /* Retrieve and load all To Do's ( get ) */
    const loadAndAppendToDos = useCallback(async () => {
        /**
            Note: There is a react hook "useCallback" wrapping the function.
                * Necessary to avoid three warnings.
                    1. "missing dependency when using useEffect".
                    2. "react-hooks/exhaustive-deps".
                    3. Using "useCallback", without "[sessionId, toDos]"

            Explanation:
                * "useEffect" without the "[]" parameter means it will be called infinitely. Passing "[]" at the end of the hook,
                    * useEffect(async () => { await loadAndAppendToDos() }, []);
                    Will prevent the useEffect to be called infinitely.

                    Problem: Passing an empty array "[]" raises another warning.
                        * "missing dependency when using useEffect 'loadAndAppendToDos'"
                    Solution: Pass the "loadAndAppendToDos" to the "[]":
                        * useEffect(async () => { await loadAndAppendToDos() }, [loadAndAppendToDos]);
                    Problem: It will raise another warning ( react is not fucking around ).
                        * The 'loadAndAppendToDos' function makes the dependencies of useEffect Hook change on every render. 
                        To fix this, wrap the definition of 'loadAndAppendToDos' in its own useCallback() Hook
                    Solution: Basically suggesting that we wrap the 'loadAndAppendToDos' function on the "useCallback" hook.
                        * const loadAndAppendToDos = useCallback(async () => { ... });
                    Problem: It then raises an error ... ( jesus christ ).
                        * Expected 2 arguments, but got 1.ts(2554). index.d.ts(1106, 74): An argument for 'deps' was not provided.
                    Solution: Suggesting that we pass the "[]" to the callback.
                        * const loadAndAppendToDos = useCallback(async () => { ... }, []);
                    Problem: It then of fucking course raises another warning ( why not at this point ).
                        * React Hook useCallback has missing dependencies: 'sessionId' and 'toDos'. 
                        Either include them or remove the dependency array
                    Solution: Suggesting that we add "sessionId and toDos" to the dependency array.
                        * const loadAndAppendToDos = useCallback(async () => { ... }, [sessionId, toDos]);
                    Problem: It then causes an error to the program because the toDos dependency is updated by the setToDos function.
                        Explanation:
                            * The arguments passed inside the "[]" are not only dependencies, but also triggers.
                            * If those values change, the useEffect ( or in this case the useCallback ) will be called again.
                            Problem: The obvious problem is that we change the "toDos" value by calling the setToDos.
                            Solution: To solve it, we use lodash to see if the objects are different.
                                * !(_.isEqual(content.dues, toDos))

                            * The perfect execution will be:
                                *: "toDos" will be empty on the first execution, so the code will hit the setToDos function and reset the
                                loop, starting the infinite loop journey.
                                *: After that, on the second iteration, it will hit the object comparison, this time it will stop,
                                since the content.dues and toDos are the same.
                                
                            * The great thing about this is that if content.dues is different ( another to do was added/updated/deleted ),
                            it will hit the setToDos and update it. Only stopping on the next iteration.
        **/
        const content = await doFetch({ url: `toDos/${sessionId}`, method: 'get' });
        console.log(content);

        if (!content.success && content.sessionId) handleWrongSession();
        if (content.dues && !(_.isEqual(content.dues, toDos))) setToDos(content.dues);

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