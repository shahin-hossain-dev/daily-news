const arr = [10, 30, 20, 40, 50, 5];

arr.sort((a, b) => {
    if (a > b) {
        return 1;
    }
    if (a < b) {
        return -1;
    }
    return 0;
})
console.log(arr);