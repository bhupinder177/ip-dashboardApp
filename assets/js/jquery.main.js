$(".toggle-password").click(function() {

	$(this).toggleClass(".icon-eye, .icon-eye-off");
	var input = $($(this).attr("toggle"));
	if (input.attr("type") == "password") {
		input.attr("type", "text");
	} else {
		input.attr("type", "password");
	}
});

jQuery(".acc-opener").click(function(){
	jQuery(".ideas-list").addClass("list-active");
  });

  jQuery(function() {
	initAccordion();
	initTabs();
	initCustomForms();
	initMobileNav();
	initDatepicker();
	initFocusClass();
});


// accordion menu init
function initAccordion() {
	jQuery('.ideas-list').slideAccordion({
		opener: '.acc-opener , .acc-closer',
		slider: '.ideas-slide',
		animSpeed: 300
	});
}

// initialize custom form elements
function initCustomForms() {
	jcf.replaceAll();
}

// mobile menu init
function initMobileNav() {
	jQuery('body').mobileNav({
		menuActiveClass: 'quick-form-active',
		menuOpener: '.quick-opener'
	});

	jQuery('body').mobileNav({
		menuActiveClass: 'nav-active',
		menuOpener: '.navbar-toggler'
	});

	jQuery('.action-holder .action-row').mobileNav({
		menuActiveClass: 'active',
		menuOpener: '.edit'
	});
}

function initDatepicker() {
	jQuery('[data-datepicker]').uiDatepicker();
}

// add class when element is in focus
function initFocusClass() {
	jQuery('.input-wrap').addFocusClass({
		focusClass: 'focus',
		element: '.form-control',
		stayFocusOnFilled: true
	});
}


// content tabs init
function initTabs() {
	jQuery('.tabset').tabset({
		tabLinks: 'a',
		defaultTab: true
	});
}

/*
 * jQuery Tabs plugin
 */

;(function($, $win) {

	'use strict';

	function Tabset($holder, options) {
		this.$holder = $holder;
		this.options = options;

		this.init();
	}

	Tabset.prototype = {
		init: function() {
			this.$tabLinks = this.$holder.find(this.options.tabLinks);

			this.setStartActiveIndex();
			this.setActiveTab();

			if (this.options.autoHeight) {
				this.$tabHolder = $(this.$tabLinks.eq(0).attr(this.options.attrib)).parent();
			}

			this.makeCallback('onInit', this);
		},

		setStartActiveIndex: function() {
			var $classTargets = this.getClassTarget(this.$tabLinks);
			var $activeLink = $classTargets.filter('.' + this.options.activeClass);
			var $hashLink = this.$tabLinks.filter('[' + this.options.attrib + '="' + location.hash + '"]');
			var activeIndex;

			if (this.options.checkHash && $hashLink.length) {
				$activeLink = $hashLink;
			}

			activeIndex = $classTargets.index($activeLink);

			this.activeTabIndex = this.prevTabIndex = (activeIndex === -1 ? (this.options.defaultTab ? 0 : null) : activeIndex);
		},

		setActiveTab: function() {
			var self = this;

			this.$tabLinks.each(function(i, link) {
				var $link = $(link);
				var $classTarget = self.getClassTarget($link);
				var $tab = $($link.attr(self.options.attrib));

				if (i !== self.activeTabIndex) {
					$classTarget.removeClass(self.options.activeClass);
					$tab.addClass(self.options.tabHiddenClass).removeClass(self.options.activeClass);
				} else {
					$classTarget.addClass(self.options.activeClass);
					$tab.removeClass(self.options.tabHiddenClass).addClass(self.options.activeClass);
				}

				self.attachTabLink($link, i);
			});
		},

		attachTabLink: function($link, i) {
			var self = this;

			$link.on(this.options.event + '.tabset', function(e) {
				e.preventDefault();

				if (self.activeTabIndex === self.prevTabIndex && self.activeTabIndex !== i) {
					self.activeTabIndex = i;
					self.switchTabs();
				}
				if (self.options.checkHash) {
					location.hash = jQuery(this).attr('href').split('#')[1]
				}
			});
		},

		resizeHolder: function(height) {
			var self = this;

			if (height) {
				this.$tabHolder.height(height);
				setTimeout(function() {
					self.$tabHolder.addClass('transition');
				}, 10);
			} else {
				self.$tabHolder.removeClass('transition').height('');
			}
		},

		switchTabs: function() {
			var self = this;

			var $prevLink = this.$tabLinks.eq(this.prevTabIndex);
			var $nextLink = this.$tabLinks.eq(this.activeTabIndex);

			var $prevTab = this.getTab($prevLink);
			var $nextTab = this.getTab($nextLink);

			$prevTab.removeClass(this.options.activeClass);

			if (self.haveTabHolder()) {
				this.resizeHolder($prevTab.outerHeight());
			}

			setTimeout(function() {
				self.getClassTarget($prevLink).removeClass(self.options.activeClass);

				$prevTab.addClass(self.options.tabHiddenClass);
				$nextTab.removeClass(self.options.tabHiddenClass).addClass(self.options.activeClass);

				self.getClassTarget($nextLink).addClass(self.options.activeClass);

				if (self.haveTabHolder()) {
					self.resizeHolder($nextTab.outerHeight());

					setTimeout(function() {
						self.resizeHolder();
						self.prevTabIndex = self.activeTabIndex;
						self.makeCallback('onChange', self);
					}, self.options.animSpeed);
				} else {
					self.prevTabIndex = self.activeTabIndex;
				}
			}, this.options.autoHeight ? this.options.animSpeed : 1);
		},

		getClassTarget: function($link) {
			return this.options.addToParent ? $link.parent() : $link;
		},

		getActiveTab: function() {
			return this.getTab(this.$tabLinks.eq(this.activeTabIndex));
		},

		getTab: function($link) {
			return $($link.attr(this.options.attrib));
		},

		haveTabHolder: function() {
			return this.$tabHolder && this.$tabHolder.length;
		},

		destroy: function() {
			var self = this;

			this.$tabLinks.off('.tabset').each(function() {
				var $link = $(this);

				self.getClassTarget($link).removeClass(self.options.activeClass);
				$($link.attr(self.options.attrib)).removeClass(self.options.activeClass + ' ' + self.options.tabHiddenClass);
			});

			this.$holder.removeData('Tabset');
		},

		makeCallback: function(name) {
			if (typeof this.options[name] === 'function') {
				var args = Array.prototype.slice.call(arguments);
				args.shift();
				this.options[name].apply(this, args);
			}
		}
	};

	$.fn.tabset = function(opt) {
		var args = Array.prototype.slice.call(arguments);
		var method = args[0];

		var options = $.extend({
			activeClass: 'active',
			addToParent: false,
			autoHeight: false,
			checkHash: false,
			defaultTab: true,
			animSpeed: 500,
			tabLinks: 'a',
			attrib: 'href',
			event: 'click',
			tabHiddenClass: 'js-tab-hidden'
		}, opt);
		options.autoHeight = options.autoHeight;

		return this.each(function() {
			var $holder = jQuery(this);
			var instance = $holder.data('Tabset');

			if (typeof opt === 'object' || typeof opt === 'undefined') {
				$holder.data('Tabset', new Tabset($holder, options));
			} else if (typeof method === 'string' && instance) {
				if (typeof instance[method] === 'function') {
					args.shift();
					instance[method].apply(instance, args);
				}
			}
		});
	};
}(jQuery, jQuery(window)));

/*
 * jQuery Accordion plugin new
 */
;(function(root, factory) {

	'use strict';
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		module.exports = factory(require('jquery'));
	} else {
		root.SlideAccordion = factory(jQuery);
	}
}(this, function($) {

	'use strict';
	var accHiddenClass = 'js-acc-hidden';

	function SlideAccordion(options) {
		this.options = $.extend(true, {
			allowClickWhenExpanded: false,
			activeClass:'active',
			opener:'.opener',
			slider:'.slide',
			animSpeed: 300,
			collapsible:true,
			event: 'click',
			scrollToActiveItem: {
				enable: false,
				breakpoint: 767, // max-width
				animSpeed: 600,
				extraOffset: null
			}
		}, options);
		this.init();
	}

	SlideAccordion.prototype = {
		init: function() {
			if (this.options.holder) {
				this.findElements();
				this.setStateOnInit();
				this.attachEvents();
				this.makeCallback('onInit');
			}
		},

		findElements: function() {
			this.$holder = $(this.options.holder).data('SlideAccordion', this);
			this.$items = this.$holder.find(':has(' + this.options.slider + ')');
		},

		setStateOnInit: function() {
			var self = this;

			this.$items.each(function() {
				if (!$(this).hasClass(self.options.activeClass)) {
					$(this).find(self.options.slider).addClass(accHiddenClass);
				}
			});
		},

		attachEvents: function() {
			var self = this;

			this.accordionToggle = function(e) {
				var $item = jQuery(this).closest(self.$items);
				var $actiItem = self.getActiveItem($item);

				if (!self.options.allowClickWhenExpanded || !$item.hasClass(self.options.activeClass)) {
					e.preventDefault();
					self.toggle($item, $actiItem);
				}
			};

			this.$items.on(this.options.event, this.options.opener, this.accordionToggle);
		},

		toggle: function($item, $prevItem) {
			if (!$item.hasClass(this.options.activeClass)) {
				this.show($item);
			} else if (this.options.collapsible) {
				this.hide($item);
			}

			if (!$item.is($prevItem) && $prevItem.length) {
				this.hide($prevItem);
			}

			this.makeCallback('beforeToggle');
		},

		show: function($item) {
			var $slider = $item.find(this.options.slider);

			$item.addClass(this.options.activeClass);
			$slider.stop().hide().removeClass(accHiddenClass).slideDown({
				duration: this.options.animSpeed,
				complete: function() {
					$slider.removeAttr('style');
					if (
						this.options.scrollToActiveItem.enable &&
						window.innerWidth <= this.options.scrollToActiveItem.breakpoint
					) {
						this.goToItem($item);
					}
					this.makeCallback('onShow', $item);
				}.bind(this)
			});

			this.makeCallback('beforeShow', $item);
		},

		hide: function($item) {
			var $slider = $item.find(this.options.slider);

			$item.removeClass(this.options.activeClass);
			$slider.stop().show().slideUp({
				duration: this.options.animSpeed,
				complete: function() {
					$slider.addClass(accHiddenClass);
					$slider.removeAttr('style');
					this.makeCallback('onHide', $item);
				}.bind(this)
			});

			this.makeCallback('beforeHide', $item);
		},

		goToItem: function($item) {
			var itemOffset = $item.offset().top;

			if (itemOffset < $(window).scrollTop()) {
				// handle extra offset
				if (typeof this.options.scrollToActiveItem.extraOffset === 'number') {
					itemOffset -= this.options.scrollToActiveItem.extraOffset;
				} else if (typeof this.options.scrollToActiveItem.extraOffset === 'function') {
					itemOffset -= this.options.scrollToActiveItem.extraOffset();
				}

				$('body, html').animate({
					scrollTop: itemOffset
				}, this.options.scrollToActiveItem.animSpeed);
			}
		},

		getActiveItem: function($item) {
			return $item.siblings().filter('.' + this.options.activeClass);
		},

		makeCallback: function(name) {
			if (typeof this.options[name] === 'function') {
				var args = Array.prototype.slice.call(arguments);
				args.shift();
				this.options[name].apply(this, args);
			}
		},

		destroy: function() {
			this.$holder.removeData('SlideAccordion');
			this.$items.off(this.options.event, this.options.opener, this.accordionToggle);
			this.$items.removeClass(this.options.activeClass).each(function(i, item) {
				$(item).find(this.options.slider).removeAttr('style').removeClass(accHiddenClass);
			}.bind(this));
			this.makeCallback('onDestroy');
		}
	};

	$.fn.slideAccordion = function(opt) {
		var args = Array.prototype.slice.call(arguments);
		var method = args[0];

		return this.each(function() {
			var $holder = jQuery(this);
			var instance = $holder.data('SlideAccordion');

			if (typeof opt === 'object' || typeof opt === 'undefined') {
				new SlideAccordion($.extend(true, {
					holder: this
				}, opt));
			} else if (typeof method === 'string' && instance) {
				if(typeof instance[method] === 'function') {
					args.shift();
					instance[method].apply(instance, args);
				}
			}
		});
	};

	(function() {
		var tabStyleSheet = $('<style type="text/css">')[0];
		var tabStyleRule = '.' + accHiddenClass;
		tabStyleRule += '{position:absolute !important;left:-9999px !important;top:-9999px !important;display:block !important; width: 100% !important;}';
		if (tabStyleSheet.styleSheet) {
			tabStyleSheet.styleSheet.cssText = tabStyleRule;
		} else {
			tabStyleSheet.appendChild(document.createTextNode(tabStyleRule));
		}
		$('head').append(tabStyleSheet);
	}());

	return SlideAccordion;
}));

/*
 * Simple Mobile Navigation
 */
