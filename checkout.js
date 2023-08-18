let listCart = [];

function checkCart() {
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('listCart='));

    if (cookieValue) {
        listCart = JSON.parse(cookieValue.split('=')[1]);
    }
}
checkCart();

addCartToHTML();

function addCartToHTML() {
    const listCartHTML = document.querySelector('.returnCart .list');
    listCartHTML.innerHTML = '';

    const totalQuantityHTML = document.querySelector('.totalQuantity');
    const totalPriceHTML = document.querySelector('.totalPrice');
    let totalQuantity = 0;
    let totalPrice = 0;

    if (listCart) {
        listCart.forEach(product => {
            if (product) {
                const newCart = document.createElement('div');
                newCart.classList.add('item');
                newCart.innerHTML =
                    `<img src="${product.image}">
                    <div class="info">
                        <div class="name">${product.name}</div>
                        <div class="price">฿${product.price}/1 ชิ้น</div>
                    </div>
                    <div class="quantity">${product.quantity}</div>
                    <div class="returnPrice">฿${product.price * product.quantity}</div>`;
                listCartHTML.appendChild(newCart);

                totalQuantity += product.quantity;
                totalPrice += product.price * product.quantity;
            }
        });
    }

    if (totalPrice > 10000) {
        const discount = totalPrice * 0.1;
        totalPrice -= discount;
        totalPriceHTML.innerText = '฿' + totalPrice + ' (รวมส่วนลด 10%)';
    } else {
        totalPriceHTML.innerText = '฿' + totalPrice;
    }

    totalQuantityHTML.innerText = totalQuantity;
    
    const button = document.getElementById("alertButton");
    button.addEventListener("click", function () {
        alert("ขอบคุณสำหรับการสั่งซื้อ");
        resetPageAndNavigateHome(); 
        resetCookies();
    });
    function resetPageAndNavigateHome() {
        location.reload();
        listCart = [];
        window.location.href = "index.html"; 
    }
    function resetCookies() {      
        document.cookie = "listCart=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
}
