const productCards = document.querySelectorAll('.product-card');
const modalWindow = document.querySelector('.modal__window');
const modal = document.querySelector('.modal');
const modalCloser = document.querySelector('.modal__closer');

productCards.forEach(el => {
    
    const counterDecrease = el.querySelector('.counter__decrease');
    const counterIncrease = el.querySelector('.counter__increase');
    const counterInput = el.querySelector('.counter__input');

    counterDecrease.addEventListener('click', e => {
        if(counterInput.value > 1) {
            counterInput.value--;
        }
        e.stopPropagation();
    });
    
    counterIncrease.addEventListener('click', e => {
        counterInput.value++;
        e.stopPropagation(); 
    });


    const productCardBtns = el.querySelectorAll('.product-card__add-to-cart');

    productCardBtns.forEach(btn => {
        btn.addEventListener('click', () => {

            let xhr = new XMLHttpRequest();
            xhr.open('GET', window.location.href, true);
            
            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 400) {
                    let response = xhr.responseText;
                    modal.classList.add('active');

                    modalWindow.innerHTML = el.innerHTML;
                    
                    
                    
                    const modalCounterDecrease = modalWindow.querySelector('.counter__decrease');
                    const modalCounterIncrease = modalWindow.querySelector('.counter__increase');
                    console.log(modalCounterIncrease);
                    console.log(modalCounterDecrease);

                    modalCounterDecrease.addEventListener('click', e => {
                        const modalCounterInput = modalWindow.querySelector('.counter__input');
                        if (modalCounterInput.value > 1) {
                            modalCounterInput.value--;
                        }
                        e.stopPropagation(); 
                    });
                    
                    modalCounterIncrease.addEventListener('click', e => {
                        const modalCounterInput = modalWindow.querySelector('.counter__input');
                        modalCounterInput.value++;
                        e.stopPropagation(); 
                    });
                    
                } else {
                    console.error('Ошибка: ' + xhr.status);
                }
            };

            xhr.onerror = function() {
                console.error('Ошибка сети');
            };

            xhr.send();

        });
    });

});

window.addEventListener('click', e => {
    if (e.target != modal) {
        modal.classList.remove('active');
    }
});


modal.onclick = e => {
    e.stopPropagation();
};

modalCloser.onclick = e => {
    modal.classList.remove('active');
};