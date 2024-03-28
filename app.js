const productCards = document.querySelectorAll('.product-card');
const modalWindow = document.querySelector('.modal__window');
const modal = document.querySelector('.modal');
const modalCloser = document.querySelector('.modal__closer');


function attachCounterHandlers() {
    const modalCounterDecrease = modalWindow.querySelector('.counter__decrease');
    const modalCounterIncrease = modalWindow.querySelector('.counter__increase');
    const counterInput = modalWindow.querySelector('.counter__input');

    modalCounterDecrease.addEventListener('click', e => {
        if (counterInput.value > 1) {
            counterInput.value--;
        }
        e.stopPropagation(); 
    });

    modalCounterIncrease.addEventListener('click', e => {
        counterInput.value++;
        e.stopPropagation(); 
    });
}

productCards.forEach(el => {
    const productCardBtns = el.querySelectorAll('.product-card__add-to-cart');

    productCardBtns.forEach(btn => {
        btn.addEventListener('click', () => {

            let xhr = new XMLHttpRequest();
            xhr.open('GET', window.location.href, true);

            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 400) {
                    let response = xhr.responseText;
                    console.log('Ответ получен: ' + response);
                    modal.classList.add('active');

                    modalWindow.innerHTML = el.innerHTML;
                    console.log(el);

                    
                    attachCounterHandlers();

                } else {
                    console.error('Ошибка: ' + xhr.status);
                }
            };

            xhr.onerror = function () {
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