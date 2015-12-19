<?php
	$owner_email = $_POST["owner_email"];
	$headers = 'Content-type: text/html; charset=utf-8';
	$subject = 'A message from RCIS Mysore visitor ' . $_POST["name"];
	$name = $_POST["name"];
	$email = $_POST["email"];
	$state = $_POST["state"];
	$phone = $_POST["phone"];
	$fax = $_POST["fax"];
	$message = $_POST["message"];
	$messageBody = "";


	if($_POST['name']!='nope'){
		$messageBody .= "<table style='font-family: Arial; font-size: 14px;' width='600' cellspacing='0' bgcolor='#DCDBDB' cellpadding='10' border='0'>
		<tr>
			<td height='35' valign='middle' bgcolor='#999999' colspan='2' style='font-size:24px;color:#103579;'>Royale Concorde International School Feedback Form</td>
		</tr>
		<tr style='font-family: Arial; font-size: 14px;' height='25'>
			<td valign='middle' width='50%'>Visitor: </td>
			<td valign='middle' width='50%'>" . $name . "</td></tr>";
	}
	if($_POST['email']!='nope'){
		$messageBody .= "<tr style='font-family: Arial; font-size: 14px;'  height='25'>
			<td valign='middle' width='50%'>Email Address: </td>
			<td valign='middle' width='50%'>" . $email . "</td></tr>";
	}else{
		$headers = '';
	}
	if($_POST['state']!='nope'){		
		$messageBody .= "<p>State: " . $state . "</p>" . "\n";
		$messageBody .= "<br>" . "\n";
	}
	if($_POST['phone']!='nope'){		
		$messageBody .= "<tr style='font-family: Arial; font-size: 14px;' height='25'>
			<td valign='middle' width='50%'>Contact Number: </td>
			<td valign='middle' width='50%'>" . $phone . "</td></tr>";
	}	
	if($_POST['fax']!='nope'){		
		$messageBody .= "<p>Fax Number: " . $fax . "</p>" . "\n";
		$messageBody .= "<br>" . "\n";
	}
	if($_POST['message']!='nope'){
		$messageBody .= "<tr style='font-family: Arial; font-size: 14px;' height='25'>
			<td valign='middle' width='50%'>Message: </td>
			<td valign='middle' width='50%'>" . $message . "</td></tr></table>";
	}
	
	// if($_POST["stripHTML"] == 'true'){
	// 	$messageBody = strip_tags($messageBody);
	// }

	// if($_POST['name']!='nope'){
	// 	$messageBody .= '<p>Visitor: ' . $_POST["name"] . '</p>' . "\n";
	// 	$messageBody .= '<br>' . "\n";
	// }
	// if($_POST['email']!='nope'){
	// 	$messageBody .= '<p>Email Address: ' . $_POST['email'] . '</p>' . "\n";
	// 	$messageBody .= '<br>' . "\n";
	// }else{
	// 	$headers = '';
	// }
	// if($_POST['state']!='nope'){		
	// 	$messageBody .= '<p>State: ' . $_POST['state'] . '</p>' . "\n";
	// 	$messageBody .= '<br>' . "\n";
	// }
	// if($_POST['phone']!='nope'){		
	// 	$messageBody .= '<p>Phone Number: ' . $_POST['phone'] . '</p>' . "\n";
	// 	$messageBody .= '<br>' . "\n";
	// }	
	// if($_POST['fax']!='nope'){		
	// 	$messageBody .= '<p>Fax Number: ' . $_POST['fax'] . '</p>' . "\n";
	// 	$messageBody .= '<br>' . "\n";
	// }
	// if($_POST['message']!='nope'){
	// 	$messageBody .= '<p>Message: ' . $_POST['message'] . '</p>' . "\n";
	// }
	
	// if($_POST["stripHTML"] == 'true'){
	// 	$messageBody = strip_tags($messageBody);
	// }
	
	try{
		if(!mail($owner_email, $subject, $messageBody, $headers)){
			throw new Exception('mail failed');
		}else{
			echo 'mail sent';
		}
	}catch(Exception $e){
		echo $e->getMessage() ."\n";
	}
?>