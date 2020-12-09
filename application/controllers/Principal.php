<?php
	defined('BASEPATH') OR exit('No direct script access allowed');

	class Principal extends MY_Controller {
		public function __construct() {
			parent::__construct();
		}

		public function index() {
			$this->load->view(
			    "principal/index",
                array(
                    'title' => 'Paginação',
                )
            );
		}
	}