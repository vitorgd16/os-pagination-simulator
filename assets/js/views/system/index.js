$('button#run_algorithm').off("click");
$('button#run_algorithm').on("click", function () {
    let erro = null;
    const table = $('table#table-algoritmo');

    $('.sysloading').fnToggle('block');
    $(this).prop("disabled", true);

    $(table).find('thead').html('');
    $(table).find('tbody').html('');
    $(table).find('tfoot').html('');

    $('#msg-error').fnToggle('none');
    $('#msg-success').fnToggle('none');

    erro = rodarAlgoritmos(table);
    if(!isEmpty(erro)){
        $('#msg-error').html(erro);
        $('#msg-error').fnToggle('block');

        $(table).find('thead').html('');
        $(table).find('tbody').html('');
        $(table).find('tfoot').html('');
    } else {
        $('#msg-success').html('Sucesso em gerar o algoritmo!');
        $('#msg-success').fnToggle('block');
        $("#modal_resposta").modal('show');
    }

    $(this).prop("disabled", false);
    $('.sysloading').fnToggle('none');
});

function rodarAlgoritmos(table) {
    try {
        const frames = parseInt($('#num-frames').val());
        const pages = $('#pages').val().split('');
        const algoritmo = $("input[name='algorithm_type']:checked").val();
        const manterBrancoRepeticoes = $("input#white_repeat").is(':checked');
        let newCollumns = [], information = [];

        if(isEmptyInteger(frames) || frames <= 0) return "O tamanho do frame deve ser maior que 0!";
        if(frames >= 37) return "O tamanho do frame ultrapassa o permitido (Max: 36)!";
        if(pages.length <= 0) return "As páginas à serem alocadas estão vazias!";
        if(pages.length >= 101) return "A quantidade de páginas ultrapassa o máximo permitido (Max: 100)!";
        if(isEmpty(algoritmo)) return "O algoritmo não foi definido!";

        $(table).find('thead').html('<tr></tr>');
        $(table).find('tbody').html('');
        // $(table).find('tfoot').html('<tr><td class="informacoes" colspan="' + (pages.length + 1) + '"></td></tr>');

        $($(table).find('thead tr:first')).append("<th class='informacoes'>Frames</th>");
        $.each(pages, function(key, value) {
            $($(table).find('thead tr:first')).append("<th class='child-" + key + "'>" + value + "</th>");
        });

        for (let i = 0; i < frames; i++) {
            newCollumns[i] = [];
            $($(table).find('tbody')).append(
                "<tr class='child-" + i + "'>" +
                "<td class='informacoes'>" + (i + 1) + "</td>" +
                "</tr>"
            );
            $.each(pages, function(index) {
                newCollumns[i][index] = '-';
                $($(table).find('tbody tr:last')).append("<td class='child-" + index + "'></td>");
            });
        }

        switch (algoritmo) {
            case "fifo":
                //O ARRAY FIRSTS TERÁ UM TAMANHO FIXO DEFINIDO PELO NUMERO DE FRAMES DEFINIDOS
                //DEIXAR SEMPRE ORDENADO O ARRAY, O PRIMEIRO A ENTRAR SERA O PRIMEIRO ELEMENTO,
                //EM CASO DE REPETIÇÃO, NÃO INCREMENTAR NO ARRAY E NEM MUDAR A POSIÇÃO
                //QUANDO HOUVER SUBSTITUIÇÃO DE PÁGINA, SUBSTITUIR O PRIMEIRO ELEMENTO DO ARRAY PELO NOVO E
                //MUDAR-LO DE POSIÇÃO PARA A ULTIMA POSIÇÃO DO ARRAY
                information = {
                    'indexHasInformation': -1,
                    'col': 0,
                    'firsts': [],
                    'orders': [],
                    'isRepeticao': false,
                };
                $($(table).find("thead tr:first th:not(.informacoes)")).each(function (indexTh) {
                    if(!information['firsts'].includes($(this).text().trim())) {
                        information['orders'].push($(this).text().trim());
                        information['firsts'].push($(this).text().trim());
                        if(information['indexHasInformation'] < (frames - 1)) {
                            information['indexHasInformation']++;
                        }

                        if(information['firsts'].length > frames) {
                            information['orders'][information['orders'].indexOf(information['firsts'].shift())] = information['orders'].pop();
                        }
                        information['isRepeticao'] = false;
                    } else {
                        information['isRepeticao'] = true;
                    }

                    if(!manterBrancoRepeticoes || !information['isRepeticao']){
                        for (let lin = information['indexHasInformation']; lin >= 0; lin--) {
                            newCollumns[lin][information['col']] = information['orders'][lin];
                        }
                    }
                    information['col']++;
                });
                break;
            case "lru":
                //O ARRAY FIRSTS TERÁ UM TAMANHO FIXO DEFINIDO PELO NUMERO DE FRAMES DEFINIDOS
                //DEIXAR SEMPRE ORDENADO O ARRAY, O PRIMEIRO A ENTRAR SERA O PRIMEIRO ELEMENTO,
                //EM CASO DE REPETIÇÃO, NÃO INCREMENTAR NO ARRAY, MAS MUDAR A POSIÇÃO
                //QUANDO HOUVER SUBSTITUIÇÃO DE PÁGINA, SUBSTITUIR O PRIMEIRO ELEMENTO DO ARRAY PELO NOVO E
                //MUDAR-LO DE POSIÇÃO PARA A ULTIMA POSIÇÃO DO ARRAY
                information = {
                    'indexHasInformation': -1,
                    'col': 0,
                    'firsts': [],
                    'orders': [],
                    'isRepeticao': false,
                };
                $($(table).find("thead tr:first th:not(.informacoes)")).each(function (indexTh) {
                    if(
                        information['indexHasInformation'] < (frames - 1) &&
                        !information['firsts'].includes($(this).text().trim())
                    ) {
                        information['indexHasInformation']++;
                    }

                    if(
                        !information['firsts'].includes($(this).text().trim())
                    ) {
                        information['orders'].push($(this).text().trim());
                        information['firsts'].push($(this).text().trim());

                        information['isRepeticao'] = false;
                    } else if(
                        information['firsts'].includes($(this).text().trim())
                    ) {
                        information['firsts'].push($(this).text().trim());
                        information['firsts'].splice(information['firsts'].indexOf(information['firsts'][(information['firsts'].length - 1)]), 1);

                        information['isRepeticao'] = true;
                    }

                    if(information['firsts'].length > frames) {
                        information['orders'][information['orders'].indexOf(information['firsts'].shift())] = information['orders'].pop();
                    }

                    if(!manterBrancoRepeticoes || !information['isRepeticao']) {
                        for (let lin = information['indexHasInformation']; lin >= 0; lin--) {
                            newCollumns[lin][information['col']] = information['orders'][lin];
                        }
                    }
                    information['col']++;
                });
                break;
            case "opt":
                //O ARRAY FIRSTS TERÁ UM TAMANHO FIXO DEFINIDO PELO NUMERO DE FRAMES DEFINIDOS
                //EM CASO DE REPETIÇÃO, NÃO INCREMENTAR NO ARRAY
                //QUANDO HOUVER SUBSTITUIÇÃO DE PÁGINA, SUBSTITUIR O ELEMENTO QUE IRÁ DEMORAR MAIS PARA SER UTILIZADO NOVAMENTE
                //SE HOUVER DOIS OU MANIS QUE POSSAM SER SUBSTITUIDOS, OPTAR PELO COM MAIS TEMPO NA MEMÓRIA
                information = {
                    'indexHasInformation': -1,
                    'col': 0,
                    'firsts': [],
                    'orders': [],
                    'auxFirsts': {},
                    'iSortAux': 0,
                    'sortAuxFirst': [],
                    'spliceAux': -1,
                    'isRepeticao': false,
                };
                $($(table).find("thead tr:first th:not(.informacoes)")).each(function (indexTh) {
                    if(!information['firsts'].includes($(this).text().trim())) {
                        information['orders'].push($(this).text().trim());
                        if(information['indexHasInformation'] < (frames - 1)) {
                            information['indexHasInformation']++;
                        }

                        information['auxFirsts'] = {};
                        $.each(information['firsts'], function (indexFirst, valueFirst) {
                            information['auxFirsts'][valueFirst.toString()] = -1;
                        });
                        $.each(information['firsts'], function (indexFirst, valueFirst) {
                            $.each(pages, function(indexPag, valuePag) {
                                if(indexPag <= information['col']) return;

                                if(
                                    valuePag.toString() === valueFirst.toString() &&
                                    information['auxFirsts'][valuePag.toString()] === -1
                                ){
                                    information['auxFirsts'][valuePag.toString()] = indexPag;
                                }
                            });
                        });

                        information['iSortAux'] = 0;
                        information['sortAuxFirst'] = [];
                        $.each(information['auxFirsts'], function (indexFirst, valueFirst) {
                            information['sortAuxFirst'][information['iSortAux']] = [indexFirst, parseInt(valueFirst)];
                            information['iSortAux']++;
                        });
                        information['sortAuxFirst'].sort(function(a, b) {
                            return b[1] - a[1];
                        });
                        $.each(information['sortAuxFirst'], function (indexFirst, valueFirst) {
                            information['firsts'][indexFirst] = valueFirst[0];
                        });
                        information['firsts'].push($(this).text().trim());

                        if(information['firsts'].length > frames) {
                            information['spliceAux'] = -1;
                            $.each(information['sortAuxFirst'], function (indexFirst, valueFirst) {
                                if(indexFirst === 0 || valueFirst[1] === -1){
                                    information['spliceAux'] = indexFirst;
                                }
                            });

                            information['orders'][information['orders'].indexOf(information['firsts'].splice(information['spliceAux'], 1)[0])] = information['orders'].pop();
                        }

                        information['isRepeticao'] = false;
                    } else {
                        information['isRepeticao'] = true;
                    }

                    if(!manterBrancoRepeticoes || !information['isRepeticao']){
                        for (let lin = information['indexHasInformation']; lin >= 0; lin--) {
                            newCollumns[lin][information['col']] = information['orders'][lin];
                        }
                    }
                    information['col']++;
                });
                break;
            case "lifo":
                //O ARRAY LASTS TERÁ UM TAMANHO FIXO DEFINIDO PELO NUMERO DE FRAMES DEFINIDOS
                //DEIXAR SEMPRE ORDENADO O ARRAY, O PRIMEIRO A ENTRAR SERA O ULTIMO ELEMENTO,
                //EM CASO DE REPETIÇÃO, NÃO INCREMENTAR NO ARRAY MAS MUDAR A POSIÇÃO PARA O PRIMEIRO ELEMENTO
                //QUANDO HOUVER SUBSTITUIÇÃO DE PÁGINA, SUBSTITUIR O PRIMEIRO ELEMENTO DO ARRAY PELO NOVO
                information = {
                    'indexHasInformation': -1,
                    'col': 0,
                    'lasts': [],
                    'orders': [],
                    'aux': null,
                    'isRepeticao': false,
                };
                $($(table).find("thead tr:first th:not(.informacoes)")).each(function (indexTh) {
                    if(
                        information['indexHasInformation'] < (frames - 1) &&
                        !information['lasts'].includes($(this).text().trim())
                    ) {
                        information['indexHasInformation']++;
                    }

                    if(
                        !information['lasts'].includes($(this).text().trim())
                    ) {
                        information['orders'].push($(this).text().trim());
                        information['lasts'].unshift($(this).text().trim());

                        information['isRepeticao'] = false;
                    } else if(
                        information['lasts'].includes($(this).text().trim())
                    ) {
                        information['lasts'].splice(information['lasts'].indexOf($(this).text().trim()), 1);
                        information['lasts'].unshift($(this).text().trim());

                        information['isRepeticao'] = true;
                    }

                    if(information['lasts'].length > frames) {
                        information['aux'] = information['lasts'].splice(1, 1)[0];
                        information['orders'][information['orders'].indexOf(information['aux'])] = information['lasts'][0];
                    }

                    if(!manterBrancoRepeticoes || !information['isRepeticao']) {
                        for (let lin = information['indexHasInformation']; lin >= 0; lin--) {
                            newCollumns[lin][information['col']] = information['orders'][lin];
                        }
                    }
                    information['col']++;
                });
                break;
        }

        for (let lin = 0; lin < newCollumns.length; lin++) {
            for (let col = 0; col < newCollumns[lin].length; col++) {
                $(table).find('tbody tr.child-' + lin + ' td.child-' + col).text(newCollumns[lin][col]);
            }
        }
    } catch (e) {
        return "Erro desconhecido ao rodar algoritmo!";
    }

    return null;
}

//Teclas especiais para caso seja necessário criar algoritmos escondidos em tela ou opções secretas
$(document).hotKey({ key: 'o', modifier: 'ctrl' }, function () {
    $('.esconder_opt').fnToggle();
});
$(document).hotKey({ key: 'a', modifier: 'ctrl' }, function () {
    $('.esconder_algoritmo').fnToggle();
});
