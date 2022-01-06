(function ($) {
	// Start: Все кнопки с переключением
	$(document).ready(function () {
		$('.switch__wrapper').each(function () {
			const switchItem = $(this).find('.switch__item');
			const switchSlider = $(this).find('.switch__slider');
			const switchItemsCount = switchItem.length;
			const step = switchItemsCount && 100 / switchItemsCount;

			switchItem.css('width', `${step}%`);
			switchSlider.css('width', `${step}%`);

			$(this).click(function (e) {
				const targetIndex = $(e.target.closest('.switch__item')).data('index');
				switchSlider.css('left', `${step * targetIndex}%`);
			});
		});
	});
	// End: Все кнопки с переключением

	// Start: Dropdown Select
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

	// End: Dropdown Select

	// Start: Открытие спойлеров в сайдбаре
	function openSpoiler() {
		$('.spoiler-item-header').click(function () {
			$(this).next('.spoiler-item-body').slideToggle();
			$(this).parent().toggleClass('active');
		});
	}

	openSpoiler();

	// End: Открытие спойлеров

	// Start: Создание новой роли
	function createNewRole() {
		$('.dropdown-select-menu-item.--create').click(function () {
			$(this).addClass('--hide-js');
			$('.create-new-object').addClass('--active');
		});

		$('.new-role-btn-close-js').click(function () {
			$('.create-new-object').removeClass('--active');
			$('.dropdown-select-menu-item.--create').removeClass('--hide-js');
		});
	}

	createNewRole();
	// End: Создание новой роли

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

	// Start: All Tabs
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
	// End: All Tabs

	// Start: Разворачивание колонки с заявками
	const expandColumnRequest = () => {
		const toggleRequest = $('.request-js');
		const mainItemRequest = $('.main__item');

		toggleRequest.click(function () {
			mainItemRequest.toggleClass('--expand');
		});
	};

	expandColumnRequest();
	// End: Разворачивание колонки с заявками

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

	// setListener(document, 'DOMContentLoaded', () => {
	// 	let mainLeft = mainHeaderBottomLeft.offsetLeft + mainHeaderBottomLeft.offsetWidth + 56;
	// 	let sendLeft = sendInvitationBtn.offsetLeft;
	// 	let statusleft = statusDefault.offsetLeft;

	// 	if (sendLeft < mainLeft) {
	// 		if (!isTransform) {
	// 			lowerSearch();
	// 			hideFullPlaceholder();
	// 		}
	// 	}

	// 	if (mainLeft - sendLeft > 10) {
	// 		if (mainHeaderTopSearch.classList.contains('lower')) {
	// 			if (isTransform) {
	// 				transformBtn();
	// 			}
	// 		}
	// 	}

	// 	if (statusleft - sendLeft > 10) {
	// 		if (mainHeaderTopSearch.classList.contains('lower') || sendInvitationBtn.classList.contains('active')) {
	// 			if (isTransform) {
	// 				hideStatus();
	// 			}
	// 		}
	// 	}

	// 	if (sendLeft - mainLeft > 150) {
	// 		if (isTransform) {
	// 			maxSearch();
	// 			showFullPlaceholder();
	// 		}
	// 	}
	// });

	// setListener(window, 'resize', () => {
	// 	clearTimeout(timeout);
	// 	timeout = setTimeout(function () {
	// 		let mainLeft = mainHeaderBottomLeft.offsetLeft + mainHeaderBottomLeft.offsetWidth + 56;
	// 		let sendLeft = sendInvitationBtn.offsetLeft;
	// 		let statusleft = statusDefault.offsetLeft + 287;

	// 		console.log(sendLeft, statusleft);

	// 		if (sendLeft < mainLeft) {
	// 			if (!isTransform) {
	// 				lowerSearch();
	// 				hideFullPlaceholder();
	// 			}
	// 		}

	// 		if (mainLeft - sendLeft > 10) {
	// 			if (mainHeaderTopSearch.classList.contains('lower')) {
	// 				if (isTransform) {
	// 					transformBtn();
	// 				}
	// 			}
	// 		}

	// 		if (statusleft - sendLeft > 10) {
	// 			if (mainHeaderTopSearch.classList.contains('lower') || sendInvitationBtn.classList.contains('active')) {
	// 				if (isTransform) {
	// 					hideStatus();
	// 				}
	// 			}
	// 		}

	// 		if (sendLeft - mainLeft > 150) {
	// 			if (isTransform) {
	// 				maxSearch();
	// 				showFullPlaceholder();
	// 			}
	// 		}
	// 	}, 80);
	// });

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

	// Start: Range input slider in filter
	function rangeFilterSlider() {
		const rangeOne = $('input[name="rangeOne"]');
		const rangeTwo = $('input[name="rangeTwo"]');
		const outputOne = $('.outputOne');
		const outputTwo = $('.outputTwo');
		const inclRange = $('.incl-range');
		const updateView = function () {
			const oneLeft = (this.val() / this.attr('max')) * (100 - 3.5) + '%';
			const twoLeft = (this.val() / this.attr('max')) * (100 - 3.5) + '%';
			const inclRangeWidthFirst = ((rangeOne.val() - rangeTwo.val()) / this.attr('max')) * 100 + '%';
			const inclRangeWidthSecond = ((rangeTwo.val() - rangeOne.val()) / this.attr('max')) * 100 + '%';
			const inclRangeLeftFirst = (rangeTwo.val() / this.attr('max')) * 100 + '%';
			const inclRangeLeftSecond = (rangeOne.val() / this.attr('max')) * 100 + '%';

			if (this.attr('name') === 'rangeOne') {
				outputOne.html(this.val());
				outputOne.css('left', `${oneLeft}`);
			} else {
				outputTwo.html(this.val());
				outputTwo.css('left', `${twoLeft}`);
			}
			if (parseInt(rangeOne.val()) > parseInt(rangeTwo.val())) {
				inclRange.css('width', `${inclRangeWidthFirst}`);
				inclRange.css('left', `${inclRangeLeftFirst}`);
			} else {
				inclRange.css('width', `${inclRangeWidthSecond}`);
				inclRange.css('left', `${inclRangeLeftSecond}`);
			}
		};

		$(document).ready(function () {
			updateView.call(rangeOne);
			updateView.call(rangeTwo);
			$('.double-range')
				.on('mouseup', function () {
					this.blur();
				})
				.on('mousedown input', function () {
					updateView.call($(this));
				});
		});
	}

	rangeFilterSlider();

	// End: Range input slider in filter ------------------------------------------------------------------------------->

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

	// Start: Переключение проектов в create-step-3
	const switchProjects = () => {
		let createNewOne = $('.create-new-one');
		let selectExistingOne = $('.select-existing-one');
		let switchBtnLeft = $('.switch-button-case-project.--left');
		let switchBtnRight = $('.switch-button-case-project.--right');

		switchBtnLeft.click(function () {
			selectExistingOne.hide();
			createNewOne.show();
		});

		switchBtnRight.click(function () {
			selectExistingOne.show();
			createNewOne.hide();
		});
	};

	switchProjects();

	// End: Переключение проектов в create-step-3

	// Start: 2 кнопки переключения рассылка приглашений
	const switchDoubleInviteButtons = () => {
		let switchBtnLeft = $('.switch-button-left');
		let switchBtnRight = $('.switch-button-right');
		let sendInvitation = $('.send-invitation-wrapper');
		let sendInvitationOnline = $('.send-invitation-wrapper.--online');

		switchBtnLeft.click(function () {
			sendInvitation.show();
			sendInvitationOnline.hide();
		});

		switchBtnRight.click(function () {
			sendInvitation.hide();
			sendInvitationOnline.show();
		});
	};

	switchDoubleInviteButtons();
	// End: 2 кнопки переключения рассылка приглашений

	// Start: Переключение локации в спойлере Территория
	const switchLocation = () => {
		let city = $('.spoiler-item-location-city');
		let country = $('.spoiler-item-location-country');
		let world = $('.spoiler-item-location-world');
		let switchBtnLeft = $('.spoiler-item-location-left');
		let switchBtnMiddle = $('.spoiler-item-location-middle');
		let switchBtnRight = $('.spoiler-item-location-right');

		switchBtnLeft.click(function () {
			city.show();
			country.hide();
			world.hide();
		});

		switchBtnMiddle.click(function () {
			city.hide();
			country.show();
			world.hide();
		});

		switchBtnRight.click(function () {
			city.hide();
			country.hide();
			world.show();
		});
	};

	switchLocation();

	// End: Переключение локации в спойлере Территория

	// Start: Скрытие сайдбара
	function removeSidebar() {
		const sidebarBtnLeft = $('.roll-up-btn-left');
		const sidebarBtnRight = $('.roll-up-btn-right');
		const sidebar = $('.sidebar');
		const sidebarTabs = $('.sidebar-tabs-js');
		const sidebarHeaderTitle = $('.sidebar-dropdown-header-title');
		const sidebarBurger = $('.sidebar-burger');
		const sidebarPlus = $('.sidebar-plus');
		const sidebarTopBtns = $('.sidebar-top-btns');
		const sidebarLeftBtns = $('.sidebar-left-btns');
		const mainItemsWrapper = $('.main-items-wrapper');
		const wrapText = $('.wrap-text');

		let isSidebarHidden = false;

		$(window).resize(function () {
			if ($(window).width() < 1025) {
				if (!isSidebarHidden) {
					hideSidebar();
				}
			} else {
				if (isSidebarHidden) {
					showSidebar();
				}
			}
		});

		sidebarBtnLeft.click(function () {
			hideSidebar();
		});

		function hideSidebar() {
			mainItemsWrapper.addClass('active');
			wrapText.addClass('active');
			sidebarTabs.toggleClass('done');
			sidebarHeaderTitle.toggleClass('done');
			sidebarTopBtns.removeClass('active');

			setTimeout(function () {
				sidebarBurger.toggleClass('done');
				sidebarPlus.toggleClass('done');
				sidebarLeftBtns.addClass('active');
			}, 100);

			sidebar.toggleClass('--rolled');

			sidebarBtnLeft.toggleClass('active');
			sidebarBtnRight.toggleClass('active');

			isSidebarHidden = true;
		}

		sidebarBtnRight.click(function () {
			showSidebar();
		});

		function showSidebar() {
			mainItemsWrapper.removeClass('active');
			sidebarLeftBtns.removeClass('active');
			sidebarBurger.toggleClass('done');
			sidebarPlus.toggleClass('done');

			setTimeout(function () {
				sidebarTopBtns.addClass('active');
				wrapText.removeClass('active');
			}, 280);

			setTimeout(function () {
				sidebarTabs.toggleClass('done');
				sidebarHeaderTitle.toggleClass('done');
			}, 280);

			sidebar.toggleClass('--rolled');

			sidebarBtnLeft.toggleClass('active');
			sidebarBtnRight.toggleClass('active');

			isSidebarHidden = false;
		}

		// Start: Убрать overflow у блока, чтобы отобразить dropdown и вернуть обратно при клике при закрытии
		const removeOverflowAtBlock = () => {
			const massActors = $('.dropdown-text-js');
			const transferActorsCloseBtn = $('.transfer-actors-close-btn');

			massActors.click(function () {
				mainItemsWrapper.css('overflow', 'inherit');
			});

			transferActorsCloseBtn.click(function () {
				mainItemsWrapper.css('overflow', 'overlay');
			});
		};

		removeOverflowAtBlock();
		// End: Убрать overflow у блока, чтобы отобразить dropdown и вернуть обратно при закрытии

		// Start: Скрытие окна Массовое одобрение актеров
		const hideMassActors = () => {
			let dropTransferActors = $('.dropdown-transfer-actors');

			dropTransferActors.on('mouseenter', (event) => {
				event.stopPropagation();
			});

			dropTransferActors.on('mouseleave', (event) => {
				$(event.currentTarget).removeClass('active');
				mainItemsWrapper.css('overflow', 'overlay');
			});
		};

		hideMassActors();

		// End: Скрытие окна Массовое одобрение актеров
	}

	removeSidebar();

	// End: Скрытие сайдбара

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

	$('.dropdown-text-js').click(function () {
		$('.dropdown-transfer-actors').addClass('active');
	});

	$('.transfer-actors-close-btn').click(function () {
		$('.dropdown-transfer-actors').removeClass('active');
	});

	// Start: Трансформация инпута "Актеры" на главной

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

	// End: Трансформация инпута "Актеры" на главной

	// Start: Range input slider in transfer-actors
	function showRangeSliderActors() {
		const rangeTransferOne = $('input[name="rangeTransferOne"]');
		const outputTransferOne = $('.outputTransferOne');
		const transferinclRange = $('.transfer-incl-range');

		const updateTransferView = function () {
			if (this.attr('name') === 'rangeTransferOne') {
				const left = (this.val() / this.attr('max')) * (100 - 3.5) + '%';
				outputTransferOne.html(this.val());
				outputTransferOne.css('left', `${left}`);
			}

			if (this.val()) {
				const width = (this.val() / this.attr('max')) * 100 + '%';
				transferinclRange.css('width', `${width}`);
			}
		};

		$(document).ready(function () {
			updateTransferView.call(rangeTransferOne);
			$('.rangeTransferOne')
				.on('mouseup', function () {
					this.blur();
				})
				.on('mousedown input', function () {
					updateTransferView.call($(this));
				});
		});
	}

	showRangeSliderActors();
	// End: Range input slider in transfer-actors

	// Start: Tabs Массовый перенос актёров
	const switchTabsMassTransferActors = () => {
		let transferActorsFirst = $('.transfer-actors-first');
		let transferActorsSecond = $('.transfer-actors-second');
		let switchBtnLeft = $('.transfer-actors-btn-left');
		let switchBtnRight = $('.transfer-actors-btn-right');

		switchBtnLeft.click(function () {
			transferActorsFirst.show();
			transferActorsSecond.hide();
		});

		switchBtnRight.click(function () {
			transferActorsFirst.hide();
			transferActorsSecond.show();
		});
	};

	switchTabsMassTransferActors();

	// End: Tabs Массовый перенос актёров

	// Start: Tabs Profile Actor Foto Video
	const switchTabsProfileMedia = () => {
		let actorProfileTabsPanelFirst = $('#media-tab_1');
		let actorProfileTabsPanelSecond = $('#media-tab_2');
		let switchBtnLeft = $('.actor__profile-media-tabs-menu-left');
		let switchBtnRight = $('.actor__profile-media-tabs-menu-right');

		switchBtnLeft.click(function () {
			actorProfileTabsPanelFirst.show();
			actorProfileTabsPanelSecond.hide();
		});

		switchBtnRight.click(function () {
			actorProfileTabsPanelFirst.hide();
			actorProfileTabsPanelSecond.show();
		});
	};

	switchTabsProfileMedia();

	// End: Tabs Tabs Profile Actor Foto Video

	// Start: Tabs menu profile actor add class active
	$('.tabs-menu').click(function () {
		$(this).siblings().removeClass('tabs-menu-active');
		$(this).addClass('tabs-menu-active');
	});
	// End: Tabs menu profile actor add class active
})(jQuery);
