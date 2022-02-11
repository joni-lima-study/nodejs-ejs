$(document).ready(function () {

  function calcularTotal() {
    var preco = parseFloat($('#produto_id').children('option:selected').data('preco'));
    var quantidade = $('#quantidade').val();
    $('#total').val(preco * quantidade);
  }

  $('#produto_id').change(function () {
    calcularTotal();
  });

  $('#quantidade').keyup(function () {
    calcularTotal();
  });
});

$(document).ready(function () {
  $("#form").validate({

    errorPlacement: function (error, element) {
      error.insertBefore(element);
    },
    submitHandler: function (form) {
      if ($('#form').valid())
        form.submit();
      return false; // prevent normal form posting
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
      cliente_id: {
        required: true,
        number: true
      }
    },
    messages: {
      cliente_id: 'Informe o cliente',
      quantidade: 'Informe a quantidade',
      nota_fiscal: 'Informe a nota fiscal',
      produto_id: 'Selecione um produto'
    }
  });
});