using FI.AtividadeEntrevista.BLL;
using FI.AtividadeEntrevista.DML;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebAtividadeEntrevista.Models;

namespace WebAtividadeEntrevista.Controllers
{
    public class BeneficiarioController : Controller
    {
        [HttpPost]
        public JsonResult BeneficiarioList(int jtStartIndex = 0, int jtPageSize = 0, string jtSorting = null)
        {
            try
            {
                int qtd = 0;
                string campo = string.Empty;
                string crescente = string.Empty;
                string[] array = jtSorting.Split(' ');

                if (array.Length > 0)
                    campo = array[0];

                if (array.Length > 1)
                    crescente = array[1];

                List<Beneficiario> beneficiario = new BoBeneficiario().Pesquisa(jtStartIndex, jtPageSize, campo, crescente.Equals("ASC", StringComparison.InvariantCultureIgnoreCase), out qtd);

                foreach (var item in beneficiario)
                {
                    item.CPF = Convert.ToUInt64(item.CPF).ToString(@"000\.000\.000\-00");
                }
                //Return result to jTable
                return Json(new { Result = "OK", Records = beneficiario, TotalRecordCount = qtd });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        [HttpPost]
        public JsonResult SalvarBeneficiario(BeneficiarioModel model)
        {
            BoBeneficiario bo = new BoBeneficiario();

            if (!this.ModelState.IsValid)
            {
                List<string> erros = (from item in ModelState.Values
                                      from error in item.Errors
                                      select error.ErrorMessage).ToList();

                Response.StatusCode = 400;
                return Json(string.Join(Environment.NewLine, erros));
            }

            string cpfDesformatado = model.CPF.Replace(".", "").Replace("-", "");

            if (!bo.ValidarCPF(model.CPF))
            {
                Response.StatusCode = 400;
                return Json("CPF inválido.");
            }

            if (model.Id != 0)
            {
                bo.Alterar(new Beneficiario()
                {
                    Id = model.Id,
                    CPF = cpfDesformatado,
                    Nome = model.Nome,
                    Idcliente = model.Idcliente
                });
            }
            else
            {
                if (bo.VerificarExistencia(cpfDesformatado))
                {
                    Response.StatusCode = 400;
                    return Json("CPF já registrado.");
                }
                model.Id = bo.Incluir(new Beneficiario()
                {
                    CPF = cpfDesformatado,
                    Nome = model.Nome,
                    Idcliente = model.Idcliente
                });
            }

            return Json("Cadastro efetuado com sucesso");

        }

        [HttpPost]
        public JsonResult RemoverBeneficiario(long Id)
        {
            BoBeneficiario bo = new BoBeneficiario();
            bo.Excluir(Id);

            return Json("Remoção efetuada com sucesso");
        }
    }
}