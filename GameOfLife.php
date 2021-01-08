<!DOCTYPE html>
<html>
<head>
<title>Game Of Life</title>
<link rel="stylesheet" type="text/css" href="GameOfLife.css">
</head>
<body>

<?php
		$new_file="database1.html";
		$data=$_POST["name"];
		
		
		file_put_contents($new_file,"$data:",FILE_APPEND);
		
		$data3=$_POST["pw"];
		file_put_contents($new_file,"$data3,",FILE_APPEND);

		
		
?>


<div id="gameSection">

  <div>
    <h1>CONWAY'S GAME OF LIFE</h1>
    <div><!-- Button selection -->
      <div>Generation: <span id="round">0</span></div>
      <button onclick="start()">Start</button>
      <button onclick="stop()">Stop</button>
      <button onclick="increment1()">Increment 1</button>
      <button onclick="increment23()">Increment 23</button>
      <button onclick="resetBoard()">Rest</button>
      <label for="pattern">Pattern:</label>
      <select id="pattern">
        <option value="StillLife">Still Life</option>
        <option value="Oscil">Oscillator</option>
        <option value="Glid">Glider</option>
      </select>
      <button><a href="mainMenu1.html">Back to Homepage</a></button>
    </div>
  </div>
  <canvas id="boardboard" width="820px" height="820px"></canvas>
    <script src="GameOfLife.js"></script>
  </div>
</body>
</html>
