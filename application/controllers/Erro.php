<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Erro extends MY_Controller {
    public function __construct() {
        parent::__construct();
    }

    //NAO FUNCIONA SE O CARA ERRAR A PAGINA NA POHA DA MERDA DA CARALHA DA URL
    public function getError($codigo = 404){
        switch ($codigo){
            case 401:
                $this->erro401();
                break;

            case 505:
                $this->erro505();
                break;

            default:
                $this->erro404();
                break;
        }
    }

}
