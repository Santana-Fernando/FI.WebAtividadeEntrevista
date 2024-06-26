﻿
function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(texto);
    $('#' + random).modal('show');
}

function ModalBeneficiario() {
    var Idcliente = (urlPost).split("/")[3] == undefined ? 0 : (urlPost).split("/")[3];
    
    var texto = `
	            <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.16/jquery.mask.min.js"></script>
	            <script type="text/javascript">
		            $(".cpf").mask("999.999.999-99");
	            </script>3
                <style>
                    #salvarBeneficiario {
			            top: 24px;
		            }
		            @media only screen and (max-width: 991px) {
			            #salvarBeneficiario {
				            top: 0px;
			            }
		            }
                </style>
                  <div id="beneficiario" class="modal fade">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                                <h4 class="modal-title">Beneficiários</h4>
                            </div>
                            <div class="modal-body">
                                <form id="formCadastroBeneficiario" method="post">                                    
                                    <input type="hidden" class="form-control" id="Id" name="Id"/>
                                    <input type="hidden" class="form-control" id="Idcliente" name="Idcliente"/>
                                    <div class="row">
		                                <div class="col-md-4">
			                                <div class="form-group">
				                                <label for="NomeBeneficiario">Nome:</label>
				                                <input required="required" type="text" class="form-control" id="NomeBeneficiario" name="NomeBeneficiario" placeholder="Ex.: João" maxlength="50">
			                                </div>
		                                </div>
		                                <div class="col-md-4">
			                                <div class="form-group">
				                                <label for="CPFBeneficiario">CPF:</label>
				                                <input required="required" type="text" class="form-control cpf" id="CPFBeneficiario" name="CPFBeneficiario" placeholder="Ex.: 010.011.111-00" maxlength="14">
			                                </div>
		                                </div>
                                        <div class="col-md-4" id="salvarBeneficiario">
				                            <button type="button" class="btn btn-success" onclick="SalvarBeneficiario(${Idcliente})">Salvar</button>
			                            </div>
	                                </div>
                                </form>
                                <div id="gridBeneficiarios" class="table"></div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
                            </div>
                        </div><!-- /.modal-content -->
                </div><!-- /.modal-dialog -->
            </div> <!-- /.modal -->`

    $('body').append(texto);
    $('#beneficiario').modal('show');
    $('#Idcliente').val(Idcliente);

    listarBeneficiarios();
}

function ModalConfirmarExclusao(id) {
    var texto = `
    <div id="confirmarExclusaoBeneficiario" class="modal fade">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h4 class="modal-title">Alerta!</h4>
                </div>
                <div class="modal-body">
                    <p>Você realmente deseja excluir esse beneficiário?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" onclick="RemoverBeneficiario(${id})">Sim</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Não</button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
`

    $('body').append(texto);
    $('#confirmarExclusaoBeneficiario').modal('show');
}

function listarBeneficiarios() {
    if (document.getElementById("gridBeneficiarios")) {
        $('#gridBeneficiarios').jtable({
            paging: true, //Enable paging
            pageSize: 5, //Set page size (default: 10)
            sorting: true, //Enable sorting
            defaultSorting: 'Nome ASC', //Set default sorting
            actions: {
                listAction: "/Beneficiario/BeneficiarioList",
            },
            fields: {
                CPF: {
                    title: 'CPF',
                    width: '50%'
                },
                Nome: {
                    title: 'Nome',
                    width: '50%'
                },                
                Alterar: {
                    title: '',
                    display: function (data) {
                        return `<div class="pull-right" style="width: 200px;"><button onclick="EditarBeneficiario(${data.record.Id}, '${data.record.Nome}', '${data.record.CPF}', ${data.record.Idcliente})" class="btn btn-primary btn-sm">Alterar</button>
                                <button onclick="ModalConfirmarExclusao(${data.record.Id})" class="btn btn-danger btn-sm">Remover</button></div>`;
                    }
                }
            }
        });
        $('.jtable').removeClass('jtable').removeAttr('style').removeAttr('data-jtable-id');
        $('div.jtable-main-container > div.jtable-bottom-panel').css('background-color', '#0cff6f');
    }

    //Load student list from server
    resertarCampos();
    if (document.getElementById("gridBeneficiarios"))
        $('#gridBeneficiarios').jtable('load');
}

function SalvarBeneficiario(Idcliente) {
    var dataField = {};
    if ($("#Id").val() == 0) {
        dataField = {
            "NOME": $("#NomeBeneficiario").val(),
            "CPF": $("#CPFBeneficiario").val(),
            "Idcliente": Number(Idcliente)
        }
    } else {
        dataField = {
            "Id": $("#Id").val(),
            "NOME": $("#NomeBeneficiario").val(),
            "CPF": $("#CPFBeneficiario").val(),
            "Idcliente": Number(Idcliente)
        }
    }
    $.ajax({
        url: "/Beneficiario/SalvarBeneficiario",
        method: "POST",
        data: dataField,
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
                resertarCampos()
                listarBeneficiarios();
            }
    });
}

function EditarBeneficiario(Id, Nome, CPF, Idcliente) {
    $("#Idcliente").val(Idcliente)
    $("#NomeBeneficiario").val(Nome)
    $("#CPFBeneficiario").val(formatarCPF(CPF))
    $("#Id").val(Id)
}

function formatarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');

    cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

    return cpf;
}

function RemoverBeneficiario(id) {
    $.ajax({
        url: "/Beneficiario/RemoverBeneficiario",
        method: "POST",
        data: { Id: id },
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
                $('#confirmarExclusaoBeneficiario').modal('hide');
                listarBeneficiarios();
            }
    });
}

function resertarCampos() {
    $("#formCadastroBeneficiario")[0].reset();
    $("#Id").val("");
    $("#Idcliente").val("");
}
