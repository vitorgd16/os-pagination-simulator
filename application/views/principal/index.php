<?php
defined("BASEPATH") OR exit("No direct script access allowed");
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <noscript>
        <meta http-equiv="Refresh" content="0; url=<?= site_url("Erro/getError/505"); ?>">
    </noscript>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>

    <title>
        <?php
        $novoTitulo = NOME_EMPRESA;
        $novoTitulo .= isset($title) ? (" - " . $title) : "";
        echo $novoTitulo;
        ?>
    </title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
    <link rel="shortcut icon" href="<?= PATH_IMG . 'logos/favicon.ico' . VERSION_EXT; ?>" type="image/x-icon"/>

    <link href="<?= PATH_PLUGINS . "bootstrap/css/bootstrap.css" . VERSION_EXT; ?>" rel="stylesheet" type="text/css"/>
    <link href="<?= PATH_FONTS . "font-awesome/css/font-awesome.css" . VERSION_EXT; ?>" rel="stylesheet" type="text/css"/>
    <link href="<?= PATH_CSS . "font-awesome/css/animate.min.css" . VERSION_EXT; ?>" rel="stylesheet" type="text/css"/>

    <link href="<?= PATH_CSS . "nucleo-icons.css" . VERSION_EXT; ?>" rel="stylesheet" type="text/css"/>
    <link href="<?= PATH_CSS . "blk-design-system.css" . VERSION_EXT; ?>" rel="stylesheet" type="text/css"/>

    <link href="<?= PATH_CSS . "formatacao.css" . VERSION_EXT; ?>" rel="stylesheet" type="text/css"/>

    <script src="<?= PATH_JS . "jquery-3.2.1.min.js" . VERSION_EXT; ?>" type="text/javascript"></script>
    <script src="<?= PATH_JS . "jquery.easing.min.js" . VERSION_EXT; ?>" type="text/javascript"></script>
    <script src="<?= PATH_PLUGINS . "bootstrap/js/bootstrap.min.js" . VERSION_EXT; ?>" type="text/javascript"></script>

    <link href="<?= PATH_PLUGINS . "jquery-ui/smoothness/jquery-ui.min.css" . VERSION_EXT; ?>" rel="stylesheet" type="text/css" media="screen"/>
    <link href="<?= PATH_PLUGINS . "datetimepicker/css/bootstrap-datetimepicker.min.css" . VERSION_EXT; ?>" rel="stylesheet" type="text/css" media="screen"/>

    <script src="<?= PATH_JS . 'moment.js' . VERSION_EXT; ?>"></script>
    <script src="<?= PATH_LIBS . "ajax/js/jszip.min.js" . VERSION_EXT; ?>" type="text/javascript"></script>
    <script src="<?= PATH_LIBS . "ajax/js/pdfmake.min.js" . VERSION_EXT; ?>" type="text/javascript"></script>
    <script src="<?= PATH_LIBS . "ajax/js/vfs_fonts.js" . VERSION_EXT; ?>" type="text/javascript"></script>
    <script src="<?= PATH_PLUGINS . "jquery-ui/smoothness/jquery-ui.min.js" . VERSION_EXT; ?>" type="text/javascript"></script>
    <script src="<?= PATH_PLUGINS . "datetimepicker/js/bootstrap-datetimepicker.min.js" . VERSION_EXT; ?>" type="text/javascript"></script>
    <script src="<?= PATH_PLUGINS . "datetimepicker/js/locales/bootstrap-datetimepicker.fr.js" . VERSION_EXT; ?>" type="text/javascript"></script>
    <script src="<?= PATH_PLUGINS . 'mask/mask.js' . VERSION_EXT; ?>"></script>
    <script src="<?= PATH_PLUGINS . 'hotKeys/hotkeys.js' . VERSION_EXT; ?>"></script>

    <!--[if IE]>
    <style type="text/css" media="all">.borderitem { border-style: solid; }</style>
    <![endif]-->
</head>
<!-- END HEAD -->

