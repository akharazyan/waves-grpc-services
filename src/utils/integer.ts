export const isInt = (num: number): num is number => num % 1 === 0;

export const int = (num: number): number => {
    if (!isInt(num)) {
        throw new TypeError(`${num} is not of an integer type`);
    }

    return num;
};

export const parseInteger = (str: string): number => int(parseInt(str, 10));
