import IOperations from 'interfaces/to-do/Operations';
import IStyleProps from 'interfaces/to-do/StyleProps';

import { doFetch } from "utils/fetch";
import { sessionCheck } from 'utils/session';

const handleStyle = async (event: any, { sessionId, refresh }: IOperations, object: IStyleProps) => {
    const { title, isCompleted, styles } = object;
    
    const executeReverseLogic = (elementId: string, _class: string, icon1: string, icon2: string, value: boolean) => {
        const element = document.getElementById(title + elementId);
        const toDoUiElement = document.getElementById(title);

        /* Add / remove the class and replace the icons */
        if (value) toDoUiElement?.classList.add(_class) || element?.classList.replace(icon1, icon2)
        else toDoUiElement?.classList.remove(_class) || element?.classList.replace(icon2, icon1);
    }

    /* Called by useEffect, will perform all three checks. */
    if (event === null) {
        executeReverseLogic('-completed', 'completed', 'far', 'fas', isCompleted);
        executeReverseLogic('-bold', 'bold', 'fa-moon', 'fa-sun', styles?.isBold);
        executeReverseLogic('-italic', 'italic', 'fa-italic', 'fa-italic', styles?.isItalic);
        return;
    }

    let completedValue = isCompleted;
    let stylesValue = { isBold: styles.isBold, isItalic: styles.isItalic }
    
    if (event.target.id.includes('-completed')) completedValue = !isCompleted;
    if (event.target.id.includes('-bold')) stylesValue.isBold = !styles.isBold;
    if (event.target.id.includes('-italic')) stylesValue.isItalic = !styles.isItalic;

    /**
        * Better UI Experience
        
        Note: When the user clicks on the "completed" / "bold" / "italic" icon, if it's true,
        we want to change it to false, and so forth.
        Hence we need the reversed value instead of the actual one.
    **/
    executeReverseLogic('-completed', 'completed', 'far', 'fas', completedValue);
    executeReverseLogic('-bold', 'bold', 'fa-moon', 'fa-sun', stylesValue.isBold);
    executeReverseLogic('-italic', 'italic', 'fa-italic', 'fa-italic', stylesValue.isItalic);

    const content = await doFetch({ url: 'to-dos/styles/', method: 'put', body: {
        sessionId, title, isCompleted: completedValue, styles: stylesValue
    } });
    sessionCheck(content);

    await refresh();
}

export default handleStyle;