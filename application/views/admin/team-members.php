
			<main id="main">
				<div class="detail-area">
					<h1><span>Add a New Team Member</span></h1>
					<div class="team-member-holder">
						<form action="<?php echo base_url(); ?>teamSave" class="reset" method="post" id="teamForm">
							<div class="fields-row">
								<div class="fields">
									<div class="field">
										<input type="text" name="name" id="name" class="form-control new-style" placeholder="Name">
									</div>
									<div class="field">
										<input type="text" name="email" id="email" class="form-control new-style" placeholder="Email*">
									</div>
									<div class="field">
										<select name="role" id="role" class="form-control new-style">
											<option value="">Role</option>
											<option value="1">Admin</option>
											<option value="2">User</option>
											<option value="3">Guest</option>
										</select>
									</div>
								</div>
								<button type="submit" class="btn btn-dark"  >Add</button>
							</div>
						</form>
							<div class="action-holder">
                <?php if(!empty($result))
								{
									foreach($result as $res)
									{
									?>
								<div class="action-row">
									<div class="box">
										<strong class="title">Name</strong>
										<div class="input-holder">
											<input type="text" name="name" value="<?php echo $res->name; ?>" class="nameupdate<?php echo $res->userId; ?> form-control new-style" placeholder="Koltrane Willard">
										</div>
									</div>
									<div class="box">
										<strong class="title">Email</strong>
										<div class="input-holder">
											<input type="text" readonly value="<?php echo $res->email; ?>" class="emailupdate<?php echo $res->userId; ?> form-control new-style" placeholder="koltrane@willard.com">
										</div>
									</div>
									<div class="box">
										<strong class="title">Phone No.</strong>
										<div class="input-holder">
											<input type="text" value="<?php echo $res->phone; ?>" class="phoneupdate<?php echo $res->userId; ?> form-control new-style" placeholder="(212) 385 1384">
										</div>
									</div>
									<div class="box">
										<strong class="title">Role</strong>
										<select class="roleupdate<?php echo $res->userId; ?> custom-select">
											<option value="">Role</option>
											<option <?php if($res->role == 1) { echo "selected"; } ?> value="1">Admin</option>
											<option <?php if($res->role == 2) { echo "selected"; } ?> value="2">User</option>
											<option <?php if($res->role == 3) { echo "selected"; } ?> value="3">Guest</option>
										</select>
									</div>
									<div class="icons">
										<a data-id="<?php echo $res->userId; ?>" class="ico icon-edit edit"></a>
										<a data-id="<?php echo $res->userId; ?>" class="UpdateTeam ico icon-check-green edit"></a>
										<a data-id="<?php echo $res->userId; ?>" data-link="<?php echo base_url() ?>teamDelete" class="deleterecord ico icon-delete" ></a>
									</div>
								</div>
							<?php } } ?>
							<div  class="articlepagination">
								<?php echo $links; ?>

							</div>

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
						<img src="<?php echo base_url(); ?>assets/images/img14.svg" alt="img">
						<input type="hidden" value="" class="deleteId">
						<input type="hidden" value="" class="deletelink">
					</div>
					<strong class="title">Delete Pop Up?</strong>
					<p>Do you want to <strong>permanently delete your anything here?</strong></p>
					<p>If you delete your account,<strong>you will not be able to recover it.</strong></p>
				</div>
				<div class="modal-footer d-block">
					<button type="button" class="btn btn-danger datadelete">Yes Delete</button>
					<div>
						<a class="btn-idea" href="#">Changed My Mind, Let's Keep It</a>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- Modal -->
	<div class="modal fade" id="exampleModal-2" tabindex="-2" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<div class="modal-body">
					<strong class="title">Do you want to add any team members before you submit?</strong>
				</div>
				<div class="modal-footer d-block">
					<button type="button" class="btn btn-submit">Add Team Members</button>
					<div>
						<a class="btn-idea" href="#">Submit Without Team Members</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
