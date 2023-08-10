<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Class MY_Controller.
 * Responsible for the core of the system's Controllers.
 */
class MY_Controller extends CI_Controller {
	/**
	 * Class Constructor
	 * Performs the necessary initializations of the core.
	 */
    public function __construct() {
        parent::__construct();

        defined("VERSION_EXT") OR define("VERSION_EXT", (dateNow("?Y-m") ?? ""));
        $this->load->model('MY_Model');
    }
}
