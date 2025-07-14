const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const amountInput = document.querySelector("input");

for (let select of dropdowns) {
    for (let currCode in countryList) {
        let option = document.createElement("option");
        option.value = currCode;
        option.innerText = currCode;
        if (select.name === "from" && currCode === "USD") {
            option.selected = true;
        } else if (select.name === "to" && currCode === "INR") {
            option.selected = true;
        }
        select.append(option);
    }

    
    select.addEventListener("change", (e) => {
        updateFlag(e.target);
    });
}

function updateFlag(element) {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let img = element.parentElement.querySelector("img");
    img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}

const updateExchange=async()=>{
    let amount = amountInput.value;

    if (amount === "" || isNaN(amount)) {
        alert("Please enter a valid number");
        return;
    }

    const url = `https://api.currencyapi.com/v3/latest?apikey=cur_live_7BIGHinfRQ2ym9ToLrp70B3ZB1ULEilwQkRmCghi&currencies=${toCurr.value}&base_currency=${fromCurr.value}`;

    try {
        let res = await fetch(url);
        let data = await res.json();
        let rate = data.data[toCurr.value].value;
        let finalAmount = (rate * amount).toFixed(2);
        msg.innerText = `${amount} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    } catch (error) {
        msg.innerText = "Error fetching exchange rate.";
    }
}
btn.addEventListener("click", async (e) => {
    e.preventDefault();
    updateExchange();
});

const exchangeIcon = document.querySelector(".exchange-icon");

exchangeIcon.addEventListener("click", () => {
  
    let temp = fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = temp;

  
    updateFlag(fromCurr);
    updateFlag(toCurr);


    btn.click();
});

window.addEventListener("load",()=>{
    updateExchange();
})


