(function($, window, document, undefined) {

    'use strict';

    $.fn.aight = function(options) {

        var init,
            index,
            firstSetup,
            $imageLinks,
            $backdrop,
            $wrapper,
            $container,
            $currentImage,
            bindEvents,
            bindButtons,
            createImageContainer,
            that,
            config,
            standardTemplate;

        that = this;

        standardTemplate =  '<div id="aight-backdrop"></div>'+
                            '<div id="aight-wrapper">'+
                            '<div id="aight-container">' +
                            '<a id="aight-next" href="#">></a>'+
                            '<a id="aight-prev" href="#"><</a>'+
                            '<a id="aight-close" href="#">x</a>'+
                            '<img src="" alt=""/>' +
                            '</div>' +
                            '</div>';

        config = $.extend({
            backdrop: 'aight-backdrop',
            closeButton: 'aight-close',
            imageContainer: 'aight-container',
            nextButton: 'aight-next',
            prevButton: 'aight-prev',
            template: standardTemplate,
            wrapper: 'aight-wrapper'
        }, options);

        bindButtons = function() {

            $('#' + config.prevButton).unbind('click').click(function(e){
                e.preventDefault();
                index = index > 0 ? index - 1 : $imageLinks.length - 1;
                $currentImage = $($imageLinks[index]);
                createImageContainer($currentImage.prop('href'));
            });

            $('#' + config.nextButton).unbind('click').click(function(e){
                e.preventDefault();
                index = index < $imageLinks.length-1 ? index + 1 : 0;
                $currentImage = $($imageLinks[index]);
                createImageContainer($currentImage.prop('href'));

            });

            $('#' + config.closeButton).on('click', function(){
                $wrapper.fadeOut('slow');
                $backdrop.hide();
            });

            $('#' + config.backdrop).unbind('click').click(function(){
                $wrapper.fadeOut('slow');
                $backdrop.hide();
            });

        };

        firstSetup = function() {

            $('body').append(config.template);

            $backdrop  = $('#' + config.backdrop);
            $wrapper   = $('#' + config.wrapper);
            $container = $('#' + config.imageContainer);

        };

        bindEvents = function() {
            $imageLinks.on('click', function(e){
                e.preventDefault();
                $currentImage = $(this);
                index = $imageLinks.index($currentImage);
                createImageContainer($currentImage.prop('href'));
            });

        };

        createImageContainer = function(img) {

            var $containerImage = $('#' + config.imageContainer + ' img'),
                firstRun = false;

            if($containerImage.length === 0){
                firstSetup();
                $('#' + config.imageContainer + ' img').prop('src', img);
                $wrapper.fadeIn('slow');
                $backdrop.fadeIn(200);
                firstRun = true;
            } else {
                $containerImage.prop('src', img);
                $backdrop.fadeIn(200);
            }

            $containerImage = $('#' + config.imageContainer + ' img');
            $container = $('#' + config.imageContainer);

            $containerImage.one('load',function(){

                $wrapper.fadeIn();

                $container.animate({
                    'margin-left':-($containerImage.width()/2),
                    'margin-top': -($containerImage.height()/2)
                },250);

                if(firstRun){
                    bindButtons();
                }

            });

            $wrapper.fadeIn();
        };

        init = function() {
            $imageLinks = $((that.selector + ' a'));
            bindEvents();
        };

        init();
        return that;

    };

} (jQuery, window, document));
