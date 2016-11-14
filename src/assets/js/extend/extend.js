/**
 * Created by Code1912 on 2016/3/23.
 */
(function ($) {
    $.fn.drags = function (opt) {

        opt = $.extend({
            handle: "",
            cursor: "move"
        }, opt);

        var $selected = this.find(".modal-content");
        var $elements = (opt.handle === "") ? this : this.find(opt.handle);

        $elements.css('cursor', opt.cursor).on("mousedown", function (e) {
            var pos_y = $selected.offset().top - e.pageY,
                pos_x = $selected.offset().left - e.pageX;
            $(document).on("mousemove", function (e) {
                $selected.offset({
                    top: e.pageY + pos_y,
                    left: e.pageX + pos_x
                });
            }).on("mouseup", function () {
                $(this).off("mousemove"); // Unbind events from document                
            });
            e.preventDefault(); // disable selection
        });

        return this; 
    };
})(jQuery);