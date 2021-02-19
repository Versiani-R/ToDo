/* Interfaces */
import IOperations from 'interfaces/to-do/Operations';

/* Utils */
import { doFetch } from "utils/fetch";
import { sessionCheck } from "utils/session";

const update = async ({ event, sessionId, refresh }: IOperations, title?: string) => {

    /* Title of the element */
    let innerText = title;
    if (event) innerText = event.target.innerText;
    if (!innerText) return;

    const toDo = document.getElementById(innerText);
    if (!toDo) return;

    /* Hiding the original h3 to-do */
    toDo.style.display = 'none';

    /* The li responsible for holding the to-do */
    const parent = toDo.parentElement;

    /* The input element that will replicate the to-do */
    const input = document.createElement('input');
    input.id = innerText + '-update';
    input.classList.add('toDo-Update');
    input.setAttribute('value', innerText);
    input.style.width = input.value.length + 'ch'

    input.onkeydown = async (event: any) => {
        if (event.key === 'Enter') {
            /* New input value ( updated ) */
            const newTitle = input.value;

            /* The to-do now has the updated value ( backend did not updated the value yet ) */
            toDo.innerText = input.value;
            toDo.style.display = 'inline-block';

            input.remove();

            /* Update the value on the backend. @alert After the innerText update for better UI experience. */
            const content = await doFetch({ url: 'to-dos/', method: 'put', body: { sessionId, title: innerText, newTitle, newDeadline: 'tomorrow' } });
            sessionCheck(content);

            /* In case the user typed an already used title. @alert Just redo the changes on the UI, no changes on the backend */
            if (!content.success) toDo.innerText = innerText ? innerText : '';
    
            await refresh();
        } else { input.style.width = input.value.length + 1 + 'ch'; }
    }
    
    parent?.insertBefore(input, toDo.nextElementSibling);

    /* Select the input when the user clicks on the update icon */
    document.getElementById(innerText + '-update')?.focus();
}
export default update;