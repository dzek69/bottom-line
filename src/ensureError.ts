const ensureError = (e: unknown) => {
    if (e instanceof Error) {
        return e;
    }
    return new Error("Expected error instance, got something else: " + String(e));
};

export {
    ensureError,
};
