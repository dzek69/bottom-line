const cap = (value: number, upperLimit: number, lowerLimit?: number) => {
    if (lowerLimit == null) {
        return Math.min(value, upperLimit);
    }
    if (upperLimit < lowerLimit) {
        throw new TypeError("upperLimit must be greater than lowerLimit");
    }
    return Math.min(upperLimit, Math.max(lowerLimit, value));
};

export {
    cap,
};
