$(function () {
    $.fn.classList = function() { 
        return this.className.split(/\s+/); 
    };

    var rellax = new Rellax('.nav__title', {
        center: false,
        wrapper: null,
        vertical: true,
    });
    
    var articleParallax = new Rellax('.article__body', {
        speed: 1
    });

    var meshParallax = new Rellax('.article__backmesh', {
        speed: 0.8
    });

    function Navlist(elementSelector) {
        this.items = $(elementSelector).children();

        this.getActiveItem = function () {
            return this.items.filter(function (i, item) {
                function classMatch(className) {
                    return className.match(/^list__item--\w+--filled$/);
                }
                return item.className.split(/\s+/).filter(classMatch).length > 0;
            })[0];
        }.bind(this);

        this.navHandler = function (evt) {
            var Item = $(evt.target)[0]; 
            if(this.getActiveItem() !== Item) {
                let text = Item.innerText;
                let classList = Item.className.split(/\s+/);
                var activeItem = this.getActiveItem();

                $(activeItem).removeClass(function (i, className) {
                    let classToRemove = "";
                    let classList = className.split(/\s+/);
                    classList.forEach(function (name) {
                        if(name.match(/^list__item--\w+--filled$/)) 
                            classToRemove = name; 
                    });
                    return classToRemove;
                });
                function colorClass(classList) {
                    classList.forEach(function (className) {
                        if(className.match(/^list__item--\w+$/)) {
                            let colorClasses = className.match(/^list__item--\w+$/);
                            $(Item).addClass(`${colorClasses[0]}--filled`);
                        }
                    });
                }
                colorClass(classList);
                
            }
        }.bind(this);

        [].forEach.call(this.items, function (item) {
            $(item).on("click", this.navHandler);
        }.bind(this));
    }

    var navList = new Navlist("#navlist")
});