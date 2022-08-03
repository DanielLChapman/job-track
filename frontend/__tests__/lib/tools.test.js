import { convertNum } from "../../library/tools";

describe('format salary expectation to string', () => {
    it ('does nothing if the amount is under 1000', () => {
        expect(convertNum(1)).toEqual('$1');
        expect(convertNum(1000)).toEqual('$1,000');
        expect(convertNum(10)).toEqual('$10');
        expect(convertNum(100)).toEqual('$100');
    })
    it ('works with any amount', () => {
        expect(convertNum(1000000)).toEqual('$1,000,000');
        expect(convertNum(12345678)).toEqual('$12,345,678');
        expect(convertNum('1000')).toEqual('$1,000');
        expect(convertNum('1000000')).toEqual('$1,000,000');

    })
})