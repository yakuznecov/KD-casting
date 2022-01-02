(function ($) {
	function showDropdownSelect() {
		const area = $('.dropdown-select');

		$('.dropdown-select-btn').click(function () {
			$(this).siblings('.dropdown-select-menu').toggleClass('menu-active');
			$(this).parent().toggleClass('dropdown-select_active');
		});

		$(document).click(function (e) {
			if (!area.is(e.target) && area.has(e.target).length === 0) {
				$('.dropdown-select-menu').removeClass('menu-active');
				area.removeClass('dropdown-select_active');
			}
		});
	}

	showDropdownSelect();

	function openSpoiler() {
		$('.spoiler-item-header').click(function () {
			$(this).next('.spoiler-item-body').slideToggle();
			$(this).parent().toggleClass('active');
		});
	}

	openSpoiler();

	const setListener = (element, type, handler) => {
		if (!element) {
			return;
		}
		element.addEventListener(type, handler);
	};

	// Создание новой роли
	function createNewObject() {
		$('.dropdown-select-menu-item.--create').click(function () {
			$(this).addClass('--hide-js');
			$('.create-new-object').addClass('--active');
		});

		$('.new-role-btn-close-js').click(function () {
			$('.create-new-object').removeClass('--active');
			$('.dropdown-select-menu-item.--create').removeClass('--hide-js');
		});
	}

	createNewObject();

	// Start: custom select dropdown
	function showDropSelect() {
		const dropdown = $('.dropdown-sum-select');
		const items = dropdown.find('li');

		$('.dropdown-sum-select').click(function () {
			$(this).toggleClass('active');
		});

		items.mousedown(function () {
			let container = $(this).parents('.dropdown-sum-select');
			let input = container.find('input');
			let inner = container.find('.dropdown-sum-select-inner');

			inner.html($(this).html());
			container.toggleClass('active');
			input.attr('value', $(this).attr('data-option'));

			$('.dropdown-flag-btn-icon').css({ transition: 'transform 0.2s', transform: 'rotate("180"deg)' });
		});

		$(document).mousedown(function (e) {
			let dropdowns = $('.dropdown-sum-select');

			if (!dropdowns.is(e.target) && dropdowns.has(e.target).length === 0) {
				dropdowns.removeClass('active');
			}
		});
	}

	showDropSelect();

	// End: custom select dropdown

	// Start: Tabs
	$('.tabs-wrapper').each(function () {
		let thisEl = $(this);
		thisEl.find('.tab-item').not(':first').hide();
		thisEl
			.find('.tab')
			.click(function () {
				thisEl.find('.tab').removeClass('active').eq($(this).index()).addClass('active');
				thisEl.find('.tab-item').hide().eq($(this).index()).fadeIn();
			})
			.eq(0)
			.addClass('active');
	});

	// End: Tabs

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

	// setListener(window, 'resize', () => {
	// 	if (window.innerWidth < 1281) {
	// 		if (!isPlaceholderShort) {
	// 			hideFullPlaceholder();
	// 		}
	// 	} else {
	// 		if (isPlaceholderShort) {
	// 			showFullPlaceholder();
	// 		}
	// 	}
	// });

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
	let sendInvitationBtnTextJs = document.querySelector('.send-invitation-btn-text-js');
	let mainHeaderTopSearch = document.querySelector('.main-header-top-search');
	let hideMediaStatus = document.querySelector('.hide-media-status');
	let statusCounterInner = document.querySelector('.status-counter-inner');
	let statusDefault = document.querySelector('.status-default');

	let isTransform = false;

	let timeout;

	setListener(document, 'DOMContentLoaded', () => {
		let mainLeft = mainHeaderBottomLeft.offsetLeft + mainHeaderBottomLeft.offsetWidth + 56;
		let sendLeft = sendInvitationBtn.offsetLeft;
		let statusleft = statusDefault.offsetLeft;

		if (sendLeft < mainLeft) {
			if (!isTransform) {
				lowerSearch();
				hideFullPlaceholder();
			}
		}

		if (mainLeft - sendLeft > 10) {
			if (mainHeaderTopSearch.classList.contains('lower')) {
				if (isTransform) {
					transformBtn();
				}
			}
		}

		if (statusleft - sendLeft > 10) {
			if (mainHeaderTopSearch.classList.contains('lower') || sendInvitationBtn.classList.contains('active')) {
				if (isTransform) {
					hideStatus();
				}
			}
		}

		if (sendLeft - mainLeft > 150) {
			if (isTransform) {
				maxSearch();
				showFullPlaceholder();
			}
		}
	});

	setListener(window, 'resize', () => {
		clearTimeout(timeout);
		timeout = setTimeout(function () {
			let mainLeft = mainHeaderBottomLeft.offsetLeft + mainHeaderBottomLeft.offsetWidth + 56;
			let sendLeft = sendInvitationBtn.offsetLeft;
			let statusleft = statusDefault.offsetLeft + 287;

			console.log(sendLeft, statusleft);

			if (sendLeft < mainLeft) {
				if (!isTransform) {
					lowerSearch();
					hideFullPlaceholder();
				}
			}

			if (mainLeft - sendLeft > 10) {
				if (mainHeaderTopSearch.classList.contains('lower')) {
					if (isTransform) {
						transformBtn();
					}
				}
			}

			if (statusleft - sendLeft > 10) {
				if (mainHeaderTopSearch.classList.contains('lower') || sendInvitationBtn.classList.contains('active')) {
					if (isTransform) {
						hideStatus();
					}
				}
			}

			if (sendLeft - mainLeft > 150) {
				if (isTransform) {
					maxSearch();
					showFullPlaceholder();
				}
			}
		}, 80);
	});

	function transformBtn() {
		sendInvitationBtn.classList.add('active');
		sendInvitationBtnTextJs.classList.add('hide');
		isTransform = true;
	}

	function cancelTransformBtn() {
		sendInvitationBtn.classList.remove('active');
		sendInvitationBtnTextJs.classList.remove('hide');
		isTransform = false;
	}

	function lowerSearch() {
		mainHeaderTopSearch.classList.add('lower');
		isTransform = true;
	}

	function maxSearch() {
		mainHeaderTopSearch.classList.remove('lower');
		isTransform = false;
	}

	function hideStatus() {
		hideMediaStatus.classList.add('hide');
		statusCounterInner.classList.add('show');
	}

	function showStatus() {
		hideMediaStatus.classList.remove('hide');
		statusCounterInner.classList.remove('show');
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

	// var tabs_menu = document.getElementsByClassName('tabs-menu');
	// for (var k = 0; k < tabs_menu.length; k++) {
	// 	tabs_menu[k].onclick = js_tabs;
	// }
	// function js_tabs() {
	// 	var tab_id = this.getAttribute('data-target');
	// 	var tabs_panel = document.getElementsByClassName('tabs-panel');

	// 	for (var i = 0; i < tabs_panel.length; i++) {
	// 		tabs_panel[i].style.display = 'none';
	// 	}
	// 	for (var j = 0; j < tabs_menu.length; j++) {
	// 		tabs_menu[j].className = tabs_menu[j].className.replace(' tabs-menu-active', '');
	// 	}
	// 	this.className += ' tabs-menu-active';
	// 	document.getElementById(tab_id).style.display = 'block';
	// 	return false;
	// }

	// End: actor profile

	// Start: Скрытие окна Массовое одобрение актеров --------------------------------------------->
	let dropTransferActors = document.querySelector('.dropdown-transfer-actors');
	setListener(dropTransferActors, 'mouseover', (event) => {
		event.stopPropagation();
	});

	setListener(dropTransferActors, 'mouseleave', (event) => {
		event.target.classList.remove('active');
		mainItemsWrapper.style.overflow = 'overlay';
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
	addActiveHover('.dropdown-request-js', '.dropdown-request-inner');

	// End: add/remove class active on hover -------------------------------------------------------------->

	$('.filter-dropdown-input').click(function () {
		$(this).toggleClass('active');
	});

	$(document).mouseup(function (e) {
		var modal = $('.filter-dropdown-input');
		if (!modal.is(e.target) && modal.has(e.target).length === 0) {
			$('.filter-dropdown-input').removeClass('active');
		}
	});

	function addActiveOnClick(name) {
		$(name).click(function (e) {
			$(this).toggleClass('--active');
		});

		$(document).click(function (e) {
			let field = $(name);
			if (!field.is(e.target) && field.has(e.target).length === 0) {
				field.removeClass('--active');
			}
		});
	}

	addActiveOnClick('.dropdown-date');

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

	// Start: 2 кнопки переключения
	function switchDoubleButtons(left, right, active) {
		let switchBtnLeft = $(left);
		let switchBtnRight = $(right);
		let switchBtnActive = $(active);
		let createNewOne = $('.create-new-one');
		let selectExistingOne = $('.select-existing-one');

		switchBtnLeft.click(function () {
			switchBtnRight.removeClass('active-case');
			switchBtnLeft.addClass('active-case');
			switchBtnActive.css('left', '0%');
			selectExistingOne.addClass('d-none');
			createNewOne.removeClass('d-none');
		});

		switchBtnRight.click(function () {
			switchBtnRight.addClass('active-case');
			switchBtnLeft.removeClass('active-case');
			switchBtnActive.css('left', '50%');
			selectExistingOne.removeClass('d-none');
			createNewOne.addClass('d-none');
		});
	}

	switchDoubleButtons('.switch-button.--left', '.switch-button.--right', '.switch-active');
	// End: 2 кнопки переключения

	// Start: 2 кнопки переключения рассылка приглашений
	function switchDoubleInviteButtons(left, right, active) {
		let switchBtnLeft = $(left);
		let switchBtnRight = $(right);
		let switchBtnActive = $(active);
		let sendInvitation = $('.send-invitation-wrapper');
		let sendInvitationOnline = $('.send-invitation-wrapper.--online');

		switchBtnLeft.click(function () {
			switchBtnRight.removeClass('active-case');
			switchBtnLeft.addClass('active-case');
			switchBtnActive.css('left', '0%');
			sendInvitation.removeClass('d-none');
			sendInvitationOnline.addClass('d-none');
		});

		switchBtnRight.click(function () {
			switchBtnRight.addClass('active-case');
			switchBtnLeft.removeClass('active-case');
			switchBtnActive.css('left', '50%');
			sendInvitation.addClass('d-none');
			sendInvitationOnline.removeClass('d-none');
		});
	}

	switchDoubleInviteButtons('.switch-button.--left', '.switch-button.--right', '.switch-active');
	// End: 2 кнопки переключения рассылка приглашений

	// Кнопка переключения страна-город
	function switchDoubleLocation() {
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
	}

	switchDoubleLocation();

	// Кнопка с переключением пола
	function switchGender() {
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
	}

	switchGender();

	// Переключение город-страна в create casting filter

	function switchLocationFilter() {
		let switchBtnRight = document.querySelector('.spoiler-item-location-button-case.right');
		let switchBtnLeft = document.querySelector('.spoiler-item-location-button-case.left');
		let switchBtnMiddle = document.querySelector('.spoiler-item-location-button-case.middle');
		let activeSwitch = document.querySelector('.spoiler-item-location-button .active');
		let city = document.querySelector('.spoiler-item-location-city');
		let country = document.querySelector('.spoiler-item-location-country');
		let world = document.querySelector('.spoiler-item-location-world');

		function switchLeft() {
			switchBtnRight.classList.remove('active-case-location');
			switchBtnMiddle.classList.remove('active-case-location');
			switchBtnLeft.classList.add('active-case-location');
			activeSwitch.style.left = '0%';
			city.classList.remove('d-none');
			country.classList.add('d-none');
			world.classList.add('d-none');
		}

		function switchMiddle() {
			switchBtnRight.classList.add('active-case-location');
			switchBtnLeft.classList.remove('active-case-location');
			switchBtnMiddle.classList.remove('active-case-location');
			activeSwitch.style.left = '33.33333%';
			city.classList.add('d-none');
			country.classList.remove('d-none');
			world.classList.add('d-none');
		}

		function switchRight() {
			switchBtnMiddle.classList.add('active-case-location');
			switchBtnLeft.classList.remove('active-case-location');
			switchBtnRight.classList.remove('active-case-location');
			activeSwitch.style.left = '67%';
			city.classList.add('d-none');
			country.classList.add('d-none');
			world.classList.remove('d-none');
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
	}

	switchLocationFilter();

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

	// $('.sidebar-burger__tabs-item-input').click(function () {
	// 	$(this).siblings().removeClass('active');
	// 	$(this).addClass('active');
	// });

	// $('.sidebar__tabs-item-input').click(function () {
	// 	$(this).siblings().removeClass('active');
	// 	$(this).addClass('active');
	// });

	$('.dropdown-text-js').click(function () {
		$('.dropdown-transfer-actors').addClass('active');
	});

	$('.transfer-actors-close-btn').click(function () {
		$('.dropdown-transfer-actors').removeClass('active');
	});

	$('.input-top-search-js').focus(function () {
		if (window.innerWidth < 1280) {
			$('.main-header-top-search').addClass('transform');
			$('.send-invitation-btn').addClass('active');
			$('.send-invitation-btn-text-js').addClass('hide');
		}
	});

	$('.input-top-search-js').focusout(function () {
		if (window.innerWidth < 1280) {
			$('.main-header-top-search').removeClass('transform');
			$('.send-invitation-btn').removeClass('active');
			setTimeout(function () {
				$('.send-invitation-btn-text-js').removeClass('hide');
			}, 200);
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

	// Start: Tabs Profile Actor Foto Video -------------------------------------------------------->
	const actorProfileBtnLeft = document.querySelector('.actor__profile-media-tabs-menu.left');
	const actorProfileBtnRight = document.querySelector('.actor__profile-media-tabs-menu.right');
	const actorProfileActiveBtn = document.querySelector('.actor__profile-media-active-btn');
	const actorProfileTabsPanelFirst = document.querySelector('#media-tab_1');
	const actorProfileTabsPanelSecond = document.querySelector('#media-tab_2');

	actorProfileBtnLeft.addEventListener('click', switchToLeft);

	actorProfileBtnRight.addEventListener('click', switchToRight);

	function switchToLeft() {
		actorProfileTabsPanelFirst.classList.add('active');
		actorProfileTabsPanelSecond.classList.remove('active');
		actorProfileActiveBtn.style.left = '0%';
	}

	function switchToRight() {
		actorProfileTabsPanelFirst.classList.remove('active');
		actorProfileTabsPanelSecond.classList.add('active');
		actorProfileActiveBtn.style.left = '50%';
	}

	// End: Tabs Tabs Profile Actor Foto Video -------------------------------------------------------->
})(jQuery);
