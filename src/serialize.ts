import { sortProps } from "./sortProps.js";

type CustomSerializers = {
    [key: string]: (data: unknown) => (string | null);
    s?: never;
    n?: never;
    u?: never;
    l?: never;
    b?: never;
    i?: never;
};

type Options = {
    sortProps?: boolean;
};

/**
 * Serializes the data into a string. Think of it as a JSON.stringify on steroids.
 * In opposite to JSON.stringify it supports serializing undefined.
 *
 * It also supports custom serializers, which can be used to serialize custom data types. Each value has a prefix which
 * specifies the type of the value, custom serializers is a map of these prefixes to functions which can serialize the
 * value into a string. IMPORTANT: Because this is using JSON.serialize under the hood if a value to serialize includes
 * `toJSON` it won't trigger custom serializer but will be serialized as string. `Date` class defines `toJSON` method!
 *
 * The extra aim of this function is to produce the same output for "the same" data, regardless of the order of the keys
 * (which is not guaranteed by JS spec, but in practice it is guaranteed by current implementations of all JS engines),
 * so it sorts the keys and when serializing data by default, you can opt-out of this behavior by passing
 * `{ sortProps: false }` as the third argument.
 *
 * @param data - the data to serialize
 * @param customSerializers - an object with custom serializers
 * @param options - options
 */
const serialize = (data: unknown, customSerializers?: CustomSerializers, options?: Options) => { // eslint-disable-line max-lines-per-function,max-len
    const replacer = (_key: string, value: unknown) => { // eslint-disable-line max-statements
        if (typeof value === "string") {
            return `s:${value}`;
        }
        if (typeof value === "number") {
            return `n:${value}`;
        }
        if (typeof value === "bigint") {
            return `i:${value}`;
        }
        if (typeof value === "undefined") {
            return "u:";
        }
        if (typeof value === "boolean") {
            return "b:" + (value ? "1" : "");
        }
        if (value === null) {
            return "l:";
        }
        const serializerKeys = Object.keys(customSerializers ?? {});
        for (const key of serializerKeys) {
            const serialized = customSerializers![key]!(value);
            if (typeof serialized === "string") {
                return `${key}:${serialized}`;
            }
        }
        if (typeof value === "object") {
            return value;
        }

        throw new Error(`Unsupported data type: ${typeof value}`);
    };

    if (
        data == null
        || typeof data === "string"
        || typeof data === "number"
        || typeof data === "bigint"
        || typeof data === "undefined"
        || typeof data === "boolean"
        || Array.isArray(data)
    ) {
        return JSON.stringify(data, replacer);
    }

    const serializerKeysGlobal = Object.keys(customSerializers ?? {});
    for (const key of serializerKeysGlobal) {
        const serialized = customSerializers![key]!(data);
        if (typeof serialized === "string") {
            return `"${key}:${serialized}"`;
        }
    }

    if (typeof data === "object") {
        return JSON.stringify(
            options?.sortProps === false
                ? data
                : sortProps(data as Record<string, unknown>),
            replacer,
        );
    }

    throw new Error(`Unsupported data type: ${typeof data}`);
};

export type { CustomSerializers };
export { serialize };
