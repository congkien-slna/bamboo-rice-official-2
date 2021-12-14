// back tot top

let backToTopBtn = document.querySelector('.back-to-top')

window.onscroll = () => {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        backToTopBtn.style.display = 'flex'
    } else {
        backToTopBtn.style.display = 'none'
    }
}

// top nav menu

let menuItems = document.getElementsByClassName('menu-item')

Array.from(menuItems).forEach((item, index) => {
    item.onclick = (e) => {
        let currMenu = document.querySelector('.menu-item.active')
        currMenu.classList.remove('active')
        item.classList.add('active')
    }
})

// food category

let foodMenuList = document.querySelector('.food-item-wrap')

let foodCategory = document.querySelector('.food-category')

let categories = foodCategory.querySelectorAll('button')

Array.from(categories).forEach((item, index) => {
    item.onclick = (e) => {
        let currCat = foodCategory.querySelector('button.active')
        currCat.classList.remove('active')
        e.target.classList.add('active')
        foodMenuList.classList ='food-item-wrap '+ e.target.getAttribute('data-food-type')
    }
})

// on scroll animation

let scroll = window.requestAnimationFrame || function(callback) {window.setTimeout(callback, 1000/60)}

let elToShow = document.querySelectorAll('.play-on-scroll')

isElInViewPort = (el) => {
    let rect = el.getBoundingClientRect()

    return (
        (rect.top <= 0 && rect.bottom >= 0)
        ||
        (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) && rect.top <= (window.innerHeight || document.documentElement.clientHeight))
        ||
        (rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
    )
}

loop = () => {
    elToShow.forEach((item, index) => {
        if (isElInViewPort(item)) {
            item.classList.add('start')
        } else {
            item.classList.remove('start')
        }
    })

    scroll(loop)
}

loop()

// mobile nav

let bottomNavItems = document.querySelectorAll('.mb-nav-item')

let bottomMove = document.querySelector('.mb-move-item')

bottomNavItems.forEach((item, index) => {
    item.onclick = (e) => {
        let crrItem = document.querySelector('.mb-nav-item.active')
        crrItem.classList.remove('active')
        item.classList.add('active')
        bottomMove.style.left = index * 25 + '%'
    }
})

// payment
var cardDrop = document.getElementById('card-dropdown');
var activeDropdown;
cardDrop.addEventListener('click',function(){
    var node;
    console.log(this.childNodes.length)
    for (var i = 0; i < this.childNodes.length-1; i++)
    {
        node = this.childNodes[i];
        console.log(i)
        console.log(node)
    }
    if (node.className === 'dropdown-select') {
        node.classList.add('visible');
        activeDropdown = node;
    };
})

window.onclick = function(e) {
    if (e.target.tagName === 'LI' && activeDropdown){
        if (e.target.innerHTML === 'Zalo Pay') {
            document.getElementById('credit-card-image').src = 'assets/qr-zalopay.png';
            activeDropdown.classList.remove('visible');
            activeDropdown = null;
            e.target.innerHTML = document.getElementById('current-card').innerHTML;
            document.getElementById('current-card').innerHTML = 'Zalo Pay';
        }
        else if (e.target.innerHTML === 'Momo') {
            document.getElementById('credit-card-image').src = 'assets/qr-momo.png';
            activeDropdown.classList.remove('visible');
            activeDropdown = null;
            e.target.innerHTML = document.getElementById('current-card').innerHTML;
            document.getElementById('current-card').innerHTML = 'Momo';
        }
    }
    else if (e.target.className !== 'dropdown-btn' && activeDropdown) {
        activeDropdown.classList.remove('visible');
        activeDropdown = null;
    }
}

function getLocalStorageItem(localStorageItem) {
    let localStorageValue;
    if (localStorageItem) {
        localStorageValue = localStorage.getItem(localStorageItem);
    } else {
        localStorageValue = '';
    }
    document.getElementById(localStorageItem).value = localStorageValue;
}

