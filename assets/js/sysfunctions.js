//Forces the loading to disappear from the screen.
$('document').ready(function(){
    $('.sysloading').fnToggle("none");
});

/**
 * Function isArray
 * Determina se uma variavel é um array
 * @param obj Variavel para ser testada
 * @returns {boolean}
 *
 * @ref https://stackoverflow.com/questions/4775722/how-to-check-if-an-object-is-an-array
 */
function isArray(obj) {
	if(obj === null) return false;
	return (typeof obj).toLowerCase() === "object";
}

/**
 * Function isZero.
 * Testa se uma variavel está zerada
 *
 * @param {*} str variavel para testar
 * @returns {boolean}
 */
function isZero(str) {
	try{
		str *= 1;
		if(str === 0) {
			return true;
		}
	} catch (e) {}

	return false;
}

/**
 * Function isEmpty.
 * Testa se uma variavel é vazia, testando todos os possiveis casos
 *
 * @param {*} str variavel para testar
 * @returns {boolean}
 */
function isEmpty(str) {
	if(
		str === null ||
		str === false ||
		str === undefined || (
			isArray(str) &&
			str.length === 0
		)
	) {
		return true;
	} else if(isArray(str) && str.length > 0){
		return false;
	}

	try{
		str = str.toString().trim().toLowerCase();
		if(
			str === "" || str === "false" ||
			str === "null" || str === "undefined" ||
			str === "nan"
		) {
			return true;
		}
	} catch (e) {}

	return isZero(str);
}

/**
 * Function isEmptyDecimal.
 * Testa se uma variavel é vazia, ou vazia como float, testando todos os possiveis casos
 *
 * @param {*} str variavel para testar
 * @returns {boolean}
 */
function isEmptyDecimal(str) {
	try{
		return isEmpty(parseFloat(str));
	}catch(e){}

	return isEmpty(str);
}

/**
 * Function isEmptyInteger.
 * Testa se uma variavel é vazia, ou vazia como integer, testando todos os possiveis casos
 *
 * @param {*} str variavel para testar
 * @returns {boolean}
 */
function isEmptyInteger(str) {
	try{
		return isEmpty(parseInt(str));
	}catch(e){}

	return isEmpty(str);
}

/**
 * Function number_format.
 * Formata um decimal em JS equivalente ao number_format do PHP
 * @param number integer:      Numero para ser formatado
 * @param decimals integer:    Numero de casas decimais permitidas
 * @param dec_point mixed:     Separador de milhar
 * @param thousands_sep mixed: Separador de decimais
 *
 * @ref https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
 * @ref http://jsfiddle.net/drewnoakes/xc3qh35z/
 */
function number_format(number, decimals, dec_point, thousands_sep) {
    if(isEmptyDecimal(number)) return "0";

    const n = !isFinite(+number) ? 0 : +number,
          prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
          sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
          dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
          toFixedFix = function (n, prec) {
              // Fix for IE parseFloat(0.55).toFixed(0) = 0;
              const k = Math.pow(10, prec);
              return Math.round(n * k) / k;
          };
    let s = (prec ? toFixedFix(n, prec) : Math.round(n)).toString().split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec).toString();
}

/**
 * Function apenasNumeros
 * Retorna apenas os numeros de uma string
 * @param str String para deixar apenas numeros
 * @return string
 *
 * @ref https://stackoverflow.com/questions/185510/how-can-i-concatenate-regex-literals-in-javascript
 * @ref https://stackoverflow.com/questions/4460595/jquery-filter-numbers-of-a-string
 */
function apenasNumeros(str) {
    if(str === undefined || str === null) return "";
    return str.toString().replace(/[^0-9]/g, '').toString();
}

/**
 * Function apenasNumerosLetras
 * Retorna apenas os numeros e letras de uma string
 * @param str String para deixar apenas numeros e letras
 * @return string
 */
