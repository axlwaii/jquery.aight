(function($, window, document, undefined) {

    'use strict';

    $.fn.aight = function(options) {

        var init,
            index,
            setNextImage,
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
            bindControls,
            createImageContainer,
            that,
            config,
            template,
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


        // @desc basic html structure of the lightbox
        //       id's are generated from the config data

        template =  '<div id="' + config.backdrop + '"></div>'+
                    '<div id="' + config.wrapper + '">'+
                    '<div id="' + config.imageContainer + '">' +
                    '<a id="' + config.nextButton + '" href="#">'+ config.nextCharacter +'</a>'+
                    '<a id="' + config.prevButton + '" href="#">' + config.prevCharacter +'</a>'+
                    '<a id="' + config.closeButton + '" href="#">x</a>'+
                    '<img src="" alt=""/>' +
                    '<p id="' + config.imageDescription + '"></p>'+
                    '</div>' +
                    '</div>';


        // @desc finds the closest 'ul' node to the current image
        //       returns an array of all link elements inside this node
        //       returns an empty array if the current image is not in the list clostest to it

        getGroupList = function() {
            var list = $currentImage.closest('ul').find('a');

            if(list.length > 1 && list.index($currentImage) >= 0) {
                return list;
            } else {
                return [];
            }

        };

        // @desc sets the next image
        // @param dir - 'prev' dicreases the index anything else increases it

        setNextImage = function(dir) {

            if(dir === 'prev') {
                index = index > 0 ? index - 1 : $imageLinks.length - 1;
            } else {
                index = index < $imageLinks.length-1 ? index + 1 : 0;
            }

            $currentImage = $($imageLinks[index]);

        };

        // @desc sets the next image of a group
        // @param dir - 'prev' dicreases the index anything else increases it

        setNextGroupImage = function(dir) {

            var groupIndex,
                groupList;

            groupList = getGroupList();

            if(groupList.length > 0) {

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

        // @desc sets click events for the lightbox
        //       get initiated after the first time a link is clicked

        bindControls = function() {

            if(!singleImage) {

                $('#' + config.prevButton).unbind('click').click(function(e){
                    e.preventDefault();

                    if(config.carouselGroup){
                        setNextGroupImage('prev');
                    } else if (config.carousel) {
                        setNextImage('prev');
                    }

                    createImageContainer();
                });

                $('#' + config.nextButton).unbind('click').click(function(e){
                    e.preventDefault();

                    if(config.carouselGroup){
                        setNextGroupImage('next');
                    } else if (config.carousel) {
                        setNextImage('next');
                    }

                    createImageContainer();

                });

            }


            $('#' + config.closeButton).on('click', function(e){

                e.preventDefault();
                $wrapper.fadeOut('slow');
                $backdrop.hide();

            });


            $('#' + config.backdrop).unbind('click').click(function(e){
                e.preventDefault();
                $wrapper.fadeOut('slow');
                $backdrop.hide();
            });

        };


        firstSetup = function() {

            $('body').append(template);

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

                if(list.length > 1 ){
                    $('#' + config.prevButton).show();
                    $('#' + config.nextButton).show();
                } else {
                    $('#' + config.prevButton).hide();
                    $('#' + config.nextButton).hide();
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
                firstRun = true;
            } else {
                $containerImage.prop('src', imgUrl);
                $containerImage.prop('alt', imgDescription);
                $('#aight-description').text(imgDescription);
            }

            $containerImage = $('#' + config.imageContainer + ' img');
            $container = $('#' + config.imageContainer);

            $containerImage.one('load',function(){

                $wrapper.fadeIn('slow');

                $container.animate({
                    'margin-left':-($containerImage.width()/2),
                    'margin-top': -($containerImage.height()/2)
                },250);

            });

            if(firstRun){

                bindControls();

                if(getGroupList() <= 1){
                    $('#' + config.prevButton).hide();
                    $('#' + config.nextButton).hide();
                }

            }

            if(imgDescription === ''){
                $imageDesc.hide();
            } else {
                $imageDesc.show();
            }

            $backdrop.fadeIn(200);
            $wrapper.fadeIn('slow');

        };

        init = function() {
            $imageLinks = $(that.selector);
            bindEvents();
        };

        init();
        return that;

    };

} (jQuery, window, document));
