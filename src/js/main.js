(function ($) {
	$('.question-menu,  .question-button').mouseover(function () {
		$('.question-button').css('background-color', '#70a8dd');
	});

	$('.question-menu, .question-button').mouseout(function () {
		$('.question-button').css('background-color', '#408bd1');
	});

	$('.language-menu, .language-button').mouseover(function () {
		$('.language-button').css('background-color', '#70a8dd');
	});

	$('.language-menu, .language-button').mouseout(function () {
		$('.language-button').css('background-color', '#408bd1');
	});

	$('.dropdown-grey-points').mouseover(function () {
		$('.points-grey-btn-header').addClass('active');
	});

	$('.dropdown-grey-points').mouseout(function () {
		$('.points-grey-btn-header').removeClass('active');
	});

	$('.dropdown-blue-points').mouseover(function () {
		$('.points-blue-btn-sidebar').addClass('active');
	});

	$('.dropdown-blue-points').mouseout(function () {
		$('.points-blue-btn-sidebar').removeClass('active');
	});

	$('.dropdown-request').mouseover(function () {
		$('.request-btn').addClass('active');
	});

	$('.dropdown-request').mouseout(function () {
		$('.request-btn').removeClass('active');
	});

	$('.dropdown-approved').mouseover(function () {
		$('.approved-btn').addClass('active');
	});

	$('.dropdown-approved').mouseout(function () {
		$('.approved-btn').removeClass('active');
	});

	$('.dropdown-mainRole').mouseover(function () {
		$('.mainRole-dropdown-btn').addClass('active');
	});

	$('.dropdown-mainRole').mouseout(function () {
		$('.mainRole-dropdown-btn').removeClass('active');
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

	$('.appStore-box')
		.mouseover(function () {
			$('.appStoreDark').show();
		})
		.mouseout(function () {
			$('.appStoreDark').hide();
		});

	$('.googlePlay-box')
		.mouseover(function () {
			$('.googlePlayDark').show();
		})
		.mouseout(function () {
			$('.googlePlayDark').hide();
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

	// menuHeader.on('click', (e) => {
	// 	if (e.target.closest('.burger__menu-wrapper')) return;
	// 	burgerWrapper.removeClass('active');
	// });

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
})(jQuery);
