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
    $('#btn_add_student').on('click', function (e) {
        e.preventDefault();
        $('#frm_add_student').submit();
    });
    if ($.fn.validate) {
        $('#frm_add_student').validate({
            errorClass: 'error-msg-validate',
            rules: {
                add_hosv: { required: true },
                add_tensv: { required: true },
                add_gioitinh: { required: true },
                add_ngaysinh: { required: true },
                add_quequan: { required: true },
            }
        });
    }
    $("#frm_add_student").on('submit', function (e) {
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
                // Always hide modal after processing response
                $('#add_student').modal('hide');
            }, 'json')
            .fail(function (xhr) {
                var msg = 'Có lỗi xảy ra';
                if (xhr.status === 419) msg = 'Phiên làm việc đã hết hạn. Vui lòng tải lại trang.';
                if (window.toastr) toastr.error(msg, 'Lỗi!', {closeButton: true});
            });
        }
        return false;
    });
    /**
     * Edit form
     */
    $('#btn_edit_student').on('click', function (e) {
        e.preventDefault();
        $('#frm_edit_student').submit();
    })
    if ($.fn.validate) {
        $('#frm_edit_student').validate({
            errorClass: 'error-msg-validate',
            rules: {
                edit_hosv: { required: true },
                edit_tensv: { required: true },
                edit_gioitinh: { required: true },
                edit_ngaysinh: { required: true },
                edit_quequan: { required: true },
            }
        });
    }
    $("#frm_edit_student").on('submit', function (e) {
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
                // Reload table regardless of success to reflect current state
                try { datatable.ajax.reload(); } catch (e) {}
                // Always hide modal after processing response
                $('#edit_student').modal('hide');
            }, 'json')
            .fail(function (xhr) {
                var msg = 'Có lỗi xảy ra';
                if (xhr.status === 419) msg = 'Phiên làm việc đã hết hạn. Vui lòng tải lại trang.';
                if (window.toastr) toastr.error(msg, 'Lỗi!', {closeButton: true});
            });
        }
        return false;
    });
});