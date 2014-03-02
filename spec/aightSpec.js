describe('AIGHT - Image Galery plugin', function() {

    var fixture,
        loadFixtures,
        setupPage,
        $container,
        $firstLink,
        $secondLink,
        closeLightBox;

    loadFixtures = function() {

        fixture          = setFixtures(('<body>' +
                            '<ul id="imageG">' +
                            '<li><a href="images/1.png"><img src="images/1_thumb.png"/></a></li>' +
                            '<li><a href="images/2.png"><img src="images/2_thumb.png"/></a></li>' +
                            '</ul>' +
                            '<body>')
                        );
    };

    closeLightBox = function() {
        $('#aight-close').trigger('click');
    };

    setupPage = function() {

        loadFixtures();

        $container = fixture.find('#aigth-container');
        $firstLink = fixture.find('a')[0];
        $secondLink = fixture.find('a')[1];

        $('#imageG').aight();

    };

    describe('basic behaviour', function() {

        it('should be defined', function(){
            expect($.fn.aight).toBeDefined();
        });

    });

    describe('on init', function(){

        beforeEach(function() {
            setupPage();
        });

        it('image container should not be on the page', function(){
            expect($container.length).toBe(0);
        });

    });

    describe('on thumbnail click', function() {

        beforeEach(function() {
            setupPage();
            jasmine.clock().install();
        });

        it('should show lightbox on click', function(){
            $($firstLink).trigger('click');
            jasmine.clock().tick(1000);
            $container = $('#aight-container');
            expect($container).toExist();
        });

        it('should contain the image of the clicked anchor',function(){
            var imageLinkUrl = $($firstLink).attr('href');
            var imageUrl = $('#aight-container img').attr('src');
            expect(imageUrl).toContain(imageLinkUrl);
        });

        it('should close if x is clicked', function(){
            $('#aight-close').click();
            expect(parseInt($('#aight-wrapper').css('opacity'), 10)).toBe(0);
        });

    });

    describe('when lightbox is visible', function(){
        pending;
    });

});
