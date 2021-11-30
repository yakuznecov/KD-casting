(function ($) {
	const setListener = (element, type, handler) => {
		if (!element) {
			return;
		}
		element.addEventListener(type, handler);
	};

	// Разворачивание колонки с заявками ----------------------------------------------------->

	const toggleRequest = document.querySelector('.request-js');
	const mainItemRequest = document.querySelector('.main__item');

	setListener(toggleRequest, 'click', () => {
		mainItemRequest.classList.toggle('--expand');
	});
	// ---------------------------------------------------------------------------------------->

	// Убрать overflow у блока, чтобы отобразить dropdown и вернуть обратно при клике на кнопку закрыть --------------------->

	const massActors = document.querySelector('.dropdown-text-js');
	const transferActorsCloseBtn = document.querySelector('.transfer-actors-close-btn');

	setListener(massActors, 'click', () => {
		mainItemsWrapper.style.overflow = 'inherit';
	});

	setListener(transferActorsCloseBtn, 'click', () => {
		mainItemsWrapper.style.overflow = 'overlay';
	});

	// ------------------------------------------------------------------------------------------------------------------------>

	// Смена плейсхолдера у инпута ------------------------------------------------------------>

	let isPlaceholderShort = false;
	const inputTopSearch = document.querySelector('.input-top-search-js');

	setListener(window, 'resize', () => {
		if (window.innerWidth < 1281) {
			if (!isPlaceholderShort) {
				hideFullPlaceholder();
			}
		} else {
			if (isPlaceholderShort) {
				showFullPlaceholder();
			}
		}
	});

	function hideFullPlaceholder() {
		inputTopSearch.placeholder = 'Актёры';
		isPlaceholderShort = true;
	}

	function showFullPlaceholder() {
		inputTopSearch.placeholder = 'Актёры в этом кастинге';
		isPlaceholderShort = false;
	}

	// --------------------------------------------------------------------------------------->

	// Трансформация кнопки ОТПРАВИТЬ ПРИГЛАШЕНИЕ ---------------------------------------------->

	let sendInvitationBtn = document.querySelector('.send-invitation-btn');
	let mainHeaderBottomLeft = document.querySelector('.main-header-bottom-left');
	let isTransform = false;

	let timeout;

	setListener(document, 'DOMContentLoaded', () => {
		let mainLeft = mainHeaderBottomLeft.offsetLeft + mainHeaderBottomLeft.offsetWidth + 56;
		let sendLeft = sendInvitationBtn.offsetLeft;
		console.log(mainLeft, sendLeft);

		if (sendLeft < mainLeft) {
			if (!isTransform) {
				transformBtn();
			}
		}

		if (sendLeft - mainLeft > 150) {
			if (isTransform) {
				cancelTransformBtn();
			}
		}
	});

	setListener(window, 'resize', () => {
		clearTimeout(timeout);
		timeout = setTimeout(function () {
			let mainLeft = mainHeaderBottomLeft.offsetLeft + mainHeaderBottomLeft.offsetWidth + 56;
			let sendLeft = sendInvitationBtn.offsetLeft;

			if (sendLeft < mainLeft) {
				if (!isTransform) {
					transformBtn();
				}
			}

			if (sendLeft - mainLeft > 160) {
				if (isTransform) {
					cancelTransformBtn();
				}
			}
		}, 80);
	});

	function transformBtn() {
		sendInvitationBtn.classList.add('active');
		isTransform = true;
	}

	function cancelTransformBtn() {
		sendInvitationBtn.classList.remove('active');
		isTransform = false;
	}

	// ------------------------------------------------------------------------------------>

	// Start: Range input slider in filter ---------------------------------------------------------------------------->
	var rangeOne = document.querySelector('input[name="rangeOne"]'),
		rangeTwo = document.querySelector('input[name="rangeTwo"]'),
		outputOne = document.querySelector('.outputOne'),
		outputTwo = document.querySelector('.outputTwo'),
		inclRange = document.querySelector('.incl-range'),
		updateView = function () {
			if (this.getAttribute('name') === 'rangeOne') {
				outputOne.innerHTML = this.value;
				outputOne.style.left = (this.value / this.getAttribute('max')) * (100 - 3.5) + '%';
			} else {
				outputTwo.style.left = (this.value / this.getAttribute('max')) * (100 - 3.5) + '%';
				outputTwo.innerHTML = this.value;
			}
			if (parseInt(rangeOne.value) > parseInt(rangeTwo.value)) {
				inclRange.style.width = ((rangeOne.value - rangeTwo.value) / this.getAttribute('max')) * 100 + '%';
				inclRange.style.left = (rangeTwo.value / this.getAttribute('max')) * 100 + '%';
			} else {
				inclRange.style.width = ((rangeTwo.value - rangeOne.value) / this.getAttribute('max')) * 100 + '%';
				inclRange.style.left = (rangeOne.value / this.getAttribute('max')) * 100 + '%';
			}
		};

	setListener(document, 'DOMContentLoaded', () => {
		updateView.call(rangeOne);
		updateView.call(rangeTwo);
		$('.double-range')
			.on('mouseup', function () {
				this.blur();
			})
			.on('mousedown input', function () {
				updateView.call(this);
			});
	});

	// End: Range input slider in filter ------------------------------------------------------------------------------->

	// Start: actor profile

	var tabs_menu = document.getElementsByClassName('tabs-menu');
	for (var k = 0; k < tabs_menu.length; k++) {
		tabs_menu[k].onclick = js_tabs;
	}
	function js_tabs() {
		var tab_id = this.getAttribute('data-target');
		var tabs_panel = document.getElementsByClassName('tabs-panel');

		for (var i = 0; i < tabs_panel.length; i++) {
			tabs_panel[i].style.display = 'none';
		}
		for (var j = 0; j < tabs_menu.length; j++) {
			tabs_menu[j].className = tabs_menu[j].className.replace(' tabs-menu-active', '');
		}
		this.className += ' tabs-menu-active';
		document.getElementById(tab_id).style.display = 'block';
		return false;
	}

	// End: actor profile

	// Start: Скрытие окна Массовое одобрение актеров --------------------------------------------->

	setListener(document.querySelector('.dropdown-transfer-actors'), 'mouseleave', (event) => {
		event.target.classList.remove('active');
	});
	// End: Скрытие окна Массовое одобрение актеров ----------------------------------------------->

	// Start: add/remove class active on hover -------------------------------------------------------------->

	function addActiveHover(parent, child) {
		$(parent)
			.mouseover(function () {
				$(child).addClass('active');
			})
			.mouseout(function () {
				$(child).removeClass('active');
			});
	}

	addActiveHover('.dropdown-blue-points', '.points-blue-btn-sidebar');
	addActiveHover('.dropdown-grey-points', '.points-grey-btn-header');
	addActiveHover('.question-menu,  .question-button', '.question-button');
	addActiveHover('.language-menu, .language-button', '.language-button');
	addActiveHover('.dropdown-request', '.request-btn');
	addActiveHover('.dropdown-approved', '.approved-btn');
	addActiveHover('.dropdown-mainRole', '.mainRole-dropdown-btn');
	addActiveHover('.main-header-top-filter', '.filter-dropdown-btn');
	addActiveHover('.sidebar-burger', '.burger-btn');
	addActiveHover('.sidebar-dropdown-question', '.sidebar-question-btn');
	addActiveHover('.sidebar-dropdown-calendar', '.sidebar-calendar-btn');
	addActiveHover('.actor__profile-nav-btn', '.points-grey-btn-profile');

	// End: add/remove class active on hover -------------------------------------------------------------->

	$('.filter-dropdown-input').click(function () {
		$(this).toggleClass('active');
	});

	$('.filter-dropdown-input .--profile-actor').click(function () {
		$(this).toggleClass('active');
	});

	// Start: двойное меню с переключением
	$(function () {
		$('ul.profile-menu-wrapper').on('click', 'li:not(.active)', function () {
			$(this).addClass('active').siblings().removeClass('active').closest('div.profile-menu__tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
		});
	});
	// End: двойное меню с переключением

	$('.castings-menu-agent, .promo-menu-actors, .castings-menu, .promo-menu').on('mouseover', function () {
		$(this).siblings().addClass('active');
	});

	$('.castings-menu-agent, .promo-menu-actors, .castings-menu, .promo-menu').on('mouseout', function () {
		$(this).siblings().removeClass('active');
	});

	$('.menu-header__info-item').click(function () {
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
	});

	$('.castings-menu-item.hasMenu').click(function () {
		$('.menu-header__info').addClass('active');
	});

	$('.menu-header__bottom-list .hasMenu').click(function () {
		$('.menu-header__info').addClass('active');
	});

	const burgerWrapper = $('.burger__menu-wrapper');
	const burgerMenuBtn = $('.burger__menu-btn');
	const menuHeader = $('.menu-header');

	burgerMenuBtn.on('click', (e) => {
		e.stopPropagation();
		burgerMenuBtn.toggleClass('burger__menu-btn_active');
		burgerWrapper.toggleClass('active');
		langMenuMobile.removeClass('active');
		questionMenuMobile.removeClass('active');
	});

	menuHeader.on('click', (e) => {
		if (e.target.closest('.burger__menu-wrapper')) return;
		burgerWrapper.removeClass('active');
	});

	const langMenuMobile = $('.language-menu-mobile');
	const languageBtnMobile = $('.language-btn-mobile');

	languageBtnMobile.on('click', (e) => {
		e.stopPropagation();
		langMenuMobile.toggleClass('active');
		questionMenuMobile.removeClass('active');
	});

	menuHeader.on('click', (e) => {
		if (e.target.closest('.language-menu-mobile')) return;
		langMenuMobile.removeClass('active');
	});

	const questionBtnMobile = $('.question-btn-mobile');
	const questionMenuMobile = $('.question-menu-mobile');

	questionBtnMobile.on('click', (e) => {
		e.stopPropagation();
		questionMenuMobile.toggleClass('active');
		langMenuMobile.removeClass('active');
	});

	menuHeader.on('click', (e) => {
		if (e.target.closest('.question-menu-mobile')) return;
		questionMenuMobile.removeClass('active');
	});

	$('.hidden-btn').click(function (e) {
		burgerMenuBtn.toggleClass('burger__menu-btn_active');
		e.stopPropagation();
		burgerWrapper.toggleClass('active');
		questionMenuMobile.removeClass('active');
		langMenuMobile.removeClass('active');
	});

	$('.dropdown-language').each(function () {
		$(this)
			.find('.language-options')
			.on('click', function () {
				$('.dropdown-language > .language-button span').html($(this).html());
			});
	});

	// Кнопка переключения страна-город

	var switchBtnLocRight = document.querySelector('.switch-button-case-loc.right');
	var switchBtnLocLeft = document.querySelector('.switch-button-case-loc.left');
	var activeSwitchLoc = document.querySelector('.switch-button-loc .active');

	function switchLocLeft() {
		switchBtnLocRight.classList.remove('active-case');
		switchBtnLocLeft.classList.add('active-case');
		activeSwitchLoc.style.left = '0%';
	}

	function switchLocRight() {
		switchBtnLocRight.classList.add('active-case');
		switchBtnLocLeft.classList.remove('active-case');
		activeSwitchLoc.style.left = '50%';
	}

	setListener(
		switchBtnLocLeft,
		'click',
		() => {
			switchLocLeft();
		},
		false
	);

	setListener(
		switchBtnLocRight,
		'click',
		() => {
			switchLocRight();
		},
		false
	);

	// Кнопка с переключением пола
	var switchBtnRight = document.querySelector('.switch-button-case.right');
	var switchBtnLeft = document.querySelector('.switch-button-case.left');
	var switchBtnMiddle = document.querySelector('.switch-button-case.middle');
	var activeSwitch = document.querySelector('.switch-button .active');

	function switchLeft() {
		switchBtnRight.classList.remove('active-case-gender');
		switchBtnMiddle.classList.remove('active-case-gender');
		switchBtnLeft.classList.add('active-case-gender');
		activeSwitch.style.left = '0%';
	}

	function switchRight() {
		switchBtnRight.classList.add('active-case-gender');
		switchBtnLeft.classList.remove('active-case-gender');
		switchBtnMiddle.classList.remove('active-case-gender');
		activeSwitch.style.left = '33.33333%';
	}

	function switchMiddle() {
		switchBtnMiddle.classList.add('active-case-gender');
		switchBtnLeft.classList.remove('active-case-gender');
		switchBtnRight.classList.remove('active-case-gender');
		activeSwitch.style.left = '67%';
	}

	setListener(
		switchBtnLeft,
		'click',
		() => {
			switchLeft();
		},
		false
	);

	setListener(
		switchBtnMiddle,
		'click',
		() => {
			switchMiddle();
		},
		false
	);

	setListener(
		switchBtnRight,
		'click',
		() => {
			switchRight();
		},
		false
	);

	// Скрытие сайдбара ------------------------------------------------------------------------------------------------->

	const sidebarBtnLeft = document.querySelector('.roll-up-btn-left');
	const sidebarBtnRight = document.querySelector('.roll-up-btn-right');
	const sidebar = document.querySelector('.sidebar');
	const sidebarTabs = document.querySelector('.sidebar-tabs-js');
	const sidebarHeaderTitle = document.querySelector('.sidebar-dropdown-header-title');
	const sidebarBurger = document.querySelector('.sidebar-burger');
	const sidebarPlus = document.querySelector('.sidebar-plus');
	const sidebarTopBtns = document.querySelector('.sidebar-top-btns');
	const sidebarLeftBtns = document.querySelector('.sidebar-left-btns');
	const mainItemsWrapper = document.querySelector('.main-items-wrapper');
	const wrapText = document.querySelector('.wrap-text');

	let isSidebarHidden = false;

	setListener(window, 'resize', () => {
		if (window.innerWidth < 1025) {
			if (!isSidebarHidden) {
				hideSidebar();
			}
		} else {
			if (isSidebarHidden) {
				showSidebar();
			}
		}
	});

	setListener(sidebarBtnLeft, 'click', hideSidebar);

	function hideSidebar() {
		mainItemsWrapper.classList.add('active');
		wrapText.classList.add('active');
		sidebarTabs.classList.toggle('done');
		sidebarHeaderTitle.classList.toggle('done');
		sidebarTopBtns.classList.remove('active');

		setTimeout(function () {
			sidebarBurger.classList.toggle('done');
			sidebarPlus.classList.toggle('done');
			sidebarLeftBtns.classList.add('active');
		}, 100);

		sidebar.classList.toggle('--rolled');

		sidebarBtnLeft.classList.toggle('active');
		sidebarBtnRight.classList.toggle('active');

		isSidebarHidden = true;
	}

	setListener(sidebarBtnRight, 'click', showSidebar);

	function showSidebar() {
		mainItemsWrapper.classList.remove('active');
		sidebarLeftBtns.classList.remove('active');
		sidebarBurger.classList.toggle('done');
		sidebarPlus.classList.toggle('done');

		setTimeout(function () {
			sidebarTopBtns.classList.add('active');
			wrapText.classList.remove('active');
		}, 280);

		setTimeout(function () {
			sidebarTabs.classList.toggle('done');
			sidebarHeaderTitle.classList.toggle('done');
		}, 280);

		sidebar.classList.toggle('--rolled');

		sidebarBtnLeft.classList.toggle('active');
		sidebarBtnRight.classList.toggle('active');

		isSidebarHidden = false;
	}

	// ---------------------------------------------------------------------------------------------------------------->

	// Start: add/remove border active focus

	function addActiveBorderFocus(parent, child) {
		$(parent)
			.focus(function () {
				$(child).addClass('active');
			})
			.focusout(function () {
				$(child).removeClass('active');
			});
	}

	addActiveBorderFocus('.main-header-top-search input', '.main-header-top-search');

	// End: add/remove border active focus

	$('.sidebar-burger__tabs-item-input').click(function () {
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
	});

	$('.sidebar__tabs-item-input').click(function () {
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
	});

	$('.dropdown-text-js').click(function () {
		$('.dropdown-transfer-actors').addClass('active');
	});

	$('.transfer-actors-close-btn').click(function () {
		$('.dropdown-transfer-actors').removeClass('active');
	});

	$('.main-header-top-search').click(function () {
		if (window.innerWidth < 1280) {
			$('.main-header-top-search').addClass('transform');
			$('.send-invitation-btn').addClass('active');
		}
	});

	// Start: Range input slider in transfer-actors

	var rangeTransferOne = document.querySelector('input[name="rangeTransferOne"]'),
		outputTransferOne = document.querySelector('.outputTransferOne'),
		transferinclRange = document.querySelector('.transfer-incl-range'),
		updateTransferView = function () {
			if (this.getAttribute('name') === 'rangeTransferOne') {
				outputTransferOne.innerHTML = this.value;
				outputTransferOne.style.left = (this.value / this.getAttribute('max')) * (100 - 3.5) + '%';
			}

			if (parseInt(rangeTransferOne.value)) {
				transferinclRange.style.width = (rangeTransferOne.value / this.getAttribute('max')) * 100 + '%';
			}
		};

	$(document).ready(function () {
		updateTransferView.call(rangeTransferOne);
		$('.rangeTransferOne')
			.on('mouseup', function () {
				this.blur();
			})
			.on('mousedown input', function () {
				updateTransferView.call(this);
			});
	});

	// End: Range input slider in transfer-actors

	// Start: Tabs Массовый перенос актёров
	(function () {
		var tabs_menu = document.getElementsByClassName('transfer-actors-tabs-menu');
		for (var k = 0; k < tabs_menu.length; k++) {
			tabs_menu[k].onclick = js_tabs;
		}
		function js_tabs() {
			var tab_data = this.getAttribute('data-target');
			var tabs_panel = document.getElementsByClassName('transfer-actors-tabs-panel');

			for (var i = 0; i < tabs_panel.length; i++) {
				tabs_panel[i].style.display = 'none';
			}
			for (var j = 0; j < tabs_menu.length; j++) {
				tabs_menu[j].className = tabs_menu[j].className.replace(' transfer-actors-active', '');
			}
			this.className += ' transfer-actors-active';
			document.getElementById(tab_data).style.display = 'block';
			return false;
		}
	})();

	// End: Tabs Массовый перенос актёров
})(jQuery);
