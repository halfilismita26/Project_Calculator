var operators = ["+", "-", "/", "*"];

var box = null;
var last_operation_history = null;
var operator = null;
var equal = null;
var dot = null;

var firstNum = true;

var numbers = [];
var operator_value;
var last_button;
var calc_operator;

var total;

function button_number(button) {

    operator = document.getElementsByClassName("operator");
    box = document.getElementById("box");
    last_operation_history = document.getElementById("last_operation_history");
    equal = document.getElementById("equal_sign").value;
    dot = document.getElementById("dot").value;
    
    last_button = button;

    // jika tombol bukan operator or = sign
    if (!operators.includes(button) && button!=equal){
        // jika itu adalah tombol pertama yang diklik
        if (firstNum){
            // dan itu adalah titik, tunjukkan 0.
            if (button == dot){
                box.innerText = "0"+dot;
            }
            // kosongkan box dan tunjukkan nomornya
            else {
                box.innerText = button;
            }
            firstNum = false;
        }
        else {

            // kembali jika nilai box adalah 0
            if (box.innerText.length == 1 && box.innerText == 0){

                if (button == dot){
                    box.innerText += button;
                }
                return;
            }
            // kembali jika box sudah memiliki titik dan tombol yang diklik adalah titik
            if (box.innerText.includes(dot) && button == dot){
                return;
            }
            // maksimal angka yang diperbolehkan yang dimasukkan adalah 20
            if (box.innerText.length == 20){
                return;
            }

            // jika ditekan titik dan box sudah ada tanda -, tunjukkan -0.
            if (button == dot && box.innerText == "-"){
                box.innerText = "-0"+dot;
            }
            // lain tambahkan nomor
            else {
                box.innerText += button;
            }  
        }
    }
    // jika itu adalah operator or = sign
    else {

        // kembali jika operator sudah ditekan
        if (operator_value != null && button == operator_value){
            return
        }

        // tunjukkan tanda minus jika itu adalah nilai pertama yang dipilih dan akhirnya kembali
        if (button == "-" && box.innerText == 0){
            box.innerText = button;
            firstNum = false;
            operator_value = button
            showSelectedOperator()
            return;
        }
        // kembali jika minus operator ditekan dan sudah tercetak di layar
        else if (operators.includes(button) && box.innerText == "-"){
            return
        }
        // kembali jika minus operator ditekan dan riwayat sudah memiliki tanda sama dengan
        else if (button == "-" && operator_value == "-" && last_operation_history.innerText.includes("=")){
            return
        }

        // atur nilai operator jika itu satu
        if (operators.includes(button)){
            if (typeof last_operator != "undefined" && last_operator != null){
                calc_operator = last_operator
            }
            else {
                calc_operator = button
            }
            if (button == "*"){
                last_operator = "×"
            }
            else if (button == "/"){
                last_operator = "÷"
            }
            else {
                last_operator = button
            }
            operator_value = button
            firstNum = true
            showSelectedOperator()
        }

        // tambahkan nomor pertama ke array angka dan tunjukkan di riwayat
        if (numbers.length == 0){
            numbers.push(box.innerText)
            if (typeof last_operator != "undefined" && last_operator != null){
                last_operation_history.innerText = box.innerText + " " + last_operator
            }
        }
        // sisa perhitungan
        else {   
            if (numbers.length == 1){
                numbers[1] = box.innerText
            }
            var temp_num = box.innerText

            // menghitung total
            if (button==equal && calc_operator != null){
                var total = calculate(numbers[0], numbers[1], calc_operator)
                box.innerText = total;

                // tambahkan nomor kedua ke history
                if (!last_operation_history.innerText.includes("=")){
                    last_operation_history.innerText += " " + numbers[1] + " ="
                }

                temp_num = numbers[0]

                numbers[0] = total
                operator_value = null
                showSelectedOperator()

                // ganti angka pertama dari history dengan nilai total
                var history_arr = last_operation_history.innerText.split(" ")
                history_arr[0] = temp_num
                last_operation_history.innerText = history_arr.join(" ")
            }
            // perbarui history dengan nilai di layar dan operator yang ditekan
            else if (calc_operator != null) {
                 last_operation_history.innerText = temp_num + " " + last_operator
                 calc_operator = button
                 numbers = []
                 numbers.push(box.innerText)
            }
        }
    }

}
 // sorot tombol operator saat dipilih
function showSelectedOperator(){

    var elements = document.getElementsByClassName("operator");

    for (var i=0; i<elements.length; i++){
        elements[i].style.backgroundColor  = "#472D2D";
    }

    if (operator_value == "+"){
        document.getElementById("plusOp").style.backgroundColor  = "#472D2D";
    }
    else if (operator_value == "-"){
        document.getElementById("subOp").style.backgroundColor  = "#472D2D";
    }
    else if (operator_value == "*"){
        document.getElementById("multiOp").style.backgroundColor  = "#472D2D";
    }
    else if (operator_value == "/"){
        document.getElementById("divOp").style.backgroundColor  = "#472D2D";
    }
}

