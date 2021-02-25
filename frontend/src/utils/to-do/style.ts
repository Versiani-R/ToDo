import IOperations from 'interfaces/to-do/Operations';
import IStyleProps from 'interfaces/to-do/StyleProps';

import { doFetch } from "utils/fetch";

const handleStyle = async (event: any, { sessionId, refresh }: IOperations, object: IStyleProps) => {
    const { title, isCompleted, isFavorite, styles } = object;
    
    const executeReverseLogic = (elementId: string, _class: string, icon1: string, icon2: string, value: boolean) => {
        const element = document.getElementById(title + elementId);
        const border = document.getElementById(title + 'border');
        const toDoUiElement = document.getElementById(title);

        if (border) border.style.borderLeftColor = styles.color;

        /* Add / remove the class and replace the icons */
        if (value) toDoUiElement?.classList.add(_class) || element?.classList.replace(icon1, icon2)
        else toDoUiElement?.classList.remove(_class) || element?.classList.replace(icon2, icon1);
    }

    const isCompletedLogic = (condition: boolean) => {
        executeReverseLogic('-completed', 'completed', 'far', 'fas', condition);

        const a: any = document.getElementById(title + '-completed');
        if (a && isCompleted) a.checked = true;
    }

    /* Called by useEffect, will perform all three checks. */
    if (event === null) {
        isCompletedLogic(isCompleted);

        executeReverseLogic('-heart', 'favorite', 'far', 'fas', isFavorite);
        executeReverseLogic('-bold', 'bold', 'fa-bold', 'fa-bold', styles?.isBold);
        executeReverseLogic('-italic', 'italic', 'fa-italic', 'fa-italic', styles?.isItalic);
        return;
    }

    /* Place holders with all the passed values */
    let completedValue = isCompleted;
    let heartValue = isFavorite;
    let stylesValue = { isBold: styles.isBold, isItalic: styles.isItalic, color: styles.color };

    /* Change the value if icon was clicked */
    if (event.target.id.includes('-completed')) completedValue = !isCompleted;
    if (event.target.id.includes('-heart')) heartValue = !isFavorite;
    if (event.target.id.includes('-bold')) stylesValue.isBold = !styles.isBold;
    if (event.target.id.includes('-italic')) stylesValue.isItalic = !styles.isItalic;

    /**
        * Better UI Experience
        
        Note: When the user clicks on the "completed" / "bold" / "italic" icon, if it's true,
        we want to change it to false, and so forth.
        Hence we need the reversed value instead of the actual one.

        Note: If statements to make sure we're not changing anything unnecessary.
    **/
    if (isCompleted !== completedValue) executeReverseLogic('-completed', 'completed', 'far', 'fas', completedValue);
    if (isFavorite !== heartValue) executeReverseLogic('-bold', 'bold', 'fa-bold', 'fa-bold', stylesValue.isBold);
    if (styles.isItalic !== stylesValue.isItalic) executeReverseLogic('-italic', 'italic', 'fa-italic', 'fa-italic', stylesValue.isItalic);
    if (styles.isBold !== stylesValue.isBold) executeReverseLogic('-heart', 'favorite', 'far', 'fas', heartValue);

    doFetch({ url: 'to-dos/styles/', method: 'put', body: { sessionId, title, isCompleted: completedValue, isFavorite: heartValue, styles: stylesValue } });

    await refresh();
}

export default handleStyle;