;(function($) {
	function MobileNav(options) {
		this.options = $.extend({
			container: null,
			hideOnClickOutside: false,
			menuActiveClass: 'nav-active',
			menuOpener: '.nav-opener',
			menuDrop: '.nav-drop',
			toggleEvent: 'click',
			outsideClickEvent: 'click touchstart pointerdown MSPointerDown'
		}, options);
		this.initStructure();
		this.attachEvents();
	}
	MobileNav.prototype = {
		initStructure: function() {
			this.page = $('html');
			this.container = $(this.options.container);
			this.opener = this.container.find(this.options.menuOpener);
			this.drop = this.container.find(this.options.menuDrop);
		},
		attachEvents: function() {
			var self = this;

			if(activateResizeHandler) {
				activateResizeHandler();
				activateResizeHandler = null;
			}

			this.outsideClickHandler = function(e) {
				if(self.isOpened()) {
					var target = $(e.target);
					if(!target.closest(self.opener).length && !target.closest(self.drop).length) {
						self.hide();
					}
				}
			};

			this.openerClickHandler = function(e) {
				e.preventDefault();
				self.toggle();
			};

			this.opener.on(this.options.toggleEvent, this.openerClickHandler);
		},
		isOpened: function() {
			return this.container.hasClass(this.options.menuActiveClass);
		},
		show: function() {
			this.container.addClass(this.options.menuActiveClass);
			if(this.options.hideOnClickOutside) {
				this.page.on(this.options.outsideClickEvent, this.outsideClickHandler);
			}
		},
		hide: function() {
			this.container.removeClass(this.options.menuActiveClass);
			if(this.options.hideOnClickOutside) {
				this.page.off(this.options.outsideClickEvent, this.outsideClickHandler);
			}
		},
		toggle: function() {
			if(this.isOpened()) {
				this.hide();
			} else {
				this.show();
			}
		},
		destroy: function() {
			this.container.removeClass(this.options.menuActiveClass);
			this.opener.off(this.options.toggleEvent, this.clickHandler);
			this.page.off(this.options.outsideClickEvent, this.outsideClickHandler);
		}
	};

	var activateResizeHandler = function() {
		var win = $(window),
			doc = $('html'),
			resizeClass = 'resize-active',
			flag, timer;
		var removeClassHandler = function() {
			flag = false;
			doc.removeClass(resizeClass);
		};
		var resizeHandler = function() {
			if(!flag) {
				flag = true;
				doc.addClass(resizeClass);
			}
			clearTimeout(timer);
			timer = setTimeout(removeClassHandler, 500);
		};
		win.on('resize orientationchange', resizeHandler);
	};

	$.fn.mobileNav = function(opt) {
		var args = Array.prototype.slice.call(arguments);
		var method = args[0];

		return this.each(function() {
			var $container = jQuery(this);
			var instance = $container.data('MobileNav');

			if (typeof opt === 'object' || typeof opt === 'undefined') {
				$container.data('MobileNav', new MobileNav($.extend({
					container: this
				}, opt)));
			} else if (typeof method === 'string' && instance) {
				if (typeof instance[method] === 'function') {
					args.shift();
					instance[method].apply(instance, args);
				}
			}
		});
	};
}(jQuery));

/*
 * jQuery Datepicker plugin
 */
;(function($, $win) {

	'use strict';

	var DateMatcher = {
		getMatch: function(source, date) {
			var result = [true, ''];
			var self = this;

			$.each(source, function(key, value) {
				var parsedDate = self.parseDate(key);

				if (parsedDate.valueOf() === date.valueOf()) {
					result = [!value.disabled, value.class || 'active'];
				}
			});

			return result;
		},

		parseDate: function(dateStr) {
			var dateArr = dateStr.split('/');
			return new Date(parseInt(dateArr[2], 10), parseInt(dateArr[1], 10)-1, parseInt(dateArr[0], 10));
		}
	};

	var Datepicker = {
		initSimple: function($el, options) {
			$.Deferred(function(defer) {
				if (options.source) {
					$.getJSON(options.source)
					 .done(defer.resolve)
					 .fail(defer.reject);
				} else defer.resolve();
			}).then(function(source) {
				if (source) {
					options.beforeShowDay = function(date) {
						return DateMatcher.getMatch(source, date);
					};
				}

				$el.datepicker($.extend({
					dateFormat: 'd/mm/yy'
				}, options));
			});
		},
		initRange: function($el, options) {
			var $inputFrom = $el.find('[data-datepicker-from]');
			var $inputTo = $el.find('[data-datepicker-to]');

			this.initSimple($inputFrom, $.extend({}, options, $inputFrom.data('datepickerFrom'), {
				defaultDate: 0,
				onClose: function(selectedDate) {
					$inputTo.datepicker('option', 'minDate', selectedDate);
				}
			}));

			this.initSimple($inputTo, $.extend({}, options, $inputTo.data('datepickerTo'), {
				defaultDate: 1,
				onClose: function(selectedDate) {
					$inputFrom.datepicker('option', 'maxDate', selectedDate);
				}
			}));
		}
	};

	$.fn.uiDatepicker = function(opt) {
		return this.each(function() {
			var $el = $(this);
			var data = $.extend(true, opt || {}, $el.data('datepicker') || {});
			var method = 'init' + (data.rangepicker ? 'Range' : 'Simple');

			Datepicker[method]($el, data);
		});
	};
}(jQuery, jQuery(window)));

/*
 * Add Class on focus
 */
;(function($) {
	function AddFocusClass(options) {
		this.options = $.extend({
			container: null,
			element: ':input',
			focusClass: 'focus',
			stayFocusOnFilled: false
		}, options);
		this.initStructure();
		this.attachEvents();
	}
	AddFocusClass.prototype = {
		initStructure: function() {
			this.container = $(this.options.container);
			this.element = this.container.find(this.options.element);
		},
		attachEvents: function() {
			var self = this;
			this.focusHandler = function() {
				self.container.addClass(self.options.focusClass);
			};
			this.blurHandler = function() {
				if (self.options.stayFocusOnFilled) {
					self.container.toggleClass(self.options.focusClass, !!self.element.val().trim().length);
				} else {
					self.container.removeClass(self.options.focusClass);
				}
			};
			this.blurHandler();
			this.element.on({
				focus: this.focusHandler,
				blur: this.blurHandler
			});
		},
		destroy: function() {
			this.container.removeClass(this.options.focusClass);
			this.element.off({
				focus: this.focusHandler,
				blur: this.blurHandler
			});
		}
	};

	$.fn.addFocusClass = function(options) {
		return this.each(function() {
			var params = $.extend({}, options, {
					container: this
				}),
				instance = new AddFocusClass(params);
			$.data(this, 'AddFocusClass', instance);
		});
	};
}(jQuery));

/*!
 * jQuery UI Core 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/ui-core/
 */
!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e(jQuery)}(function(e){function t(t,n){var s,o,u,r=t.nodeName.toLowerCase();return"area"===r?(s=t.parentNode,o=s.name,t.href&&o&&"map"===s.nodeName.toLowerCase()?(u=e("img[usemap='#"+o+"']")[0],!!u&&i(u)):!1):(/^(input|select|textarea|button|object)$/.test(r)?!t.disabled:"a"===r?t.href||n:n)&&i(t)}function i(t){return e.expr.filters.visible(t)&&!e(t).parents().addBack().filter(function(){return"hidden"===e.css(this,"visibility")}).length}e.ui=e.ui||{},e.extend(e.ui,{version:"1.11.4",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),e.fn.extend({scrollParent:function(t){var i=this.css("position"),n="absolute"===i,s=t?/(auto|scroll|hidden)/:/(auto|scroll)/,o=this.parents().filter(function(){var t=e(this);return n&&"static"===t.css("position")?!1:s.test(t.css("overflow")+t.css("overflow-y")+t.css("overflow-x"))}).eq(0);return"fixed"!==i&&o.length?o:e(this[0].ownerDocument||document)},uniqueId:function(){var e=0;return function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++e)})}}(),removeUniqueId:function(){return this.each(function(){/^ui-id-\d+$/.test(this.id)&&e(this).removeAttr("id")})}}),e.extend(e.expr[":"],{data:e.expr.createPseudo?e.expr.createPseudo(function(t){return function(i){return!!e.data(i,t)}}):function(t,i,n){return!!e.data(t,n[3])},focusable:function(i){return t(i,!isNaN(e.attr(i,"tabindex")))},tabbable:function(i){var n=e.attr(i,"tabindex"),s=isNaN(n);return(s||n>=0)&&t(i,!s)}}),e("<a>").outerWidth(1).jquery||e.each(["Width","Height"],function(t,i){function n(t,i,n,o){return e.each(s,function(){i-=parseFloat(e.css(t,"padding"+this))||0,n&&(i-=parseFloat(e.css(t,"border"+this+"Width"))||0),o&&(i-=parseFloat(e.css(t,"margin"+this))||0)}),i}var s="Width"===i?["Left","Right"]:["Top","Bottom"],o=i.toLowerCase(),u={innerWidth:e.fn.innerWidth,innerHeight:e.fn.innerHeight,outerWidth:e.fn.outerWidth,outerHeight:e.fn.outerHeight};e.fn["inner"+i]=function(t){return void 0===t?u["inner"+i].call(this):this.each(function(){e(this).css(o,n(this,t)+"px")})},e.fn["outer"+i]=function(t,s){return"number"!=typeof t?u["outer"+i].call(this,t):this.each(function(){e(this).css(o,n(this,t,!0,s)+"px")})}}),e.fn.addBack||(e.fn.addBack=function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}),e("<a>").data("a-b","a").removeData("a-b").data("a-b")&&(e.fn.removeData=function(t){return function(i){return arguments.length?t.call(this,e.camelCase(i)):t.call(this)}}(e.fn.removeData)),e.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),e.fn.extend({focus:function(t){return function(i,n){return"number"==typeof i?this.each(function(){var t=this;setTimeout(function(){e(t).focus(),n&&n.call(t)},i)}):t.apply(this,arguments)}}(e.fn.focus),disableSelection:function(){var e="onselectstart"in document.createElement("div")?"selectstart":"mousedown";return function(){return this.bind(e+".ui-disableSelection",function(e){e.preventDefault()})}}(),enableSelection:function(){return this.unbind(".ui-disableSelection")},zIndex:function(t){if(void 0!==t)return this.css("zIndex",t);if(this.length)for(var i,n,s=e(this[0]);s.length&&s[0]!==document;){if(i=s.css("position"),("absolute"===i||"relative"===i||"fixed"===i)&&(n=parseInt(s.css("zIndex"),10),!isNaN(n)&&0!==n))return n;s=s.parent()}return 0}}),e.ui.plugin={add:function(t,i,n){var s,o=e.ui[t].prototype;for(s in n)o.plugins[s]=o.plugins[s]||[],o.plugins[s].push([i,n[s]])},call:function(e,t,i,n){var s,o=e.plugins[t];if(o&&(n||e.element[0].parentNode&&11!==e.element[0].parentNode.nodeType))for(s=0;s<o.length;s++)e.options[o[s][0]]&&o[s][1].apply(e.element,i)}}});

/*!
 * jQuery UI Datepicker 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/datepicker/
 */