function onOrder(){
    let name = document.getElementById('nameInput').value;
    localStorage.setItem('nameInput', name);
    let address = document.getElementById('addressInput').value;
    localStorage.setItem('addressInput', address);
    let phoneNumber = document.getElementById('phoneNumberInput').value;
    localStorage.setItem('phoneNumberInput', phoneNumber);

    alert('Nếu bạn đã chuyển khoản, vui lòng chờ trong 5 đến 10 phút để hệ thống kiểm tra và hoàn tất giao dịch.');

    orderData = '';
    var cartArray = shoppingCart.listCart();
    for(var i in cartArray) {
        orderData += cartArray[i].name + ' : ' + cartArray[i].count + '   ';
    }
    Email.send({
        Host : "smtp.google.com",
        Username : "uatb0426@gmail.com",
        Password : "gotadi2021",
        To : 'hai.winpack.com@gmail.com',
        From : "uatb0426@gmail.com",
        Subject : "Đơn hàng",
        Body : "Khách hàng : " + name + ' - ' + address + ' - ' + phoneNumber + '   ---   ' + orderData
    }).then(
    );
}


getLocalStorageItem('nameInput');
getLocalStorageItem('addressInput');
getLocalStorageItem('phoneNumberInput');

// Shopping Cart API
// ************************************************

var shoppingCart = (function() {
    // =============================
    // Private methods and propeties
    // =============================
    cart = [];

    // Constructor
    function Item(name, price, count) {
        this.name = name;
        this.price = price;
        this.count = count;
    }

    // =============================
    // Public methods and propeties
    // =============================
    var obj = {};

    // Add to cart
    obj.addItemToCart = function(name, price, count) {
        for(var item in cart) {
            if(cart[item].name === name) {
                cart[item].count ++;
                $('.' + cart[item].name).html(cart[item].count.toString());
                return;
            }
        }
        var item = new Item(name, price, count);
        $('.' + item.name).html(item.count.toString());
        cart.push(item);
    }

    // Remove item from cart
    obj.removeItemFromCart = function(name) {
        for(var item in cart) {
            if(cart[item].name === name) {
                cart[item].count --;
                $('.' + cart[item].name).html(cart[item].count.toString());
                if(cart[item].count === 0) {
                    cart.splice(item, 1);
                }
                break;
            }
        }
    }

    // Count cart
    obj.totalCount = function() {
        var totalCount = 0;
        for(var item in cart) {
            totalCount += cart[item].count;
        }
        return totalCount;
    }

    // Total cart
    obj.totalCart = function() {
        var totalCart = 0;
        for(var item in cart) {
            totalCart += cart[item].price * cart[item].count;
        }
        return Number(totalCart.toFixed(2));
    }

    // List cart
    obj.listCart = function() {
        var cartCopy = [];
        for(i in cart) {
            item = cart[i];
            itemCopy = {};
            for(p in item) {
                itemCopy[p] = item[p];
            }
            itemCopy.total = Number(item.price * item.count).toFixed(2);
            cartCopy.push(itemCopy)
        }
        return cartCopy;
    }

    // cart : Array
    // Item : Object/Class
    // addItemToCart : Function
    // removeItemFromCart : Function
    // removeItemFromCartAll : Function
    // countCart : Function
    // totalCart : Function
    // listCart : Function
    // saveCart : Function
    // loadCart : Function
    return obj;
})();


// *****************************************
// Triggers / Events
// *****************************************
// Add item
$('.add-to-cart').click(function(event) {
    event.preventDefault();
    var name = $(this).data('name');
    var price = Number($(this).data('price'));
    shoppingCart.addItemToCart(name, price, 1);
    displayCart();
});

function displayCart() {
    var cartArray = shoppingCart.listCart();
    var output = "";
    for(var i in cartArray) {
        var imgSrc = "assets/" + cartArray[i].name + ".jpg";
        output += "<tr>"
            + "<td><img src='"+imgSrc+"'></td>"
            + "<td class='count'>Số lượng</td>"
            + "<td><button class='minus-item' data-name=" + cartArray[i].name + ">-</button></td>"
            + "<td class='number-item'>"+ cartArray[i].count +"</td>"
            + "<td><button class='plus-item' data-name=" + cartArray[i].name + ">+</button></td>"
            +  "</tr>";
    }
    $('.show-cart').html(output);
    $('.total-cart').html(shoppingCart.totalCart()  + ".000 VNĐ");
    $('.total-count').html(shoppingCart.totalCount());
}


// -1
$('.show-cart').on("click", ".minus-item", function(event) {
    var name = $(this).data('name')
    shoppingCart.removeItemFromCart(name);
    displayCart();
})
// +1
$('.show-cart').on("click", ".plus-item", function(event) {
    var name = $(this).data('name')
    shoppingCart.addItemToCart(name);
    displayCart();
})


displayCart();


