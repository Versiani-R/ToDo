import IOperations from 'interfaces/to-do/Operations';
import IStyleProps from 'interfaces/to-do/StyleProps';

import { doFetch } from "utils/fetch";

const handleStyle = async (event: any, { sessionId, refresh }: IOperations, object: IStyleProps) => {
    const { title, isCompleted, isFavorite, styles } = object;

    /**
        * Calling all the elements and setting them as public.

        Note: The reason we're doing this early is for better UI experience.
        
        Note: There are only four possible styles:
            1. Completed, 2. Bold, 3. Italic, 4. Favorite.
    **/
    const elements: any = [];
    ['completed', 'bold', 'italic', 'heart'].map(() => {
        const UiElement = document.getElementById(title);

        if (UiElement) elements.push(UiElement);
        return '';
    });

    /* Called by useEffect, will perform all the style changes */
    if (event === null) {
        if (isCompleted) {
            /**
                * If an object is completed, we will perform two changes:
                
                    1. The to do element (h3) will have the 'completed' class.
                    2. The input element will be checked.

                Note: Completed is the first element of elements[].
            **/
            elements[0].classList.add('completed');

            const completed: any = document.getElementById(title + '-completed');
            completed.checked = true;
        }

        if (isFavorite) {
            /**
                * If an object is favorite, we will perform two changes:
                
                    1. The to do element (h3) will have the 'favorite' class.
                    2. The icon will change.

                Note: Favorite is the second element of elements[].
            **/
            elements[1].classList.add('favorite');

            const favorite: any = document.getElementById(title + '-favorite');
            favorite.classList.replace('far', 'fas');
        }

        if (styles.isBold) {
            /**
                * If an object is bold, we will perform one change:
                
                    1. The to do element (h3) will have the 'bold' class.
                
                Note: Bold is the third element of elements[].
            **/
           elements[2].classList.add('bold');
        }

        if (styles.isItalic) {
            /**
                * If an object is italic, we will perform one change:
               
                    1. The to do element (h3) will have the 'italic' class.
                
                Note: Italic is the fourth and last element of elements[].
            **/
            elements[3].classList.add('italic');
        }

        /**
            * Applying color to the object.
            
            Note: Every single to do has the border color set while creating.
        **/
        const border = document.getElementById(title + 'border');
        if (border) border.style.borderLeftColor = styles.color;

        return;
    }

    /* Called by onClick(), can only perform one change for call. */
    if (event !== null) {
        const { id } = event.target;

        const contains = (index: number, _class: string) => elements[index].classList.contains(_class);
        const add = (index: number, _class: string) => elements[index].classList.add(_class);
        const remove = (index: number, _class: string) => elements[index].classList.remove(_class);
        
        if (id.includes('-completed')) contains(0, 'completed') ? remove(0, 'completed') : add(0, 'completed');
        
        else if (id.includes('-favorite')) {
            const favorite: any = document.getElementById(title + '-favorite');

            /**
                * If the to do is already a favorite:
                    1. Remove the 'favorite' class.
                    2. Replace '♥' for '♡'
                
                * If it's not a favorite:
                    1. Add the 'favorite' class.
                    2. Replace '♡' for '♥'
            **/
            if (contains(1, 'favorite')) {
                remove(1, 'favorite');
                favorite.classList.replace('fas', 'far');
            } else {
                add(1, 'favorite');
                favorite.classList.replace('far', 'fas');
            }
        }
    }
    
    // const executeReverseLogic = (elementId: string, _class: string, icon1: string, icon2: string, value: boolean) => {
    //     const element = document.getElementById(title + elementId);
    //     const border = document.getElementById(title + 'border');
    //     const toDoUiElement = document.getElementById(title);

    //     if (border) border.style.borderLeftColor = styles.color;

    //     /* Add / remove the class and replace the icons */
    //     if (value) toDoUiElement?.classList.add(_class) || element?.classList.replace(icon1, icon2)
    //     else toDoUiElement?.classList.remove(_class) || element?.classList.replace(icon2, icon1);
    // }

    // const isCompletedLogic = (condition: boolean) => {
    //     executeReverseLogic('-completed', 'completed', 'far', 'fas', condition);

    //     const a: any = document.getElementById(title + '-completed');
    //     if (a && isCompleted) a.checked = true;
    // }

    // /* Called by useEffect, will perform all three checks. */
    // if (event === null) {
    //     isCompletedLogic(isCompleted);

    //     executeReverseLogic('-heart', 'favorite', 'far', 'fas', isFavorite);
    //     executeReverseLogic('-bold', 'bold', 'fa-bold', 'fa-bold', styles?.isBold);
    //     executeReverseLogic('-italic', 'italic', 'fa-italic', 'fa-italic', styles?.isItalic);
    //     return;
    // }

    // /* Place holders with all the passed values */
    // let completedValue = isCompleted;
    // let heartValue = isFavorite;
    // let stylesValue = { isBold: styles.isBold, isItalic: styles.isItalic, color: styles.color };

    // /* Change the value if icon was clicked */
    // if (event.target.id.includes('-completed')) completedValue = !isCompleted;
    // if (event.target.id.includes('-heart')) heartValue = !isFavorite;
    // if (event.target.id.includes('-bold')) stylesValue.isBold = !styles.isBold;
    // if (event.target.id.includes('-italic')) stylesValue.isItalic = !styles.isItalic;

    // /**
    //     * Better UI Experience
        
    //     Note: When the user clicks on the "completed" / "bold" / "italic" icon, if it's true,
    //     we want to change it to false, and so forth.
    //     Hence we need the reversed value instead of the actual one.

    //     Note: If statements to make sure we're not changing anything unnecessary.
    // **/
    // if (isCompleted !== completedValue) executeReverseLogic('-completed', 'completed', 'far', 'fas', completedValue);
    // if (isFavorite !== heartValue) executeReverseLogic('-bold', 'bold', 'fa-bold', 'fa-bold', stylesValue.isBold);
    // if (styles.isItalic !== stylesValue.isItalic) executeReverseLogic('-italic', 'italic', 'fa-italic', 'fa-italic', stylesValue.isItalic);
    // if (styles.isBold !== stylesValue.isBold) executeReverseLogic('-heart', 'favorite', 'far', 'fas', heartValue);

    // doFetch({ url: 'to-dos/styles/', method: 'put', body: { sessionId, title, isCompleted: completedValue, isFavorite: heartValue, styles: stylesValue } });

    // await refresh();
}

export default handleStyle;