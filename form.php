<?php
$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$text = $_POST['text'];

$message = "Имя: ".$name." \nТелефон: ".$phone." \nEmail: ".$email." \nText: ".$text;
$subject = "Новое сообщение с сайта СДК";
mb_internal_encoding('UTF-8');
$encoded_subject = mb_encode_mimeheader($subject, 'UTF-8', 'B', "\r\n", strlen('Subject: '));
$headers  = "Content-type: text/plain; charset=utf-8 \r\n";
$headers .= "From: SDK <sdk@site1326.ru>\r\n";

mail("info@sdklogistic.com", $encoded_subject, $message, $headers);