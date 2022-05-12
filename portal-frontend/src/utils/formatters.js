export const toPropperCase = (string) => (string || '').split(" ")
    .map((w) => w[0].toUpperCase() + w.substr(1).toLowerCase())
    .join(" ")

export const getVal = (val, alt) => val ? val : alt

export const formatCustomer = (customer) => {
    let { type, documento, name } = customer
    return `${name}${documento ? ' - ' + documento : ''}`
};

//TODO:
function formatDollar (num) {
    var p = num.toFixed(2).split(".");
    return "$" + p[0].split("").reverse().reduce(function (acc, num, i, orig) {
        return num == "-" ? acc : num + (i && !(i % 3) ? "," : "") + acc;
    }, "") + "." + p[1];
}