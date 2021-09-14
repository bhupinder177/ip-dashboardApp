<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<title>Dashboard IP</title>

	<link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>assets/css/jquery-ui.min.css" />
	<link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/bootstrap.css">
	<link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/main.css">
	<link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/jquery.toast.css">
	<link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/custom-style.css">
	<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js" defer></script>
	<script>window.jQuery || document.write('<script src="<?php echo base_url(); ?>assets/js/jquery-3.3.1.min.js" defer><\/script>')</script>
	<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous" defer></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous" defer></script>
	<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/jq.ui.core.js"></script>
	<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/jq.ui.datepicker.js"></script>
	<script src="<?php echo base_url(); ?>assets/js/jquery.main.js" defer></script>
	<script src="<?php echo base_url(); ?>assets/js/jquery.toast.js" defer></script>
	<script src="<?php echo base_url(); ?>assets/js/jquery.validate.min.js" defer></script>
	<script src="<?php echo base_url(); ?>assets/js/validation.js" defer></script>
	<script src="<?php echo base_url(); ?>assets/js/custom.js" defer></script>
	<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script type="text/javascript">
		google.charts.load('current', {'packages':['corechart']});
		google.charts.setOnLoadCallback(drawChart);

		function drawChart() {

		  var data = google.visualization.arrayToDataTable([
			['Task', 'Hours per Day'],
			['Branding',     31],
			['Products',      12],
			['Operations',  9],
			['Creative', 22]
		  ]);

		  var options = {

		  };

		  var chart = new google.visualization.PieChart(document.getElementById('piechart'));

		  chart.draw(data, options);
		}
	  </script>
</head>
<body>
	<div class="loader_panel" style="display: none;">
		<img  src="<?php echo base_url(); ?>assets/images/preloader.gif">

  </div>
	<input type="hidden" class="base_url" value="<?php echo base_url(); ?>">
	<div id="wrapper">
		<div class="content-block style">
			<header id="header">
				<div class="header-holder d-flex align-items-center justify-content-between navbar-light">
					<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
						<span class="navbar-toggler-icon"></span>
					</button>
					<strong class="logo"><a href="<?php echo base_url(); ?>dashboard"><img src="<?php echo base_url(); ?>assets/images/logo.png" alt="Dashboard IP"></a></strong>
					<div class="profile-holder d-flex align-items-center">
						<ul class="nav-links d-none d-md-flex">
							<li>
								<a href="<?php echo base_url(); ?>submit-idea">
									<div class="icon-box">
										<span class="ico icon-idea"></span>
									</div>
									<strong class="text">Submit an Idea</strong>
								</a>
							</li>
							<li>
								<a href="<?php echo base_url(); ?>dashboard">
									<div class="icon-box">
										<span class="ico icon-dashboard"></span>
									</div>
									<strong class="text">My Dasboard</strong>
								</a>
							</li>
						</ul>
						<div class="user-hold">
							<a class="user d-flex align-items-center dropdown-toggle" href="#" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								<div class="img-box" style="background-image: url(images/img2.png);"></div>
								<strong class="user-name"><?php echo ucwords($this->session->userdata['adminloggedin']['name']); ?></strong>
							</a>
							<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
								<a class="dropdown-item" href="#">Submit an Idea</a>
								<a class="dropdown-item" href="<?php echo base_url(); ?>dashboard">My Dasboard</a>
							</div>
						</div>
					</div>
				</div>
			</header>
			<div class="sidenav">
				<ul class="nav-bar">
					<li>
						<a <?php if($this->uri->segment(1) =="dashboard") { ?> class="active" <?php } ?> href="<?php echo base_url(); ?>dashboard" >Dashboard</a>
					</li>
					<li>
						<a <?php if($this->uri->segment(1) =="account") { ?> class="active" <?php } ?> href="<?php echo base_url(); ?>account">My Account</a>
					</li>
					<li>
						<a <?php if($this->uri->segment(1) =="company") { ?> class="active" <?php } ?> href="<?php echo base_url(); ?>company">Company Profile</a>
					</li>
					<?php if($this->session->userdata['adminloggedin']['role'] == 1)
					{
						?>
					<li>
						<a <?php if($this->uri->segment(1) =="team-members") { ?> class="active" <?php } ?> href="<?php echo base_url(); ?>team-members">Team Members</a>
					</li>

					<li>
						<a <?php if($this->uri->segment(1) =="actions") { ?> class="active" <?php } ?> href="<?php echo base_url(); ?>actions">Admin Actions</a>
					</li>
				<?php } ?>
				</ul>
				<a class="logout" href="<?php echo base_url(); ?>logout">Logout</a>
			</div>
