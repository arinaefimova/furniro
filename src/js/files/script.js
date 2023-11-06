// Подключение функционала "Чертогов Фрилансера"
import { isMobile, removeClasses } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";


// IBG================================================================================
function ibg(){
	let ibg=document.querySelectorAll(".ibg");
for (var i = 0; i < ibg.length; i++) {
	if(ibg[i].querySelector('img')){
		ibg[i].style.backgroundImage = 'url('+ibg[i].querySelector('img').getAttribute('src')+')';
		}
	}
}

ibg();

// BURGER================================================================================
// $(document).ready(function() {
//   $('.menu__icon').click(function(event) {
//     $('.menu__icon,.menu__body').toggleClass('active');
//     $('body').toggleClass('lock');
//   });
// });


// let menu = document.querySelector(".menu__body");
// let menuIcon = document.querySelector(".icon-menu");

// menuIcon.addEventListener('click', burgerMenuOnOff);

// menu.addEventListener('click', (e) => {
//     if (!menu.classList.contains('active')) return;
//     if (e.target.nodeName == "A") {
//         burgerMenuOnOff();
//     }
// });

// function burgerMenuOnOff() {
//     menuIcon.classList.toggle('active');
//     menu.classList.toggle('active');
//     document.querySelector("body").classList.toggle('lock');
// }

$(document).ready(function() {
    $('.icon-menu').click(function(event) {
      $('.icon-menu,.menu__body').toggleClass('active');
      $('body').toggleClass('lock');
    });
  });



