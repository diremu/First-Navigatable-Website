if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

const ready = ()  =>  {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i];
        button.addEventListener('click', removedCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i=0; i < quantityInputs.length; i++) {
        var input =quantityInputs[i]
        input.addEventListener('change', quantityChanged )
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-btn')
    for (var i=0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)

    } 
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

const purchaseClicked = () => {
    alert('Thank you for your purchase')
    var cartItems =document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
        updateCartTotal()
    }
    
}

const addToCartClicked = event => {
    var addedToCart = event.target
    var shopItem = addedToCart.parentElement.parentElement
    var title =  shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

const addItemToCart = (title, price, imageSrc) => {
    var cartRow = document.createElement('div')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    cartRow.classList.add('cart-row')
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i =0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-column cart-item">
            <img src="${imageSrc}" width="100" height="100" class="cart-item-image">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input type="number" value="2" class="cart-quantity-input">
            <button type="button" class="btn btn-danger ">REMOVE</button>
        </div>
        `
        cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removedCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

const removedCartItem = event => {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}

const quantityChanged =event => {
    var input = event.target
    if (isNaN(input.value) || input.value <=0 ) {
        input.value = 1;
    }
    updateCartTotal()
}


const updateCartTotal = () => {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0 
    for (var i=0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement =cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$',''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total *100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText ='$' + total
}