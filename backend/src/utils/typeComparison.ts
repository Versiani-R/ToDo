const typeComparison = (object: any, type: string) => {
    if (Array.isArray(object)) {
        const types: any[] = [];

        for (const element of object) {
            if (typeof(element) === type) types.push(element);
            else return false;
        }
        return true;

    } else if (typeof(object) === 'string') return typeof(object) === type;
}

export { typeComparison };