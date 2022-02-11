$(document).ready(function () {
    $("#form").validate({

        errorPlacement: function (error, element) {
            error.insertBefore(element);
        },
        rules: {
            nome: {
                required: true,
                // lettersonly: true
            },
            fornecedor_id: {
                required: true,
                number: true
            },
            volume_id: {
                required: true,
                number: true
            },
            setor_id: {
                required: true,
                number: true
            }
        },
        messages: {
            nome: 'Informe o nome do produto',
            fornecedor_id: 'Informe o fornecedor',
            volume_id: 'Informe o volume',
            setor_id: 'Informe o setor',
        },
        submitHandler: function (form) {
            if ($('#form').valid())
                form.submit();
            return false; // prevent normal form posting
        },
    });
});