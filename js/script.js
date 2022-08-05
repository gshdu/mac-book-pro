function addBtnClass(btnId){
    document.getElementById(btnId).classList.add('bg-stone-800');
    document.getElementById(btnId).classList.add('text-white');
}
function removeBtnClass(btnId){
    document.getElementById(btnId).classList.remove('bg-stone-800');
    document.getElementById(btnId).classList.remove('text-white');
}

function priceCondition(extraPartText, extraPrice, addNum, subNum, updatePrice){
    const totalPriceText = document.getElementById('total-price');
    if(extraPartText.innerText == extraPrice){
        let totalPriceNum = parseInt(totalPriceText.innerText);
        totalPriceNum = totalPriceNum - subNum + addNum;
        totalPriceText.innerText = totalPriceNum;
        extraPartText.innerText = updatePrice;
        bottomCostUpdate(totalPriceNum);
    }
}

function calculatePrice(optionQtn, partName, extraPrice, extraPrice2, updatePrice, addNum, addNum2, subNum, subNum2){
    const extraPartText = document.getElementById('extra-' + partName + '-cost');

    if(optionQtn <= 2){
        priceCondition(extraPartText, extraPrice, addNum, subNum, updatePrice);
    }
    if(optionQtn > 2){
        if(extraPartText.innerText == extraPrice){
            priceCondition(extraPartText, extraPrice, addNum, subNum, updatePrice);
        }
        else if(extraPartText.innerText == extraPrice2){
            priceCondition(extraPartText, extraPrice2, addNum2, subNum2, updatePrice);
        }
    }
}

function bottomCostUpdate(totalPrice){
    const bottomTotalCost = document.getElementById('bottom-total-cost');
    bottomTotalCost.innerText = totalPrice;
}

// memory options //

// default memory btn
document.getElementById('memory-default-btn').addEventListener('click', function(){
    addBtnClass('memory-default-btn');
    removeBtnClass('extra-memory-btn');

    calculatePrice(2, 'memory', '180', '0', '0', 0, 0, 180, 0);
});

// extra memory btn
document.getElementById('extra-memory-btn').addEventListener('click', function(){
    addBtnClass('extra-memory-btn');
    removeBtnClass('memory-default-btn');

    calculatePrice(2, 'memory', '0', '0', '180', 180, 0, 0, 0);
});

// storage options //

// default storage btn
document.getElementById('storage-default-btn').addEventListener('click', function(){
    addBtnClass('storage-default-btn');
    removeBtnClass('extra-storage-512-btn');
    removeBtnClass('extra-storage-1tb-btn');

    calculatePrice(3, 'storage', '100', '180', '0', 0, 0, 100, 180);
});

// extra storage 512GB btn
document.getElementById('extra-storage-512-btn').addEventListener('click', function(){
    addBtnClass('extra-storage-512-btn');
    removeBtnClass('storage-default-btn');
    removeBtnClass('extra-storage-1tb-btn');

    calculatePrice(3, 'storage', '0', '180', '100', 100, 100, 0, 180);
});

// extra storage 1TB btn
document.getElementById('extra-storage-1tb-btn').addEventListener('click', function(){
    addBtnClass('extra-storage-1tb-btn');
    removeBtnClass('storage-default-btn');
    removeBtnClass('extra-storage-512-btn');

    calculatePrice(3, 'storage', '0', '100', '180', 180, 180, 0, 100);
});

// delivery options //

// default delivery btn
document.getElementById('delivery-default-btn').addEventListener('click', function(){
    addBtnClass('delivery-default-btn');
    removeBtnClass('early-delivery-btn');

    calculatePrice(2, 'delivery', '20', '0', '0', 0, 0, 20, 0);
});

// early delivey btn
document.getElementById('early-delivery-btn').addEventListener('click', function(){
    addBtnClass('early-delivery-btn');
    removeBtnClass('delivery-default-btn');

    calculatePrice(2, 'delivery', '0', '0', '20', 20, 0, 0, 0);
});

// add promo code //

//for promo code alert message
function promoAlertText(promoMsg, promoMsgColor, event, promoField, clearValue){
    if(event.target.parentNode.children.length > 3){
        event.target.parentNode.children[3].remove();
    }
    const promoDiv = document.getElementById('promo-code');
    const appliedMsg = document.createElement('p');
    appliedMsg.setAttribute('id', 'alert-text');
    const appliedMsgId = document.getElementById('alert-text');
    appliedMsg.innerText = promoMsg;
    appliedMsg.classList.add('text-xs');
    appliedMsg.classList.add('text-' + promoMsgColor + '-600');
    promoDiv.appendChild(appliedMsg);
    document.getElementById('bottom-total-div').classList.add('-mt-4');

    if(clearValue == true){
        promoField.value = '';
    }
}

document.getElementById('apply-promo-btn').addEventListener('click', function(event){
    const promoField = document.getElementById('promocode-field');
    const totalPriceText = document.getElementById('total-price');
    const bottomTotalCost = document.getElementById('bottom-total-cost');

    if(promoField.value.toLowerCase() == 'stevekaku' && bottomTotalCost.innerText == totalPriceText.innerText){
        promoAlertText('20% discount applied', 'green', event, promoField, true);
        const discountedTotal = parseInt(bottomTotalCost.innerText) - (parseInt(bottomTotalCost.innerText) * 0.2);
        bottomTotalCost.innerText = discountedTotal;
    }
    else if(bottomTotalCost.innerText != totalPriceText.innerText){
        promoAlertText('Promo code applied already', 'red', event, promoField, true);
    }
    else if(promoField.value == ''){
        promoAlertText('Please enter a promo code', 'red', event, promoField, false);
    }
    else{
        promoAlertText('Invalid promo code', 'red', event, promoField, true);
    }
});