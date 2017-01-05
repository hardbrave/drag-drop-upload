(function ($) {
    var sanitized_options = function(opts) {
        var default_options = {
            upload_callback: void 0,
            dragenter_css_callback: function () {
                $(this).css('border', '2px solid #0B85A1');
                $(this).text('松开图片进行上传');
            },
            dragover_css_callback: function () {
                $(this).css('border', '2px solid #0B85A1');
                $(this).text('或将图片拖拽到此处直接上传');
            },
            drop_css_callback: function () {
                $(this).css('border', '2px dotted #0B85A1');
            },
            uploading_css_callback: function () {
                $(this).css('border', '2px dotted #0B85A1');
                $(this).text('正在上传，请稍候...')
            },
            uploaded_css_callback: function () {
                $(this).css('border', '2px dotted #0B85A1');
                $(this).text('或将图片拖拽到此处直接上传');
            }

        };
        return $.extend({}, default_options, opts == null ? {} : opts);
    };

    $.fn.extend({
        dragDropUploadWrapper: function (opts) {
            opts = sanitized_options(opts);
            return this.each(function () {
                $(this).dragDropUpload({
                    upload_file: function (file) {
                        var fd = new FormData();
                        fd.append('upload_file', file);
                        return (
                            $.ajax({
                                url: '/api/admin/image/upload_image/' + opts.image_type,
                                type: 'POST',
                                dataType: 'json',
                                contentType: false,
                                processData: false,
                                cache: false,
                                data: fd
                            }).then(function (data) {
                                return (
                                    $.ajax({
                                        url: '/api/admin/image/get_image_info/' + opts.image_type + '/' + data.image_id,
                                        dataType: 'json',
                                        cache: false
                                    }).then(function (image_info) {
                                        var dtd = $.Deferred();
                                        return dtd.resolve({
                                            url: '/uploads/images/' + opts.image_type + '/' + image_info.path + '400px/' + image_info.file_name,
                                            id: image_info.id,
                                            file_name: image_info.file_name
                                        });
                                    })
                                );
                            })
                        )
                    },
                    upload_callback: opts.upload_callback,
                    dragenter_css_callback: opts.dragenter_css_callback,
                    dragover_css_callback: opts.dragover_css_callback,
                    drop_css_callback: opts.drop_css_callback,
                    uploading_css_callback: opts.uploading_css_callback,
                    uploaded_css_callback: opts.uploaded_css_callback
                });
                
            });
        }
    });
})(jQuery);