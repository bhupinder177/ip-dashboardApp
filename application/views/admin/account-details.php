
			<main id="main">
				<div class="detail-area">
					<h1><span>My Account Details</h1>
					<div class="account-detail-holder">
						<div class="holder">
							<form action="<?php echo base_url(); ?>accountUpdate" method="post" id="profileUpdate">
								<div class="fields-wrap">
									<div class="input-row">
										<label class="label" for="name">Name</label>
										<div class="input-holder">
											<input id="name" type="text" value="<?php echo $result->name; ?>" name="name" class="form-control new-style" placeholder="Jane Doe">
										</div>
									</div>
									<div class="input-row">
										<label class="label" for="mail">Email</label>
										<div class="input-holder">
											<input readonly id="mail" type="email" value="<?php echo $result->email; ?>" name="email" class="form-control new-style" >
										</div>
									</div>
									<div class="input-row">
										<label class="label" for="number">Contact Number</label>
										<div class="input-holder">
											<input id="number" type="text" name="phone" value="<?php echo $result->phone; ?>" class="form-control new-style" placeholder="+123457788">
										</div>
									</div>

									<div class="input-row">
										<label class="label" for="pass">Password</label>
										<div class="input-holder pass-field">
											<input id="pass" type="password" name="password" class="form-control new-style password" placeholder="Please enter password">
											<button type="reset" class="btn-reset">Reset Password</button>
											<div class="password-detail">
												<strong class="title-contain">Password must contain the following:</strong>
												<span class="text">A lowercase letter</span>
												<span class="text">A capital (uppercase) letter</span>
												<span class="text">A number</span>
												<span class="text">Minimum 8 characters</span>
											</div>
										</div>
									</div>
									<div class="input-row">
										<label class="label" for="pass"></label>
										<div class="input-holder">
											<button class="btn btn-dark" type="submit">Save</button>
										</div>
									</div>
								</div>
								<div class="delete-account-info">
									<strong class="title-delete"><a href="#" data-toggle="modal" data-target="#exampleModal-1">Delete my account</a></strong>
									<p>Deleting your account will remove your access permanently. You will not be able to access or edit any of your prior submissions, which are subject to the submission terms and conditions of the company.</p>
								</div>
							</form>
						</div>
					</div>
				</div>
			</main>
		</div>
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
						<img src="images/img14.svg" alt="img">
					</div>
					<strong class="title">Delete Account?</strong>
					<p>Do you want to <strong>permanently delete your account?</strong></p>
					<p>If you delete your account,<strong>you will not be able to recover it.</strong></p>
				</div>
				<div class="modal-footer d-block">
					<button type="button" class="btn btn-danger">Go to Dashboard</button>
					<div>
						<a class="btn-idea" href="#">Changed My Mind, Let's Keep It</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
