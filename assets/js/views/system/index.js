/**
 * Trigger button#run_algorithm
 * Button trigger to run the selected algorithm
 */
$('button#run_algorithm').off("click");
$('button#run_algorithm').on("click", function () {
    let error = null;
    const table = $('table#table-algorithm');

    $('.sysloading').fnToggle('block');
    $(this).prop("disabled", true);

    $(table).find('thead').html('');
    $(table).find('tbody').html('');
    $(table).find('tfoot').html('');

    $('#msg-error').fnToggle('none');
    $('#msg-success').fnToggle('none');

    error = runAlgorithm(table);
    if(!isEmpty(error)){
        $('#msg-error').html(error);
        $('#msg-error').fnToggle('block');

        $(table).find('thead').html('');
        $(table).find('tbody').html('');
        $(table).find('tfoot').html('');
    } else {
        $('#msg-success').html("Success in generating the algorithm's pages!");
        $('#msg-success').fnToggle('block');
        $("#response_modal").modal('show');
    }

    $(this).prop("disabled", false);
    $('.sysloading').fnToggle('none');
});

/**
 * Function runAlgorithm.
 * Runs the selected algorithm from those listed on screen and displays the result on screen
 *
 * @param table Table selector to update.
 * @returns {null|string} Returns null if successful or a string containing the error to be displayed.
 */
