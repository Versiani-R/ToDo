import IOperations from 'interfaces/to-do/Operations';

import { doFetch } from "utils/fetch";

const update = async ({ sessionId, title, refresh }: IOperations) => {
    if (!title) return;

    const toDo = document.getElementById(title);
    if (!toDo) return;

    /* Disable the edit button so the user cannot press it while editing the to-do */
    const editButton = document.getElementById(title + '-pen');
    if (editButton?.classList.contains('icon-disabled')) return;

    editButton?.classList.add('icon-disabled');

    /* Hiding the original h3 to-do */
    toDo.style.display = 'none';

    /* The li responsible for holding the to-do */
    const parent = toDo.parentElement;

    /* The input element that will replicate the to-do */
    const input = document.createElement('input');
    input.id = title + '-update';
    input.classList.add('toDo-Update');
    input.setAttribute('value', title);
    input.style.width = input.value.length + 'ch';

    input.onkeydown = async (event: any) => {
        if (event.key === 'Enter' || event.key === 'Escape') {
            /* New input value ( updated ) */
            const newTitle = input.value;

            /* The to-do now has the updated value ( backend did not updated the value yet ) */
            toDo.innerText = input.value;
            toDo.style.display = 'inline-block';

            input.remove();

            /* Enabling the button again once the user is not editing it anymore */
            editButton?.classList.remove('icon-disabled');

            /* Update the value on the backend. @alert After the innerText update for better UI experience. */
            const content = await doFetch({ url: 'to-dos/', method: 'put', body: { sessionId, title, newTitle } });

            /* In case the user typed an already existing title. @alert Just redo the changes on the UI, no changes on the backend */
            if (!content.success) toDo.innerText = title;
    
            await refresh();
        } else { input.style.width = input.value.length + 1 + 'ch'; }
    }
    
    parent?.insertBefore(input, toDo.nextElementSibling);

    /* Select the input when the user clicks on the update icon */
    document.getElementById(title + '-update')?.focus();
}
export default update;