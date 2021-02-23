import IOperations from 'interfaces/to-do/Operations';

import { doFetch } from "utils/fetch";
import { sessionCheck } from 'utils/session';

const handleStyles = async (event: any, { sessionId, refresh, title, isCompleted, styles }: IOperations) => {
    if (!title) return;

    const toDoUiElement = document.getElementById(title);
    const isCompletedUIElement = document.getElementById(title + '-completed');

    /**
        * When the user clicks on the "completed" icon, if it's true, we want to change it to false,
        and so forth. Hence we need the reversed value instead of the actual one.
        * But when this function is called by the use effect, we want the actual value.
    **/
    let isCompletedReversedValue: boolean | undefined = !isCompleted;
    if (event === null) isCompletedReversedValue = isCompleted;

    if (isCompletedReversedValue) {
        /* False to true */

        toDoUiElement?.classList.add('completed');
        isCompletedUIElement?.classList.replace('far', 'fas');
    } else {
        /* True to false */
        isCompletedUIElement?.classList.replace('fas', 'far');
        toDoUiElement?.classList.remove('completed');
    }

    if (event !== null) {
        const content = await doFetch({ url: 'to-dos/styles/', method: 'put', body: { sessionId, title, isCompleted: isCompletedReversedValue, styles } });
        sessionCheck(content);
    
        await refresh();
    }
}

export default handleStyles;