const getElementsById = (ids: string[]) => {
    const elements: HTMLElement[] = [];

    for (const id of ids) {
        const element = document.getElementById(id);

        /* @alert Might result in a bug, since it won't add an element if it didn't find it. */
        if (element) elements.push(element);
    }

    return elements;
}

const getElementsValueById = (ids: string[]) => {
    const [ ...elements ] = getElementsById(ids);

    const values: string[] = [];

    for (const element of elements) {
        const value = element.getAttribute('value');

        /* @alert Might result in a bug, since it won't add an element's value if it didn't find it. */
        if (value) values.push(value);
    }

    return values;
}

export { getElementsById, getElementsValueById };