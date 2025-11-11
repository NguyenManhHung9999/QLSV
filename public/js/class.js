    $(function () {
    // Ensure all AJAX requests include the CSRF token
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $("#khoa_id").select2({
        placeholder: "--Chọn Khoa--",
        allowClear: true,
        minimumResultsForSearch: -1
    });
    $("#edit_giangvien_id").select2({
        placeholder: "--Chọn Khoa--",
        allowClear: true,
        minimumResultsForSearch: -1
    });
    $("#edit_lop_id").select2({
        placeholder: "-- Chọn lớp học --",
        multiple: true,
        minimumResultsForSearch: -1
    });
    $("#type_search").select2({
        minimumResultsForSearch: -1
    });
    $('#btn_add_class').on('click', function (e) {
        e.preventDefault();
        $('#frm_add_class').submit();
    });
    if ($.fn.validate) {
    $('#frm_add_class').validate({
        errorClass: 'error-msg-validate',
        rules: {
            malop: {
                required: true,
                remote: {
                    url: $("#frm_add_class").data('duplicate'),
                    type: "post",
                    data: {
                        malop: function() {
                            return $('#frm_add_class #malop').val();
                        }
                    }
                },
            },
            tenlop: {
                required: true,
            },
            khoa_id: {
                required: true,
            }
        }
    });
    }
    $("#frm_add_class").on('submit', function (e) {
        e.preventDefault();
        var isValid = (typeof $(this).valid === 'function') ? $(this).valid() : true;
        if (isValid) {
            var data = $(this).serializeArray();
            var url = $(this).attr('action');
            $.post(url, data, function (resp) {
                if (resp.error == 1) {
                    if (window.toastr) toastr.error(resp.message, 'Thông Báo!', {closeButton: true});
                } else {
                    if (window.toastr) toastr.success(resp.message, 'Thông Báo!', {closeButton: true});
                }
                try { datatable.ajax.reload(); } catch (e) {}
                $('#add_class').modal('hide');
                $('#malop').val('');
                $('#tenlop').val('');
                $('#khoa_id').val('');
            }, 'json')
            .fail(function (xhr) {
                var msg = 'Có lỗi xảy ra';
                if (xhr.status === 419) msg = 'Phiên làm việc đã hết hạn. Vui lòng tải lại trang.';
                if (window.toastr) toastr.error(msg, 'Lỗi!', {closeButton: true});
            });
            return false;
        }
    });
    /**
     * Edit form
     */
    $('#btn_edit_class').on('click', function (e) {
        e.preventDefault();
        $('#frm_edit_class').submit();
    })
    if ($.fn.validate) {
    $('#frm_edit_class').validate({
        errorClass: 'error-msg-validate',
        rules: {
            edit_malop: {
                required: true,
                remote: {
                    url: $("#frm_edit_class").data('duplicate'),
                    type: "post",
                    data: {
                        malop: function() {
                            return $('#frm_edit_class #edit_malop').val();
                        },
                        id:function () {

                            return $('#frm_edit_class #edit_malop').data('item-id');
                        }
                    }
                },
            },
            edit_tenlop: {
                required: true,
            },
            edit_khoa_id: {
                required: true,
            }
        }
    });
    }
        $("#frm_edit_class").on('submit', function (e) {
            e.preventDefault();
            var isValid = (typeof $(this).valid === 'function') ? $(this).valid() : true;
            if (isValid) {
                var data = $(this).serializeArray();
                var url = $(this).attr('action');
                $.post(url, data, function (resp) {
                    if (resp.error == 1) {
                        if (window.toastr) toastr.error(resp.message, 'Thông Báo!', {closeButton: true});
                    } else {
                        if (window.toastr) toastr.success(resp.message, 'Thông Báo!', {closeButton: true});
                    }
                    try { datatable.ajax.reload(); } catch (e) {}
                    $('#edit_class').modal('hide');
                    $('#edit_malop').val('');
                    $('#edit_tenlop').val('');
                    $('#edit_khoa_id').val('');
                }, 'json')
                .fail(function (xhr) {
                    var msg = 'Có lỗi xảy ra';
                    if (xhr.status === 419) msg = 'Phiên làm việc đã hết hạn. Vui lòng tải lại trang.';
                    if (window.toastr) toastr.error(msg, 'Lỗi!', {closeButton: true});
                });
                return false;
            }
        });
});