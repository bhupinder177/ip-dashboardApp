
			<main id="main">
				<div class="detail-area">
					<h1 class="style"><span>Company Profile</span></h1>
					<div class="company-profile-holder">
						<div class="holder">
							<div class="align-left">
								<div class="field-holder">
									<label class="label">Company Name</label>
									<div class="input-field">
										<input type="text" class="form-control new-style" placeholder="Jane Doe">
									</div>
								</div>
								<div class="document-holder">
									<span class="title">Upload Files; Images, and docs here...</span>
									<ul class="upload-list">
										<li>
											<label>
												<input type="file">
												<span class="fake-file">
													<img src="<?php echo base_url(); ?>assets/images/upload-2.svg" alt="img">
												</span>
											</label>
										</li>
										<li>
											<label>
												<input type="file">
												<span class="fake-file">
													<img src="<?php echo base_url(); ?>assets/images/upload-2.svg" alt="img">
												</span>
											</label>
										</li>
										<li>
											<label>
												<input type="file">
												<span class="fake-file">
													<img src="<?php echo base_url(); ?>assets/images/upload-2.svg" alt="img">
												</span>
											</label>
										</li>
									</ul>
								</div>
							</div>
							<div class="align-right">
								<label class="file-label">
									<input type="file">
									<span class="fake-file style">
										<span class="text">UPLOAD <br>Company Logo</span>
									</span>
								</label>
							</div>
						</div>
						<div class="toggle-holder">
							<div class="switch-row">
								<div class="text">
									<strong class="title">Quick Submit</strong>
									<span class="sub-title">Enable Anonymous Submissions</span>
								</div>
								<label class="switch" for="one">
									<input type="checkbox" id="one">
									<span class="slider round"></span>
									<span class="txt-on-off">
										<span class="on">No</span>
										<span class="off">Yes</span>
									</span>
								</label>
							</div>
							<div class="switch-row">
								<div class="text">
									<strong class="title">New Ideas</strong>
									<span class="sub-title">Enable New Ideas</span>
								</div>
								<label class="switch" for="two">
									<input type="checkbox" id="two">
									<span class="slider round"></span>
									<span class="txt-on-off">
										<span class="on">No</span>
										<span class="off">Yes</span>
									</span>
								</label>
							</div>
							<div class="switch-row">
								<div class="text">
									<strong class="title">Idea Updates</strong>
									<span class="sub-title">Enable Idea Updates</span>
								</div>
								<label class="switch" for="three">
									<input type="checkbox" id="three">
									<span class="slider round"></span>
									<span class="txt-on-off">
										<span class="on">No</span>
										<span class="off">Yes</span>
									</span>
								</label>
							</div>
						</div>
						<button href="<?php echo base_url(); ?>edit-company" class="btn btn-outline-dark" type="submit">Edit</button>
					</div>
				</div>
			</main>
		</div>
	</div>
</body>
</html>
