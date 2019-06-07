$(document).ready(allFunc);
function allFunc() {
	//Navbar scroll nav
	$('.navbar a[href^="#"], .main__order-btn').click(function(){
        var linkPath = $(this).attr('href');
        $('html, body').animate({ scrollTop: $(linkPath).offset().top - 0 }, 500);
        return false;
    });
    //How items match height
	$('.how__item-img').matchHeight();
    $('.how__item-inner').matchHeight();
	//Resize some divs
	$(window).on('load resize', function () {	
		divResizer();
	});
	//Map tooltips
	$('.factory-marker').each(function() { // Notice the .each() loop, discussed below
		$(this).qtip({
			content: {
				text: $(this).next('div'),
				button: 'Закрыть'
			},
			position: {
				my: 'center bottom',
				at: 'center top',
				adjust: {
					x: 0,
                    y: -80,
				},
				//container: $('.factories__map'),
				//viewport: $('.wrapper_factories')
			},
			show: {
				event: 'mouseenter click focus',
				//delay: 5,
				solo: true
			},
			hide: {
				//fixed: true,
				event: 'unfocus',
				//inactive: 5000
			},
			style: {
				classes: 'qtip qtip-rounded qtip-factory'
			},
			events: {
				show: function(event, api) {
					$('.factory-marker[aria-describedby='+$(this)['0']['id']+']').removeClass('not_active').addClass('active');
				},
				hide: function(event, api) {
					$('.factory-marker[aria-describedby='+$(this)['0']['id']+']').removeClass('active').addClass('not_active');
				}	
			}
		});
    });
    //Advantages match height
	//$('.advantage__img').matchHeight();
    $('.advantage__inner').matchHeight();
	//Contacts swiper
    var swiperContacts = new Swiper('.swiper-container_contacts', {
      navigation: {
        nextEl: '.swiper-button-next_contacts',
        prevEl: '.swiper-button-prev_contacts',
      },
			slidesPerView: 5,
			//centeredSlides: true,
			loop: true,
			spaceBetween: 30,
			breakpoints: {
				// when window width is <= 1170px
				1170: {
					slidesPerView: 3,
				},
				// when window width is <= 991px
				991: {
					slidesPerView: 2,
				},
				// when window width is <= 767px
				767: {
					slidesPerView: 1,
				}
	  	}
    });
	//Phone mask
	$("[name='phone']").mask("+7(999) 999-9999");
	//Contact form
	$('#form').validate();
}
function divResizer() {
	//Map resize
	var mapHeight = $('.factories__map').width() * 0.441628;
	$('.factories__map').css('height', mapHeight);
}
//Form submit function
function submitForm() {
	//console.log($('#form').valid());
	if ($('#form').valid()) {
		// ajax
		var formData = new FormData();
		formData.append('name', document.querySelector("#name").value);
		formData.append('phone', document.querySelector("#phone").value);
		formData.append('email', document.querySelector("#email").value);
		formData.append('text', document.querySelector("#text").value);
		var xhr = new XMLHttpRequest();
		xhr.open('POST', 'form.php');
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4 && xhr.status == 200) {
				$('.order__form').css( "display", "none" );
				$('.order__title').css( "display", "none" );
				$('.order__title.success').css( "display", "block" );
				setTimeout(function() {
					$('.order__form').css( "display", "block" );
					$('.order__title').css( "display", "block" );
					$('.order__title.success').css( "display", "none" );
					$('#name').val('');
					$('#phone').val('');					
				}, 3000);
			}
		}
		xhr.send( formData );
	}
}