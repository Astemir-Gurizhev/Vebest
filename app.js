const productCards = document.querySelectorAll('.product-card');
const modal = document.querySelector('.modal');
const modalWindow = document.querySelector('.modal__window');
const modalCloser = document.querySelector('.modal__closer');

function setCounterValue(counterInput) {
    const storedValue = localStorage.getItem('counterValue');
    if (storedValue) {
        counterInput.value = storedValue;
    }
}

productCards.forEach(el => {
    
    const counterDecrease = el.querySelector('.counter__decrease');
    const counterIncrease = el.querySelector('.counter__increase');
    const counterInput = el.querySelector('.counter__input');

    setCounterValue(counterInput);

    counterDecrease.addEventListener('click', e => {
        if(counterInput.value > 1) {
            counterInput.value--;
            localStorage.setItem('counterValue', counterInput.value);
        }
        e.stopPropagation();
    });
    
    counterIncrease.addEventListener('click', e => {
        counterInput.value++;
        localStorage.setItem('counterValue', counterInput.value);
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
                    const modalCounterInput = modalWindow.querySelector('.counter__input');


                    setCounterValue(modalCounterInput);

                    modalCounterDecrease.addEventListener('click', e => {
                        if (modalCounterInput.value > 1) {
                            modalCounterInput.value--;
                            localStorage.setItem('counterValue', modalCounterInput.value);
                        }
                        e.stopPropagation(); 
                    });
                    
                    modalCounterIncrease.addEventListener('click', e => {
                        modalCounterInput.value++;
                        localStorage.setItem('counterValue', modalCounterInput.value);
                        e.stopPropagation(); 
                    });

                    const modalBtns = modalWindow.querySelectorAll('.product-card__add-to-cart');
                    modalBtns.forEach(modalBtn => {
                        modalBtn.innerHTML = 'Добавить в корзину'
                        modalBtn.addEventListener('click', e => {
                            modalCounterInput.value = 1
                            localStorage.setItem('counterValue', modalCounterInput.value);
                            alert('Товар добавлен в корзину')
                        })
                    })
                    
                } else {
                    console.error('Ошибка: ' + xhr.status);
                }
            };

            xhr.onerror = () => {
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

modalCloser.onclick = () => {
    modal.classList.remove('active');
};