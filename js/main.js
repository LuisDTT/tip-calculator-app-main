'use strict'
const btnReset = document.querySelector("#resetBtn");
const billInput = document.querySelector("#billInput");
const inputTipList = document.querySelectorAll('.user__tip-input');
const numPeople = document.querySelector("#numPeople");
const tipCustom = document.querySelector(".user__tip-input--custom");

billInput.addEventListener("keyup", ()=>{
    btnReset.classList.remove("response__btn-reset--active");
    if (numPeople.value > 0 &&
        tipCustom.value > 0 &&
        billInput.value > 0){
        calcValue(billInput.value, tipCustom.value, numPeople.value);
    } else if (numPeople.value > 0 &&
               numPeople.value > 0 &&
               document.getElementById("percentSelected")){
        let tipValue = document.getElementById("percentSelected");
        tipValue = Number(tipValue.value.slice(0,-1));
        calcValue(billInput.value, tipValue, numPeople.value);
    }

})

numPeople.addEventListener("keyup", ()=>{
    btnReset.classList.remove("response__btn-reset--active");
    const msgError = document.querySelector('.user__num-people-error');
    
    if (numPeople.value == ''){
        numPeople.classList.add('user__num-people-input--error');
        msgError.classList.add('user__num-people-error--active');
    } else {
        numPeople.classList.remove('user__num-people-input--error');
        msgError.classList.remove('user__num-people-error--active');
    }

    if (numPeople.value > 0 &&
        tipCustom.value > 0 &&
        billInput.value > 0){
        calcValue(billInput.value, tipCustom.value, numPeople.value);
    } else if (numPeople.value > 0 &&
               numPeople.value > 0 &&
               document.getElementById("percentSelected")){

        let tipValue = document.getElementById("percentSelected");
        tipValue = Number(tipValue.value.slice(0,-1));
        calcValue(billInput.value, tipValue, numPeople.value);
    }

})

inputTipList.forEach(element=>element.addEventListener("click",()=>{
    inputTipList.forEach(element=>element.classList.remove('user__tip-input--active'));
    inputTipList.forEach(element=>element.removeAttribute('id'));
    element.setAttribute('id','percentSelected');
    tipCustom.value = "";
    tipCustom.style.outline = "none"
    btnReset.classList.remove("response__btn-reset--active");
    element.classList.add('user__tip-input--active');

    let tipValue = Number(element.value.slice(0, -1));

    if (billInput.value > 0 && numPeople.value > 0) {
        calcValue(billInput.value, tipValue, numPeople.value);
    }

}))

tipCustom.addEventListener('keyup', ()=>{
    inputTipList.forEach(element=>element.classList.remove('user__tip-input--active'));
    tipCustom.style.outline = "2px solid hsl(172, 67%, 45%)"

    if (tipCustom.value > 0 &&
        billInput.value > 0 &&
        numPeople.value > 0){
            calcValue(billInput.value, tipCustom.value, numPeople.value);
        }
})

const reset = ()=>{
    btnReset.classList.add("response__btn-reset--active");
    billInput.value = "";
    inputTipList.forEach(element=>element.classList.remove('user__tip-input--active'));
    tipCustom.style.outline = "none"
    tipCustom.value = "";
    numPeople.value = "";
    document.querySelectorAll('.response__value').forEach(element=>element.textContent = '$0.00');
}

btnReset.addEventListener("click", reset);

const calcValue = (billValue, tipValue, numPeople)=>{

    let tipAmountPerson = billValue * (tipValue/100) / numPeople;

    let totalPerson =  billValue / numPeople + tipAmountPerson;

    document.querySelector('.response__value--tip-amount').textContent = `$${tipAmountPerson.toFixed(2)}`;
    document.querySelector('.response__value-total').textContent = `$${totalPerson.toFixed(2)}`;
    
}
