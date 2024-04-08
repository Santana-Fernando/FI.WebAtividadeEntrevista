$("#Estado").change(function () {
	listarCidades(this.value, "");
})

function PreencherSelectEstado(estado) {
    $.ajax({
        type: 'Get',
        url: "https://servicodados.ibge.gov.br/api/v1/localidades/estados",
        dataType: 'json',
        data: { id: estado },
        success: function (states) {
            states.sort(function (a, b) {
                if (a.nome > b.nome) {
                    return 1;
                }
                if (a.nome < b.nome) {
                    return -1;
                }

                return 0;
            });

            $("#Estado").append('<option value> Selecione...</option>');
            $.each(states, function (i, state) {
                if (estado == state.sigla) {
                    $("#Estado").append('<option value="' + state.sigla + '" selected>' +
                    state.nome + '</option>');
                } else {
                    $("#Estado").append('<option value="' + state.sigla + '">' +
                        state.nome + '</option>');
				}     
			});
        },
        error: function (ex) {
            $("#Estado").append('<option value=""> Selecione...</option>');
            //alert('Failed to retrieve states.' + ex);
        }
    });
}

function listarCidades(estado, cidade) {
	if (estado) {
		$("#Cidade option").remove();
		$("#Cidade").removeAttr('disabled');

		$.ajax({
			type: 'Get',
			url: "https://servicodados.ibge.gov.br/api/v1/localidades/estados/" + estado + "/distritos",

			dataType: 'json',

			success: function (states) {
				states.sort(function (a, b) {
					if (a.nome > b.nome) {
						return 1;
					}
					if (a.nome < b.nome) {
						return -1;
					}

					return 0;
				});

				$("#Cidade").append('<option value=""> Selecione...</option>');
				$.each(states, function (i, state) {
					if (cidade == state.nome) {
						$("#Cidade").append('<option value="' + state.nome + '" selected>' +
							state.nome + '</option>');
					} else {
						$("#Cidade").append('<option value="' + state.nome + '">' +
							state.nome + '</option>');
                    }					
					// here we are adding option for States

				});

				if (cidade != "") {
					$("#Cidade").val(cidade).change();
					cidade = "";
				}

			},
			error: function (ex) {
				$("#Cidade").append('<option value=""> Selecione...</option>');
				//alert('Failed to retrieve states.' + ex);
			}
		});
	} else {
		$("#Cidade option").remove();
		$("#Cidade").append('<option value=""> Selecione...</option>');
		$("#Cidade").attr('disabled', 'disabled');
	}

	return;
}

$("#CEP").blur(function (e) {

	//Nova variável "cep" somente com dígitos.
	var cep = $(this).val().replace(/\D/g, '');

	//Verifica se campo cep possui valor informado.
	if (cep != "") {

		//Consulta o webservice viacep.com.br/

		$.getJSON("//viacep.com.br/ws/" + cep + "/json/?callback=?", function (dados) {

			if (!("erro" in dados)) {
				$('.lds-ring').show();

				$("#Logradouro").val(`${dados.logradouro}, ${dados.bairro}`);

				PreencherSelectEstado(dados.uf);
				listarCidades(dados.uf, dados.localidade);
			}
		});
	}
});