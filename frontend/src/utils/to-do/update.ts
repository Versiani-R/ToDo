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

    toDo.style.display = 'none';

    const parent = toDo.parentElement;

    const input = document.createElement('input');
    input.id = innerText + '-update';
    input.classList.add('toDo-Update');
    input.setAttribute('value', innerText);
    input.style.width = input.value.length + 'ch'

    const change = async () => {
        const newTitle = input.value;
        if (!newTitle) return;

        toDo.innerText = input.value;
        toDo.style.display = 'inline-block';

        input.remove();

        const content = await doFetch({ url: 'to-dos/', method: 'put', body: { sessionId, title: innerText, newTitle, newDeadline: 'tomorrow' } });
        sessionCheck(content);

        if (!content.success) toDo.innerText = innerText ? innerText : '';

        await refresh();
    }

    input.onkeydown = async (event: any) => event.key === 'Enter' ? await change() : input.style.width = input.value.length + 1 + 'ch';
    
    parent?.insertBefore(input, toDo.nextElementSibling);

    document.getElementById(innerText + '-update')?.focus();
}
export default update;