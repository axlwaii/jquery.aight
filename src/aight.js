(function($, window, document, undefined) {

    'use strict';

    $.fn.aight = function(options) {

        var init,
            index,
            firstSetup,
            $imageLinks,
            $imageDesc,
            $backdrop,
            $wrapper,
            $container,
            $currentImage,
            bindEvents,
            bindButtons,
            createImageContainer,
            that,
            config,
            standardTemplate,
            singleImage = false;

        that = this;

        config = $.extend({
            backdrop: 'aight-backdrop',
            closeButton: 'aight-close',
            imageContainer: 'aight-container',
            imageDescription: 'aight-description',
            nextButton: 'aight-next',
            prevButton: 'aight-prev',
            template: '',
            wrapper: 'aight-wrapper'
        }, options);

        standardTemplate =  '<div id="' + config.backdrop + '"></div>'+
                            '<div id="' + config.wrapper + '">'+
                            '<div id="' + config.imageContainer + '">' +
                            '<a id="' + config.nextButton + '" href="#">></a>'+
                            '<a id="' + config.prevButton + '" href="#"><</a>'+
                            '<a id="' + config.closeButton + '" href="#">x</a>'+
                            '<img src="" alt=""/>' +
                            '<p id="' + config.imageDescription + '"></p>'+
                            '</div>' +
                            '</div>';


        bindButtons = function() {

            if(!singleImage) {

                $('#' + config.prevButton).unbind('click').click(function(e){
                    e.preventDefault();
                    index = index > 0 ? index - 1 : $imageLinks.length - 1;
                    $currentImage = $($imageLinks[index]);
                    createImageContainer();
                });

                $('#' + config.nextButton).unbind('click').click(function(e){
                    e.preventDefault();
                    index = index < $imageLinks.length-1 ? index + 1 : 0;
                    $currentImage = $($imageLinks[index]);
                    createImageContainer();

                });

            }

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
            $imageDesc = $('#' + config.imageDescription);

            if($imageLinks.length === 1) {
                $('#' + config.prevButton).remove();
                $('#' + config.nextButton).remove();
                singleImage = true;
            }

        };

        bindEvents = function() {
            $imageLinks.on('click', function(e){
                e.preventDefault();
                $currentImage = $(this);
                index = $imageLinks.index($currentImage);
                createImageContainer();
            });

        };

        createImageContainer = function() {

            var $containerImage = $('#' + config.imageContainer + ' img'),
                firstRun = false,
                imgUrl = $currentImage.prop('href'),
                imgDescription = $currentImage.find('img').prop('alt');


            if($containerImage.length === 0){
                firstSetup();
                $('#' + config.imageContainer + ' img').prop('src', imgUrl);
                $('#' + config.imageContainer + ' img').prop('alt', imgDescription);
                $('#aight-description').text(imgDescription);
                $wrapper.fadeIn('slow');
                $backdrop.fadeIn(200);
                firstRun = true;
            } else {
                $containerImage.prop('src', imgUrl);
                $containerImage.prop('alt', imgDescription);
                $('#aight-description').text(imgDescription);
                $backdrop.fadeIn(200);
            }

            if(imgDescription === ''){
                $imageDesc.hide();
            } else {
                $imageDesc.show();
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
            config.template = standardTemplate;
            $imageLinks = $((that.selector + ' a'));
            bindEvents();
        };

        init();
        return that;

    };

} (jQuery, window, document));
