<?php
	defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Class System.
 * Controller for the calls related to the pagination simulator.
 */
class System extends MY_Controller {
	/**
	 * Class Constructor
	 */
	public function __construct() {
		parent::__construct();
	}

	/**
	 * Method index
	 * Main method of the application, it triggers the view call.
	 *
	 * @return void
	 */
	public function index() {
		$this->load->view(
			"system/index",
			array(
				'title' => 'O.S. - Pagination simulator',
			)
		);
	}
}
