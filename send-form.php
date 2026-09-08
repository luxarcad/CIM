<?php
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Método no permitido"
    ]);
    exit;
}

$data = $_POST;

$required = ["nombre", "email", "telefono", "mensaje"];

foreach ($required as $field) {
    if (empty($data[$field])) {
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "message" => "El campo $field es requerido"
        ]);
        exit;
    }
}

$nombre   = htmlspecialchars($data["nombre"]);
$email    = htmlspecialchars($data["email"]);
$telefono = htmlspecialchars($data["telefono"]);
$mensaje  = htmlspecialchars($data["mensaje"]);

$to = "maru.calderom@cimconsultoria.mx";
$subject = "Nueva consulta desde CIM";

$body = "
<html>
<head>
<meta charset='UTF-8'>
</head>
<body style='margin:0;padding:0;background:#f4f6f9;font-family:Arial,sans-serif;'>

<table width='100%' cellpadding='0' cellspacing='0' style='background:#f4f6f9;padding:40px 0;'>
<tr>
<td align='center'>

<table width='600' cellpadding='0' cellspacing='0' style='background:#ffffff;border-radius:10px;overflow:hidden;'>

<tr>
<td style='background:#0b1c2d;padding:25px;text-align:center;color:#ffffff;font-size:20px;font-weight:bold;'>
Nueva Solicitud de Asesoría
</td>
</tr>

<tr>
<td style='padding:30px;'>

<p><strong>Nombre:</strong> $nombre</p>
<p><strong>Email:</strong> $email</p>
<p><strong>Teléfono:</strong> $telefono</p>

<div style='padding:20px;background:#f8f9fc;border-left:4px solid #c9a24d;border-radius:6px;'>
<strong>Mensaje:</strong>
<p style='margin-top:10px;line-height:1.6;'>$mensaje</p>
</div>

</td>
</tr>

<tr>
<td style='background:#f1f3f6;padding:15px;text-align:center;font-size:12px;color:#777;'>
Consultoría Integral Migratoria © 2026
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
";

$headers = "From: CIM <no-reply@tudominio.com>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";

if (mail($to, $subject, $body, $headers)) {
    echo json_encode(["success" => true]);
} else {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "No se pudo enviar el correo"
    ]);
}
