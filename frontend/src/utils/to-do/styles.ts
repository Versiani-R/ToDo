import IOperations from 'interfaces/to-do/Operations';

import { doFetch } from "utils/fetch";
import { sessionCheck } from 'utils/session';

const handleStyles = async (event: any, { sessionId, refresh, title, isCompleted, styles }: IOperations) => {
    if (!title) return;

    const toDoUiElement = document.getElementById(title);

    const executeReverseLogic = (elementId: string, _class: string, replace1: string, replace2: string, value: boolean | undefined) => {
        const element = document.getElementById(title + elementId);
        
        if (value) {
            toDoUiElement?.classList.add(_class);
            element?.classList.replace(replace1, replace2);
            
            return;
        }

        toDoUiElement?.classList.remove(_class);
        element?.classList.replace(replace2, replace1);
    }

    /**
        * Called by useEffect, will perform all three checks.
    **/
    if (event === null) {

        executeReverseLogic('-completed', 'completed', 'far', 'fas', isCompleted);

        executeReverseLogic('-bold', 'bold', 'fa-moon', 'fa-sun', styles?.isBold);

        executeReverseLogic('-italic', 'italic', 'fa-italic', 'fa-italic', styles?.isItalic);
        
        return;
    }

    /* Called by the "completed" button */
    if (event.target.id.includes('-completed')) {

        /**
            * When the user clicks on the "completed" icon, if it's true, we want to change it to false,
            and so forth. Hence we need the reversed value instead of the actual one.
        **/
        executeReverseLogic('-completed', 'completed', 'far', 'fas', !isCompleted);

        const content = await doFetch({ url: 'to-dos/styles/', method: 'put', body: { sessionId, title, isCompleted: !isCompleted, styles } });
        sessionCheck(content);
    
        await refresh();
    }

    /* Called by the "bold" button */
    if (event.target.id.includes('-bold')) {

        if (!styles) return;
        const { isBold, isItalic } = styles;

        /**
            * When the user clicks on the "bold" icon, if it's true, we want to change it to false,
            and so forth. Hence we need the reversed value instead of the actual one.
        **/
        executeReverseLogic('-bold', 'bold', 'fa-moon', 'fa-sun', !isBold);
        const _styles = { isBold: !isBold , isItalic };

        const content = await doFetch({ url: 'to-dos/styles/', method: 'put', body: { sessionId, title, isCompleted, styles: _styles } });
        sessionCheck(content);
    
        await refresh();
    }

    /* Called by the "italic" button */
    if (event.target.id.includes('-italic')) {

        if (!styles) return;
        const { isBold, isItalic } = styles;

        /**
            * When the user clicks on the "italic" icon, if it's true, we want to change it to false,
            and so forth. Hence we need the reversed value instead of the actual one.
        **/
        executeReverseLogic('-italic', 'italic', 'fa-italic', 'fa-italic', !isItalic);

        const _styles = { isBold, isItalic: !isItalic };

        const content = await doFetch({ url: 'to-dos/styles/', method: 'put', body: { sessionId, title, isCompleted, styles: _styles } });
        sessionCheck(content);
    
        await refresh();
    }
}

export default handleStyles;