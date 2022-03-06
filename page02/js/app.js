import * as flsFunctions from "./modules/functions.js";

flsFunctions.isWebp();


//-- Swiper -------------------------------------------------------------------------

	//-- инициализация слайдера (нужно вызвать один раз на проект) ----------------------------------------------------------------
		import Swiper, { Navigation, Pagination, Scrollbar } from 'swiper';

		Swiper.use([Navigation, Pagination, Scrollbar]);
	//-- инициализация слайдера (нужно вызвать один раз на) ----------------------------------------------------------------

	//== сам код ========================================================================
		const headerSlider = new Swiper('.header__slider', {

			direction: 'horizontal',
			loop: true,
			spaceBetween: 20,
			slidesPerView: 1.2,
			centeredSlides: false,

			breakpoints: {
				// when window width is >= 320px
				575.98: {
					slidesPerView: 1.5,
				},
				
				991.98: {
				  slidesPerView: 2.5,
				},
			}	
		 
		});
	//== /сам код ========================================================================

	//-- комментарий ---------------------------------------------------------------------
		// перед этим убедиться, что выполнено npm install swiper 
		//--------------------------------------------------------------------------
		// еще возмлжно придется в файле стилей style.scss подключить пути, но это не точно
		// @import '../../node_modules/swiper/modules/navigation/navigation.min.css';
		// @import '../../node_modules/swiper/swiper-bundle.min';
	//-- /комментарий --------------------------------------------------------------------
//-- /Swiper -------------------------------------------------------------------------



// //-- page03-rout-slider -------------------------------------------------------------------------
const routSlider = new Swiper('.page03-rout__slider', {

	direction: 'horizontal',
	loop: true,
	spaceBetween: 20,
	centeredSlides: false,
	slidesPerView: 1,

	navigation: {
	  nextEl: '.carusel-body__next',
	  prevEl: '.carusel-body__prev',
	},

	scrollbar: {
		el: '.page03-rout__scrollbar',
	},

	// when window width is >= ...px
	breakpoints: {
		1600.98: {
			slidesPerView: 1.8,
		},

		1440.98: {
			slidesPerView: 1.6,
		},

		1199.98: {
			slidesPerView: 1.4,
		},

		991.98: {
			slidesPerView: 1.1,
		},

		767.98: {
			slidesPerView: 1.7,
			centeredSlides: true,

		},

		575.98: {
			slidesPerView: 1.3,
			centeredSlides: true,

		},

		320.98: {
			slidesPerView: 1,
			centeredSlides: true,

		},
	}	
});
// //-- /page03-rout-slider -------------------------------------------------------------------------




//-- popular-slider -------------------------------------------------------------------------
const popularSlider = new Swiper('.popular__slider', {

	direction: 'horizontal',
	loop: true,
	spaceBetween: 20,
	centeredSlides: false,

	navigation: {
	  nextEl: '.carusel-body__next',
	  prevEl: '.carusel-body__prev',
	},

	scrollbar: {
		el: '.swiper-scrollbar',
	},

	// when window width is >= ...px
	breakpoints: {
		1440.98: {
			slidesPerView: 3.3,
		},

		991.98: {
			slidesPerView: 2.3,
		},

		767.98: {
			slidesPerView: 1.5,
		},

		575.98: {
			slidesPerView: 1.3,
			centeredSlides: true,

		},

		320.98: {
			slidesPerView: 1,
			centeredSlides: true,
		},
	}	
});
//-- /popular-slider -------------------------------------------------------------------------



//-- feedback-slider -------------------------------------------------------------------------
const feedbackSlider = new Swiper('.feedback__slider', {

	direction: 'horizontal',
	loop: true,
	spaceBetween: 20,
	centeredSlides: false,
	slidesPerView: 1,

	navigation: {
	  nextEl: '.feedback__next',
	  prevEl: '.feedback__prev',
	},

	scrollbar: {
		el: '.swiper-scrollbar',
	},

	// when window width is >= ...px
	breakpoints: {
		1600.98: {
			slidesPerView: 1.9,
		},

		1440.98: {
			slidesPerView: 1.7,
		},

		1199.98: {
			slidesPerView: 1.5,
		},

		991.98: {
			slidesPerView: 1.3,
		},

		767.98: {
			slidesPerView: 1.1,
		},

		320.98: {
			slidesPerView: 1,
			centeredSlides: true,
		},
	}	
});
//-- /feedback-slider -------------------------------------------------------------------------



// -- Валидация формы ---------------------------------------------

