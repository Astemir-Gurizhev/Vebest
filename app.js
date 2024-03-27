const productCards = document.querySelectorAll('.product-card')
const modal = document.querySelector('.modal')

productCards.forEach(el => {
    const counterDecrease = el.querySelector('.counter__decrease')
    const counterIncrease = el.querySelector('.counter__increase')
    const counterInput = el.querySelector('.counter__input')  

    counterDecrease.addEventListener('click', e => {
        if(counterInput.value > 1) {
            counterInput.value--
        }
        
    })
    counterIncrease.addEventListener('click', e => {
        counterInput.value++
    })


    const productCardBtns = el.querySelectorAll('.product-card__add-to-cart')
    productCardBtns.forEach(btn => {
        btn.addEventListener('click', () => {

            let xhr = new XMLHttpRequest()
            xhr.open('GET', window.location.href, true);
            
            xhr.onload = function() {
                if (xhr.status >= 200 && xhr.status < 400) {
                    let response = xhr.responseText;
                    modal.classList.add('active')

                    modal.innerHTML = el.innerHTML
                    console.log(el);
                    
                } else {
                    console.error('Ошибка: ' + xhr.status);
                }
            };

            xhr.onerror = function() {
                console.error('Ошибка сети');
            };

            xhr.send();

        })
    })

})





