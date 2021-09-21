
			<main id="main">
				<div class="detail-area">
					<h1><span>Add an Action</span></h1>
					<div class="team-member-holder">
						<form method="post" id="actionform" class="reset" action="<?php echo base_url(); ?>actionSave">
							<div class="fields-row">
								<div class="fields">
									<div class="field">
										<input type="text" name="name" class="form-control new-style" placeholder="Name">
									</div>
									<div class="field style">
										<input type="text" name="description" class="form-control new-style" placeholder="Description*">
									</div>
								</div>
								<button type="submit" class="btn btn-dark">Add</button>
							</div>
						</form>

							<div class="action-holder style">
								<?php if(!empty($result))
								{
									foreach($result as $res)
									{
									?>
								<div class="action-row">
									<div class="box">
										<strong class="title">Name</strong>
										<div class="input-holder">
											<input type="text" data-id="<?php echo $res->id; ?>" data-link="name" value="<?php echo $res->name; ?>" class="name<?php echo $res->id; ?> form-control new-style keyupdata" placeholder="Patent Disclosure">
										</div>
									</div>
									<div class="box style">
										<strong class="title">Description</strong>
										<div class="input-holder">
											<input type="text" data-id="<?php echo $res->id; ?>" data-link="description" value="<?php echo $res->description; ?>" class="description<?php echo $res->id; ?> form-control new-style keyupdata" placeholder="Prepare IDF for the idea submission">
										</div>
									</div>
									<div class="icons">
										<a href="#" class="ico icon-edit edit"></a>
										<a href="#" data-id="<?php echo $res->id; ?>" class="updateaction ico icon-check-green edit"></a>
										<a  data-id="<?php echo $res->id; ?>" data-link="<?php echo base_url() ?>actionDelete" class="deleterecord ico icon-delete"></a>
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
					</div>
					<strong class="title">Delete Account?</strong>
					<input type="hidden" value="" class="deleteId">
					<input type="hidden" value="" class="deletelink">
					<p>Do you want to <strong>permanently delete your account?</strong></p>
					<p>If you delete your account,<strong>you will not be able to recover it.</strong></p>
				</div>
				<div class="modal-footer d-block">
					<button type="button" class="btn btn-danger datadelete">Delete</button>
					<div>
						<a class="btn-idea" data-dismiss="modal">Changed My Mind, Let's Keep It</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