window.onload = function(){ //срабатывает когда весь контент на странице загружен
    document.addEventListener("click", documentActions);   //прослушиваем событие "клик" на всем документе
    // Actions
    function documentActions(e){
        const targetElement =e.target //получаем объект на который нажали
        if(window.innerWidth>768 && isMobile.any()){
            if(targetElement.classList.contains('menu__arrow')){
                targetElement.closest('.menu__item').classList.toggle('hover');  //звонок родителям Затем, метод classList.toggle добавляет класс "hover", если его нет, и удаляет его, если он уже существует. 
            }
            //закрытие при клике на любое место
            if(!targetElement.closest('.menu__item') && document.querySelectorAll('.menu__item.hover').length>0){  //мы тукнули в пространство а не на род класс  &&  есть что убирать 
                removeClasses(document.querySelectorAll('.menu__item.hover'), 'hover');
                
            }
        }
        if(targetElement.classList.contains('search-form__icon')){
            document.querySelector('.search-form').classList.toggle('active');// находим объект серч форм, обращаемся к списку классов и убираем или добавляем класс эктив
        }
        else if(!targetElement.closest('.search-form') && document.querySelectorAll('.search-form.active')){
            document.querySelector('.search-form').classList.remove('active');

        }
        //добавление в корзину
        if (targetElement.classList.contains('actions-product__button')) {
            e.preventDefault();
            const productId = targetElement.closest('.item-product').dataset.pid;// ПОЛУЧАЕМ ЗНАЧЕНИЕ АТРИБУТА, КОТОРЫЙ УКАЗАЛИ В HTML
            addToCart(targetElement,productId);//отправляем кнопку и id в функцию
             e.preventDefault();
        }

        
           
            
            
        }

   
    //HEADER, плавное появление шапки

    const headerElement = document.querySelector('.header');

    const callback = function(enteries,observer){
        if(enteries[0].isIntersecting){ //Эта проверка определяет, является ли первый элемент в массиве entries видимым пользователю (пересекается ли с окном просмотра).
            headerElement.classList.remove('_scroll');
        }
        else{
            headerElement.classList.add('_scroll');
        }
    }


    const headerObserver = new IntersectionObserver(callback);//Когда IntersectionObserver создан, он начинает наблюдать за целевым элементом и его состоянием пересечения с другими элементами или окном просмотра. Когда происходят изменения состояния пересечения, функция обратного вызова вызывается с массивом объектов IntersectionObserverEntry, содержащих информацию о каждом пересечении.
    headerObserver.observe(headerElement);// метод IntersectionObserver следит за хэдэром


    
//addToCart

    function addToCart(productButton, productId){
        if(!productButton.classList.contains('_hold')){// чтобы избежать множественных нажатий
            productButton.classList.add('_hold');
            productButton.classList.add('_fly');
            
        
            const cart = document.querySelector('.cart-header__icon');        
            const product =document.querySelector(`[data-pid="${productId}"]`);//содержит элемент с id
            const productImage = product.querySelector('.item-product__image');

            const productImageFly = productImage.cloneNode(true);//копирование изображения в переменную

            //получаем размеры и координаты картинки

            const productImageFlyWidth = productImage.offsetWidth;//присваиваем ширину оригинальной картинки
            const productImageFlyHeight = productImage.offsetHight;//присваиваем высоту оригинальной картинки
            const productImageFlyTop =productImage.getBoundingClientRect().top;//присваиваем позицию сверху оригинальной картинки
            const productImageFlyLeft = productImage.getBoundingClientRect().left; //присваиваем позицию слева оригинальной картинки

            productImageFly.setAttribute('class', '_flyImage ibg'); //меняем класс
            productImageFly.style.cssText =
            `
            left: ${productImageFlyLeft}px;
            top: ${productImageFlyTop}px;
            width:${productImageFlyWidth}px;
            height:${productImageFlyHeight}px;
            `
            ;

            document.body.append(productImageFly);//выводим функцию в боди

            const cartFlyLeft =cart.getBoundingClientRect().left;
            const cartFlyTop = cart.getBoundingClientRect().top;

            productImageFly.style.cssText=
            `
            left:${cartFlyLeft}px;
            top:${cartFlyTop}px;
            width:0px;
            hight:0px;
            opacity:0;
            `;
        }

        }

        //furniture gallery

        // const furniture = document.querySelector('.furniture__body');
        // let furnitureItems, furnitureColumn, speed, positionX, coordXpercentage;
    
        // if (furniture && !isMobile.any()) {
        //     furnitureItems = document.querySelector('.furniture__items');
        //     furnitureColumn = document.querySelectorAll('.furniture__column');
    
        //     // Speed of animation
        //     speed = furniture.dataset.speed;
    
        //      let positionX = 0;
        //      let coordXpercentage = 0;
    
        //      furniture.addEventListener("mousemove", function (e) {
        //         const furnitureWidth = furniture.offsetWidth;
    
        //         const coordX = e.pageX - furnitureWidth / 2;
    
        //         coordXpercentage  = coordX / furnitureWidth * 200;
    
        //         if (!furniture.classList.contains('_init')) {
        //             requestAnimationFrame(setMouseGalleryStyle);
        //             f.classList.add('_init');
        //         }
        //     });
        // }
    
        // function setMouseGalleryStyle() {
        //     let furnitureItemsWidth = 0;
        //     furnitureColumn.forEach(element => {
        //         furnitureItemsWidth += element.offsetWidth;
        //     });
    
        //     const furnitureDifferent = furnitureItemsWidth - furniture.offsetWidth;
        //     const distX = Math.floor(coordXpercentage - positionX);
    
        //     positionX = positionX + (distX * speed);
        //     let position = furnitureDifferent / 200 * positionX;
    
        //     furnitureItems.style.cssText = `transform: translate3d(${-position}px,0,0);`;
    
        //     if (Math.abs(distX) > 0) {
        //         requestAnimationFrame(setMouseGalleryStyle);
        //     } else {
        //         furniture.classList.remove('_init');
        //     }
        // }
        const furniture = document.querySelector('.furniture__body');
    let furnitureItems, furnitureColumn, speed, positionX, coordXpercentage;

    if (furniture && !isMobile.any()) {
        furnitureItems = document.querySelector('.furniture__items');
        furnitureColumn = document.querySelectorAll('.furniture__column');

        // Speed of animation
        speed = furniture.dataset.speed;

        let positionX = 0;
        let coordXpercentage = 0;

        furniture.addEventListener("mousemove", function (e) {
            const furnitureWidth = furniture.offsetWidth;

            const coordX = e.pageX - furnitureWidth / 2;

            coordXpercentage = coordX / furnitureWidth * 200;

            if (!furniture.classList.contains('_init')) {
                requestAnimationFrame(setMouseGalleryStyle);
                furniture.classList.add('_init');
            }
        });
    }

    function setMouseGalleryStyle() {
        let furnitureItemsWidth = furnitureItems.offsetWidth;

        const furnitureDifferent = furnitureItemsWidth - furniture.offsetWidth;
        const distX = Math.floor(coordXpercentage - positionX);

        positionX = positionX + (distX * speed);
        let position = furnitureDifferent / 200 * positionX;

        furnitureItems.style.cssText = `transform: translate3d(${-position}px,0,0);`;

        if (Math.abs(distX) > 0) {
            requestAnimationFrame(setMouseGalleryStyle);
        } else {
            furniture.classList.remove('_init');
        }
    }

        
}


const cart = document.querySelector('.cart');
const buttons = document.querySelectorAll('.actions-product__button');
let inner = parseInt(cart.innerHTML)
buttons.forEach(element => {
    element.addEventListener("click", function (e) {
        inner+=1;
        cart.innerHTML = inner;
    });
});
