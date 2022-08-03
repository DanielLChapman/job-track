export const convertNum = (num) => {
    let t = num.toString();
    if (t.length < 3) {
        t = "$" + t
        return t;
    }
    let result = [];
    let count = 1;
    for (let i = t.length - 1; i >= 0; i--) {
        result.unshift(t[i]);
        
        if (count % 3 === 0 && i !== 0) {
            result.unshift(',')
        }
        count++;
    }

    result.unshift('$')

    return result.join('');

}