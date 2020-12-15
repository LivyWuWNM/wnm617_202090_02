<?php


function makeConn() {
	include_once "auth.php";
	try {
		$conn = new PDO(...Auth());
		$conn->setAttribute(
			PDO::ATTR_ERRMODE,
			PDO::ERRMODE_EXCEPTION
		);
	}
	catch(PDOException $e) {
		die($e->getMessage());
	}
	return $conn;
}


function fetchAll($r) {
	$a = [];
	while($row = $r->fetch(PDO::FETCH_OBJ))
		$a[] = $row;
	return $a;
}



function makeQuery($c,$ps,$p,$makeResults=true) {
	try {
		if(count($p)) {
			$stmt = $c->prepare($ps);
			$stmt->execute($p);
		}
		else {
			$stmt = $c->query($ps);
		}

		$r = $makeResults ? fetchAll($stmt) : [];

		return [
			"result"=>$r
		];
	}
	catch(PDOException $e) {
		return [
			"error"=>"Query Failed: ".$e->getMessage()
		];
	}
}


function makeUpload($file,$folder) {
	$filename = microtime(true) . "_" . $_FILES[$file]['name'];

	if(@move_uploaded_file(
		$_FILES[$file]['tmp_name'],
		$folder.$filename
	))
	return ['result'=>$filename];
	else return [
		"error"=>"File Upload Failed",
		"_FILES"=>$_FILES,
		"filename"=>$filename
	];
}




function makeStatement($data) {
	$c = makeConn();
	$t = @$data->type;
	$p = @$data->params;

	switch($t) {

		case "users_all":
			return makeQuery($c, "SELECT * FROM `track_users`",[]);
		case "ghosts_all":
			return makeQuery($c, "SELECT * FROM `track_ghosts`",[]);
		case "locations_all":
			return makeQuery($c, "SELECT * FROM `track_locations`",[]);


		case "user_by_id":
			return makeQuery($c, "SELECT * FROM `track_users` WHERE `id` = ?",$p);
		case "ghost_by_id":
			return makeQuery($c, "SELECT * FROM `track_ghosts` WHERE `id` = ?",$p);
		case "location_by_id":
			return makeQuery($c, "SELECT * FROM `track_locations` WHERE `id` = ?",$p);

		case "ghosts_by_user_id":
			return makeQuery($c, "SELECT * FROM `track_ghosts` WHERE `id` = ?",$p);
		case "locations_by_ghost_id":
			return makeQuery($c, "SELECT * FROM `track_locations` WHERE `id` = ?",$p);

		case "check_signin":
			return makeQuery($c,"SELECT * FROM `track_uesrs` WHERE `username` = ? AND `password` = md5(?)",$p);


		case "recent_locations":
			return makeQuery($c, "SELECT * FROM `track_ghosts` a
				LEFT JOIN (
					SELECT * FROM `track_locations`
					ORDER BY `date_create` DESC
				) l
				ON a.id = l.ghost_id
				WHERE user_id = ?
				GROUP BY l.ghost_id
				",$p);


		case "search_ghosts":
			$p = ["%$p[0]%",$p[1]];
			return makeQuery($c,"SELECT * FROM `track_ghosts` WHERE `name` LIKE ? AND user_id = ?",$p);



		case "ghost_search_recent":
			$p = ["%$p[0]%",$p[1]];
			return makeQuery($c, "SELECT * FROM `track_ghosts` a LEFT JOIN (
				SELECT * FROM `track_locations` ORDER BY `data_create` DESC) l
				ON a.id = l.ghost_id
				WHERE
					a.name LIKE ?
					AND a.user_id = ?
				GROUP BY l.ghost_id",$p);


		case "ghost_filter":
			return makeQuery($c,"SELECT * FROM `track_ghosts` WHERE
				`track_ghosts`
				WHERE
					`$p[0]` = ?
					AND user_id = ?
				",[$p[1],$p[2]]);




		case "insert_user":
			$r = makeQuery($c,"SELECT * FROM `track_users` WHERE `username` = ? OR `email` = ?",[$p[0],$[1]]);
			if(count($r['result']))
			return ['error'=>"Username or Email already exists"];

			$r = makeQuery($c,"INSERT INTO `track_users` (`username`,`email`,`password`,`img`,`data_create`)
				VALUES(?, ?, md5(?), 'https://via.placeholder.com/400/?text=USER', NOW())",$p,false);
			return ["id"=>$c->lastInsertId()];


		case "insert_ghost":
			$r = makeQuery($c,"INSERT INTO `track_ghosts` (`user_id`,`name`,`type`,`color`,`description`,`img`,`data_create`)
				VALUES (?, ?, ?, ?, ?, 'https://via.placeholder.com/400/?text=GHOST', NOW())",$p,false);
			return ["id"=>$c->lastInsertId()];

		case "insert_location":
			$r = makeQuery($c,"INSERT INTO `track_locations` (`ghost_id`,`lat`,`lng`,`description`,`photo`,`icon`,`data_create`)
				VALUES (?, ?, ?, ?, 'https://via.placeholder.com/400/?text=LOCATION',",$p,false);
			return ["id"=>$c->lastInsertId()];


		case "update_user":
			$r = makeQuery($c, "UPDATE `track_users` 
				SET 
					`username` = ?
					`name` = ?
					`email` = ?
				WHERE `id` = ? ",$p,false);
			return ["result"=>"success"];

		case "update_user_image":
			$r = makeQuery($c, "UPDATE `track_users`
				SET
					`img` = ?
				WHERE `id` = ? ",$p,false);
			return ["result"=>"success"];

		case "update_ghost":
			$r = makeQuery($c, "UPDATE `track_ghosts`
				SET
					`name` = ?
					`type` = ?
					`color` = ?
					`description` = ?
				WHERE `id` = ? ",$p,false);
			return ["result"=>"success"];



		case "delete_ghost":
			return makeQuery($c,"DELETE FROM `track_ghosts` WHERE `id` = ?",$p,false);

		case "delete_location":
			return makeQuery($c,"DELETE FROM `track_ghosts` WHERE `id` = ?",$p,false);
		

		default: return ["error"=>"No Matched type"];
	}
}

if(!empty($_FILES)) {
	$r = makeUpload("image","../uploads/");
	die(json_encode($r));
}


$data = json_decode(file_get_contents("php://input"));


echo json_encode(
	makeStatement($data),
	JSON_NUMERIC_CHECK
);