!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e(jQuery)}(function(e){function t(e){for(var t,i;e.length&&e[0]!==document;){if(t=e.css("position"),("absolute"===t||"relative"===t||"fixed"===t)&&(i=parseInt(e.css("zIndex"),10),!isNaN(i)&&0!==i))return i;e=e.parent()}return 0}function i(){this._curInst=null,this._keyEvent=!1,this._disabledInputs=[],this._datepickerShowing=!1,this._inDialog=!1,this._mainDivId="ui-datepicker-div",this._inlineClass="ui-datepicker-inline",this._appendClass="ui-datepicker-append",this._triggerClass="ui-datepicker-trigger",this._dialogClass="ui-datepicker-dialog",this._disableClass="ui-datepicker-disabled",this._unselectableClass="ui-datepicker-unselectable",this._currentClass="ui-datepicker-current-day",this._dayOverClass="ui-datepicker-days-cell-over",this.regional=[],this.regional[""]={closeText:"Done",prevText:"Prev",nextText:"Next",currentText:"Today",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],weekHeader:"Wk",dateFormat:"mm/dd/yy",firstDay:0,isRTL:!1,showMonthAfterYear:!1,yearSuffix:""},this._defaults={showOn:"focus",showAnim:"fadeIn",showOptions:{},defaultDate:null,appendText:"",buttonText:"...",buttonImage:"",buttonImageOnly:!1,hideIfNoPrevNext:!1,navigationAsDateFormat:!1,gotoCurrent:!1,changeMonth:!1,changeYear:!1,yearRange:"c-10:c+10",showOtherMonths:!1,selectOtherMonths:!1,showWeek:!1,calculateWeek:this.iso8601Week,shortYearCutoff:"+10",minDate:null,maxDate:null,duration:"fast",beforeShowDay:null,beforeShow:null,onSelect:null,onChangeMonthYear:null,onClose:null,numberOfMonths:1,showCurrentAtPos:0,stepMonths:1,stepBigMonths:12,altField:"",altFormat:"",constrainInput:!0,showButtonPanel:!1,autoSize:!1,disabled:!1},e.extend(this._defaults,this.regional[""]),this.regional.en=e.extend(!0,{},this.regional[""]),this.regional["en-US"]=e.extend(!0,{},this.regional.en),this.dpDiv=s(e("<div id='"+this._mainDivId+"' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))}function s(t){var i="button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";return t.delegate(i,"mouseout",function(){e(this).removeClass("ui-state-hover"),-1!==this.className.indexOf("ui-datepicker-prev")&&e(this).removeClass("ui-datepicker-prev-hover"),-1!==this.className.indexOf("ui-datepicker-next")&&e(this).removeClass("ui-datepicker-next-hover")}).delegate(i,"mouseover",n)}function n(){e.datepicker._isDisabledDatepicker(o.inline?o.dpDiv.parent()[0]:o.input[0])||(e(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"),e(this).addClass("ui-state-hover"),-1!==this.className.indexOf("ui-datepicker-prev")&&e(this).addClass("ui-datepicker-prev-hover"),-1!==this.className.indexOf("ui-datepicker-next")&&e(this).addClass("ui-datepicker-next-hover"))}function a(t,i){e.extend(t,i);for(var s in i)null==i[s]&&(t[s]=i[s]);return t}e.extend(e.ui,{datepicker:{version:"1.11.4"}});var o;e.extend(i.prototype,{markerClassName:"hasDatepicker",maxRows:4,_widgetDatepicker:function(){return this.dpDiv},setDefaults:function(e){return a(this._defaults,e||{}),this},_attachDatepicker:function(t,i){var s,n,a;s=t.nodeName.toLowerCase(),n="div"===s||"span"===s,t.id||(this.uuid+=1,t.id="dp"+this.uuid),a=this._newInst(e(t),n),a.settings=e.extend({},i||{}),"input"===s?this._connectDatepicker(t,a):n&&this._inlineDatepicker(t,a)},_newInst:function(t,i){var n=t[0].id.replace(/([^A-Za-z0-9_\-])/g,"\\\\$1");return{id:n,input:t,selectedDay:0,selectedMonth:0,selectedYear:0,drawMonth:0,drawYear:0,inline:i,dpDiv:i?s(e("<div class='"+this._inlineClass+" ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")):this.dpDiv}},_connectDatepicker:function(t,i){var s=e(t);i.append=e([]),i.trigger=e([]),s.hasClass(this.markerClassName)||(this._attachments(s,i),s.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp),this._autoSize(i),e.data(t,"datepicker",i),i.settings.disabled&&this._disableDatepicker(t))},_attachments:function(t,i){var s,n,a,o=this._get(i,"appendText"),r=this._get(i,"isRTL");i.append&&i.append.remove(),o&&(i.append=e("<span class='"+this._appendClass+"'>"+o+"</span>"),t[r?"before":"after"](i.append)),t.unbind("focus",this._showDatepicker),i.trigger&&i.trigger.remove(),s=this._get(i,"showOn"),("focus"===s||"both"===s)&&t.focus(this._showDatepicker),("button"===s||"both"===s)&&(n=this._get(i,"buttonText"),a=this._get(i,"buttonImage"),i.trigger=e(this._get(i,"buttonImageOnly")?e("<img/>").addClass(this._triggerClass).attr({src:a,alt:n,title:n}):e("<button type='button'></button>").addClass(this._triggerClass).html(a?e("<img/>").attr({src:a,alt:n,title:n}):n)),t[r?"before":"after"](i.trigger),i.trigger.click(function(){return e.datepicker._datepickerShowing&&e.datepicker._lastInput===t[0]?e.datepicker._hideDatepicker():e.datepicker._datepickerShowing&&e.datepicker._lastInput!==t[0]?(e.datepicker._hideDatepicker(),e.datepicker._showDatepicker(t[0])):e.datepicker._showDatepicker(t[0]),!1}))},_autoSize:function(e){if(this._get(e,"autoSize")&&!e.inline){var t,i,s,n,a=new Date(2009,11,20),o=this._get(e,"dateFormat");o.match(/[DM]/)&&(t=function(e){for(i=0,s=0,n=0;n<e.length;n++)e[n].length>i&&(i=e[n].length,s=n);return s},a.setMonth(t(this._get(e,o.match(/MM/)?"monthNames":"monthNamesShort"))),a.setDate(t(this._get(e,o.match(/DD/)?"dayNames":"dayNamesShort"))+20-a.getDay())),e.input.attr("size",this._formatDate(e,a).length)}},_inlineDatepicker:function(t,i){var s=e(t);s.hasClass(this.markerClassName)||(s.addClass(this.markerClassName).append(i.dpDiv),e.data(t,"datepicker",i),this._setDate(i,this._getDefaultDate(i),!0),this._updateDatepicker(i),this._updateAlternate(i),i.settings.disabled&&this._disableDatepicker(t),i.dpDiv.css("display","block"))},_dialogDatepicker:function(t,i,s,n,o){var r,u,l,h,c,d=this._dialogInst;return d||(this.uuid+=1,r="dp"+this.uuid,this._dialogInput=e("<input type='text' id='"+r+"' style='position: absolute; top: -100px; width: 0px;'/>"),this._dialogInput.keydown(this._doKeyDown),e("body").append(this._dialogInput),d=this._dialogInst=this._newInst(this._dialogInput,!1),d.settings={},e.data(this._dialogInput[0],"datepicker",d)),a(d.settings,n||{}),i=i&&i.constructor===Date?this._formatDate(d,i):i,this._dialogInput.val(i),this._pos=o?o.length?o:[o.pageX,o.pageY]:null,this._pos||(u=document.documentElement.clientWidth,l=document.documentElement.clientHeight,h=document.documentElement.scrollLeft||document.body.scrollLeft,c=document.documentElement.scrollTop||document.body.scrollTop,this._pos=[u/2-100+h,l/2-150+c]),this._dialogInput.css("left",this._pos[0]+20+"px").css("top",this._pos[1]+"px"),d.settings.onSelect=s,this._inDialog=!0,this.dpDiv.addClass(this._dialogClass),this._showDatepicker(this._dialogInput[0]),e.blockUI&&e.blockUI(this.dpDiv),e.data(this._dialogInput[0],"datepicker",d),this},_destroyDatepicker:function(t){var i,s=e(t),n=e.data(t,"datepicker");s.hasClass(this.markerClassName)&&(i=t.nodeName.toLowerCase(),e.removeData(t,"datepicker"),"input"===i?(n.append.remove(),n.trigger.remove(),s.removeClass(this.markerClassName).unbind("focus",this._showDatepicker).unbind("keydown",this._doKeyDown).unbind("keypress",this._doKeyPress).unbind("keyup",this._doKeyUp)):("div"===i||"span"===i)&&s.removeClass(this.markerClassName).empty(),o===n&&(o=null))},_enableDatepicker:function(t){var i,s,n=e(t),a=e.data(t,"datepicker");n.hasClass(this.markerClassName)&&(i=t.nodeName.toLowerCase(),"input"===i?(t.disabled=!1,a.trigger.filter("button").each(function(){this.disabled=!1}).end().filter("img").css({opacity:"1.0",cursor:""})):("div"===i||"span"===i)&&(s=n.children("."+this._inlineClass),s.children().removeClass("ui-state-disabled"),s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",!1)),this._disabledInputs=e.map(this._disabledInputs,function(e){return e===t?null:e}))},_disableDatepicker:function(t){var i,s,n=e(t),a=e.data(t,"datepicker");n.hasClass(this.markerClassName)&&(i=t.nodeName.toLowerCase(),"input"===i?(t.disabled=!0,a.trigger.filter("button").each(function(){this.disabled=!0}).end().filter("img").css({opacity:"0.5",cursor:"default"})):("div"===i||"span"===i)&&(s=n.children("."+this._inlineClass),s.children().addClass("ui-state-disabled"),s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",!0)),this._disabledInputs=e.map(this._disabledInputs,function(e){return e===t?null:e}),this._disabledInputs[this._disabledInputs.length]=t)},_isDisabledDatepicker:function(e){if(!e)return!1;for(var t=0;t<this._disabledInputs.length;t++)if(this._disabledInputs[t]===e)return!0;return!1},_getInst:function(t){try{return e.data(t,"datepicker")}catch(i){throw"Missing instance data for this datepicker"}},_optionDatepicker:function(t,i,s){var n,o,r,u,l=this._getInst(t);return 2===arguments.length&&"string"==typeof i?"defaults"===i?e.extend({},e.datepicker._defaults):l?"all"===i?e.extend({},l.settings):this._get(l,i):null:(n=i||{},"string"==typeof i&&(n={},n[i]=s),void(l&&(this._curInst===l&&this._hideDatepicker(),o=this._getDateDatepicker(t,!0),r=this._getMinMaxDate(l,"min"),u=this._getMinMaxDate(l,"max"),a(l.settings,n),null!==r&&void 0!==n.dateFormat&&void 0===n.minDate&&(l.settings.minDate=this._formatDate(l,r)),null!==u&&void 0!==n.dateFormat&&void 0===n.maxDate&&(l.settings.maxDate=this._formatDate(l,u)),"disabled"in n&&(n.disabled?this._disableDatepicker(t):this._enableDatepicker(t)),this._attachments(e(t),l),this._autoSize(l),this._setDate(l,o),this._updateAlternate(l),this._updateDatepicker(l))))},_changeDatepicker:function(e,t,i){this._optionDatepicker(e,t,i)},_refreshDatepicker:function(e){var t=this._getInst(e);t&&this._updateDatepicker(t)},_setDateDatepicker:function(e,t){var i=this._getInst(e);i&&(this._setDate(i,t),this._updateDatepicker(i),this._updateAlternate(i))},_getDateDatepicker:function(e,t){var i=this._getInst(e);return i&&!i.inline&&this._setDateFromField(i,t),i?this._getDate(i):null},_doKeyDown:function(t){var i,s,n,a=e.datepicker._getInst(t.target),o=!0,r=a.dpDiv.is(".ui-datepicker-rtl");if(a._keyEvent=!0,e.datepicker._datepickerShowing)switch(t.keyCode){case 9:e.datepicker._hideDatepicker(),o=!1;break;case 13:return n=e("td."+e.datepicker._dayOverClass+":not(."+e.datepicker._currentClass+")",a.dpDiv),n[0]&&e.datepicker._selectDay(t.target,a.selectedMonth,a.selectedYear,n[0]),i=e.datepicker._get(a,"onSelect"),i?(s=e.datepicker._formatDate(a),i.apply(a.input?a.input[0]:null,[s,a])):e.datepicker._hideDatepicker(),!1;case 27:e.datepicker._hideDatepicker();break;case 33:e.datepicker._adjustDate(t.target,t.ctrlKey?-e.datepicker._get(a,"stepBigMonths"):-e.datepicker._get(a,"stepMonths"),"M");break;case 34:e.datepicker._adjustDate(t.target,t.ctrlKey?+e.datepicker._get(a,"stepBigMonths"):+e.datepicker._get(a,"stepMonths"),"M");break;case 35:(t.ctrlKey||t.metaKey)&&e.datepicker._clearDate(t.target),o=t.ctrlKey||t.metaKey;break;case 36:(t.ctrlKey||t.metaKey)&&e.datepicker._gotoToday(t.target),o=t.ctrlKey||t.metaKey;break;case 37:(t.ctrlKey||t.metaKey)&&e.datepicker._adjustDate(t.target,r?1:-1,"D"),o=t.ctrlKey||t.metaKey,t.originalEvent.altKey&&e.datepicker._adjustDate(t.target,t.ctrlKey?-e.datepicker._get(a,"stepBigMonths"):-e.datepicker._get(a,"stepMonths"),"M");break;case 38:(t.ctrlKey||t.metaKey)&&e.datepicker._adjustDate(t.target,-7,"D"),o=t.ctrlKey||t.metaKey;break;case 39:(t.ctrlKey||t.metaKey)&&e.datepicker._adjustDate(t.target,r?-1:1,"D"),o=t.ctrlKey||t.metaKey,t.originalEvent.altKey&&e.datepicker._adjustDate(t.target,t.ctrlKey?+e.datepicker._get(a,"stepBigMonths"):+e.datepicker._get(a,"stepMonths"),"M");break;case 40:(t.ctrlKey||t.metaKey)&&e.datepicker._adjustDate(t.target,7,"D"),o=t.ctrlKey||t.metaKey;break;default:o=!1}else 36===t.keyCode&&t.ctrlKey?e.datepicker._showDatepicker(this):o=!1;o&&(t.preventDefault(),t.stopPropagation())},_doKeyPress:function(t){var i,s,n=e.datepicker._getInst(t.target);return e.datepicker._get(n,"constrainInput")?(i=e.datepicker._possibleChars(e.datepicker._get(n,"dateFormat")),s=String.fromCharCode(null==t.charCode?t.keyCode:t.charCode),t.ctrlKey||t.metaKey||" ">s||!i||i.indexOf(s)>-1):void 0},_doKeyUp:function(t){var i,s=e.datepicker._getInst(t.target);if(s.input.val()!==s.lastVal)try{i=e.datepicker.parseDate(e.datepicker._get(s,"dateFormat"),s.input?s.input.val():null,e.datepicker._getFormatConfig(s)),i&&(e.datepicker._setDateFromField(s),e.datepicker._updateAlternate(s),e.datepicker._updateDatepicker(s))}catch(n){}return!0},_showDatepicker:function(i){if(i=i.target||i,"input"!==i.nodeName.toLowerCase()&&(i=e("input",i.parentNode)[0]),!e.datepicker._isDisabledDatepicker(i)&&e.datepicker._lastInput!==i){var s,n,o,r,u,l,h;s=e.datepicker._getInst(i),e.datepicker._curInst&&e.datepicker._curInst!==s&&(e.datepicker._curInst.dpDiv.stop(!0,!0),s&&e.datepicker._datepickerShowing&&e.datepicker._hideDatepicker(e.datepicker._curInst.input[0])),n=e.datepicker._get(s,"beforeShow"),o=n?n.apply(i,[i,s]):{},o!==!1&&(a(s.settings,o),s.lastVal=null,e.datepicker._lastInput=i,e.datepicker._setDateFromField(s),e.datepicker._inDialog&&(i.value=""),e.datepicker._pos||(e.datepicker._pos=e.datepicker._findPos(i),e.datepicker._pos[1]+=i.offsetHeight),r=!1,e(i).parents().each(function(){return r|="fixed"===e(this).css("position"),!r}),u={left:e.datepicker._pos[0],top:e.datepicker._pos[1]},e.datepicker._pos=null,s.dpDiv.empty(),s.dpDiv.css({position:"absolute",display:"block",top:"-1000px"}),e.datepicker._updateDatepicker(s),u=e.datepicker._checkOffset(s,u,r),s.dpDiv.css({position:e.datepicker._inDialog&&e.blockUI?"static":r?"fixed":"absolute",display:"none",left:u.left+"px",top:u.top+"px"}),s.inline||(l=e.datepicker._get(s,"showAnim"),h=e.datepicker._get(s,"duration"),s.dpDiv.css("z-index",t(e(i))+1),e.datepicker._datepickerShowing=!0,e.effects&&e.effects.effect[l]?s.dpDiv.show(l,e.datepicker._get(s,"showOptions"),h):s.dpDiv[l||"show"](l?h:null),e.datepicker._shouldFocusInput(s)&&s.input.focus(),e.datepicker._curInst=s))}},_updateDatepicker:function(t){this.maxRows=4,o=t,t.dpDiv.empty().append(this._generateHTML(t)),this._attachHandlers(t);var i,s=this._getNumberOfMonths(t),a=s[1],r=17,u=t.dpDiv.find("."+this._dayOverClass+" a");u.length>0&&n.apply(u.get(0)),t.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""),a>1&&t.dpDiv.addClass("ui-datepicker-multi-"+a).css("width",r*a+"em"),t.dpDiv[(1!==s[0]||1!==s[1]?"add":"remove")+"Class"]("ui-datepicker-multi"),t.dpDiv[(this._get(t,"isRTL")?"add":"remove")+"Class"]("ui-datepicker-rtl"),t===e.datepicker._curInst&&e.datepicker._datepickerShowing&&e.datepicker._shouldFocusInput(t)&&t.input.focus(),t.yearshtml&&(i=t.yearshtml,setTimeout(function(){i===t.yearshtml&&t.yearshtml&&t.dpDiv.find("select.ui-datepicker-year:first").replaceWith(t.yearshtml),i=t.yearshtml=null},0))},_shouldFocusInput:function(e){return e.input&&e.input.is(":visible")&&!e.input.is(":disabled")&&!e.input.is(":focus")},_checkOffset:function(t,i,s){var n=t.dpDiv.outerWidth(),a=t.dpDiv.outerHeight(),o=t.input?t.input.outerWidth():0,r=t.input?t.input.outerHeight():0,u=document.documentElement.clientWidth+(s?0:e(document).scrollLeft()),l=document.documentElement.clientHeight+(s?0:e(document).scrollTop());return i.left-=this._get(t,"isRTL")?n-o:0,i.left-=s&&i.left===t.input.offset().left?e(document).scrollLeft():0,i.top-=s&&i.top===t.input.offset().top+r?e(document).scrollTop():0,i.left-=Math.min(i.left,i.left+n>u&&u>n?Math.abs(i.left+n-u):0),i.top-=Math.min(i.top,i.top+a>l&&l>a?Math.abs(a+r):0),i},_findPos:function(t){for(var i,s=this._getInst(t),n=this._get(s,"isRTL");t&&("hidden"===t.type||1!==t.nodeType||e.expr.filters.hidden(t));)t=t[n?"previousSibling":"nextSibling"];return i=e(t).offset(),[i.left,i.top]},_hideDatepicker:function(t){var i,s,n,a,o=this._curInst;!o||t&&o!==e.data(t,"datepicker")||this._datepickerShowing&&(i=this._get(o,"showAnim"),s=this._get(o,"duration"),n=function(){e.datepicker._tidyDialog(o)},e.effects&&(e.effects.effect[i]||e.effects[i])?o.dpDiv.hide(i,e.datepicker._get(o,"showOptions"),s,n):o.dpDiv["slideDown"===i?"slideUp":"fadeIn"===i?"fadeOut":"hide"](i?s:null,n),i||n(),this._datepickerShowing=!1,a=this._get(o,"onClose"),a&&a.apply(o.input?o.input[0]:null,[o.input?o.input.val():"",o]),this._lastInput=null,this._inDialog&&(this._dialogInput.css({position:"absolute",left:"0",top:"-100px"}),e.blockUI&&(e.unblockUI(),e("body").append(this.dpDiv))),this._inDialog=!1)},_tidyDialog:function(e){e.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")},_checkExternalClick:function(t){if(e.datepicker._curInst){var i=e(t.target),s=e.datepicker._getInst(i[0]);(i[0].id!==e.datepicker._mainDivId&&0===i.parents("#"+e.datepicker._mainDivId).length&&!i.hasClass(e.datepicker.markerClassName)&&!i.closest("."+e.datepicker._triggerClass).length&&e.datepicker._datepickerShowing&&(!e.datepicker._inDialog||!e.blockUI)||i.hasClass(e.datepicker.markerClassName)&&e.datepicker._curInst!==s)&&e.datepicker._hideDatepicker()}},_adjustDate:function(t,i,s){var n=e(t),a=this._getInst(n[0]);this._isDisabledDatepicker(n[0])||(this._adjustInstDate(a,i+("M"===s?this._get(a,"showCurrentAtPos"):0),s),this._updateDatepicker(a))},_gotoToday:function(t){var i,s=e(t),n=this._getInst(s[0]);this._get(n,"gotoCurrent")&&n.currentDay?(n.selectedDay=n.currentDay,n.drawMonth=n.selectedMonth=n.currentMonth,n.drawYear=n.selectedYear=n.currentYear):(i=new Date,n.selectedDay=i.getDate(),n.drawMonth=n.selectedMonth=i.getMonth(),n.drawYear=n.selectedYear=i.getFullYear()),this._notifyChange(n),this._adjustDate(s)},_selectMonthYear:function(t,i,s){var n=e(t),a=this._getInst(n[0]);a["selected"+("M"===s?"Month":"Year")]=a["draw"+("M"===s?"Month":"Year")]=parseInt(i.options[i.selectedIndex].value,10),this._notifyChange(a),this._adjustDate(n)},_selectDay:function(t,i,s,n){var a,o=e(t);e(n).hasClass(this._unselectableClass)||this._isDisabledDatepicker(o[0])||(a=this._getInst(o[0]),a.selectedDay=a.currentDay=e("a",n).html(),a.selectedMonth=a.currentMonth=i,a.selectedYear=a.currentYear=s,this._selectDate(t,this._formatDate(a,a.currentDay,a.currentMonth,a.currentYear)))},_clearDate:function(t){var i=e(t);this._selectDate(i,"")},_selectDate:function(t,i){var s,n=e(t),a=this._getInst(n[0]);i=null!=i?i:this._formatDate(a),a.input&&a.input.val(i),this._updateAlternate(a),s=this._get(a,"onSelect"),s?s.apply(a.input?a.input[0]:null,[i,a]):a.input&&a.input.trigger("change"),a.inline?this._updateDatepicker(a):(this._hideDatepicker(),this._lastInput=a.input[0],"object"!=typeof a.input[0]&&a.input.focus(),this._lastInput=null)},_updateAlternate:function(t){var i,s,n,a=this._get(t,"altField");a&&(i=this._get(t,"altFormat")||this._get(t,"dateFormat"),s=this._getDate(t),n=this.formatDate(i,s,this._getFormatConfig(t)),e(a).each(function(){e(this).val(n)}))},noWeekends:function(e){var t=e.getDay();return[t>0&&6>t,""]},iso8601Week:function(e){var t,i=new Date(e.getTime());return i.setDate(i.getDate()+4-(i.getDay()||7)),t=i.getTime(),i.setMonth(0),i.setDate(1),Math.floor(Math.round((t-i)/864e5)/7)+1},parseDate:function(t,i,s){if(null==t||null==i)throw"Invalid arguments";if(i="object"==typeof i?""+i:i+"",""===i)return null;var n,a,o,r,u=0,l=(s?s.shortYearCutoff:null)||this._defaults.shortYearCutoff,h="string"!=typeof l?l:(new Date).getFullYear()%100+parseInt(l,10),c=(s?s.dayNamesShort:null)||this._defaults.dayNamesShort,d=(s?s.dayNames:null)||this._defaults.dayNames,p=(s?s.monthNamesShort:null)||this._defaults.monthNamesShort,m=(s?s.monthNames:null)||this._defaults.monthNames,v=-1,g=-1,f=-1,_=-1,y=!1,k=function(e){var i=n+1<t.length&&t.charAt(n+1)===e;return i&&n++,i},b=function(e){var t=k(e),s="@"===e?14:"!"===e?20:"y"===e&&t?4:"o"===e?3:2,n="y"===e?s:1,a=RegExp("^\\d{"+n+","+s+"}"),o=i.substring(u).match(a);if(!o)throw"Missing number at position "+u;return u+=o[0].length,parseInt(o[0],10)},D=function(t,s,n){var a=-1,o=e.map(k(t)?n:s,function(e,t){return[[t,e]]}).sort(function(e,t){return-(e[1].length-t[1].length)});if(e.each(o,function(e,t){var s=t[1];return i.substr(u,s.length).toLowerCase()===s.toLowerCase()?(a=t[0],u+=s.length,!1):void 0}),-1!==a)return a+1;throw"Unknown name at position "+u},x=function(){if(i.charAt(u)!==t.charAt(n))throw"Unexpected literal at position "+u;u++};for(n=0;n<t.length;n++)if(y)"'"!==t.charAt(n)||k("'")?x():y=!1;else switch(t.charAt(n)){case"d":f=b("d");break;case"D":D("D",c,d);break;case"o":_=b("o");break;case"m":g=b("m");break;case"M":g=D("M",p,m);break;case"y":v=b("y");break;case"@":r=new Date(b("@")),v=r.getFullYear(),g=r.getMonth()+1,f=r.getDate();break;case"!":r=new Date((b("!")-this._ticksTo1970)/1e4),v=r.getFullYear(),g=r.getMonth()+1,f=r.getDate();break;case"'":k("'")?x():y=!0;break;default:x()}if(u<i.length&&(o=i.substr(u),!/^\s+/.test(o)))throw"Extra/unparsed characters found in date: "+o;if(-1===v?v=(new Date).getFullYear():100>v&&(v+=(new Date).getFullYear()-(new Date).getFullYear()%100+(v>h?-100:0)),_>-1)for(g=1,f=_;;){if(a=this._getDaysInMonth(v,g-1),a>=f)break;g++,f-=a}if(r=this._daylightSavingAdjust(new Date(v,g-1,f)),r.getFullYear()!==v||r.getMonth()+1!==g||r.getDate()!==f)throw"Invalid date";return r},ATOM:"yy-mm-dd",COOKIE:"D, dd M yy",ISO_8601:"yy-mm-dd",RFC_822:"D, d M y",RFC_850:"DD, dd-M-y",RFC_1036:"D, d M y",RFC_1123:"D, d M yy",RFC_2822:"D, d M yy",RSS:"D, d M y",TICKS:"!",TIMESTAMP:"@",W3C:"yy-mm-dd",_ticksTo1970:24*(718685+Math.floor(492.5)-Math.floor(19.7)+Math.floor(4.925))*60*60*1e7,formatDate:function(e,t,i){if(!t)return"";var s,n=(i?i.dayNamesShort:null)||this._defaults.dayNamesShort,a=(i?i.dayNames:null)||this._defaults.dayNames,o=(i?i.monthNamesShort:null)||this._defaults.monthNamesShort,r=(i?i.monthNames:null)||this._defaults.monthNames,u=function(t){var i=s+1<e.length&&e.charAt(s+1)===t;return i&&s++,i},l=function(e,t,i){var s=""+t;if(u(e))for(;s.length<i;)s="0"+s;return s},h=function(e,t,i,s){return u(e)?s[t]:i[t]},c="",d=!1;if(t)for(s=0;s<e.length;s++)if(d)"'"!==e.charAt(s)||u("'")?c+=e.charAt(s):d=!1;else switch(e.charAt(s)){case"d":c+=l("d",t.getDate(),2);break;case"D":c+=h("D",t.getDay(),n,a);break;case"o":c+=l("o",Math.round((new Date(t.getFullYear(),t.getMonth(),t.getDate()).getTime()-new Date(t.getFullYear(),0,0).getTime())/864e5),3);break;case"m":c+=l("m",t.getMonth()+1,2);break;case"M":c+=h("M",t.getMonth(),o,r);break;case"y":c+=u("y")?t.getFullYear():(t.getYear()%100<10?"0":"")+t.getYear()%100;break;case"@":c+=t.getTime();break;case"!":c+=1e4*t.getTime()+this._ticksTo1970;break;case"'":u("'")?c+="'":d=!0;break;default:c+=e.charAt(s)}return c},_possibleChars:function(e){var t,i="",s=!1,n=function(i){var s=t+1<e.length&&e.charAt(t+1)===i;return s&&t++,s};for(t=0;t<e.length;t++)if(s)"'"!==e.charAt(t)||n("'")?i+=e.charAt(t):s=!1;else switch(e.charAt(t)){case"d":case"m":case"y":case"@":i+="0123456789";break;case"D":case"M":return null;case"'":n("'")?i+="'":s=!0;break;default:i+=e.charAt(t)}return i},_get:function(e,t){return void 0!==e.settings[t]?e.settings[t]:this._defaults[t]},_setDateFromField:function(e,t){if(e.input.val()!==e.lastVal){var i=this._get(e,"dateFormat"),s=e.lastVal=e.input?e.input.val():null,n=this._getDefaultDate(e),a=n,o=this._getFormatConfig(e);try{a=this.parseDate(i,s,o)||n}catch(r){s=t?"":s}e.selectedDay=a.getDate(),e.drawMonth=e.selectedMonth=a.getMonth(),e.drawYear=e.selectedYear=a.getFullYear(),e.currentDay=s?a.getDate():0,e.currentMonth=s?a.getMonth():0,e.currentYear=s?a.getFullYear():0,this._adjustInstDate(e)}},_getDefaultDate:function(e){return this._restrictMinMax(e,this._determineDate(e,this._get(e,"defaultDate"),new Date))},_determineDate:function(t,i,s){var n=function(e){var t=new Date;return t.setDate(t.getDate()+e),t},a=function(i){try{return e.datepicker.parseDate(e.datepicker._get(t,"dateFormat"),i,e.datepicker._getFormatConfig(t))}catch(s){}for(var n=(i.toLowerCase().match(/^c/)?e.datepicker._getDate(t):null)||new Date,a=n.getFullYear(),o=n.getMonth(),r=n.getDate(),u=/([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,l=u.exec(i);l;){switch(l[2]||"d"){case"d":case"D":r+=parseInt(l[1],10);break;case"w":case"W":r+=7*parseInt(l[1],10);break;case"m":case"M":o+=parseInt(l[1],10),r=Math.min(r,e.datepicker._getDaysInMonth(a,o));break;case"y":case"Y":a+=parseInt(l[1],10),r=Math.min(r,e.datepicker._getDaysInMonth(a,o))}l=u.exec(i)}return new Date(a,o,r)},o=null==i||""===i?s:"string"==typeof i?a(i):"number"==typeof i?isNaN(i)?s:n(i):new Date(i.getTime());return o=o&&""+o=="Invalid Date"?s:o,o&&(o.setHours(0),o.setMinutes(0),o.setSeconds(0),o.setMilliseconds(0)),this._daylightSavingAdjust(o)},_daylightSavingAdjust:function(e){return e?(e.setHours(e.getHours()>12?e.getHours()+2:0),e):null},_setDate:function(e,t,i){var s=!t,n=e.selectedMonth,a=e.selectedYear,o=this._restrictMinMax(e,this._determineDate(e,t,new Date));e.selectedDay=e.currentDay=o.getDate(),e.drawMonth=e.selectedMonth=e.currentMonth=o.getMonth(),e.drawYear=e.selectedYear=e.currentYear=o.getFullYear(),n===e.selectedMonth&&a===e.selectedYear||i||this._notifyChange(e),this._adjustInstDate(e),e.input&&e.input.val(s?"":this._formatDate(e))},_getDate:function(e){var t=!e.currentYear||e.input&&""===e.input.val()?null:this._daylightSavingAdjust(new Date(e.currentYear,e.currentMonth,e.currentDay));return t},_attachHandlers:function(t){var i=this._get(t,"stepMonths"),s="#"+t.id.replace(/\\\\/g,"\\");t.dpDiv.find("[data-handler]").map(function(){var t={prev:function(){e.datepicker._adjustDate(s,-i,"M")},next:function(){e.datepicker._adjustDate(s,+i,"M")},hide:function(){e.datepicker._hideDatepicker()},today:function(){e.datepicker._gotoToday(s)},selectDay:function(){return e.datepicker._selectDay(s,+this.getAttribute("data-month"),+this.getAttribute("data-year"),this),!1},selectMonth:function(){return e.datepicker._selectMonthYear(s,this,"M"),!1},selectYear:function(){return e.datepicker._selectMonthYear(s,this,"Y"),!1}};e(this).bind(this.getAttribute("data-event"),t[this.getAttribute("data-handler")])})},_generateHTML:function(e){var t,i,s,n,a,o,r,u,l,h,c,d,p,m,v,g,f,_,y,k,b,D,x,w,M,T,I,C,E,N,A,S,P,R,L,F,O,j,W,Y=new Date,K=this._daylightSavingAdjust(new Date(Y.getFullYear(),Y.getMonth(),Y.getDate())),q=this._get(e,"isRTL"),B=this._get(e,"showButtonPanel"),U=this._get(e,"hideIfNoPrevNext"),z=this._get(e,"navigationAsDateFormat"),G=this._getNumberOfMonths(e),H=this._get(e,"showCurrentAtPos"),$=this._get(e,"stepMonths"),Q=1!==G[0]||1!==G[1],J=this._daylightSavingAdjust(e.currentDay?new Date(e.currentYear,e.currentMonth,e.currentDay):new Date(9999,9,9)),V=this._getMinMaxDate(e,"min"),X=this._getMinMaxDate(e,"max"),Z=e.drawMonth-H,et=e.drawYear;if(0>Z&&(Z+=12,et--),X)for(t=this._daylightSavingAdjust(new Date(X.getFullYear(),X.getMonth()-G[0]*G[1]+1,X.getDate())),t=V&&V>t?V:t;this._daylightSavingAdjust(new Date(et,Z,1))>t;)Z--,0>Z&&(Z=11,et--);for(e.drawMonth=Z,e.drawYear=et,i=this._get(e,"prevText"),i=z?this.formatDate(i,this._daylightSavingAdjust(new Date(et,Z-$,1)),this._getFormatConfig(e)):i,s=this._canAdjustMonth(e,-1,et,Z)?"<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='"+i+"'><span class='ui-icon ui-icon-circle-triangle-"+(q?"e":"w")+"'>"+i+"</span></a>":U?"":"<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='"+i+"'><span class='ui-icon ui-icon-circle-triangle-"+(q?"e":"w")+"'>"+i+"</span></a>",n=this._get(e,"nextText"),n=z?this.formatDate(n,this._daylightSavingAdjust(new Date(et,Z+$,1)),this._getFormatConfig(e)):n,a=this._canAdjustMonth(e,1,et,Z)?"<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='"+n+"'><span class='ui-icon ui-icon-circle-triangle-"+(q?"w":"e")+"'>"+n+"</span></a>":U?"":"<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='"+n+"'><span class='ui-icon ui-icon-circle-triangle-"+(q?"w":"e")+"'>"+n+"</span></a>",o=this._get(e,"currentText"),r=this._get(e,"gotoCurrent")&&e.currentDay?J:K,o=z?this.formatDate(o,r,this._getFormatConfig(e)):o,u=e.inline?"":"<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>"+this._get(e,"closeText")+"</button>",l=B?"<div class='ui-datepicker-buttonpane ui-widget-content'>"+(q?u:"")+(this._isInRange(e,r)?"<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>"+o+"</button>":"")+(q?"":u)+"</div>":"",h=parseInt(this._get(e,"firstDay"),10),h=isNaN(h)?0:h,c=this._get(e,"showWeek"),d=this._get(e,"dayNames"),p=this._get(e,"dayNamesMin"),m=this._get(e,"monthNames"),v=this._get(e,"monthNamesShort"),g=this._get(e,"beforeShowDay"),f=this._get(e,"showOtherMonths"),_=this._get(e,"selectOtherMonths"),y=this._getDefaultDate(e),k="",D=0;D<G[0];D++){for(x="",this.maxRows=4,w=0;w<G[1];w++){if(M=this._daylightSavingAdjust(new Date(et,Z,e.selectedDay)),T=" ui-corner-all",I="",Q){if(I+="<div class='ui-datepicker-group",G[1]>1)switch(w){case 0:I+=" ui-datepicker-group-first",T=" ui-corner-"+(q?"right":"left");break;case G[1]-1:I+=" ui-datepicker-group-last",T=" ui-corner-"+(q?"left":"right");break;default:I+=" ui-datepicker-group-middle",T=""}I+="'>"}for(I+="<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix"+T+"'>"+(/all|left/.test(T)&&0===D?q?a:s:"")+(/all|right/.test(T)&&0===D?q?s:a:"")+this._generateMonthYearHeader(e,Z,et,V,X,D>0||w>0,m,v)+"</div><table class='ui-datepicker-calendar'><thead><tr>",C=c?"<th class='ui-datepicker-week-col'>"+this._get(e,"weekHeader")+"</th>":"",b=0;7>b;b++)E=(b+h)%7,C+="<th scope='col'"+(5>(b+h+6)%7?"":" class='ui-datepicker-week-end'")+"><span title='"+d[E]+"'>"+p[E]+"</span></th>";for(I+=C+"</tr></thead><tbody>",N=this._getDaysInMonth(et,Z),et===e.selectedYear&&Z===e.selectedMonth&&(e.selectedDay=Math.min(e.selectedDay,N)),A=(this._getFirstDayOfMonth(et,Z)-h+7)%7,S=Math.ceil((A+N)/7),P=Q&&this.maxRows>S?this.maxRows:S,this.maxRows=P,R=this._daylightSavingAdjust(new Date(et,Z,1-A)),L=0;P>L;L++){for(I+="<tr>",F=c?"<td class='ui-datepicker-week-col'>"+this._get(e,"calculateWeek")(R)+"</td>":"",b=0;7>b;b++)O=g?g.apply(e.input?e.input[0]:null,[R]):[!0,""],j=R.getMonth()!==Z,W=j&&!_||!O[0]||V&&V>R||X&&R>X,F+="<td class='"+(5>(b+h+6)%7?"":" ui-datepicker-week-end")+(j?" ui-datepicker-other-month":"")+(R.getTime()===M.getTime()&&Z===e.selectedMonth&&e._keyEvent||y.getTime()===R.getTime()&&y.getTime()===M.getTime()?" "+this._dayOverClass:"")+(W?" "+this._unselectableClass+" ui-state-disabled":"")+(j&&!f?"":" "+O[1]+(R.getTime()===J.getTime()?" "+this._currentClass:"")+(R.getTime()===K.getTime()?" ui-datepicker-today":""))+"'"+(j&&!f||!O[2]?"":" title='"+O[2].replace(/'/g,"&#39;")+"'")+(W?"":" data-handler='selectDay' data-event='click' data-month='"+R.getMonth()+"' data-year='"+R.getFullYear()+"'")+">"+(j&&!f?"&#xa0;":W?"<span class='ui-state-default'>"+R.getDate()+"</span>":"<a class='ui-state-default"+(R.getTime()===K.getTime()?" ui-state-highlight":"")+(R.getTime()===J.getTime()?" ui-state-active":"")+(j?" ui-priority-secondary":"")+"' href='#'>"+R.getDate()+"</a>")+"</td>",R.setDate(R.getDate()+1),R=this._daylightSavingAdjust(R);I+=F+"</tr>"}Z++,Z>11&&(Z=0,et++),I+="</tbody></table>"+(Q?"</div>"+(G[0]>0&&w===G[1]-1?"<div class='ui-datepicker-row-break'></div>":""):""),x+=I}k+=x}return k+=l,e._keyEvent=!1,k},_generateMonthYearHeader:function(e,t,i,s,n,a,o,r){var u,l,h,c,d,p,m,v,g=this._get(e,"changeMonth"),f=this._get(e,"changeYear"),_=this._get(e,"showMonthAfterYear"),y="<div class='ui-datepicker-title'>",k="";if(a||!g)k+="<span class='ui-datepicker-month'>"+o[t]+"</span>";
else{for(u=s&&s.getFullYear()===i,l=n&&n.getFullYear()===i,k+="<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>",h=0;12>h;h++)u&&h<s.getMonth()||l&&h>n.getMonth()||(k+="<option value='"+h+"'"+(h===t?" selected='selected'":"")+">"+r[h]+"</option>");k+="</select>"}if(_||(y+=k+(!a&&g&&f?"":"&#xa0;")),!e.yearshtml)if(e.yearshtml="",a||!f)y+="<span class='ui-datepicker-year'>"+i+"</span>";else{for(c=this._get(e,"yearRange").split(":"),d=(new Date).getFullYear(),p=function(e){var t=e.match(/c[+\-].*/)?i+parseInt(e.substring(1),10):e.match(/[+\-].*/)?d+parseInt(e,10):parseInt(e,10);return isNaN(t)?d:t},m=p(c[0]),v=Math.max(m,p(c[1]||"")),m=s?Math.max(m,s.getFullYear()):m,v=n?Math.min(v,n.getFullYear()):v,e.yearshtml+="<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>";v>=m;m++)e.yearshtml+="<option value='"+m+"'"+(m===i?" selected='selected'":"")+">"+m+"</option>";e.yearshtml+="</select>",y+=e.yearshtml,e.yearshtml=null}return y+=this._get(e,"yearSuffix"),_&&(y+=(!a&&g&&f?"":"&#xa0;")+k),y+="</div>"},_adjustInstDate:function(e,t,i){var s=e.drawYear+("Y"===i?t:0),n=e.drawMonth+("M"===i?t:0),a=Math.min(e.selectedDay,this._getDaysInMonth(s,n))+("D"===i?t:0),o=this._restrictMinMax(e,this._daylightSavingAdjust(new Date(s,n,a)));e.selectedDay=o.getDate(),e.drawMonth=e.selectedMonth=o.getMonth(),e.drawYear=e.selectedYear=o.getFullYear(),("M"===i||"Y"===i)&&this._notifyChange(e)},_restrictMinMax:function(e,t){var i=this._getMinMaxDate(e,"min"),s=this._getMinMaxDate(e,"max"),n=i&&i>t?i:t;return s&&n>s?s:n},_notifyChange:function(e){var t=this._get(e,"onChangeMonthYear");t&&t.apply(e.input?e.input[0]:null,[e.selectedYear,e.selectedMonth+1,e])},_getNumberOfMonths:function(e){var t=this._get(e,"numberOfMonths");return null==t?[1,1]:"number"==typeof t?[1,t]:t},_getMinMaxDate:function(e,t){return this._determineDate(e,this._get(e,t+"Date"),null)},_getDaysInMonth:function(e,t){return 32-this._daylightSavingAdjust(new Date(e,t,32)).getDate()},_getFirstDayOfMonth:function(e,t){return new Date(e,t,1).getDay()},_canAdjustMonth:function(e,t,i,s){var n=this._getNumberOfMonths(e),a=this._daylightSavingAdjust(new Date(i,s+(0>t?t:n[0]*n[1]),1));return 0>t&&a.setDate(this._getDaysInMonth(a.getFullYear(),a.getMonth())),this._isInRange(e,a)},_isInRange:function(e,t){var i,s,n=this._getMinMaxDate(e,"min"),a=this._getMinMaxDate(e,"max"),o=null,r=null,u=this._get(e,"yearRange");return u&&(i=u.split(":"),s=(new Date).getFullYear(),o=parseInt(i[0],10),r=parseInt(i[1],10),i[0].match(/[+\-].*/)&&(o+=s),i[1].match(/[+\-].*/)&&(r+=s)),!(n&&t.getTime()<n.getTime()||a&&t.getTime()>a.getTime()||o&&t.getFullYear()<o||r&&t.getFullYear()>r)},_getFormatConfig:function(e){var t=this._get(e,"shortYearCutoff");return t="string"!=typeof t?t:(new Date).getFullYear()%100+parseInt(t,10),{shortYearCutoff:t,dayNamesShort:this._get(e,"dayNamesShort"),dayNames:this._get(e,"dayNames"),monthNamesShort:this._get(e,"monthNamesShort"),monthNames:this._get(e,"monthNames")}},_formatDate:function(e,t,i,s){t||(e.currentDay=e.selectedDay,e.currentMonth=e.selectedMonth,e.currentYear=e.selectedYear);var n=t?"object"==typeof t?t:this._daylightSavingAdjust(new Date(s,i,t)):this._daylightSavingAdjust(new Date(e.currentYear,e.currentMonth,e.currentDay));return this.formatDate(this._get(e,"dateFormat"),n,this._getFormatConfig(e))}}),e.fn.datepicker=function(t){if(!this.length)return this;e.datepicker.initialized||(e(document).mousedown(e.datepicker._checkExternalClick),e.datepicker.initialized=!0),0===e("#"+e.datepicker._mainDivId).length&&e("body").append(e.datepicker.dpDiv);var i=Array.prototype.slice.call(arguments,1);return"string"!=typeof t||"isDisabled"!==t&&"getDate"!==t&&"widget"!==t?"option"===t&&2===arguments.length&&"string"==typeof arguments[1]?e.datepicker["_"+t+"Datepicker"].apply(e.datepicker,[this[0]].concat(i)):this.each(function(){"string"==typeof t?e.datepicker["_"+t+"Datepicker"].apply(e.datepicker,[this].concat(i)):e.datepicker._attachDatepicker(this,t)}):e.datepicker["_"+t+"Datepicker"].apply(e.datepicker,[this[0]].concat(i))},e.datepicker=new i,e.datepicker.initialized=!1,e.datepicker.uuid=(new Date).getTime(),e.datepicker.version="1.11.4";e.datepicker});