function apenasNumerosLetras(str) {
    if(str === undefined || str === null) return "";
    return str.toString().toUpperCase().replace(/[^0-9A-Z]/g, '').toString();
}

/**
 * Function removerTodosCharExceto.
 * Remoe todos caracteres da string que não estiverem nos chars enviados
 * @param str String para remoção dos caracteres
 * @param chs Caracters para ignorar
 * @returns {string}
 */
function removerTodosCharExceto(str, chs) {
    if (isEmpty(chs)) return str;
    if (isEmpty(str)) return "";
    str = str.toString();
    chs = chs.toString();

    let ret = "", remChrStr = true;
    for (let iStr = 0; iStr < str.length; iStr++) {
        remChrStr = true;

        for (let iChs = 0; iChs < chs.length; iChs++) {
            if(str.charAt(iStr) !== chs.charAt(iChs)) continue;

            remChrStr = false;
            break;
        }

        if (!remChrStr) ret += str.charAt(iStr);
    }

    return ret;
}

/**
 * Function removerSeguintesChars.
 * Remove todos caracteres da string que estiverem nos chars enviados
 * @param str String para remoção dos caracteres
 * @param chs Caracters para remover
 * @returns {string}
 */
function removerSeguintesChars(str, chs) {
    if (isEmpty(chs)) return str;
    if (isEmpty(str)) return "";
    str = str.toString();
    chs = chs.toString();

    for (let iChs = 0; iChs < chs.length; iChs++) {
        str.replace(chs.charAt(iChs).toString(), '');
    }

    return str;
}

/**
 * Function hasChar.
 * Diz se há uma palavra em uma string
 * @param str         String para realizar o search
 * @param find        String para encontrar no primeiro parametro
 * @returns {boolean}
 */
function hasChar(str, find){
    return str.toString().indexOf(find) !== -1;
}

/**
 * Function isNegativo.
 * Testa se existe o caracter de numero negativo
 * @param $str string String para testar se existe o simbolo de negativo
 * @return boolean
 */
function isNegativo ($str) {
    if(isEmpty($str)) return false;
    return /(-)/g.test($str);
}

/**
 * Function formataFloat.
 * Formata um número para o padrão desejado
 * @param num string Numero para ser formatado
 * @param divisorNum string Divisor de casas decimais do numero
 * @param casasDecimais int Numero de casas decimais permitidas depois da virgula
 * @param divisorRetorno string Divisor de casas decimais ao retornar o valor
 * @param prefixoNum string Prefixo do numero (Ex: R$)
 * @param sufixoNum string Sufixo do numero (Ex: %)
 * @param canNegativos bool Define se o numero pode ser negativo ou não
 * @param apenasInteiro bool Define se o retorno deve ser apenas inteiro ou não
 * @param pontoMilhar string Define Define se terá ou não um ponto de milhar
 * @return string
 */
function formataFloat (
	num, divisorNum, casasDecimais, divisorRetorno,
	prefixoNum, sufixoNum, canNegativos, apenasInteiro, pontoMilhar
) {
    let ret = "";

    divisorNum = removerSeguintesChars(divisorNum, '0123456789+-' + prefixoNum + sufixoNum);
    if (isEmpty(divisorNum)) divisorNum = '.';
    divisorRetorno = removerSeguintesChars(divisorRetorno, '0123456789+-' + prefixoNum + sufixoNum);
    if (isEmpty(divisorRetorno)) divisorRetorno = '.';
    pontoMilhar = removerSeguintesChars(pontoMilhar, '0123456789+-' + prefixoNum + sufixoNum);
    if (isEmpty(pontoMilhar) || pontoMilhar === divisorRetorno) pontoMilhar = "";
    if (isEmptyDecimal(casasDecimais)) casasDecimais = 0;
    if (isEmpty(prefixoNum)) prefixoNum = "";
    if (isEmpty(sufixoNum)) sufixoNum = "";
    if (isEmpty(num)) num = "0";
    canNegativos = !isEmpty(canNegativos);
    apenasInteiro = !isEmpty(apenasInteiro);

    divisorNum = divisorNum.toString();
    divisorRetorno = divisorRetorno.toString();
    pontoMilhar = pontoMilhar.toString();
    prefixoNum = prefixoNum.toString();
    sufixoNum = sufixoNum.toString();
    num = num.toString().split(divisorNum);

    if(isNegativo(num[0]) && canNegativos) ret += '-';
    num[0] = apenasNumeros(num[0]);
    ret += num[0];

    if (num.length > 1 && !apenasInteiro) {
        num[1] = apenasNumeros(num[1]);
        ret +=
            (isEmpty(pontoMilhar) ? divisorRetorno : '.') +
            num[1].toString().substr(0, casasDecimais);
    }

    if(!isEmpty(pontoMilhar)) ret = number_format(ret, casasDecimais, divisorRetorno, pontoMilhar);
    ret = prefixoNum.toString().trim() + " " + ret + " " + sufixoNum.toString().trim();
    ret = $ret.trim();

    return $ret;
}

