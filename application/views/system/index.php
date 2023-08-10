<?php
defined("BASEPATH") OR exit("No direct script access allowed");
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <noscript>
        <meta http-equiv="Refresh" content="0; url=https://www.google.com/search?client=opera-gx&q=how+to+enable+javascript+browser">
    </noscript>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>

    <title>
        <?php
        	echo (!empty($title) ? $title : "[NO TITLE]");
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
    <div class="sysloading">
        <div class="center_content-vertical">
            <img alt="" src="<?= PATH_IMG . 'loading.gif' ?>" />
            <br/>
            <div class="loading_text">
                Loading...
            </div>
        </div>
    </div>

    <div class="main">
        <div class="modal fade" id="response_modal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header justify-content-center">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                            <i class="tim-icons icon-simple-remove"></i>
                        </button>
                        <h4 class="title title-up">Result</h4>
                    </div>
                    <div class="modal-body">
                        <div class="table-responsive" style="max-height: 400px">
                            <table id="table-algorithm" class="table thead-dark tfoot-dark tbody-white tbody-info-dark">
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
                    <div class="alert alert-danger" id="msg-error" role="alert" style="display: none;"></div>
                    <div class="alert alert-success" id="msg-success" role="alert" style="display: none;"></div>
                </div>
            </div>
            <br />
			<div class="row">
				<div class="col-md-12">
					<div class="center_content">
						<label>Project URL on GitHUB: <a href="https://github.com/vitorgd16/os-pagination-simulator">https://github.com/vitorgd16/os-pagination-simulator</a></label>
					</div>
				</div>
			</div>
			<br />
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="num-frames">O.S. - Number of Frames (Example: 10)</label>
                        <input type="text" class="form-control" id="num-frames" name="num-frames" data-mask="number"
                               data-dec_places="0" data-prefix="" data-suffix=""
                               data-thous_sep="" data-dec_sep="," data-allow_neg="0" />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="pages">O.S. - Pages for Allocation (Numbers and Letters permitted)</label>
                        <input type="text" class="form-control" id="pages" name="pages" data-mask="number_letters" />
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-6">
                    <label>Special Settings</label>
                    <div class="form-check">
                        <label class="form-check-label">
                            <input class="form-check-input" type="checkbox" id="white_repeat" />
                            <span class="form-check-sign"></span>
							Display white frames in page repetitions
						</label>
                    </div>
                </div>
                <div class="d-lg-none">
                    <br />
                    <div class="my_line"></div>
                    <br />
                </div>
                <div class="col-lg-6">
                    <label>Choose the algorithm to be used</label>
                    <div class="form-check form-check-radio">
                        <label class="form-check-label">
                            <input class="form-check-input" type="radio" name="algorithm_type" id="fifo_type"
                                   value="fifo" />
                            <span class="form-check-sign"></span>
                            FIFO
                        </label>
                    </div>
                    <div class="form-check form-check-radio">
                        <label class="form-check-label">
                            <input class="form-check-input" type="radio" name="algorithm_type" id="lru_type"
                                   value="lru" />
                            <span class="form-check-sign"></span>
                            LRU
                        </label>
                    </div>
                    <div class="form-check form-check-radio">
                        <label class="form-check-label">
                            <input class="form-check-input" type="radio" name="algorithm_type" id="opt_type"
                                   value="opt" />
                            <span class="form-check-sign"></span>
							OPT
						</label>
                    </div>
                    <div class="form-check form-check-radio">
                        <label class="form-check-label">
                            <input class="form-check-input" type="radio" name="algorithm_type" id="lifo_type"
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
                    <div class="center_content">
                        <button type="button" id="run_algorithm" class="btn btn-success">
                            Run Algorithm!
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="<?= PATH_JS . "views/system/index.js" . VERSION_EXT; ?>" type="text/javascript"></script>

<!-- CORE TEMPLATE JS - START -->
<script src="<?= PATH_JS . "sysfunctions.js" . VERSION_EXT; ?>" type="text/javascript"></script>
<!-- CORE TEMPLATE JS - END -->
</body>
</html>
