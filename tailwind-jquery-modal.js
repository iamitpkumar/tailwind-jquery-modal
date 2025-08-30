(function($) {
    'use strict';
    
    // Default configuration
    const defaults = {
        background: '#ffffff',
        textColor: '#374151',
        overlayColor: 'rgba(0, 0, 0, 0.75)',
        borderRadius: '0.5rem',
        animation: true,
        closeButton: true,
        closeOnBackdrop: true,
        closeOnEscape: true,
        videoAutoplay: true,
        imageZoom: true,
        onOpen: null,
        onClose: null,
        onShow: null,
        onHide: null
    };
    
    // Size configurations
    const sizeClasses = {
        small: 'max-w-sm',
        medium: 'max-w-lg',
        large: 'max-w-4xl'
    };
    
    // Modal constructor
    function TailwindModal(element, options) {
        this.element = $(element);
        this.options = $.extend({}, defaults, options);
        this.isOpen = false;
        this.backdrop = null;
        this.modal = null;
        this.modalType = this.detectModalType();
        
        this.init();
    }
    
    TailwindModal.prototype = {
        init: function() {
            // Store reference to modal instance
            this.element.data('modalInstance', this);
            
            // Bind global events if not already bound
            if (!$(document).data('modalEventsInitialized')) {
                this.bindGlobalEvents();
                $(document).data('modalEventsInitialized', true);
            }
        },
        
        bindGlobalEvents: function() {
            // Bind trigger buttons
            $(document).on('click', '[data-modal-target]', function(e) {
                e.preventDefault();
                const targetId = $(this).data('modal-target');
                const targetModal = $(targetId);
                if (targetModal.length) {
                    let instance = targetModal.data('modalInstance');
                    if (!instance) {
                        instance = new TailwindModal(targetModal[0]);
                    }
                    instance.show();
                }
            });
            
            // Bind close buttons
            $(document).on('click', '[data-modal-close]', function(e) {
                e.preventDefault();
                const modal = $(this).closest('.modal-backdrop');
                if (modal.length) {
                    const modalElement = modal.data('sourceModal');
                    if (modalElement) {
                        const instance = modalElement.data('modalInstance');
                        if (instance) {
                            instance.hide();
                        }
                    }
                }
            });
        },
        
        detectModalType: function() {
            if (this.element.data('video')) return 'video';
            if (this.element.data('img')) return 'image';
            if (this.element.data('type') === 'slide-left') return 'slide-left';
            if (this.element.data('type') === 'slide-right') return 'slide-right';
            return 'default';
        },
        
        createModal: function() {
            switch (this.modalType) {
                case 'image':
                    this.createImageModal();
                    break;
                case 'video':
                    this.createVideoModal();
                    break;
                case 'slide-left':
                    this.createSlideModal('left');
                    break;
                case 'slide-right':
                    this.createSlideModal('right');
                    break;
                default:
                    this.createDefaultModal();
                    break;
            }
            
            this.bindEvents();
        },
        
        createDefaultModal: function() {
            const size = this.element.data('size') || 'medium';
            const sizeClass = sizeClasses[size] || sizeClasses.medium;
            const content = this.element.html() || '<p>No content provided</p>';
            
            const closeButtonHtml = this.options.closeButton ? `
                <button class="modal-close absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full p-1 transition-colors z-10" data-modal-close>
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            ` : '';
            
            this.backdrop = $(`
                <div class="modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4 hidden" style="background-color: ${this.options.overlayColor};">
                    <div class="modal-content w-full ${sizeClass} max-h-[90vh] overflow-hidden relative" 
                         style="background-color: ${this.options.background}; color: ${this.options.textColor}; border-radius: ${this.options.borderRadius};">
                        ${closeButtonHtml}
                        <div class="modal-body p-6 overflow-y-auto max-h-[80vh]">
                            ${content}
                        </div>
                    </div>
                </div>
            `);
            
            $('body').append(this.backdrop);
            this.backdrop.data('sourceModal', this.element);
            this.modal = this.backdrop.find('.modal-content');
        },
        
        createSlideModal: function(direction) {
            const width = this.element.data('width') || 400;
            const content = this.element.html() || '<p>No content provided</p>';
            const position = direction === 'left' ? 'left-0' : 'right-0';
            const animationClass = direction === 'left' ? 'modal-slide-left' : 'modal-slide-right';
            
            const closeButtonHtml = this.options.closeButton ? `
                <button class="modal-close absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full p-1 transition-colors z-10" data-modal-close>
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            ` : '';
            
            this.backdrop = $(`
                <div class="modal-backdrop fixed inset-0 z-50 hidden" style="background-color: ${this.options.overlayColor};">
                    <div class="modal-content ${animationClass} fixed top-0 ${position} h-full overflow-hidden shadow-2xl" 
                         style="width: ${width}px; background-color: ${this.options.background}; color: ${this.options.textColor};">
                        ${closeButtonHtml}
                        <div class="modal-body p-6 overflow-y-auto h-full">
                            ${content}
                        </div>
                    </div>
                </div>
            `);
            
            $('body').append(this.backdrop);
            this.backdrop.data('sourceModal', this.element);
            this.modal = this.backdrop.find('.modal-content');
        },
        
        createImageModal: function() {
            const imageUrl = this.element.data('img');
            const imageAlt = this.element.data('alt') || 'Image';
            
            this.backdrop = $(`
                <div class="modal-backdrop fixed inset-0 z-50 flex items-center justify-center hidden" style="background-color: rgba(0, 0, 0, 0.95);">
                    <button class="modal-close absolute top-4 right-4 text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded-full p-2 transition-colors z-20" data-modal-close>
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                    <div class="modal-content max-w-[95vw] max-h-[95vh] relative">
                        <img class="modal-image max-w-full max-h-full object-contain cursor-${this.options.imageZoom ? 'zoom-in' : 'default'}" 
                             src="${imageUrl}" 
                             alt="${imageAlt}">
                    </div>
                </div>
            `);
            
            $('body').append(this.backdrop);
            this.backdrop.data('sourceModal', this.element);
            this.modal = this.backdrop.find('.modal-content');
            this.modalImage = this.backdrop.find('.modal-image');
            
            if (this.options.imageZoom) {
                this.initImageZoom();
            }
        },
        
        createVideoModal: function() {
            const videoUrl = this.element.data('video');
            const videoId = this.extractVideoId(videoUrl);
            const autoplayParam = this.options.videoAutoplay ? '&autoplay=1' : '';
            
            this.backdrop = $(`
                <div class="modal-backdrop fixed inset-0 z-50 flex items-center justify-center hidden" style="background-color: rgba(0, 0, 0, 0.95);">
                    <button class="modal-close absolute top-4 right-4 text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded-full p-2 transition-colors z-20" data-modal-close>
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                    <div class="modal-content w-full max-w-4xl mx-4">
                        <div class="relative w-full" style="padding-bottom: 56.25%;">
                            <iframe class="absolute inset-0 w-full h-full"
                                    src="https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1${autoplayParam}"
                                    frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowfullscreen>
                            </iframe>
                        </div>
                    </div>
                </div>
            `);
            
            $('body').append(this.backdrop);
            this.backdrop.data('sourceModal', this.element);
            this.modal = this.backdrop.find('.modal-content');
            this.videoFrame = this.backdrop.find('iframe');
        },
        
        initImageZoom: function() {
            const self = this;
            let isZoomed = false;
            let isDragging = false;
            let startX, startY, translateX = 0, translateY = 0;
            
            this.modalImage.on('click', function(e) {
                e.stopPropagation();
                if (!isZoomed) {
                    $(this).css({
                        'transform': 'scale(2)',
                        'cursor': 'zoom-out'
                    });
                    isZoomed = true;
                } else {
                    $(this).css({
                        'transform': 'scale(1) translate(0, 0)',
                        'cursor': 'zoom-in'
                    });
                    isZoomed = false;
                    translateX = 0;
                    translateY = 0;
                }
            });
            
            this.modalImage.on('mousedown', function(e) {
                if (isZoomed) {
                    isDragging = true;
                    startX = e.clientX - translateX;
                    startY = e.clientY - translateY;
                    $(this).css('cursor', 'grabbing');
                    e.preventDefault();
                }
            });
            
            $(document).on('mousemove.imageModal', function(e) {
                if (isDragging && isZoomed) {
                    translateX = e.clientX - startX;
                    translateY = e.clientY - startY;
                    self.modalImage.css('transform', `scale(2) translate(${translateX/2}px, ${translateY/2}px)`);
                }
            });
            
            $(document).on('mouseup.imageModal', function() {
                if (isDragging) {
                    isDragging = false;
                    self.modalImage.css('cursor', 'zoom-out');
                }
            });
        },
        
        extractVideoId: function(url) {
            const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
            const match = url.match(regExp);
            return (match && match[7].length === 11) ? match[7] : '';
        },
        
        bindEvents: function() {
            const self = this;
            
            // Backdrop click
            if (this.options.closeOnBackdrop) {
                this.backdrop.on('click', function(e) {
                    if (e.target === this) {
                        self.hide();
                    }
                });
            }
            
            // Keyboard events
            if (this.options.closeOnEscape) {
                const eventName = 'keydown.modal-' + this.element.attr('id') || Date.now();
                $(document).on(eventName, function(e) {
                    if (e.keyCode === 27 && self.isOpen) {
                        self.hide();
                    }
                });
            }
        },
        
        show: function() {
            if (this.isOpen) return;
            
            if (!this.backdrop) {
                this.createModal();
            }
            
            // Trigger onOpen callback
            if (typeof this.options.onOpen === 'function') {
                this.options.onOpen.call(this);
            }
            
            this.isOpen = true;
            $('body').addClass('overflow-hidden');
            
            this.backdrop.removeClass('hidden');
            
            // Trigger onShow callback after animation
            setTimeout(() => {
                if (typeof this.options.onShow === 'function') {
                    this.options.onShow.call(this);
                }
            }, 300);
        },
        
        hide: function() {
            if (!this.isOpen) return;
            
            // Trigger onClose callback
            if (typeof this.options.onClose === 'function') {
                this.options.onClose.call(this);
            }
            
            this.isOpen = false;
            $('body').removeClass('overflow-hidden');
            
            // Handle slide modal animations
            if (this.modalType === 'slide-left') {
                this.modal.addClass('slide-out');
            } else if (this.modalType === 'slide-right') {
                this.modal.addClass('slide-out');
            } else {
                this.backdrop.addClass('fade-out');
                this.modal.addClass('fade-out');
            }
            
            // Stop video playback
            if (this.modalType === 'video' && this.videoFrame) {
                const currentSrc = this.videoFrame.attr('src');
                this.videoFrame.attr('src', '');
                setTimeout(() => {
                    this.videoFrame.attr('src', currentSrc.replace('&autoplay=1', ''));
                }, 100);
            }
            
            // Clean up image zoom events
            if (this.modalType === 'image') {
                $(document).off('mousemove.imageModal mouseup.imageModal');
            }
            
            setTimeout(() => {
                this.backdrop.addClass('hidden');
                this.backdrop.removeClass('fade-out');
                this.modal.removeClass('fade-out slide-out');
                
                // Trigger onHide callback
                if (typeof this.options.onHide === 'function') {
                    this.options.onHide.call(this);
                }
            }, 300);
        },
        
        toggle: function() {
            if (this.isOpen) {
                this.hide();
            } else {
                this.show();
            }
        },
        
        destroy: function() {
            const eventName = 'keydown.modal-' + (this.element.attr('id') || Date.now());
            $(document).off(eventName);
            $(document).off('mousemove.imageModal mouseup.imageModal');
            if (this.backdrop) {
                this.backdrop.remove();
            }
            this.element.removeData('modalInstance');
        }
    };
    
    // jQuery plugin definition
    $.fn.TailwindModal = function(options) {
        const args = Array.prototype.slice.call(arguments, 1);
        
        return this.each(function() {
            let instance = $.data(this, 'modalInstance');
            
            if (typeof options === 'string') {
                // Method call
                if (instance && typeof instance[options] === 'function') {
                    instance[options].apply(instance, args);
                }
            } else {
                // Initialize
                if (!instance) {
                    instance = new TailwindModal(this, options);
                    $.data(this, 'modalInstance', instance);
                }
            }
        });
    };
    
    // Static method to get instance
    $.fn.TailwindModal.getInstance = function(element) {
        return $(element).data('modalInstance');
    };
    
})(jQuery);