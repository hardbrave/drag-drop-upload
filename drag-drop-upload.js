(function ($) {
    var sanitized_options = function(opts) {
        var default_options = {
            upload_file: void 0,                // 上传文件(必填,$.ajax().then())
            upload_callback: void 0,            // 上传成功回调函数
            dragenter_css_callback: void 0,     // 图片进入拖拽区域CSS样式回调函数
            dragover_css_callback: void 0,      // 图片在拖拽区域移动时CSS样式回调函数
            drop_css_callback: void 0,          // 图片在拖拽区域松手后CSS样式回调函数
            uploading_css_callback: void 0,     // 图片在上传过程中CSS样式回调函数
            uploaded_css_callback: void 0       // 图片上传成功后CSS样式回调函数
        };
        return $.extend({}, default_options, opts == null ? {} : opts);
    };

    $.fn.extend({
        dragDropUpload: function (opts) {
            opts = sanitized_options(opts);
            return this.each(function() {
                $(this).on('dragenter', $.proxy(function (event) {
                    event.stopPropagation();
                    event.preventDefault();
                    if (opts.dragenter_css_callback) {
                        opts.dragenter_css_callback.call(this);
                    }
                }, this));

                $(this).on('dragover', $.proxy(function (event) {
                    event.stopPropagation();
                    event.preventDefault();
                    if (opts.dragover_css_callback) {
                        opts.dragover_css_callback.call(this);
                    }
                }, this));

                $(this).on('drop', $.proxy(function (event) {
                    event.stopPropagation();
                    event.preventDefault();
                    if (opts.drop_css_callback) {
                        opts.drop_css_callback.call(this);
                    }

                    if (!$(this).attr('data-is-uploading') && opts.upload_file) {
                        if (opts.uploading_css_callback) {
                            opts.uploading_css_callback.call(this);
                        }
                        $(this).attr('data-is-uploading', 'true');
                        var files = event.originalEvent.dataTransfer.files;
                        $.when(opts.upload_file(files[0])).then($.proxy(function (data) {
                            if (opts.upload_callback) {
                                opts.upload_callback.call(this, data);
                            }
                        }, this)).always($.proxy(function () {
                            $(this).removeAttr('data-is-uploading');
                            if (opts.uploaded_css_callback) {
                                opts.uploaded_css_callback.call(this);
                            }
                        }, this));
                    }
                }, this));

                // 禁止浏览器默认行为
                $(document).on('dragenter', function (event) {
                    event.stopPropagation();
                    event.preventDefault();
                });

                $(document).on('dragover', function (event) {
                    event.stopPropagation();
                    event.preventDefault();
                    if (opts.dragover_css_callback) {
                        opts.dragover_css_callback.call(this);
                    }
                });

                $(document).on('drop', function (event) {
                    event.stopPropagation();
                    event.preventDefault();
                });
            });
        }
    });
})(jQuery);