document.addEventListener('DOMContentLoaded', function () {
	const form = document.getElementById('form');
	form.addEventListener('submit', formSend);

	async function formSend(e) {
		e.preventDefault();

		let error = formValidate(form);

		let formData = new FormData(form);
		formData.append('image', formImage.files[0]);

		if (error === 0) {
			form.classList.add('_sending');
			let response = await fetch('sendmail.php', {
				method: 'POST',
				body: formData
			});
			if (response.ok) {
				let result = await response.json();
				alert(result.message);
				formPreview.innerHTML = '';
				form.reset();
				form.classList.remove('_sending');
			} else {
				alert("Ошибка");
				form.classList.remove('_sending');
			}
		} else {
			alert('Заполните обязательные поля');
		}

	}


	function formValidate(form) {
		let error = 0;
		let formReq = document.querySelectorAll('._req');

		for (let index = 0; index < formReq.length; index++) {
			const input = formReq[index];
			formRemoveError(input);

			if (input.classList.contains('_email')) {
				if (emailTest(input)) {
					formAddError(input);
					error++;
				}
			} else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
				formAddError(input);
				error++;
			} else {
				if (input.value === '') {
					formAddError(input);
					error++;
				}
			}
		}
		return error;
	}
	function formAddError(input) {
		input.parentElement.classList.add('_error');
		input.classList.add('_error');
	}
	function formRemoveError(input) {
		input.parentElement.classList.remove('_error');
		input.classList.remove('_error');
	}
	//Функция теста email
	function emailTest(input) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	}

	//Получаем инпут file в переменную
	const formImage = document.getElementById('formImage');
	//Получаем див для превью в переменную
	const formPreview = document.getElementById('formPreview');

	//Слушаем изменения в инпуте file
	formImage.addEventListener('change', () => {
		uploadFile(formImage.files[0]);
	});

	function uploadFile(file) {
		// провераяем тип файла
		if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
			alert('Разрешены только изображения.');
			formImage.value = '';
			return;
		}
		// проверим размер файла (<2 Мб)
		if (file.size > 2 * 1024 * 1024) {
			alert('Файл должен быть менее 2 МБ.');
			return;
		}

		var reader = new FileReader();
		reader.onload = function (e) {
			formPreview.innerHTML = `<img src="${e.target.result}" alt="Фото">`;
		};
		reader.onerror = function (e) {
			alert('Ошибка');
		};
		reader.readAsDataURL(file);
	}
});
// -- /Валидация формы ---------------------------------------------




// -- fslightbox подключение через npm  ---------------------------------------------
// -- (сначала скачиваем пакетный модуль через терминал командой: npm install fslightbox )
import '../../node_modules/fslightbox/index.js'
// -- /fslightbox подключение через npm  ---------------------------------------------




//-- Меню бургер ---------------------------------------------------------------------
const iconMenu = document.querySelector('.menu__icon');
const menuList = document.querySelector('.menu__list');
if (iconMenu) {
	iconMenu.addEventListener("click", function (e) {
		document.body.classList.toggle('_lock');
		iconMenu.classList.toggle('_active');
		menuList.classList.toggle('_active');
	});
}
//-- /Меню бургер -------------------------------------------------------------------



// -- Прокрутка при клике ---------------------------------------------
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener("click", onMenuLinkClick);
	});

	function onMenuLinkClick(e) {
		const menuLink = e.target;
		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
			const gotoBlock = document.querySelector(menuLink.dataset.goto);
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - 100;

			if (iconMenu.classList.contains('_active')) {
				document.body.classList.remove('_lock');
				iconMenu.classList.remove('_active');
				menuBody.classList.remove('_active');
			}

			window.scrollTo({
				top: gotoBlockValue,
				behavior: "smooth"
			});
			e.preventDefault();
		}
	}
}
// -- /Прокрутка при клике ---------------------------------------------



// -- Прилипающая шапка ---------------------------------------------
import Headhesive from 'headhesive';

// Options
var options = {
	offset: 100,
}
 
// Create a ew instance of Headhesive
var header = new Headhesive('.header__top', options);
// -- /Прилипающая шапка ---------------------------------------------
 





