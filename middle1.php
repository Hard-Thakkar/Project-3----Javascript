<?php


	$id=0;
	$new_data=file_get_contents("http://codd.cs.gsu.edu/~hthakkar3/database1.html");
	
	
	
	$array_username=explode(",",$new_data);
	
	
	
	for($i=0; $i < count($array_username); $i++){
		$new_array=explode(":",$array_username[$i]);
		$new[$new_array[0]]=$new_array[1];
		
	}
	
	
	
	if (isset($_POST["name1"]) && isset($_POST["pw1"])) {
		foreach($new as $key => $value){
			
				if($_POST["name1"]==$key && $_POST["pw1"]==$value){
					$id=1;
					header('Location:http://codd.cs.gsu.edu/~hthakkar3/GameOfLife.php');
					
				}
				
		}
				if($id==0){
					header('Location:http://codd.cs.gsu.edu/~hthakkar3/oops1.html');
				}
	}
	else{
		echo "Please fill the boxes.";
	}
	
	print_r($array_username);
	"<br><br><br>";
	print_r($new);
	
	
?>