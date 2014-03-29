describe('AIGHTbox - Image Galery plugin', function() {

    'use strict';

    var fixture,
        loadFixtures,
        setupPage,
        cleanUp,
        $container,
        $firstLink,
        $secondLink,
        $thirdLink,
        $singleImage;

    loadFixtures = function() {

        fixture          = setFixtures(('<body>' +
                            '<ul>' +
                            '<li><a class="ai" href="images/1.png"><img src="images/1_thumb.png"/></a></li>' +
                            '<li><a class="ai" href="images/2.png"><img src="images/2_thumb.png"/></a></li>' +
                            '<li><a class="ai" href="images/3.png"><img src="images/3_thumb.png"/></a></li>' +
                            '</ul>' +
                            '<a class="ai" href="images/3.png"><img src="images/3_thumb.png"/></a>' +
                            '<body>')
                        );
    };

    setupPage = function() {

        $('.ai').aightbox();

        $firstLink   = fixture.find('a')[0];
        $secondLink  = fixture.find('a')[1];
        $thirdLink   = fixture.find('a')[2];
        $singleImage = fixture.find('a')[3];

        $container = fixture.find('#aigth-container');

    };

    cleanUp = function () {
        $('#aight-backdrop').remove();
        $('#aight-wrapper').remove();
    };


    it('should be defined', function(){
        expect($.fn.aightbox).toBeDefined();
    });


    describe('image container on init', function(){

        beforeEach(function() {
            loadFixtures();
            setupPage();
        });

        it('should not be on the page', function(){
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

        it('shows the lightbox', function(){
            $container = $('#aight-container');
            expect($container).toExist();
        });

        it('contains the image of the clicked anchor',function(){
            var imageLinkUrl = $($firstLink).attr('href');
            var imageUrl = $('#aight-container img').attr('src');
            expect(imageUrl).toContain(imageLinkUrl);
        });

    });

    describe('controls', function() {

        beforeEach(function() {
            loadFixtures();
            setupPage();
            $($firstLink).trigger('click');
        });

        afterEach(function(){
            cleanUp();
        });

        describe('close is clicked', function() {

            it('closes the lightbox', function(){
                $('#aight-close').click();
                expect($('#aight-backdrop')).toBeHidden();
            });

        });

        describe('next is clicked', function(){

            it('contains the next image', function() {
                $('#aight-next').trigger('click');
                var imageLinkUrl = $($secondLink).attr('href');
                var imageUrl = $('#aight-container img').attr('src');
                expect(imageUrl).toContain(imageLinkUrl);
            });

        });

        describe('prev is clicked', function(){

            it('contains the prev image', function() {
                $('#aight-prev').trigger('click');
                var imageLinkUrl = $($thirdLink).attr('href');
                var imageUrl = $('#aight-container img').attr('src');
                expect(imageUrl).toContain(imageLinkUrl);
            });

        });

    });

    describe('single image', function() {

        beforeEach(function() {
            loadFixtures();
            setupPage();
            $($singleImage).trigger('click');
        });

        afterEach(function(){
            cleanUp();
        });

        it('next button should be hidden', function() {
            expect($('#aight-next')).toBeHidden();
        });

        it('prev button should be hidden', function() {
            expect($('#aight-prev')).toBeHidden();
        });

    });

    describe('group image', function() {

        beforeEach(function() {
            loadFixtures();
            setupPage();
            $($thirdLink).trigger('click');
        });

        afterEach(function(){
            cleanUp();
        });

        it('switches to the next picture in the list',function(){
            $('#aight-next').trigger('click');
            var imageLinkUrl = $($firstLink).attr('href');
            var imageUrl = $('#aight-container img').attr('src');
            expect(imageUrl).toContain(imageLinkUrl);
        });

    });

    describe('with preLoaded Images', function(){
        beforeEach(function() {
            $('.ai').aightbox({preloadImages: true});
        });

        afterEach(function() {
            $('#aight-preload').remove();
        });

        it('contains the preload container', function(){
            expect($('#aight-preload').length).toBe(1);
        });

        it('loads all images', function(){
            expect($('#aight-preload img').length).toBe($('.ai img').length);
        });

    });

});