//-- Scroll_animation ------------------------------------------------------
const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
	window.addEventListener('scroll', animOnScroll);
	function animOnScroll() {
		for (let index = 0; index < animItems.length; index++) {
			const animItem = animItems[index];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = offset(animItem).top;
			const animStart = 4;

			let animItemPoint = window.innerHeight - animItemHeight / animStart;
			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
				animItem.classList.add('_active');
			} else {
				if (!animItem.classList.contains('_anim-no-hide')) {
					animItem.classList.remove('_active');
				}
			}
		}
	}
	function offset(el) {
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
	}

	setTimeout(() => {
		animOnScroll();
	}, 300);
}
//-- /Scroll_animation ------------------------------------------------------



//-- tabs ------------------------------------------------------
const tabsBtn   = document.querySelectorAll(".tabs__nav-btn");
const tabsItems = document.querySelectorAll(".tabs__item");

tabsBtn.forEach(onTabClick);

function onTabClick(item) {
    item.addEventListener("click", function() {
        let currentBtn = item;
        let tabId = currentBtn.getAttribute("data-tab");
        let currentTab = document.querySelector(tabId);

        if( ! currentBtn.classList.contains('active') ) {
            tabsBtn.forEach(function(item) {
                item.classList.remove('active');
            });
    
            tabsItems.forEach(function(item) {
                item.classList.remove('active');
            });
    
            currentBtn.classList.add('active');
            currentTab.classList.add('active');
        }
    });
}

document.querySelector('.tabs__nav-btn').click();
//-- /tabs ------------------------------------------------------



// SPOLLERS --------------------------------------------------------------------------------------------------------------------------------------
"use strict"
// SPOLLERS
const spollersArray = document.querySelectorAll('[data-spollers]');
if (spollersArray.length > 0) {

   // Получение слойлеров с медиа запросами
   const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
      return item.dataset.spollers.split(",")[0];
   });

   // Инициализация слойлеров с медиа запросами
   if (spollersMedia.length > 0) {
      const breakpointsArray = [];
      spollersMedia.forEach(item => {
         const params = item.dataset.spollers;
         const breakpoint = {};
         const paramsArray = params.split(",");
         breakpoint.value = paramsArray[0];
         breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
         breakpoint.item = item;
         breakpointsArray.push(breakpoint);
      });

      // Получаем уникальные брейкпоинты
      let mediaQueries = breakpointsArray.map(function (item) {
         return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
      });
      mediaQueries = mediaQueries.filter(function (item, index, self) {
         return self.indexOf(item) === index;
      });

      // Работаем с каждым брейкпоинтом
      mediaQueries.forEach(breakpoint => {
         const paramsArray = breakpoint.split(",");
         const mediaBreakpoint = paramsArray[1];
         const mediaType = paramsArray[2];
         const matchMedia = window.matchMedia(paramsArray[0]);

         // Объекты с нужными условиями
         const spollersArray = breakpointsArray.filter(function (item) {
            if (item.value === mediaBreakpoint && item.type === mediaType) {
               return true;
            }
         });
         // Событие
         matchMedia.addListener(function () {
            initSpollers(spollersArray, matchMedia);
         });
         initSpollers(spollersArray, matchMedia);
      });
   }
   // Инициализация
   function initSpollers(spollersArray, matchMedia = false) {
      spollersArray.forEach(spollersBlock => {
         spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
         if (matchMedia.matches || !matchMedia) {
            spollersBlock.classList.add('_init');
            initSpollerBody(spollersBlock);
            spollersBlock.addEventListener("click", setSpollerAction);
         } else {
            spollersBlock.classList.remove('_init');
            initSpollerBody(spollersBlock, false);
            spollersBlock.removeEventListener("click", setSpollerAction);
         }
      });
   }
   // Работа с контентом
   function initSpollerBody(spollersBlock, hideSpollerBody = true) {
      const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
      if (spollerTitles.length > 0) {
         spollerTitles.forEach(spollerTitle => {
            if (hideSpollerBody) {
               spollerTitle.removeAttribute('tabindex');
               if (!spollerTitle.classList.contains('_active')) {
                  spollerTitle.nextElementSibling.hidden = true;
               }
            } else {
               spollerTitle.setAttribute('tabindex', '-1');
               spollerTitle.nextElementSibling.hidden = false;
            }
         });
      }
   }
   function setSpollerAction(e) {
      const el = e.target;
      if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
         const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
         const spollersBlock = spollerTitle.closest('[data-spollers]');
         const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
         if (!spollersBlock.querySelectorAll('._slide').length) {
            if (oneSpoller && !spollerTitle.classList.contains('_active')) {
               hideSpollersBody(spollersBlock);
            }
            spollerTitle.classList.toggle('_active');
            _slideToggle(spollerTitle.nextElementSibling, 500);
         }
         e.preventDefault();
      }
   }
   function hideSpollersBody(spollersBlock) {
      const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
      if (spollerActiveTitle) {
         spollerActiveTitle.classList.remove('_active');
         _slideUp(spollerActiveTitle.nextElementSibling, 500);
      }
   }
}
//========================================================================================================================================================
//SlideToggle
let _slideUp = (target, duration = 500) => {
   if (!target.classList.contains('_slide')) {
      target.classList.add('_slide');
      target.style.transitionProperty = 'height, margin, padding';
      target.style.transitionDuration = duration + 'ms';
      target.style.height = target.offsetHeight + 'px';
      target.offsetHeight;
      target.style.overflow = 'hidden';
      target.style.height = 0;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0;
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      window.setTimeout(() => {
         target.hidden = true;
         target.style.removeProperty('height');
         target.style.removeProperty('padding-top');
         target.style.removeProperty('padding-bottom');
         target.style.removeProperty('margin-top');
         target.style.removeProperty('margin-bottom');
         target.style.removeProperty('overflow');
         target.style.removeProperty('transition-duration');
         target.style.removeProperty('transition-property');
         target.classList.remove('_slide');
      }, duration);
   }
}
let _slideDown = (target, duration = 500) => {
   if (!target.classList.contains('_slide')) {
      target.classList.add('_slide');
      if (target.hidden) {
         target.hidden = false;
      }
      let height = target.offsetHeight;
      target.style.overflow = 'hidden';
      target.style.height = 0;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0;
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      target.offsetHeight;
      target.style.transitionProperty = "height, margin, padding";
      target.style.transitionDuration = duration + 'ms';
      target.style.height = height + 'px';
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      window.setTimeout(() => {
         target.style.removeProperty('height');
         target.style.removeProperty('overflow');
         target.style.removeProperty('transition-duration');
         target.style.removeProperty('transition-property');
         target.classList.remove('_slide');
      }, duration);
   }
}
let _slideToggle = (target, duration = 500) => {
   if (target.hidden) {
      return _slideDown(target, duration);
   } else {
      return _slideUp(target, duration);
   }
}
// SPOLLERS --------------------------------------------------------------------------------------------------------------------------------------