/**
 * Function recreateObject.
 * Recria o objeto limpando-o
 * @param obj
 */
function recreateObject(obj){
    let clone = null;
    obj.each(function (index) {
        clone = $(this).clone();
        $(this).after(clone);
    });
    clone = null;
    obj.remove();
}

//Funções costumizadas para mascara de numeros
$.fn.extend({
    /**
     * Method fnMaskNumero.
     * Mascara que contempla todos os tipos de mascaras possiveis referentes decimais e inteiros
     *
     * @data dec_sep            Separador dos decimais
     * @data thous_sep          Separador dos milhares
     * @data dec_places         Número de casas decimais permitidas (0-6)
     * @data prefixo            Especifica o prefixo colocado no texto
     * @data sufixo             Especifica o sufixo colocado no texto
     * @data allow_neg          Permite ou não numeros negativos
     */
    fnMaskNumero: function () {
        /**
         * Function formataValoresFnMaskNumero
         * Irá formatar os valores dos objetos para as funções subsequentes
         * @param obj object Objeto para ser formatado
         * @returns {*}
         */
        function formataValoresFnMaskNumero(obj) {
            if(isEmpty(obj)) return {};

            let valorAgora = $(obj).val();
            let dec_places = parseInt(apenasNumeros($(obj).data('dec_places')));
            let prefixo    = $(obj).data('prefixo');
            let sufixo     = $(obj).data('sufixo');
            let thous_sep  = removerSeguintesChars($(obj).data('thous_sep'), '0123456789+-' + prefixo + sufixo);
            let dec_sep    = removerSeguintesChars($(obj).data('dec_sep'), '0123456789+-' + prefixo + sufixo);
            let allow_neg  = !isEmpty($(obj).data('allow_neg'));
            let apenasInteiro = false;
            let isPositivo = false;
            let valorFloat = 0;
            let valorFloatManipulado = "";
            let aux;

            if(
                isEmptyDecimal(dec_places) ||
                dec_places < 0
            ) {
                dec_places = 0;
                apenasInteiro = true;
            }else if(dec_places > 6) {
                dec_places = 6;
            }
            if(isEmpty(valorAgora)) {
                valorAgora = "0";
                valorFloatManipulado = "0";
            }
            if(isEmpty(dec_sep)) dec_sep = ".";
            if(isEmpty(prefixo)) prefixo = "";
            else                 prefixo += " ";
            if(isEmpty(sufixo)) sufixo = "";
            else                sufixo = " " + sufixo;
            if(
                isEmpty(thous_sep) ||
                dec_sep === thous_sep
            ) thous_sep = "";

            valorAgora = valorAgora.toString();
            dec_sep = dec_sep.toString();
            prefixo = prefixo.toString();
            sufixo = sufixo.toString();
            thous_sep = thous_sep.toString();

            valorFloat =
                parseFloat(
                    formataFloat(
                        valorAgora,
                        dec_sep,
                        dec_places,
                        '.',
                        '',
                        '',
                        allow_neg,
                        apenasInteiro,
                        ''
                    ).toString()
                );
            if(apenasInteiro) valorFloat = parseInt(valorFloat.toString());
            if(isEmptyDecimal(valorFloat)) valorFloat = 0;
            isPositivo =
                !allow_neg ||
                (
                    valorFloat >= 0 &&
                    !hasChar(valorAgora, '-')
                ) ||
                hasChar(valorAgora, '+');

            aux = removerTodosCharExceto(valorAgora, ('0123456789' + dec_sep)).toString().split(dec_sep);
            aux[1] = aux[1] !== undefined && aux[1] !== null ? aux[1].toString() : "";

            valorFloatManipulado =
                (
                    !isPositivo ? "-" : ""
                ) +
                (
                    !isEmptyDecimal(aux[0]) ? parseInt(aux[0]) : "0"
                ) +
                (
                    (
                        !apenasInteiro && hasChar(valorAgora, dec_sep)
                            ? (dec_sep + aux[1])
                            : ""
                    ).toString().substr(0, (dec_places + 1))
                );

            return {
                valorAgora: valorAgora,
                valorFloat: valorFloat,
                valorFloatManipulado: valorFloatManipulado,
                dec_sep: dec_sep,
                dec_places: dec_places,
                prefixo: prefixo,
                sufixo: sufixo,
                thous_sep: thous_sep,
                allow_neg: allow_neg,
                isPositivo: isPositivo,
                apenasInteiro: apenasInteiro,
            };
        }
        /**
         * Function pre.
         * Realiza a formatação do número ao clicar no campo para a edição
         * @param e Evento
         */
        function preMask(e){
            let obj = formataValoresFnMaskNumero(this);
            $(this).val(obj.valorFloat.toString().replace(".", obj.dec_sep));
        }
        /**
         * Function onMask.
         * Realiza a formatação do número durante a digitação no campo
         * @param e Evento
         */
        function onMask(e) {
            let obj = formataValoresFnMaskNumero(this);
            $(this).val(obj.valorFloatManipulado);
        }
        /**
         * Function posMascaraNumero.
         * Após sair da digitação faz a formatação do número
         * @param e evento da ocorrencia (Não usado)
         */
        function posMask(e){
            let obj = formataValoresFnMaskNumero(this);
            $(this).val(obj.prefixo + number_format(obj.valorFloat.toString(), obj.dec_places, obj.dec_sep, obj.thous_sep) + obj.sufixo);
        }
        $(this)
            .off('focus', preMask)
            .on('focus', preMask)
            .off('input', onMask)
            .on('input', onMask)
            .off('blur', posMask)
            .on('blur', posMask);
    }
});
//Funções uteis e especificas do sistema

/**
 * Funções especifícas para utilização do sistema
 */
$.fn.extend({
    /**
     * Function fnToggle
     * Mostra e deixa de mostrar divisórias do sistema
     *
     * @param force string Define se será forçado o toggle para none ou block (none/block/null)
     */
    fnToggle: function(force) {
        if(!isEmpty(force)) {
            $(this).css("display", force);
            return;
        }

        if ($(this).css("display") === 'none') {
            $(this).css("display", "block");
        } else {
            $(this).css("display", "none");
        }
    }
});

/**
 * Function ativaFuncoesGerais.
 * Realiza a ativação de funções de mascaras e transformações do portal
 */
function ativaFuncoesGerais() {
    recreateObject($("input[data-mask='number']"));
    $("input[data-mask='number']").fnMaskNumero();

    $("input[data-mask='number_letters']").off('input');
    $("input[data-mask='number_letters']").on('input', function () {
        $(this).val(apenasNumerosLetras($(this).val()));
    });
}

ativaFuncoesGerais();