<!-- BEGIN BODY -->
<body class="index-page">
<div class="wrapper">

    <div class="variaveis" data-path_img="<?= PATH_IMG; ?>">
    </div>

    <div class="loading_sistema">
        <div class="centraliza-vertical">
            <img alt="" src="<?= PATH_IMG . 'loading.gif' ?>" />
            <br/>
            <div class="texto-loading">
                Carregando...
            </div>
        </div>
    </div>

    <div class="main">
        <div class="modal fade" id="modal_resposta" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header justify-content-center">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                            <i class="tim-icons icon-simple-remove"></i>
                        </button>
                        <h4 class="title title-up">Resultado</h4>
                    </div>
                    <div class="modal-body">
                        <div class="table-responsive" style="max-height: 400px">
                            <table id="table-algoritmo" class="table thead-dark tfoot-dark tbody-white tbody-info-dark">
                                <thead></thead>
                                <tbody></tbody>
                                <tfoot></tfoot>
                            </table>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>

        <img src="<?= PATH_IMG . "path1.png" . VERSION_EXT ?>" class="path" alt="" />

        <!-- START CONTAINER -->
        <div class="container">
            <br />
            <div class="row">
                <div class="col-12">
                    <div class="alert alert-danger" id="msg-erro" role="alert" style="display: none;"></div>
                    <div class="alert alert-success" id="msg-sucesso" role="alert" style="display: none;"></div>
                </div>
            </div>
            <br />
			<div class="row">
				<div class="col-md-12">
					<label for="tam-frame">URL Git: https://github.com/vitorgd16/algoritmos-paginacao-so</label>
				</div>
			</div>
			<br />
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="tam-frame">Número de Frames para realizar a paginação</label>
                        <input type="text" class="form-control" id="tam-frame" name="tam-frame" data-mask="numero"
                               data-dec_places="0" data-prefixo="" data-sufixo=""
                               data-thous_sep="" data-dec_sep="," data-allow_neg="0" />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="paginas">Páginas à serem alocadas</label>
                        <input type="text" class="form-control" id="paginas" name="paginas" data-mask="numeros_e_letras" />
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-6">
                    <label>Configurações Especiais</label>
                    <div class="form-check">
                        <label class="form-check-label">
                            <input class="form-check-input" type="checkbox" id="branco_repeticao" />
                            <span class="form-check-sign"></span>
                            Quadros brancos em repetições de página
                        </label>
                    </div>
                </div>
                <div class="d-lg-none">
                    <br />
                    <div class="linha"></div>
                    <br />
                </div>
                <div class="col-lg-6">
                    <label>Escolha o algoritmo a ser utilizado</label>
                    <div class="form-check form-check-radio">
                        <label class="form-check-label">
                            <input class="form-check-input" type="radio" name="tipo_algoritmo" id="tipo_fifo"
                                   value="fifo" />
                            <span class="form-check-sign"></span>
                            FIFO
                        </label>
                    </div>
                    <div class="form-check form-check-radio">
                        <label class="form-check-label">
                            <input class="form-check-input" type="radio" name="tipo_algoritmo" id="tipo_lru"
                                   value="lru" />
                            <span class="form-check-sign"></span>
                            LRU
                        </label>
                    </div>
                    <div class="form-check form-check-radio">
                        <label class="form-check-label">
                            <input class="form-check-input" type="radio" name="tipo_algoritmo" id="tipo_otimo"
                                   value="otimo" />
                            <span class="form-check-sign"></span>
                            Ótimo
                        </label>
                    </div>
                    <div class="form-check form-check-radio">
                        <label class="form-check-label">
                            <input class="form-check-input" type="radio" name="tipo_algoritmo" id="tipo_lifo"
                                   value="lifo" />
                            <span class="form-check-sign"></span>
                            LIFO
                        </label>
                    </div>
                </div>
            </div>
            <br />
            <br />
            <div class="row">
                <div class="col-12">
                    <div class="centraliza">
                        <button type="button" id="rodar_algoritmo" class="btn btn-success">
                            Rodar algoritmo!
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="<?= PATH_JS . "views/principal/index.js" . VERSION_EXT; ?>" type="text/javascript"></script>

<!-- CORE TEMPLATE JS - START -->
<script src="<?= PATH_JS . "funcoes.js" . VERSION_EXT; ?>" type="text/javascript"></script>
<!-- CORE TEMPLATE JS - END -->
</body>
</html>
