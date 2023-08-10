<?php

/**
 * Function dateNow.
 * Retrieves the current date in the desired format and timezone.
 *
 * @param string $formatoData Desired format. Example: Y-m-d H-i-s
 * @param string|null $timeZone Desired Timezone.
 * @return string
 *
 * @ref http://php.net/manual/pt_BR/function.date.php
 */
function dateNow($formatoData = "Y-m-d", $timeZone = null) {
    if (empty($formatoData)) $formatoData = "Y-m-d";
    if (!empty($timeZone)) {
		date_default_timezone_set($timeZone);
	}

    $dt = null;
    try{
        $dt = new DateTime('NOW');
    } catch (Exception $err) {
        $dt = null;
    }
    return !empty($dt) ? $dt->format($formatoData) : null;
}
