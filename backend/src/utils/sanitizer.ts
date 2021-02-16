const sanitize = (object: any) => {

    if (Array.isArray(object)) {
        const sanitized: any[] = [];

        for (const element of object) {
            if (typeof(element) === 'string') sanitized.push(element.trim());
        }

        return sanitized;
    } else if (typeof(object) === 'string') return object.trim();
}

export { sanitize };