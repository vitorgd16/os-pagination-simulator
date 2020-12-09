<?php

/**
 * Function dataAgoraFormatada.
 * Pega a data de agora no formato escolhido na timezone escolhida.
 * @param string $formatoData Formato para a data
 * @param string $timeZone TimeZone da data
 * @return string
 *
 * http://php.net/manual/pt_BR/function.date.php
 */
function dataAgoraFormatada (string $formatoData = "Y-m-d", string $timeZone = "America/Sao_Paulo") : string {
    if (empty($formatoData)) $formatoData = "Y-m-d";
    if (empty($timeZone)) $timeZone = "America/Sao_Paulo";

    date_default_timezone_set($timeZone);
    $dt = null;
    try{
        $dt = new DateTime('NOW');
    } catch (Exception $err) {
        $dt = null;
    }
    return !empty($dt) ? $dt->format($formatoData) : "";
}