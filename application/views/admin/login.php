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

</head>
<body>
	<div class="loader_panel" style="display: none;">
		<img  src="<?php echo base_url(); ?>assets/images/preloader.gif">

  </div>
	<div id="wrapper">
		<main id="main">
			<div class="login-block d-lg-flex">
				<div class="holder d-flex align-items-center">
					<div class="bg-logo">
						<img src="<?php echo base_url(); ?>assets/images/img1.png" alt="img">
					</div>
					<div class="signup-holder">
						<div class="logo-holder">
							<strong class="logo"><a href="#"><img src="<?php echo base_url(); ?>assets/images/logo.png" alt="D"></a></strong>
							<strong class="slogan">Dashboard IP</strong>
						</div>
						<div class="text-holder">
							<strong class="title">A Team Collaboration Platform</strong>
							<p>Turn Innovative Ideas into <br>Bankable IP Assets</p>
							<p>New here? <a href="<?php echo base_url(); ?>signup">Sign up</a></p>
						</div>
					</div>
				</div>
				<div class="holder bg-yellow d-flex align-items-center justify-content-center">
						<div class="login-form-holder">
							<form action="<?php echo base_url(); ?>" method="post" class="form reset" id="loginform">

							<div class="fields-holder">
								<h1>Login</h1>
								<div class="input-wrap">
									<div class="input-holder">
										<label for="email" class="ico icon-mail"></label>
										<label for="email" class="label-txt">Email</label>
										<input id="email" type="email" name="email" class="form-control" placeholder="">
									</div>
								</div>
								<div class="input-wrap">
									<div class="input-holder switch-state">
										<label for="password-field" class="label-txt">Password</label>
										<input id="password-field" type="password" class="form-control" name="password" placeholder="">
										<span toggle="#password-field" class="ico icon-eye toggle-password"></span>
										<span toggle="#password-field" class="ico icon-eye-off toggle-password"></span>
										<a href="#" class="ico icon-close"></a>
									</div>
								</div>
								<button class="btn btn-dark w-100" type="submit">Login</button>
								<a href="<?php echo base_url(); ?>forgot-password" style="text-decoration: underline; 	"><p style="color: #454545; position: relative; top: 20px;">Forgot Password?</p></a>

							</div>
						</form>
							<p>Or want submit idea without login</p>
							<div class="btn-holder">
								<a class="btn btn-dark w-100 quick-opener" href="#">Quick Submit</a>
							</div>
						</div>
						<form action="<?php echo base_url(); ?>quicksubmit" method="post" class="form reset" id="quicksubmitform">

						<div class="quick-form-holder">
							<div class="d-flex justify-content-between"><h1>Quick Submit</h1>
								<span class="quick-opener" style="cursor: pointer;" aria-hidden="true" style="font-size: 28px;">x</span></div>

							<div class="input-wrap">
								<div class="input-holder">
									<input id="company" type="text" class="form-control style" name="company" placeholder="">
									<label for="company" class="label-txt style">Company Name</label>
								</div>
							</div>
							<div class="input-wrap">
								<div class="input-holder">
									<input id="c-email" type="email" class="form-control style" name="email" placeholder="">
									<label for="c-email" class="label-txt style">Company Email </label>
								</div>
							</div>
							<div class="textarea-holder">
								<textarea  cols="25" rows="10" placeholder="Type here…" name="idea" class="form-control"></textarea>
								<p>QUICK SUBMIT ideas will only be emailed to an active company or recipient email account if they have activated this feature.</p>
							</div>
							<div class="input-wrap">
								<div class="input-holder">
									<input id="my-name" type="text" class="form-control style" name="myname" placeholder="">
									<label for="my-name" class="label-txt style">My Name (Optional)</label>
								</div>
							</div>
							<div class="input-wrap">
								<div class="input-holder">
									<input id="my-email" type="text" class="form-control style" name="myemail" placeholder="">
									<label for="my-email" class="label-txt style">My Email (Optional)</label>
								</div>
							</div>
							<div class="input-wrap">
								<button class="btn btn-dark w-100" type="submit" >That's it.. SUBMIT!</button>
								<!-- data-toggle="modal" data-target="#exampleModal-1" -->
							</div>
							<p>All submissions are subject to our <a href="#">Terms & Conditions</a>.</p>
						</div>
					</form>
				</div>
			</div>
		</main>
	</div>
	<!-- Modal -->
	<div class="modal fade" id="exampleModal-1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<div class="modal-body">
					<div class="img-holder">
						<img src="images/img13.svg" alt="img">
					</div>
					<strong class="title">We got it!</strong>
					<p>Now you can see your new idea in your dashboard.</p>
				</div>
				<div class="modal-footer d-block">
					<button type="button" class="btn btn-submit">Go to Dashboard</button>
					<div>
						<a class="btn-idea" href="#">Submit Another Idea</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