/*!
 * JavaScript Custom Forms
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.1.3
 */
;(function(root, factory) {

	'use strict';
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		module.exports = factory(require('jquery'));
	} else {
		root.jcf = factory(jQuery);
	}
}(this, function($) {

	'use strict';

	// define version
	var version = '1.1.3';

	// private variables
	var customInstances = [];

	// default global options
	var commonOptions = {
		optionsKey: 'jcf',
		dataKey: 'jcf-instance',
		rtlClass: 'jcf-rtl',
		focusClass: 'jcf-focus',
		pressedClass: 'jcf-pressed',
		disabledClass: 'jcf-disabled',
		hiddenClass: 'jcf-hidden',
		resetAppearanceClass: 'jcf-reset-appearance',
		unselectableClass: 'jcf-unselectable'
	};

	// detect device type
	var isTouchDevice = ('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch,
		isWinPhoneDevice = /Windows Phone/.test(navigator.userAgent);
	commonOptions.isMobileDevice = !!(isTouchDevice || isWinPhoneDevice);
	
	var isIOS = /(iPad|iPhone).*OS ([0-9_]*) .*/.exec(navigator.userAgent);
	if(isIOS) isIOS = parseFloat(isIOS[2].replace(/_/g, '.'));
	commonOptions.ios = isIOS;

	// create global stylesheet if custom forms are used
	var createStyleSheet = function() {
		var styleTag = $('<style>').appendTo('head'),
			styleSheet = styleTag.prop('sheet') || styleTag.prop('styleSheet');

		// crossbrowser style handling
		var addCSSRule = function(selector, rules, index) {
			if (styleSheet.insertRule) {
				styleSheet.insertRule(selector + '{' + rules + '}', index);
			} else {
				styleSheet.addRule(selector, rules, index);
			}
		};

		// add special rules
		addCSSRule('.' + commonOptions.hiddenClass, 'position:absolute !important;left:-9999px !important;height:1px !important;width:1px !important;margin:0 !important;border-width:0 !important;-webkit-appearance:none;-moz-appearance:none;appearance:none');
		addCSSRule('.' + commonOptions.rtlClass + ' .' + commonOptions.hiddenClass, 'right:-9999px !important; left: auto !important');
		addCSSRule('.' + commonOptions.unselectableClass, '-webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-tap-highlight-color: rgba(0,0,0,0);');
		addCSSRule('.' + commonOptions.resetAppearanceClass, 'background: none; border: none; -webkit-appearance: none; appearance: none; opacity: 0; filter: alpha(opacity=0);');

		// detect rtl pages
		var html = $('html'), body = $('body');
		if (html.css('direction') === 'rtl' || body.css('direction') === 'rtl') {
			html.addClass(commonOptions.rtlClass);
		}

		// handle form reset event
		html.on('reset', function() {
			setTimeout(function() {
				api.refreshAll();
			}, 0);
		});

		// mark stylesheet as created
		commonOptions.styleSheetCreated = true;
	};

	// simplified pointer events handler
	(function() {
		var pointerEventsSupported = navigator.pointerEnabled || navigator.msPointerEnabled,
			touchEventsSupported = ('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch,
			eventList, eventMap = {}, eventPrefix = 'jcf-';

		// detect events to attach
		if (pointerEventsSupported) {
			eventList = {
				pointerover: navigator.pointerEnabled ? 'pointerover' : 'MSPointerOver',
				pointerdown: navigator.pointerEnabled ? 'pointerdown' : 'MSPointerDown',
				pointermove: navigator.pointerEnabled ? 'pointermove' : 'MSPointerMove',
				pointerup: navigator.pointerEnabled ? 'pointerup' : 'MSPointerUp'
			};
		} else {
			eventList = {
				pointerover: 'mouseover',
				pointerdown: 'mousedown' + (touchEventsSupported ? ' touchstart' : ''),
				pointermove: 'mousemove' + (touchEventsSupported ? ' touchmove' : ''),
				pointerup: 'mouseup' + (touchEventsSupported ? ' touchend' : '')
			};
		}

		// create event map
		$.each(eventList, function(targetEventName, fakeEventList) {
			$.each(fakeEventList.split(' '), function(index, fakeEventName) {
				eventMap[fakeEventName] = targetEventName;
			});
		});

		// jQuery event hooks
		$.each(eventList, function(eventName, eventHandlers) {
			eventHandlers = eventHandlers.split(' ');
			$.event.special[eventPrefix + eventName] = {
				setup: function() {
					var self = this;
					$.each(eventHandlers, function(index, fallbackEvent) {
						if (self.addEventListener) self.addEventListener(fallbackEvent, fixEvent, false);
						else self['on' + fallbackEvent] = fixEvent;
					});
				},
				teardown: function() {
					var self = this;
					$.each(eventHandlers, function(index, fallbackEvent) {
						if (self.addEventListener) self.removeEventListener(fallbackEvent, fixEvent, false);
						else self['on' + fallbackEvent] = null;
					});
				}
			};
		});

		// check that mouse event are not simulated by mobile browsers
		var lastTouch = null;
		var mouseEventSimulated = function(e) {
			var dx = Math.abs(e.pageX - lastTouch.x),
				dy = Math.abs(e.pageY - lastTouch.y),
				rangeDistance = 25;

			if (dx <= rangeDistance && dy <= rangeDistance) {
				return true;
			}
		};

		// normalize event
		var fixEvent = function(e) {
			var origEvent = e || window.event,
				touchEventData = null,
				targetEventName = eventMap[origEvent.type];

			e = $.event.fix(origEvent);
			e.type = eventPrefix + targetEventName;

			if (origEvent.pointerType) {
				switch (origEvent.pointerType) {
					case 2: e.pointerType = 'touch'; break;
					case 3: e.pointerType = 'pen'; break;
					case 4: e.pointerType = 'mouse'; break;
					default: e.pointerType = origEvent.pointerType;
				}
			} else {
				e.pointerType = origEvent.type.substr(0, 5); // "mouse" or "touch" word length
			}

			if (!e.pageX && !e.pageY) {
				touchEventData = origEvent.changedTouches ? origEvent.changedTouches[0] : origEvent;
				e.pageX = touchEventData.pageX;
				e.pageY = touchEventData.pageY;
			}

			if (origEvent.type === 'touchend') {
				lastTouch = { x: e.pageX, y: e.pageY };
			}
			if (e.pointerType === 'mouse' && lastTouch && mouseEventSimulated(e)) {
				return;
			} else {
				return ($.event.dispatch || $.event.handle).call(this, e);
			}
		};
	}());

	// custom mousewheel/trackpad handler
	(function() {
		var wheelEvents = ('onwheel' in document || document.documentMode >= 9 ? 'wheel' : 'mousewheel DOMMouseScroll').split(' '),
			shimEventName = 'jcf-mousewheel';

		$.event.special[shimEventName] = {
			setup: function() {
				var self = this;
				$.each(wheelEvents, function(index, fallbackEvent) {
					if (self.addEventListener) self.addEventListener(fallbackEvent, fixEvent, false);
					else self['on' + fallbackEvent] = fixEvent;
				});
			},
			teardown: function() {
				var self = this;
				$.each(wheelEvents, function(index, fallbackEvent) {
					if (self.addEventListener) self.removeEventListener(fallbackEvent, fixEvent, false);
					else self['on' + fallbackEvent] = null;
				});
			}
		};

		var fixEvent = function(e) {
			var origEvent = e || window.event;
			e = $.event.fix(origEvent);
			e.type = shimEventName;

			// old wheel events handler
			if ('detail'      in origEvent) { e.deltaY = -origEvent.detail;      }
			if ('wheelDelta'  in origEvent) { e.deltaY = -origEvent.wheelDelta;  }
			if ('wheelDeltaY' in origEvent) { e.deltaY = -origEvent.wheelDeltaY; }
			if ('wheelDeltaX' in origEvent) { e.deltaX = -origEvent.wheelDeltaX; }

			// modern wheel event handler
			if ('deltaY' in origEvent) {
				e.deltaY = origEvent.deltaY;
			}
			if ('deltaX' in origEvent) {
				e.deltaX = origEvent.deltaX;
			}

			// handle deltaMode for mouse wheel
			e.delta = e.deltaY || e.deltaX;
			if (origEvent.deltaMode === 1) {
				var lineHeight = 16;
				e.delta *= lineHeight;
				e.deltaY *= lineHeight;
				e.deltaX *= lineHeight;
			}

			return ($.event.dispatch || $.event.handle).call(this, e);
		};
	}());

	// extra module methods
	var moduleMixin = {
		// provide function for firing native events
		fireNativeEvent: function(elements, eventName) {
			$(elements).each(function() {
				var element = this, eventObject;
				if (element.dispatchEvent) {
					eventObject = document.createEvent('HTMLEvents');
					eventObject.initEvent(eventName, true, true);
					element.dispatchEvent(eventObject);
				} else if (document.createEventObject) {
					eventObject = document.createEventObject();
					eventObject.target = element;
					element.fireEvent('on' + eventName, eventObject);
				}
			});
		},
		// bind event handlers for module instance (functions beggining with "on")
		bindHandlers: function() {
			var self = this;
			$.each(self, function(propName, propValue) {
				if (propName.indexOf('on') === 0 && $.isFunction(propValue)) {
					// dont use $.proxy here because it doesn't create unique handler
					self[propName] = function() {
						return propValue.apply(self, arguments);
					};
				}
			});
		}
	};

	// public API
	var api = {
		version: version,
		modules: {},
		getOptions: function() {
			return $.extend({}, commonOptions);
		},
		setOptions: function(moduleName, moduleOptions) {
			if (arguments.length > 1) {
				// set module options
				if (this.modules[moduleName]) {
					$.extend(this.modules[moduleName].prototype.options, moduleOptions);
				}
			} else {
				// set common options
				$.extend(commonOptions, moduleName);
			}
		},
		addModule: function(proto) {
			// add module to list
			var Module = function(options) {
				// save instance to collection
				if (!options.element.data(commonOptions.dataKey)) {
					options.element.data(commonOptions.dataKey, this);
				}
				customInstances.push(this);

				// save options
				this.options = $.extend({}, commonOptions, this.options, getInlineOptions(options.element), options);

				// bind event handlers to instance
				this.bindHandlers();

				// call constructor
				this.init.apply(this, arguments);
			};

			// parse options from HTML attribute
			var getInlineOptions = function(element) {
				var dataOptions = element.data(commonOptions.optionsKey),
					attrOptions = element.attr(commonOptions.optionsKey);

				if (dataOptions) {
					return dataOptions;
				} else if (attrOptions) {
					try {
						return $.parseJSON(attrOptions);
					} catch (e) {
						// ignore invalid attributes
					}
				}
			};

			// set proto as prototype for new module
			Module.prototype = proto;

			// add mixin methods to module proto
			$.extend(proto, moduleMixin);
			if (proto.plugins) {
				$.each(proto.plugins, function(pluginName, plugin) {
					$.extend(plugin.prototype, moduleMixin);
				});
			}

			// override destroy method
			var originalDestroy = Module.prototype.destroy;
			Module.prototype.destroy = function() {
				this.options.element.removeData(this.options.dataKey);

				for (var i = customInstances.length - 1; i >= 0; i--) {
					if (customInstances[i] === this) {
						customInstances.splice(i, 1);
						break;
					}
				}

				if (originalDestroy) {
					originalDestroy.apply(this, arguments);
				}
			};

			// save module to list
			this.modules[proto.name] = Module;
		},
		getInstance: function(element) {
			return $(element).data(commonOptions.dataKey);
		},
		replace: function(elements, moduleName, customOptions) {
			var self = this,
				instance;

			if (!commonOptions.styleSheetCreated) {
				createStyleSheet();
			}

			$(elements).each(function() {
				var moduleOptions,
					element = $(this);

				instance = element.data(commonOptions.dataKey);
				if (instance) {
					instance.refresh();
				} else {
					if (!moduleName) {
						$.each(self.modules, function(currentModuleName, module) {
							if (module.prototype.matchElement.call(module.prototype, element)) {
								moduleName = currentModuleName;
								return false;
							}
						});
					}
					if (moduleName) {
						moduleOptions = $.extend({ element: element }, customOptions);
						instance = new self.modules[moduleName](moduleOptions);
					}
				}
			});
			return instance;
		},
		refresh: function(elements) {
			$(elements).each(function() {
				var instance = $(this).data(commonOptions.dataKey);
				if (instance) {
					instance.refresh();
				}
			});
		},
		destroy: function(elements) {
			$(elements).each(function() {
				var instance = $(this).data(commonOptions.dataKey);
				if (instance) {
					instance.destroy();
				}
			});
		},
		replaceAll: function(context) {
			var self = this;
			$.each(this.modules, function(moduleName, module) {
				$(module.prototype.selector, context).each(function() {
					if (this.className.indexOf('jcf-ignore') < 0) {
						self.replace(this, moduleName);
					}
				});
			});
		},
		refreshAll: function(context) {
			if (context) {
				$.each(this.modules, function(moduleName, module) {
					$(module.prototype.selector, context).each(function() {
						var instance = $(this).data(commonOptions.dataKey);
						if (instance) {
							instance.refresh();
						}
					});
				});
			} else {
				for (var i = customInstances.length - 1; i >= 0; i--) {
					customInstances[i].refresh();
				}
			}
		},
		destroyAll: function(context) {
			if (context) {
				$.each(this.modules, function(moduleName, module) {
					$(module.prototype.selector, context).each(function(index, element) {
						var instance = $(element).data(commonOptions.dataKey);
						if (instance) {
							instance.destroy();
						}
					});
				});
			} else {
				while (customInstances.length) {
					customInstances[0].destroy();
				}
			}
		}
	};

	// always export API to the global window object
	window.jcf = api;

	return api;
})); 

 /*!
 * JavaScript Custom Forms : Scrollbar Module
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.1.3
 */
;(function($, window) {

	'use strict';

	jcf.addModule({
		name: 'Scrollable',
		selector: '.jcf-scrollable',
		plugins: {
			ScrollBar: ScrollBar
		},
		options: {
			mouseWheelStep: 150,
			handleResize: true,
			alwaysShowScrollbars: false,
			alwaysPreventMouseWheel: false,
			scrollAreaStructure: '<div class="jcf-scrollable-wrapper"></div>'
		},
		matchElement: function(element) {
			return element.is('.jcf-scrollable');
		},
		init: function() {
			this.initStructure();
			this.attachEvents();
			this.rebuildScrollbars();
		},
		initStructure: function() {
			// prepare structure
			this.doc = $(document);
			this.win = $(window);
			this.realElement = $(this.options.element);
			this.scrollWrapper = $(this.options.scrollAreaStructure).insertAfter(this.realElement);

			// set initial styles
			this.scrollWrapper.css('position', 'relative');
			// this.realElement.css('overflow', 'hidden');
			this.realElement.css('overflow', this.options.ios && this.options.ios >= 10 ? 'auto' : 'hidden');
			this.vBarEdge = 0;
		},
		attachEvents: function() {
			// create scrollbars
			var self = this;
			this.vBar = new ScrollBar({
				holder: this.scrollWrapper,
				vertical: true,
				onScroll: function(scrollTop) {
					self.realElement.scrollTop(scrollTop);
				}
			});
			this.hBar = new ScrollBar({
				holder: this.scrollWrapper,
				vertical: false,
				onScroll: function(scrollLeft) {
					self.realElement.scrollLeft(scrollLeft);
				}
			});

			// add event handlers
			this.realElement.on('scroll', this.onScroll);
			if (this.options.handleResize) {
				this.win.on('resize orientationchange load', this.onResize);
			}

			// add pointer/wheel event handlers
			this.realElement.on('jcf-mousewheel', this.onMouseWheel);
			this.realElement.on('jcf-pointerdown', this.onTouchBody);
		},
		onScroll: function() {
			this.redrawScrollbars();
		},
		onResize: function() {
			// do not rebuild scrollbars if form field is in focus
			if (!$(document.activeElement).is(':input')) {
				this.rebuildScrollbars();
			}
		},
		onTouchBody: function(e) {
			if (e.pointerType === 'touch') {
				this.touchData = {
					scrollTop: this.realElement.scrollTop(),
					scrollLeft: this.realElement.scrollLeft(),
					left: e.pageX,
					top: e.pageY
				};
				this.doc.on({
					'jcf-pointermove': this.onMoveBody,
					'jcf-pointerup': this.onReleaseBody
				});
			}
		},
		onMoveBody: function(e) {
			var targetScrollTop,
				targetScrollLeft,
				verticalScrollAllowed = this.verticalScrollActive,
				horizontalScrollAllowed = this.horizontalScrollActive;

			if (e.pointerType === 'touch') {
				targetScrollTop = this.touchData.scrollTop - e.pageY + this.touchData.top;
				targetScrollLeft = this.touchData.scrollLeft - e.pageX + this.touchData.left;

				// check that scrolling is ended and release outer scrolling
				if (this.verticalScrollActive && (targetScrollTop < 0 || targetScrollTop > this.vBar.maxValue)) {
					verticalScrollAllowed = false;
				}
				if (this.horizontalScrollActive && (targetScrollLeft < 0 || targetScrollLeft > this.hBar.maxValue)) {
					horizontalScrollAllowed = false;
				}

				this.realElement.scrollTop(targetScrollTop);
				this.realElement.scrollLeft(targetScrollLeft);

				if (verticalScrollAllowed || horizontalScrollAllowed) {
					e.preventDefault();
				} else {
					this.onReleaseBody(e);
				}
			}
		},
		onReleaseBody: function(e) {
			if (e.pointerType === 'touch') {
				delete this.touchData;
				this.doc.off({
					'jcf-pointermove': this.onMoveBody,
					'jcf-pointerup': this.onReleaseBody
				});
			}
		},
		onMouseWheel: function(e) {
			var currentScrollTop = this.realElement.scrollTop(),
				currentScrollLeft = this.realElement.scrollLeft(),
				maxScrollTop = this.realElement.prop('scrollHeight') - this.embeddedDimensions.innerHeight,
				maxScrollLeft = this.realElement.prop('scrollWidth') - this.embeddedDimensions.innerWidth,
				extraLeft, extraTop, preventFlag;

			// check edge cases
			if (!this.options.alwaysPreventMouseWheel) {
				if (this.verticalScrollActive && e.deltaY) {
					if (!(currentScrollTop <= 0 && e.deltaY < 0) && !(currentScrollTop >= maxScrollTop && e.deltaY > 0)) {
						preventFlag = true;
					}
				}
				if (this.horizontalScrollActive && e.deltaX) {
					if (!(currentScrollLeft <= 0 && e.deltaX < 0) && !(currentScrollLeft >= maxScrollLeft && e.deltaX > 0)) {
						preventFlag = true;
					}
				}
				if (!this.verticalScrollActive && !this.horizontalScrollActive) {
					return;
				}
			}

			// prevent default action and scroll item
			if (preventFlag || this.options.alwaysPreventMouseWheel) {
				e.preventDefault();
			} else {
				return;
			}

			extraLeft = e.deltaX / 100 * this.options.mouseWheelStep;
			extraTop = e.deltaY / 100 * this.options.mouseWheelStep;

			this.realElement.scrollTop(currentScrollTop + extraTop);
			this.realElement.scrollLeft(currentScrollLeft + extraLeft);
		},
		setScrollBarEdge: function(edgeSize) {
			this.vBarEdge = edgeSize || 0;
			this.redrawScrollbars();
		},
		saveElementDimensions: function() {
			this.savedDimensions = {
				top: this.realElement.width(),
				left: this.realElement.height()
			};
			return this;
		},
		restoreElementDimensions: function() {
			if (this.savedDimensions) {
				this.realElement.css({
					width: this.savedDimensions.width,
					height: this.savedDimensions.height
				});
			}
			return this;
		},
		saveScrollOffsets: function() {
			this.savedOffsets = {
				top: this.realElement.scrollTop(),
				left: this.realElement.scrollLeft()
			};
			return this;
		},
		restoreScrollOffsets: function() {
			if (this.savedOffsets) {
				this.realElement.scrollTop(this.savedOffsets.top);
				this.realElement.scrollLeft(this.savedOffsets.left);
			}
			return this;
		},
		getContainerDimensions: function() {
			// save current styles
			var desiredDimensions,
				currentStyles,
				currentHeight,
				currentWidth;

			if (this.isModifiedStyles) {
				desiredDimensions = {
					width: this.realElement.innerWidth() + this.vBar.getThickness(),
					height: this.realElement.innerHeight() + this.hBar.getThickness()
				};
			} else {
				// unwrap real element and measure it according to CSS
				this.saveElementDimensions().saveScrollOffsets();
				this.realElement.insertAfter(this.scrollWrapper);
				this.scrollWrapper.detach();

				// measure element
				currentStyles = this.realElement.prop('style');
				currentWidth = parseFloat(currentStyles.width);
				currentHeight = parseFloat(currentStyles.height);

				// reset styles if needed
				if (this.embeddedDimensions && currentWidth && currentHeight) {
					this.isModifiedStyles |= (currentWidth !== this.embeddedDimensions.width || currentHeight !== this.embeddedDimensions.height);
					this.realElement.css({
						overflow: '',
						width: '',
						height: ''
					});
				}

				// calculate desired dimensions for real element
				desiredDimensions = {
					width: this.realElement.outerWidth(),
					height: this.realElement.outerHeight()
				};

				// restore structure and original scroll offsets
				this.scrollWrapper.insertAfter(this.realElement);
				this.realElement.css('overflow', this.options.ios && this.options.ios >= 10 ? 'auto' : 'hidden').prependTo(this.scrollWrapper);
				this.restoreElementDimensions().restoreScrollOffsets();
			}

			return desiredDimensions;
		},
		getEmbeddedDimensions: function(dimensions) {
			// handle scrollbars cropping
			var fakeBarWidth = this.vBar.getThickness(),
				fakeBarHeight = this.hBar.getThickness(),
				paddingWidth = this.realElement.outerWidth() - this.realElement.width(),
				paddingHeight = this.realElement.outerHeight() - this.realElement.height(),
				resultDimensions;

			if (this.options.alwaysShowScrollbars) {
				// simply return dimensions without custom scrollbars
				this.verticalScrollActive = true;
				this.horizontalScrollActive = true;
				resultDimensions = {
					innerWidth: dimensions.width - fakeBarWidth,
					innerHeight: dimensions.height - fakeBarHeight
				};
			} else {
				// detect when to display each scrollbar
				this.saveElementDimensions();
				this.verticalScrollActive = false;
				this.horizontalScrollActive = false;

				// fill container with full size
				this.realElement.css({
					width: dimensions.width - paddingWidth,
					height: dimensions.height - paddingHeight
				});

				this.horizontalScrollActive = this.realElement.prop('scrollWidth') > this.containerDimensions.width;
				this.verticalScrollActive = this.realElement.prop('scrollHeight') > this.containerDimensions.height;

				this.restoreElementDimensions();
				resultDimensions = {
					innerWidth: dimensions.width - (this.verticalScrollActive ? fakeBarWidth : 0),
					innerHeight: dimensions.height - (this.horizontalScrollActive ? fakeBarHeight : 0)
				};
			}
			$.extend(resultDimensions, {
				width: resultDimensions.innerWidth - paddingWidth,
				height: resultDimensions.innerHeight - paddingHeight
			});
			return resultDimensions;
		},
		rebuildScrollbars: function() {
			// resize wrapper according to real element styles
			this.containerDimensions = this.getContainerDimensions();
			this.embeddedDimensions = this.getEmbeddedDimensions(this.containerDimensions);

			// resize wrapper to desired dimensions
			this.scrollWrapper.css({
				width: this.containerDimensions.width,
				height: this.containerDimensions.height
			});

			// resize element inside wrapper excluding scrollbar size
			this.realElement.css({
				overflow: this.options.ios && this.options.ios >= 10 ? 'auto' : 'hidden',
				width: this.embeddedDimensions.width,
				height: this.embeddedDimensions.height
			});

			// redraw scrollbar offset
			this.redrawScrollbars();
		},
		redrawScrollbars: function() {
			var viewSize, maxScrollValue;

			// redraw vertical scrollbar
			if (this.verticalScrollActive) {
				viewSize = this.vBarEdge ? this.containerDimensions.height - this.vBarEdge : this.embeddedDimensions.innerHeight;
				maxScrollValue = Math.max(this.realElement.prop('offsetHeight'), this.realElement.prop('scrollHeight')) - this.vBarEdge;

				this.vBar.show().setMaxValue(maxScrollValue - viewSize).setRatio(viewSize / maxScrollValue).setSize(viewSize);
				this.vBar.setValue(this.realElement.scrollTop());
			} else {
				this.vBar.hide();
			}

			// redraw horizontal scrollbar
			if (this.horizontalScrollActive) {
				viewSize = this.embeddedDimensions.innerWidth;
				maxScrollValue = this.realElement.prop('scrollWidth');

				if (maxScrollValue === viewSize) {
					this.horizontalScrollActive = false;
				}
				this.hBar.show().setMaxValue(maxScrollValue - viewSize).setRatio(viewSize / maxScrollValue).setSize(viewSize);
				this.hBar.setValue(this.realElement.scrollLeft());
			} else {
				this.hBar.hide();
			}

			// set "touch-action" style rule
			var touchAction = '';
			if (this.verticalScrollActive && this.horizontalScrollActive) {
				touchAction = 'none';
			} else if (this.verticalScrollActive) {
				touchAction = 'pan-x';
			} else if (this.horizontalScrollActive) {
				touchAction = 'pan-y';
			}
			this.realElement.css('touchAction', touchAction);
		},
		refresh: function() {
			this.rebuildScrollbars();
		},
		destroy: function() {
			// remove event listeners
			this.win.off('resize orientationchange load', this.onResize);
			this.realElement.off({
				'jcf-mousewheel': this.onMouseWheel,
				'jcf-pointerdown': this.onTouchBody
			});
			this.doc.off({
				'jcf-pointermove': this.onMoveBody,
				'jcf-pointerup': this.onReleaseBody
			});

			// restore structure
			this.saveScrollOffsets();
			this.vBar.destroy();
			this.hBar.destroy();
			this.realElement.insertAfter(this.scrollWrapper).css({
				touchAction: '',
				overflow: '',
				width: '',
				height: ''
			});
			this.scrollWrapper.remove();
			this.restoreScrollOffsets();
		}
	});

	// custom scrollbar
	function ScrollBar(options) {
		this.options = $.extend({
			holder: null,
			vertical: true,
			inactiveClass: 'jcf-inactive',
			verticalClass: 'jcf-scrollbar-vertical',
			horizontalClass: 'jcf-scrollbar-horizontal',
			scrollbarStructure: '<div class="jcf-scrollbar"><div class="jcf-scrollbar-dec"></div><div class="jcf-scrollbar-slider"><div class="jcf-scrollbar-handle"></div></div><div class="jcf-scrollbar-inc"></div></div>',
			btnDecSelector: '.jcf-scrollbar-dec',
			btnIncSelector: '.jcf-scrollbar-inc',
			sliderSelector: '.jcf-scrollbar-slider',
			handleSelector: '.jcf-scrollbar-handle',
			scrollInterval: 300,
			scrollStep: 400 // px/sec
		}, options);
		this.init();
	}
	$.extend(ScrollBar.prototype, {
		init: function() {
			this.initStructure();
			this.attachEvents();
		},
		initStructure: function() {
			// define proporties
			this.doc = $(document);
			this.isVertical = !!this.options.vertical;
			this.sizeProperty = this.isVertical ? 'height' : 'width';
			this.fullSizeProperty = this.isVertical ? 'outerHeight' : 'outerWidth';
			this.invertedSizeProperty = this.isVertical ? 'width' : 'height';
			this.thicknessMeasureMethod = 'outer' + this.invertedSizeProperty.charAt(0).toUpperCase() + this.invertedSizeProperty.substr(1);
			this.offsetProperty = this.isVertical ? 'top' : 'left';
			this.offsetEventProperty = this.isVertical ? 'pageY' : 'pageX';

			// initialize variables
			this.value = this.options.value || 0;
			this.maxValue = this.options.maxValue || 0;
			this.currentSliderSize = 0;
			this.handleSize = 0;

			// find elements
			this.holder = $(this.options.holder);
			this.scrollbar = $(this.options.scrollbarStructure).appendTo(this.holder);
			this.btnDec = this.scrollbar.find(this.options.btnDecSelector);
			this.btnInc = this.scrollbar.find(this.options.btnIncSelector);
			this.slider = this.scrollbar.find(this.options.sliderSelector);
			this.handle = this.slider.find(this.options.handleSelector);

			// set initial styles
			this.scrollbar.addClass(this.isVertical ? this.options.verticalClass : this.options.horizontalClass).css({
				touchAction: this.isVertical ? 'pan-x' : 'pan-y',
				position: 'absolute'
			});
			this.slider.css({
				position: 'relative'
			});
			this.handle.css({
				touchAction: 'none',
				position: 'absolute'
			});
		},
		attachEvents: function() {
			this.bindHandlers();
			this.handle.on('jcf-pointerdown', this.onHandlePress);
			this.slider.add(this.btnDec).add(this.btnInc).on('jcf-pointerdown', this.onButtonPress);
		},
		onHandlePress: function(e) {
			if (e.pointerType === 'mouse' && e.button > 1) {
				return;
			} else {
				e.preventDefault();
				this.handleDragActive = true;
				this.sliderOffset = this.slider.offset()[this.offsetProperty];
				this.innerHandleOffset = e[this.offsetEventProperty] - this.handle.offset()[this.offsetProperty];

				this.doc.on('jcf-pointermove', this.onHandleDrag);
				this.doc.on('jcf-pointerup', this.onHandleRelease);
			}
		},
		onHandleDrag: function(e) {
			e.preventDefault();
			this.calcOffset = e[this.offsetEventProperty] - this.sliderOffset - this.innerHandleOffset;
			this.setValue(this.calcOffset / (this.currentSliderSize - this.handleSize) * this.maxValue);
			this.triggerScrollEvent(this.value);
		},
		onHandleRelease: function() {
			this.handleDragActive = false;
			this.doc.off('jcf-pointermove', this.onHandleDrag);
			this.doc.off('jcf-pointerup', this.onHandleRelease);
		},
		onButtonPress: function(e) {
			var direction, clickOffset;
			if (e.pointerType === 'mouse' && e.button > 1) {
				return;
			} else {
				e.preventDefault();
				if (!this.handleDragActive) {
					if (this.slider.is(e.currentTarget)) {
						// slider pressed
						direction = this.handle.offset()[this.offsetProperty] > e[this.offsetEventProperty] ? -1 : 1;
						clickOffset = e[this.offsetEventProperty] - this.slider.offset()[this.offsetProperty];
						this.startPageScrolling(direction, clickOffset);
					} else {
						// scrollbar buttons pressed
						direction = this.btnDec.is(e.currentTarget) ? -1 : 1;
						this.startSmoothScrolling(direction);
					}
					this.doc.on('jcf-pointerup', this.onButtonRelease);
				}
			}
		},
		onButtonRelease: function() {
			this.stopPageScrolling();
			this.stopSmoothScrolling();
			this.doc.off('jcf-pointerup', this.onButtonRelease);
		},
		startPageScrolling: function(direction, clickOffset) {
			var self = this,
				stepValue = direction * self.currentSize;

			// limit checker
			var isFinishedScrolling = function() {
				var handleTop = (self.value / self.maxValue) * (self.currentSliderSize - self.handleSize);

				if (direction > 0) {
					return handleTop + self.handleSize >= clickOffset;
				} else {
					return handleTop <= clickOffset;
				}
			};

			// scroll by page when track is pressed
			var doPageScroll = function() {
				self.value += stepValue;
				self.setValue(self.value);
				self.triggerScrollEvent(self.value);

				if (isFinishedScrolling()) {
					clearInterval(self.pageScrollTimer);
				}
			};

			// start scrolling
			this.pageScrollTimer = setInterval(doPageScroll, this.options.scrollInterval);
			doPageScroll();
		},
		stopPageScrolling: function() {
			clearInterval(this.pageScrollTimer);
		},
		startSmoothScrolling: function(direction) {
			var self = this, dt;
			this.stopSmoothScrolling();

			// simple animation functions
			var raf = window.requestAnimationFrame || function(func) {
				setTimeout(func, 16);
			};
			var getTimestamp = function() {
				return Date.now ? Date.now() : new Date().getTime();
			};

			// set animation limit
			var isFinishedScrolling = function() {
				if (direction > 0) {
					return self.value >= self.maxValue;
				} else {
					return self.value <= 0;
				}
			};

			// animation step
			var doScrollAnimation = function() {
				var stepValue = (getTimestamp() - dt) / 1000 * self.options.scrollStep;

				if (self.smoothScrollActive) {
					self.value += stepValue * direction;
					self.setValue(self.value);
					self.triggerScrollEvent(self.value);

					if (!isFinishedScrolling()) {
						dt = getTimestamp();
						raf(doScrollAnimation);
					}
				}
			};

			// start animation
			self.smoothScrollActive = true;
			dt = getTimestamp();
			raf(doScrollAnimation);
		},
		stopSmoothScrolling: function() {
			this.smoothScrollActive = false;
		},
		triggerScrollEvent: function(scrollValue) {
			if (this.options.onScroll) {
				this.options.onScroll(scrollValue);
			}
		},
		getThickness: function() {
			return this.scrollbar[this.thicknessMeasureMethod]();
		},
		setSize: function(size) {
			// resize scrollbar
			var btnDecSize = this.btnDec[this.fullSizeProperty](),
				btnIncSize = this.btnInc[this.fullSizeProperty]();

			// resize slider
			this.currentSize = size;
			this.currentSliderSize = size - btnDecSize - btnIncSize;
			this.scrollbar.css(this.sizeProperty, size);
			this.slider.css(this.sizeProperty, this.currentSliderSize);
			this.currentSliderSize = this.slider[this.sizeProperty]();

			// resize handle
			this.handleSize = Math.round(this.currentSliderSize * this.ratio);
			this.handle.css(this.sizeProperty, this.handleSize);
			this.handleSize = this.handle[this.fullSizeProperty]();

			return this;
		},
		setRatio: function(ratio) {
			this.ratio = ratio;
			return this;
		},
		setMaxValue: function(maxValue) {
			this.maxValue = maxValue;
			this.setValue(Math.min(this.value, this.maxValue));
			return this;
		},
		setValue: function(value) {
			this.value = value;
			if (this.value < 0) {
				this.value = 0;
			} else if (this.value > this.maxValue) {
				this.value = this.maxValue;
			}
			this.refresh();
		},
		setPosition: function(styles) {
			this.scrollbar.css(styles);
			return this;
		},
		hide: function() {
			this.scrollbar.detach();
			return this;
		},
		show: function() {
			this.scrollbar.appendTo(this.holder);
			return this;
		},
		refresh: function() {
			// recalculate handle position
			if (this.value === 0 || this.maxValue === 0) {
				this.calcOffset = 0;
			} else {
				this.calcOffset = (this.value / this.maxValue) * (this.currentSliderSize - this.handleSize);
			}
			this.handle.css(this.offsetProperty, this.calcOffset);

			// toggle inactive classes
			this.btnDec.toggleClass(this.options.inactiveClass, this.value === 0);
			this.btnInc.toggleClass(this.options.inactiveClass, this.value === this.maxValue);
			this.scrollbar.toggleClass(this.options.inactiveClass, this.maxValue === 0);
		},
		destroy: function() {
			// remove event handlers and scrollbar block itself
			this.btnDec.add(this.btnInc).off('jcf-pointerdown', this.onButtonPress);
			this.handle.off('jcf-pointerdown', this.onHandlePress);
			this.doc.off('jcf-pointermove', this.onHandleDrag);
			this.doc.off('jcf-pointerup', this.onHandleRelease);
			this.doc.off('jcf-pointerup', this.onButtonRelease);
			this.stopSmoothScrolling();
			this.stopPageScrolling();
			this.scrollbar.remove();
		}
	});

}(jQuery, this));