// range-slider --------------------------------------------------------------------------------------------------------------------------------------
import noUiSlider from 'nouislider';

const rangeSlider = document.getElementById('range-slider');

if (rangeSlider) {
	noUiSlider.create(rangeSlider, {
    start: [500, 999999],
		connect: true,
		step: 1,
    range: {
			'min': [500],
			'max': [999999]
    }
	});

	const input0 = document.getElementById('input-0');
	const input1 = document.getElementById('input-1');
	const inputs = [input0, input1];

	rangeSlider.noUiSlider.on('update', function(values, handle){
		inputs[handle].value = Math.round(values[handle]);
	});

	const setRangeSlider = (i, value) => {
		let arr = [null, null];
		arr[i] = value;

		console.log(arr);

		rangeSlider.noUiSlider.set(arr);
	};

	inputs.forEach((el, index) => {
		el.addEventListener('change', (e) => {
			console.log(index);
			setRangeSlider(index, e.currentTarget.value);
		});
	});
}
// /range-slider --------------------------------------------------------------------------------------------------------------------------------------



//-- proposals__like-btn ---------------------------------------------------------------------
const likeLink1 = document.querySelectorAll('.proposals__like-btn');
if (likeLink1.length > 0) {
	likeLink1.forEach(likeLink1 => {
		likeLink1.addEventListener("click", onLinkClick);
	});

	function onLinkClick(e) {
		const likeLink1 = e.target;

		if (likeLink1.classList.contains('_active')) {
			likeLink1.classList.remove('_active');
		}
		else{
			likeLink1.classList.add('_active');
		}
		e.preventDefault();
	}
}
//-- /proposals__like-btn ----------------------------------------------------------------



//-- offer__like-btn ---------------------------------------------------------------------
const likeLink2 = document.querySelectorAll('.offer__like-btn');
if (likeLink2.length > 0) {
	likeLink2.forEach(likeLink2 => {
		likeLink2.addEventListener("click", onLinkClick);
	});

	function onLinkClick(e) {
		const likeLink2 = e.target;

		if (likeLink2.classList.contains('_active')) {
			likeLink2.classList.remove('_active');
		}
		else{
			likeLink2.classList.add('_active');
		}
		e.preventDefault();
	}
}
//-- /offer__like-btn -------------------------------------------------------------------




