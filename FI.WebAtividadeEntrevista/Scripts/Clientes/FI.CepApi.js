﻿function PreencherSelectEstado(estado) {
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