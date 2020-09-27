var cars = ["Saab", "Volvo", "BMW"];
var name = cars[0];

function carDemo() {
    document.write(cars);
}

function stringsdemo() {
    let fname = ""
    let lname = ""
    fname = document.getElementById("fname").value;
    lname = document.getElementById("lname").value;
    window.alert(fname + lname);
    console.log(fname);

}

function stringsdemo1() {
    let text = ""
    for (i = 0; i < 5; i++) {
        text += "The number is " + i + "<br>";
    }
    document.getElementById("demos").innerHTML = text;
}