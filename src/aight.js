(function($, window, document, undefined) {

    'use strict';

    $.fn.aight = function(options) {

        var init,
            index,
            setNextGroupImage,
            getGroupList,
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
            carousel: false,
            carouselGroup: true,
            imageContainer: 'aight-container',
            imageDescription: 'aight-description',
            nextButton: 'aight-next',
            nextCharacter: '>',
            prevCharacter: '<',
            prevButton: 'aight-prev',
            wrapper: 'aight-wrapper'
        }, options);

        standardTemplate =  '<div id="' + config.backdrop + '"></div>'+
                            '<div id="' + config.wrapper + '">'+
                            '<div id="' + config.imageContainer + '">' +
                            '<a id="' + config.nextButton + '" href="#">'+ config.nextCharacter +'</a>'+
                            '<a id="' + config.prevButton + '" href="#">' + config.prevCharacter +'</a>'+
                            '<a id="' + config.closeButton + '" href="#">x</a>'+
                            '<img src="" alt=""/>' +
                            '<p id="' + config.imageDescription + '"></p>'+
                            '</div>' +
                            '</div>';


        getGroupList = function() {
            return $currentImage.closest('ul');
        };

        setNextGroupImage = function(dir) {

            var groupIndex,
                groupList;

            groupList = getGroupList();

            if(groupList.length > 0) {

                groupList = groupList.find('a');
                groupIndex = groupList.index($currentImage);

                if(dir === 'prev') {
                    groupIndex = groupIndex > 0 ? groupIndex - 1 : groupList.length -1;
                } else {

                    groupIndex = groupIndex < groupList.length - 1 ? groupIndex + 1 : 0;
                }

                $currentImage = $(groupList[groupIndex]);

            }

            return $currentImage;

        };

        bindButtons = function() {

            if(!singleImage) {

                $('#' + config.prevButton).unbind('click').click(function(e){
                    e.preventDefault();

                    if(config.carouselGroup){
                        setNextGroupImage('prev');
                    } else if (config.carousel) {
                        index = index < $imageLinks.length-1 ? index + 1 : 0;
                        $currentImage = $($imageLinks[index]);
                    }

                    createImageContainer();
                });

                $('#' + config.nextButton).unbind('click').click(function(e){
                    e.preventDefault();

                    if(config.carouselGroup){
                        setNextGroupImage('next');
                    } else if (config.carousel) {
                        index = index < $imageLinks.length-1 ? index + 1 : 0;
                        $currentImage = $($imageLinks[index]);
                    }

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

            $('body').append(standardTemplate);

            $backdrop  = $('#' + config.backdrop);
            $wrapper   = $('#' + config.wrapper);
            $container = $('#' + config.imageContainer);
            $imageDesc = $('#' + config.imageDescription);

            if($imageLinks.length === 1) {
                $('#' + config.prevButton).hide();
                $('#' + config.nextButton).hide();
                singleImage = true;
            }

        };

        bindEvents = function() {

            $imageLinks.on('click', function(e){

                e.preventDefault();

                var list;

                $currentImage = $(this);

                list = getGroupList();

                if(list.length < 1 || list.find('a').length <= 1){
                    $('#' + config.prevButton).hide();
                    $('#' + config.nextButton).hide();
                } else {
                    $('#' + config.prevButton).show();
                    $('#' + config.nextButton).show();
                }

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

            });

            if(firstRun){
                bindButtons();
            }

            $wrapper.fadeIn();
        };

        init = function() {
            $imageLinks = $(that.selector);
            bindEvents();
        };

        init();
        return that;

    };

} (jQuery, window, document));
