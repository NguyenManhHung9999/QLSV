$(function () {
    // Ensure all AJAX requests include the CSRF token
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $("#add_monhoc").select2({
        placeholder: "--Chọn môn học--",
        multiple: true,
    });
    $("#add_gioitinh").select2({
        placeholder: "--Giới Tính--",
        allowClear: true,
        minimumResultsForSearch: -1
    });
    $("#edit_gioitinh").select2({
        placeholder: "--Giới Tính--",
        allowClear: true,
        minimumResultsForSearch: -1
    });
    $("#type_search").select2({
        minimumResultsForSearch: -1,
    });
    $("#type_search").change(function () {
       $("#search-lop").val("");
       $("#search-masv").val("");
       $("#search-hosv").val("");
       $("#search-tensv").val("");
       $("#search-quequan").val("");
        datatable.ajax.reload();
    });
    $('#btn_add_lecturer').on('click', function (e) {
        e.preventDefault();
        $('#frm_add_lucturer').submit();
    });
    if ($.fn.validate) {
        $('#frm_add_lucturer').validate({
            errorClass: 'error-msg-validate',
            rules: {
                add_magv: { required: true },
                add_hogv: { required: true },
                add_tengv: { required: true },
                add_gioitinh: { required: true },
                add_ngaysinh: { required: true },
            }
        });
    }
    $("#frm_add_lucturer").on('submit', function (e) {
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
                $('#add_lecturer').modal('hide');
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
    $('#btn_edit_lecturer').on('click', function (e) {
        e.preventDefault();

        $('#frm_edit_lecturer').submit();
    })
    if ($.fn.validate) {
        $('#frm_edit_lecturer').validate({
            errorClass: 'error-msg-validate',
            rules: {
                edit_magv: { required: true },
                edit_hogv: { required: true },
                edit_tengv: { required: true },
                edit_gioitinh: { required: true },
                edit_ngaysinh: { required: true },
            }
        });
    }
    $("#frm_edit_lecturer").on('submit', function (e) {
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
                $('#edit_lecturer').modal('hide');
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