function runAlgorithm(table) {
    try {
        const frames = parseInt($('#num-frames').val());
        const pages = $('#pages').val().split('');
        const algorithm = $("input[name='algorithm_type']:checked").val();
        const bolWhiteRepeat = $("input#white_repeat").is(':checked');
        let newCollumns = [], information = [];

        if(isEmptyInteger(frames) || frames <= 0) return "The frame size must be greater than 0!";
        if(frames >= 37) return "The frame size exceeds the allowed limit (Max: 36)!";
        if(pages.length <= 0) return "The pages to be allocated are empty!";
        if(pages.length >= 101) return "The number of pages exceeds the maximum allowed (Max: 100)!";
        if(isEmpty(algorithm)) return "The algorithm has not been defined!";

        $(table).find('thead').html('<tr></tr>');
        $(table).find('tbody').html('');
        // $(table).find('tfoot').html('<tr><td class="infodata" colspan="' + (pages.length + 1) + '"></td></tr>');

        $($(table).find('thead tr:first')).append("<th class='infodata'>Frames</th>");
        $.each(pages, function(key, value) {
            $($(table).find('thead tr:first')).append("<th class='child-" + key + "'>" + value + "</th>");
        });

        for (let i = 0; i < frames; i++) {
            newCollumns[i] = [];
            $($(table).find('tbody')).append(
                "<tr class='child-" + i + "'>" +
                "<td class='infodata'>" + (i + 1) + "</td>" +
                "</tr>"
            );
            $.each(pages, function(index) {
                newCollumns[i][index] = '-';
                $($(table).find('tbody tr:last')).append("<td class='child-" + index + "'></td>");
            });
        }

        switch (algorithm) {
            case "fifo":
				/**
				 * The element "firsts" in the array will have a fixed size determined by the desired number of frames.
				 * The array should always be in order; the first element to enter will be the first to exit.
				 * In the event of repetition, do not increment in the array nor change its position.
				 *
				 * When a page replacement occurs, replace the first element of the array with the new one and move it
				 * to the last position of the array.
				 *
				 * @type {{indexHasInformation: number, col: number, firsts: *[], orders: *[], repeat: boolean}}
				 */
                information = {
                    'indexHasInformation': -1,
                    'col': 0,
                    'firsts': [],
                    'orders': [],
                    'repeat': false,
                };
                $($(table).find("thead tr:first th:not(.infodata)")).each(function (indexTh) {
                    if(!information['firsts'].includes($(this).text().trim())) {
                        information['orders'].push($(this).text().trim());
                        information['firsts'].push($(this).text().trim());
                        if(information['indexHasInformation'] < (frames - 1)) {
                            information['indexHasInformation']++;
                        }

                        if(information['firsts'].length > frames) {
                            information['orders'][information['orders'].indexOf(information['firsts'].shift())] =
								information['orders'].pop();
                        }
                        information['repeat'] = false;
                    } else {
                        information['repeat'] = true;
                    }

                    if(!bolWhiteRepeat || !information['repeat']){
                        for (let lin = information['indexHasInformation']; lin >= 0; lin--) {
                            newCollumns[lin][information['col']] = information['orders'][lin];
                        }
                    }
                    information['col']++;
                });
                break;
            case "lru":
				/**
				 * The element "firsts" in the array will have a fixed size determined by the desired number of frames.
				 * The array should always be in order; the first element to enter will be the first to exit.
				 * In the event of repetition, do not increment the array, but change its position.
				 *
				 * When a page replacement occurs, replace the first element of the array with the new one and move it
				 * to the last position of the array.
				 *
				 * @type {{indexHasInformation: number, col: number, repeat: boolean, firsts: *[], orders: *[]}}
				 */
				information = {
                    'indexHasInformation': -1,
                    'col': 0,
                    'firsts': [],
                    'orders': [],
                    'repeat': false,
                };
                $($(table).find("thead tr:first th:not(.infodata)")).each(function (indexTh) {
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

                        information['repeat'] = false;
                    } else if(
                        information['firsts'].includes($(this).text().trim())
                    ) {
                        information['firsts'].push($(this).text().trim());
                        information['firsts'].splice(information['firsts']
							.indexOf(information['firsts'][(information['firsts'].length - 1)]), 1);

                        information['repeat'] = true;
                    }

                    if(information['firsts'].length > frames) {
                        information['orders'][information['orders'].indexOf(information['firsts'].shift())] =
							information['orders'].pop();
                    }

                    if(!bolWhiteRepeat || !information['repeat']) {
                        for (let lin = information['indexHasInformation']; lin >= 0; lin--) {
                            newCollumns[lin][information['col']] = information['orders'][lin];
                        }
                    }
                    information['col']++;
                });
                break;
            case "opt":
				/**
				 * The element "firsts" in the array will have a fixed size determined by the desired number of frames.
				 * In the event of repetition, do not increment the array.
				 * When a page replacement occurs, replace the element that will take the longest to be used again.
				 * If there are two or more that could be replaced, choose the one that has been in memory the longest.
				 *
				 * @type {{
				 * 		indexHasInformation: number, col: number, auxFirsts: {}, repeat: boolean, firsts: *[],
				 * 		spliceAux: number, orders: *[], iSortAux: number, sortAuxFirst: *[]
				 * }}
				 */
				information = {
                    'indexHasInformation': -1,
                    'col': 0,
                    'firsts': [],
                    'orders': [],
                    'auxFirsts': {},
                    'iSortAux': 0,
                    'sortAuxFirst': [],
                    'spliceAux': -1,
                    'repeat': false,
                };
                $($(table).find("thead tr:first th:not(.infodata)")).each(function (indexTh) {
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

                            information['orders'][information['orders'].indexOf(information['firsts']
								.splice(information['spliceAux'], 1)[0])] = information['orders'].pop();
                        }

                        information['repeat'] = false;
                    } else {
                        information['repeat'] = true;
                    }

                    if(!bolWhiteRepeat || !information['repeat']){
                        for (let lin = information['indexHasInformation']; lin >= 0; lin--) {
                            newCollumns[lin][information['col']] = information['orders'][lin];
                        }
                    }
                    information['col']++;
                });
                break;
            case "lifo":
				/**
				 * TODO Check algorithm
				 * The element "lasts" in the array will have a fixed size determined by the desired number of frames.
				 * The array should always be in order; the first element to enter will be the last to exit.
				 * In the event of repetition, do not increment the array, but move its position to be the first element of the array.
				 * When a page replacement occurs, replace the first element of the array with the new one.
				 *
				 * @type {{indexHasInformation: number, col: number, lasts: *[], aux: null, repeat: boolean, orders: *[]}}
				 */
				information = {
                    'indexHasInformation': -1,
                    'col': 0,
                    'lasts': [],
                    'orders': [],
                    'aux': null,
                    'repeat': false,
                };
                $($(table).find("thead tr:first th:not(.infodata)")).each(function (indexTh) {
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

                        information['repeat'] = false;
                    } else if(
                        information['lasts'].includes($(this).text().trim())
                    ) {
                        information['lasts'].splice(information['lasts'].indexOf($(this).text().trim()), 1);
                        information['lasts'].unshift($(this).text().trim());

                        information['repeat'] = true;
                    }

                    if(information['lasts'].length > frames) {
                        information['aux'] = information['lasts'].splice(1, 1)[0];
                        information['orders'][information['orders'].indexOf(information['aux'])] = information['lasts'][0];
                    }

                    if(!bolWhiteRepeat || !information['repeat']) {
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
        return "Unknown error when running the algorithm!";
    }

    return null;
}

/**
 * Trigger CTRL+O
 * Trigger for special commands in case it is necessary to create hidden algorithms on screen or secret options.
 */
$(document).hotKey({ key: 'o', modifier: 'ctrl' }, function () {
    $('.hide_element').fnToggle();
});
