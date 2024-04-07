
$(document).ready(function () {
    $('#formCadastro').submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: urlPost,
            method: "POST",
            data: {
                "NOME": $(this).find("#Nome").val(),
                "CEP": $(this).find("#CEP").val(),
                "CPF": $(this).find("#CPF").val(),
                "Email": $(this).find("#Email").val(),
                "Sobrenome": $(this).find("#Sobrenome").val(),
                "Nacionalidade": $(this).find("#Nacionalidade").val(),
                "Estado": $(this).find("#Estado").val(),
                "Cidade": $(this).find("#Cidade").val(),
                "Logradouro": $(this).find("#Logradouro").val(),
                "Telefone": $(this).find("#Telefone").val()
            },
            error:
            function (r) {
                if (r.status == 400)
                    ModalDialog("Ocorreu um erro", r.responseJSON);
                else if (r.status == 500)
                    ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
            },
            success:
            function (r) {
                ModalDialog("Sucesso!", r)
                $("#formCadastro")[0].reset();
            }
        });
    })
    
})

function ModalBeneficiario(link) {
    var random = Math.random().toString().replace('.', '');
    var texto = `<div id="beneficiario" class="modal fade">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                                <h4 class="modal-title">Beneficiários</h4>
                            </div>
                            <div class="modal-body">
                                <div class="row">
		                            <div class="col-md-6">
			                            <div class="form-group">
				                            <label for="Nome">Nome:</label>
				                            <input required="required" type="text" class="form-control" id="Nome" name="Nome" placeholder="Ex.: João" maxlength="50">
			                            </div>
		                            </div>
		                            <div class="col-md-6">
			                            <div class="form-group">
				                            <label for="CPF">CPF:</label>
				                            <input required="required" type="text" class="form-control" id="CPF" name="CPF" placeholder="Ex.: 010.011.111-00" maxlength="14">
			                            </div>
		                            </div>
	                            </div>
                                <table id="gridBeneficiarios" class="table"></table>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
                            </div>
                        </div><!-- /.modal-content -->
                </div><!-- /.modal-dialog -->
            </div> <!-- /.modal -->`

    $('body').append(texto);
    $('#beneficiario').modal('show');

    listarBeneficiarios(link);
}

function listarBeneficiarios(link) {
    if (document.getElementById("gridBeneficiarios"))
        $('#gridBeneficiarios').jtable({
            title: 'Beneficiários',
            paging: true, //Enable paging
            pageSize: 5, //Set page size (default: 10)
            sorting: true, //Enable sorting
            defaultSorting: 'Nome ASC', //Set default sorting
            actions: {
                listAction: link,
            },
            fields: {
                Nome: {
                    title: 'Nome',
                    width: '50%'
                },
                CPF: {
                    title: 'CPF',
                    width: '35%'
                },
                Alterar: {
                    title: '',
                    display: function (data) {
                        return '<button onclick="window.location.href" class="btn btn-primary btn-sm">Alterar</button>';
                    }
                }
            }
        });

    //Load student list from server
    if (document.getElementById("gridBeneficiarios"))
        $('#gridBeneficiarios').jtable('load');
}
