import IOperations from 'interfaces/to-do/Operations';

import { doFetch } from "utils/fetch";
import { sessionCheck } from 'utils/session';

const handleStyles = async (event: any, { sessionId, refresh, title, isCompleted, styles }: IOperations) => {
    if (!title) return;

    const toDoUiElement = document.getElementById(title);

    const executeReverseLogic = (element: any | undefined, _class: string, replace1: string, replace2: string, value: boolean | undefined) => {
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

        const isCompletedUIElement = document.getElementById(title + '-completed');
        executeReverseLogic(isCompletedUIElement, 'completed', 'far', 'fas', isCompleted);
        
        const isBoldUIElement = document.getElementById(title + '-bold');
        executeReverseLogic(isBoldUIElement, 'bold', 'fa-moon', 'fa-sun', styles?.isBold);

        const isItalicUIElement = document.getElementById(title + '-italic');
        executeReverseLogic(isItalicUIElement, 'italic', 'fa-italic', 'fa-italic', styles?.isItalic);
        
        return;
    }

    /* Called by the "completed" button */
    if (event.target.id.includes('-completed')) {

        const isCompletedUIElement = document.getElementById(title + '-completed');

        /**
            * When the user clicks on the "completed" icon, if it's true, we want to change it to false,
            and so forth. Hence we need the reversed value instead of the actual one.
        **/
        const isCompletedReversedValue = !isCompleted;
        executeReverseLogic(isCompletedUIElement, 'completed', 'far', 'fas', isCompletedReversedValue);

        const content = await doFetch({ url: 'to-dos/styles/', method: 'put', body: { sessionId, title, isCompleted: isCompletedReversedValue, styles } });
        sessionCheck(content);
    
        await refresh();
    }

    /* Called by the "bold" button */
    if (event.target.id.includes('-bold')) {

        if (!styles) return;
        const { isBold, isItalic } = styles;

        const isBoldUIElement = document.getElementById(title + '-bold');

        /**
            * When the user clicks on the "bold" icon, if it's true, we want to change it to false,
            and so forth. Hence we need the reversed value instead of the actual one.
        **/
        const isBoldReversedValue = !isBold;
        executeReverseLogic(isBoldUIElement, 'bold', 'fa-moon', 'fa-sun', isBoldReversedValue);

        const _styles = { isBold: !isBold , isItalic };

        const content = await doFetch({ url: 'to-dos/styles/', method: 'put', body: { sessionId, title, isCompleted, styles: _styles } });
        sessionCheck(content);
    
        await refresh();
    }

    /* Called by the "italic" button */
    if (event.target.id.includes('-italic')) {

        if (!styles) return;
        const { isBold, isItalic } = styles;

        const isItalicUIElement = document.getElementById(title + '-italic');

        /**
            * When the user clicks on the "italic" icon, if it's true, we want to change it to false,
            and so forth. Hence we need the reversed value instead of the actual one.
        **/
        const isItalicReversedValue = !isItalic;
        executeReverseLogic(isItalicUIElement, 'italic', 'fa-italic', 'fa-italic', isItalicReversedValue);

        const _styles = { isBold, isItalic: !isItalic };

        const content = await doFetch({ url: 'to-dos/styles/', method: 'put', body: { sessionId, title, isCompleted, styles: _styles } });
        sessionCheck(content);
    
        await refresh();
    }
}

export default handleStyles;