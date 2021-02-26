import IOperations from 'interfaces/to-do/Operations';
import IStyleProps from 'interfaces/to-do/StyleProps';

import { doFetch } from "utils/fetch";

const handleStyle = async (event: any, { sessionId, refresh }: IOperations, object: IStyleProps) => {
    const { title, isCompleted, isFavorite, styles } = object;

    /**
        * Calling the element and setting it as public.

        Note: The reason we're doing this early is for better code control.

        Note: There are only four possible styles:
            1. Completed, 2. Bold, 3. Italic, 4. Favorite.
    **/
    const UiElement = document.getElementById(title);
    if (!UiElement) return;

    /* Called by useEffect, will perform all the style changes */
    if (event === null) {
        if (isCompleted) {
            /**
                * If an object is completed, we will perform two changes:
                
                    1. The to do element (h3) will have the 'completed' class.
                    2. The input element will be checked.
            **/
            UiElement.classList.add('completed');

            const completed: any = document.getElementById(title + '-completed');
            completed.checked = true;
        }

        if (isFavorite) {
            /**
                * If an object is favorite, we will perform two changes:
                
                    1. The to do element (h3) will have the 'favorite' class.
                    2. The icon will change.
            **/
            UiElement.classList.add('favorite');

            const favorite: any = document.getElementById(title + '-favorite');
            favorite.classList.replace('far', 'fas');
        }

        if (styles.isBold) {
            /**
                * If an object is bold, we will perform one change:
                
                    1. The to do element (h3) will have the 'bold' class.
            **/
            UiElement.classList.add('bold');
        }

        if (styles.isItalic) {
            /**
                * If an object is italic, we will perform one change:
               
                    1. The to do element (h3) will have the 'italic' class.
            **/
            UiElement.classList.add('italic');
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

        const placeholders = [isCompleted, isFavorite, styles.isBold, styles.isItalic];

        const contains = (_class: string) => UiElement.classList.contains(_class);
        const add = (index: number, _class: string) => {
            UiElement.classList.add(_class);
            placeholders[index] = true;
        }
        const remove = (index: number, _class: string) => {
            UiElement.classList.remove(_class);
            placeholders[index] = false;
        }

        if (id.includes('-completed')) contains('completed') ? remove(0, 'completed') : add(0, 'completed');

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
            if (contains('favorite')) {
                remove(1, 'favorite');
                favorite.classList.replace('fas', 'far');
            } else {
                add(1, 'favorite');
                favorite.classList.replace('far', 'fas');
            }
        }

        else if (id.includes('-bold')) contains('bold') ? remove(2, 'bold') : add(2, 'bold');
        else if (id.includes('-italic')) contains('italic') ? remove(3, 'italic') : add(3, 'italic');

        const _object = {
            sessionId,
            title,
            isCompleted: placeholders[0],
            isFavorite: placeholders[1],
            styles: {
                isBold: placeholders[2],
                isItalic: placeholders[3],
                color: styles.color
            }
        }

        await doFetch({ url: 'to-dos/styles', method: 'put', body: _object });
        await refresh();
    }
}

export default handleStyle;