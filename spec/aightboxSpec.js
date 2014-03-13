describe('AIGHTbox - Image Galery plugin', function() {

    'use strict';

    var fixture,
        loadFixtures,
        setupPage,
        cleanUp,
        $container,
        $firstLink,
        $secondLink;

    loadFixtures = function() {

        fixture          = setFixtures(('<body>' +
                            '<ul>' +
                            '<li><a class="ai" href="images/1.png"><img src="images/1_thumb.png"/></a></li>' +
                            '<li><a class="ai" href="images/2.png"><img src="images/2_thumb.png"/></a></li>' +
                            '</ul>' +
                            '<body>')
                        );
    };

    setupPage = function() {

        $('.ai').aightbox();

        $firstLink = fixture.find('a')[0];
        $secondLink = fixture.find('a')[1];

        $container = fixture.find('#aigth-container');

    };

    cleanUp = function () {
        $('#aight-backdrop').remove();
        $('#aight-wrapper').remove();
    };

    describe('basic behaviour', function() {

        it('should be defined', function(){
            expect($.fn.aightbox).toBeDefined();
        });

    });

    describe('on init', function(){

        beforeEach(function() {
            loadFixtures();
            setupPage();
        });

        it('image container should not be on the page', function(){
            expect($container.length).toBe(0);
        });

    });

    describe('on thumbnail click', function() {

        beforeEach(function() {
            loadFixtures();
            setupPage();
            $($firstLink).trigger('click');
        });

        afterEach(function(){
            cleanUp();
        });

        it('should show lightbox', function(){
            $container = $('#aight-container');
            expect($container).toExist();
        });

        it('should contain the image of the clicked anchor',function(){
            var imageLinkUrl = $($firstLink).attr('href');
            var imageUrl = $('#aight-container img').attr('src');
            expect(imageUrl).toContain(imageLinkUrl);
        });

    });

    describe('when close is clicked', function() {

        beforeEach(function() {
            loadFixtures();
            setupPage();
        });

        afterEach(function(){
            cleanUp();
        });

        it('should close if x is clicked', function(){
            $($firstLink).trigger('click');
            $('#aight-close').click();
            expect($('#aight-backdrop')).toBeHidden();
        });

    });

});
