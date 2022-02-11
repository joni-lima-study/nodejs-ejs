$(document).ready(function () {
  $("#form").validate({

    errorPlacement: function (error, element) {
      error.insertBefore(element);
    },
    rules: {
      quantidade: {
        required: true,
        number: true,
      },
      nota_fiscal: {
        required: true,
      },
      produto_id: {
        required: true,
        number: true
      },
      total: {
        required: true,
        number: true
      }
    },
    messages: {
      quantidade: 'Informe a quantidade',
      nota_fiscal: 'Informe a nota fiscal',
      produto_id: 'Selecione um produto',
      total: 'Informe o valor total contido na nota para o item'
    },
    submitHandler: function (form) {
      if ($('#form').valid())
        form.submit();
      return false; // prevent normal form posting
    },
  });
});