const capitalize = (text: string, restLowercase = false) => {
    const rest = restLowercase ? text.slice(1).toLowerCase() : text.slice(1);
    return text.charAt(0).toUpperCase() + rest;
};

export {
    capitalize,
};
