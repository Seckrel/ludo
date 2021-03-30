String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

let a = ["100", "101", "102", "103", "104", "105", "106", "107", "108", "109", "1010", "1011", "1012", "1013", "1014"]
a.forEach(i => {
    let x = i.replaceAt(1, "4")
    // let x = "1" + i
    console.log(`\"${x}\",`)
});