// fungsi untuk menghitung hasil menggunakan dua angka dan satu operator
function calculate(num1, num2, operator){

    if (operator === "+"){
        total = (parseFloat)(num1)+(parseFloat)(num2)
    }
    else if (operator === "-"){
        total = (parseFloat)(num1)-(parseFloat)(num2)
    }
    else if (operator === "*"){
        total = (parseFloat)(num1)*(parseFloat)(num2)
    }
    else if (operator === "/"){
        total = (parseFloat)(num1)/(parseFloat)(num2)
    }
    else {
        if (total == box.innerText){
            return total
        }
        else {
            return box.innerText
        }
    }
    // jika total bukan bilangan bulat, tunjukkan maksimum 12 tempat desimal
    if (!Number.isInteger(total)){
        total = total.toPrecision(12);
    }
    return parseFloat(total);
}

// berfungsi untuk menghapus kotak dan mengatur ulang semuanya
function button_clear(){
    window.location.reload()
}

function backspace_remove(){

    box = document.getElementById("box");
    var elements = document.getElementsByClassName("operator");

    for (var i=0; i<elements.length; i++){
        elements[i].style.backgroundColor  = "#472D2D";
    }

    var last_num = box.innerText;
    last_num = last_num.slice(0, -1)
    
    box.innerText = last_num

    // tampilkan 0 nol jika semua karakter di layar dihapus
    if (box.innerText.length == 0){
        box.innerText = 0
        firstNum = true
    }

}


// berfungsi untuk mengubah tanda nomor yang ada di layar
function plus_minus(){
    box = document.getElementById("box");

    // jika ada operator yang sudah ditekan
    if (typeof last_operator != "undefined"){
        if (numbers.length>0){
            // jika tombol terakhir yang ditekan adalah operator
            if (operators.includes(last_button)){
                // if the displayed text is just a negative sign, replace it with a 0
                if (box.innerText == "-"){
                    box.innerText = 0
                    firstNum = true
                    return
                }
                // jika teks yang ditampilkan bukan hanya tanda negatif, ganti dengan tanda negatif
                else {
                    box.innerText = "-"
                    firstNum = false
                }
            }
            // jika tombol terakhir yang ditekan bukan operator, ubah tandanya
            else {
                box.innerText = -box.innerText

                if (numbers.length==1){
                    numbers[0] = box.innerText
                }
                else {
                    numbers[1] = box.innerText
                }
            }
        }
        return
    }

    // jika teks yang ditampilkan adalah 0, ganti dengan tanda negatif
    if (box.innerText == 0){
        box.innerText = "-"
        firstNum = false
        return
    }
    box.innerText = -box.innerText
}

// berfungsi untuk menghitung akar kuadrat dari angka yang saat ini ada di layar
function square_root(){
    box = document.getElementById("box");
    var square_num = Math.sqrt(box.innerText)
    box.innerText = square_num
    numbers.push(square_num)
}

// berfungsi untuk menghitung pembagian 1 dengan angka yang ada di layar
function division_one(){
    box = document.getElementById("box");
    var square_num = 1/box.innerText
    box.innerText = square_num
    numbers.push(square_num)
}

// berfungsi untuk menghitung kekuatan nomor yang saat ini ada di layar
function power_of(){
    box = document.getElementById("box");
    var square_num =Math.pow(box.innerText, 2)
    box.innerText = square_num
    numbers.push(square_num)
}

// berfungsi untuk menghitung persentase suatu bilangan
function calculate_percentage(){
    var elements = document.getElementsByClassName("operator");
    box = document.getElementById("box");

    if (numbers.length > 0 && typeof last_operator != "undefined"){
        if (last_operator == "+" || last_operator == "-"){
            box.innerText = numbers*box.innerText/100
        }
        else {
            box.innerText = box.innerText/100
        }
    }
    else {
        box.innerText = box.innerText/100
    }
    numbers = []
    numbers.push(box.innerText)

    // batalkan pilihan operator jika ada yang dipilih
    for (var i=0; i<elements.length; i++){
        elements[i].style.backgroundColor  = "#472D2D";
    }
}

// berfungsi untuk menghapus nomor terakhir yang diketik di layar
function clear_entry(){
    box = document.getElementById("box");

    if (numbers.length > 0 && typeof last_operator != "undefined"){
        box.innerText = 0
        var temp = numbers[0]
        numbers = []
        numbers.push(temp)
        firstNum = true;
    }
}

document.addEventListener('keydown', keyPressed);
document.addEventListener('keyup', keyReleased);

// berfungsi untuk menangkap peristiwa keydown
function keyPressed(e) {
    e.preventDefault()
    var equal = document.getElementById("equal_sign").value;
    var dot = document.getElementById("dot").value;

    if (e.key == "Delete"){
        button_clear();
        return;
    }

    var isNumber = isFinite(e.key);
    var enterPress;
    var dotPress;
    var commaPress = false;

    if (e.key == "Enter"){
        enterPress = equal;
    }
    if (e.key == "."){
        dotPress = dot;
    }
    if (e.key == ","){
        commaPress = true;
    }
    
    if (isNumber || operators.includes(e.key) || e.key == "Enter" || e.key == dotPress || 
        commaPress || e.key == "Backspace"){
        if (e.key == "Enter"){
            button_number(enterPress)
        }
        else if (e.key == "Backspace"){
            document.getElementById("backspace_btn").style.backgroundColor  = "#999999";
            backspace_remove()
        }
        else if (commaPress){
            button_number(dot)
        }
        else {
            button_number(e.key) 
        }   
    }
}

// berfungsi untuk menangkap acara key up
function keyReleased(e){
    e.preventDefault()
    // atur warna tombol backspace kembali ke aslinya
    if (e.key == "Backspace"){
        document.getElementById("backspace_btn").style.backgroundColor  = "#666666";
    }
}