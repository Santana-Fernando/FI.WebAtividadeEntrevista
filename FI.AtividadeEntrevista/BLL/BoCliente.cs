using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FI.AtividadeEntrevista.BLL
{
    public class BoCliente
    {
        /// <summary>
        /// Inclui um novo cliente
        /// </summary>
        /// <param name="cliente">Objeto de cliente</param>
        public long Incluir(DML.Cliente cliente)
        {
            DAL.DaoCliente cli = new DAL.DaoCliente();
            return cli.Incluir(cliente);
        }

        /// <summary>
        /// Altera um cliente
        /// </summary>
        /// <param name="cliente">Objeto de cliente</param>
        public void Alterar(DML.Cliente cliente)
        {
            DAL.DaoCliente cli = new DAL.DaoCliente();
            cli.Alterar(cliente);
        }

        /// <summary>
        /// Consulta o cliente pelo id
        /// </summary>
        /// <param name="id">id do cliente</param>
        /// <returns></returns>
        public DML.Cliente Consultar(long id)
        {
            DAL.DaoCliente cli = new DAL.DaoCliente();
            return cli.Consultar(id);
        }

        /// <summary>
        /// Excluir o cliente pelo id
        /// </summary>
        /// <param name="id">id do cliente</param>
        /// <returns></returns>
        public void Excluir(long id)
        {
            DAL.DaoCliente cli = new DAL.DaoCliente();
            cli.Excluir(id);
        }

        /// <summary>
        /// Lista os clientes
        /// </summary>
        public List<DML.Cliente> Listar()
        {
            DAL.DaoCliente cli = new DAL.DaoCliente();
            return cli.Listar();
        }

        /// <summary>
        /// Lista os clientes
        /// </summary>
        public List<DML.Cliente> Pesquisa(int iniciarEm, int quantidade, string campoOrdenacao, bool crescente, out int qtd)
        {
            DAL.DaoCliente cli = new DAL.DaoCliente();
            return cli.Pesquisa(iniciarEm,  quantidade, campoOrdenacao, crescente, out qtd);
        }

        /// <summary>
        /// VerificaExistencia
        /// </summary>
        /// <param name="CPF"></param>
        /// <returns></returns>
        public bool VerificarExistencia(string CPF)
        {
            DAL.DaoCliente cli = new DAL.DaoCliente();
            return cli.VerificarExistencia(CPF);
        }

        /// <summary>
        /// ValidarCPF
        /// </summary>
        /// <param name="CPF"></param>
        /// <returns></returns>
        public bool ValidarCPF(string CPF)
        {
            // Remover caracteres não numéricos do CPF
            CPF = new string(CPF.Where(char.IsDigit).ToArray());

            // Verificar se o CPF tem 11 dígitos
            if (CPF.Length != 11)
                return false;

            // Verificar se todos os dígitos são iguais (caso especial)
            if (new string(CPF[0], 11) == CPF)
                return false;

            // Calcular os dígitos verificadores
            int[] multiplicadoresPrimeiroDigito = { 10, 9, 8, 7, 6, 5, 4, 3, 2 };
            int[] multiplicadoresSegundoDigito = { 11, 10, 9, 8, 7, 6, 5, 4, 3, 2 };

            string CPFSemDigitosVerificadores = CPF.Substring(0, 9);

            int soma = 0;
            for (int i = 0; i < 9; i++)
            {
                soma += int.Parse(CPFSemDigitosVerificadores[i].ToString()) * multiplicadoresPrimeiroDigito[i];
            }

            int resto = soma % 11;
            int primeiroDigitoVerificador = resto < 2 ? 0 : 11 - resto;

            CPFSemDigitosVerificadores += primeiroDigitoVerificador;

            soma = 0;
            for (int i = 0; i < 10; i++)
            {
                soma += int.Parse(CPFSemDigitosVerificadores[i].ToString()) * multiplicadoresSegundoDigito[i];
            }

            resto = soma % 11;
            int segundoDigitoVerificador = resto < 2 ? 0 : 11 - resto;

            // Verificar se os dígitos verificadores calculados coincidem com os dígitos reais do CPF
            return CPF.EndsWith(primeiroDigitoVerificador.ToString() + segundoDigitoVerificador.ToString());
        }
    }
}
