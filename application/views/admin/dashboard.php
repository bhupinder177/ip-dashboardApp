
			<main id="main">
				<div class="detail-area">
					<h1>Hi, <?php echo $this->session->userdata['adminloggedin']['name']; ?></h1>
					<div class="overview-holder d-xl-flex">
						<div class="info-holder">
							<h2>Overview</h2>
							<ul class="overview-list">
								<li>
									<div style="margin-top: 19px;"></div>
									<span class="title" >Branding </span>
									<div class="icon-holder">
										<div class="icon-hold bg-purple">
											<img src="<?php echo base_url(); ?>assets/images/img15.png" alt="img">
										</div>
									</div>
									<span class="title-status">Pending:</span>
									<strong class="title-number">31</strong>
									<strong class="submit-info"><span>Submitted:</span> 15</strong>
								</li>
								<li>
									<span class="title ">Products/ <br>Technology</span>
									<div class="icon-holder">
										<div class="icon-hold bg-red">
											<img src="<?php echo base_url(); ?>assets/images/img16.png" alt="img">
										</div>
									</div>
									<span class="title-status">Pending:</span>
									<strong class="title-number">12</strong>
									<strong class="submit-info"><span>Submitted:</span> 03</strong>
								</li>
								<li>
									<span class="title">Process/ <br>Operations</span>
									<div class="icon-holder">
										<div class="icon-hold bg-green">
											<img src="<?php echo base_url(); ?>assets/images/img17.png" alt="img">
										</div>
									</div>
									<span class="title-status">Pending:</span>
									<strong class="title-number">09</strong>
									<strong class="submit-info"><span>Submitted:</span> 01</strong>
								</li>
								<li>
									<div style="margin-top: 19px;"></div>
									<span class="title">Creative</span>
									<div class="icon-holder">
										<div class="icon-hold bg-blue">
											<img src="<?php echo base_url(); ?>assets/images/img18.png" alt="img">
										</div>
									</div>
									<span class="title-status">Pending:</span>
									<strong class="title-number">22</strong>
									<strong class="submit-info"><span>Submitted:</span> 17</strong>
								</li>
							</ul>
						</div>
						<div class="graph-holder">
							<h2>Breakdown</h2>
							<div id="piechart" style="width: 100%; height: 100%;"></div>
						</div>
					</div>
					<div class="table-block">
						<h2>My Ideas</h2>
						<div class="table-holder">
							<div class="date-holder">
								<div class="input-wrap">
									<div class="input-hold">
										<label class="label">From</label>
										<label class="input-label">
											<input type="text" class="date-input" placeholder="June 1st" data-datepicker='{"dateFormat":mm/dd/yy"}'>
										</label>
									</div>
									<div class="input-hold">
										<label class="label">Until</label>
										<label class="input-label">
											<input type="text" class="date-input" placeholder="June 30th" data-datepicker='{"dateFormat":mm/dd/yy"}'>
										</label>
									</div>
								</div>
							</div>
							<ul class="tabset">
								<li>
									<a href="#tab1-0">Open</a>
								</li>
								<li>
									<a href="#tab2-0">Approved</a>
								</li>
								<li>
									<a href="#tab3-0">Archived</a>
								</li>
							</ul>
							<div class="table-box tab-content">
								<!-- open tab -->

								<div id="tab1-0">
									<table class="table">
										<thead>
											<tr>
												<th class="col1 padding-left">
													<span href="#">Name</span>
												</th>
												<th class="col2">
													<div class="wrap">
														<a href="#" class="dropdown dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Category</a>
														<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
															<a class="dropdown-item" href="#">All</a>
															<a class="dropdown-item" href="#">Branding</a>
															<a class="dropdown-item" href="#">Products & Technology</a>
															<a class="dropdown-item" href="#">Process & Operations</a>
															<a class="dropdown-item" href="#">Creative</a>
														</div>
													</div>
												</th>
												<th class="col3">
													<a href="#" class="dropdown dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Submission</a>
												</th>
												<th class="col4">
													<div class="wrap">
														<a href="#" class="dropdown dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Team</a>
														<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
															<a class="dropdown-item" href="#">Action</a>
															<a class="dropdown-item" href="#">Another action</a>
															<a class="dropdown-item" href="#">Something else here</a>
														</div>
													</div>
												</th>
											</tr>
										</thead>
										<tbody>
											<?php if(!empty($openresult))
											  {
													foreach($openresult as $open)
													{
													?>
											<tr>
												<td data-title="Name" class="col1 padding-left"><a href="<?php echo base_url(); ?>idea-details/<?php echo $open->id; ?>"><?php echo $open->myname; ?></a></td>
												<td data-title="Category" class="col2">
													<?php if(!empty($open->category))
													{
														?>
													<a class="btn bg-purple" href="#">Branding</a>
												<?php } ?>
												</td>
												<td data-title="Submission" class="col3"><?php echo date("M d Y", strtotime($open->date)); ?></td>
												<td data-title="Team" class="col4">
													<?php if(!empty($open->teams))
													 { ?>
													<div class="img-wrap">
														<div class="img-box" style="background-image: url(<?php echo base_url(); ?>assets/images/img3.jpg);"></div>
														<div class="img-box" style="background-image: url(<?php echo base_url(); ?>assets/images/img4.jpg);"></div>
													</div>
												<?php } ?>
												</td>
											</tr>
										<?php } }
										else{
											 ?>
											 <tr><td colspan="4">No record found</td></tr>
										 <?php } ?>

										</tbody>
									</table>
									<div class="pagination">
										<?php echo $openlinks; ?>
									</div>
								</div>

								<!-- open tab -->
								<div id="tab2-0">
									<table class="table">
										<thead>
											<tr>
												<th class="col1 padding-left">
													<span href="#">Name</span>
												</th>
												<th class="col2">
													<div class="wrap">
														<a href="#" class="dropdown dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Category</a>
														<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
															<a class="dropdown-item" href="#">Action</a>
															<a class="dropdown-item" href="#">Another action</a>
															<a class="dropdown-item" href="#">Something else here</a>
														</div>
													</div>
												</th>
												<th class="col3">
													<span href="#">Submission</span>
												</th>
												<th class="col4">
													<div class="wrap">
														<a href="#" class="dropdown dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Team</a>
														<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
															<a class="dropdown-item" href="#">Action</a>
															<a class="dropdown-item" href="#">Another action</a>
															<a class="dropdown-item" href="#">Something else here</a>
														</div>
													</div>
												</th>
											</tr>
										</thead>
										<tbody>
											<?php if(!empty($approvedresult))
											  {
													foreach($approvedresult as $approved)
													{
													?>
											<tr>
												<td data-title="Name" class="col1 padding-left"><a href="<?php echo base_url(); ?>idea-details/<?php echo $approved->id; ?>"><?php echo $open->myname; ?></a></td>
												<td data-title="Category" class="col2">
													<?php if(!empty($approved->category))
													{
														?>
													<a class="btn bg-purple" href="#">Branding</a>
												<?php } ?>
												</td>
												<td data-title="Submission" class="col3"><?php echo date("M d Y", strtotime($approved->date)); ?></td>
												<td data-title="Team" class="col4">
													<?php if(!empty($approved->teams))
													 { ?>
													<div class="img-wrap">
														<div class="img-box" style="background-image: url(<?php echo base_url(); ?>assets/images/img3.jpg);"></div>
														<div class="img-box" style="background-image: url(<?php echo base_url(); ?>assets/images/img4.jpg);"></div>
													</div>
												<?php } ?>
												</td>
											</tr>
										<?php } }
										else{
											 ?>
											 <tr><td colspan="4">No record found</td></tr>
										 <?php } ?>
										</tbody>
									</table>
									<div class="pagination">
										<?php echo $approvedlinks; ?>
									</div>
								</div>
								<div id="tab3-0">
									<table class="table">
										<thead>
											<tr>
												<th class="col1 padding-left">
													<span href="#">Name</span>
												</th>
												<th class="col2">
													<div class="wrap">
														<a href="#" class="dropdown dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Category</a>
														<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
															<a class="dropdown-item" href="#">Action</a>
															<a class="dropdown-item" href="#">Another action</a>
															<a class="dropdown-item" href="#">Something else here</a>
														</div>
													</div>
												</th>
												<th class="col3">
													<span href="#">Submission</span>
												</th>
												<th class="col4">
													<div class="wrap">
														<a href="#" class="dropdown dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Team</a>
														<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
															<a class="dropdown-item" href="#">Action</a>
															<a class="dropdown-item" href="#">Another action</a>
															<a class="dropdown-item" href="#">Something else here</a>
														</div>
													</div>
												</th>
											</tr>
										</thead>
										<tbody>
											<?php if(!empty($archivedresult))
												{
													foreach($archivedresult as $apchived)
													{
													?>
											<tr>
												<td data-title="Name" class="col1 padding-left"><a href="<?php echo base_url(); ?>idea-details/<?php echo $apchived->id; ?>"><?php echo $open->myname; ?></a></td>
												<td data-title="Category" class="col2">
													<?php if(!empty($apchived->category))
													{
														?>
													<a class="btn bg-purple" href="#">Branding</a>
												<?php } ?>
												</td>
												<td data-title="Submission" class="col3"><?php echo date("M d Y", strtotime($apchived->date)); ?></td>
												<td data-title="Team" class="col4">
													<?php if(!empty($apchived->teams))
													 { ?>
													<div class="img-wrap">
														<div class="img-box" style="background-image: url(<?php echo base_url(); ?>assets/images/img3.jpg);"></div>
														<div class="img-box" style="background-image: url(<?php echo base_url(); ?>assets/images/img4.jpg);"></div>
													</div>
												<?php } ?>
												</td>
											</tr>
										<?php } }
										else{
											 ?>
											 <tr><td colspan="4">No record found</td></tr>
										 <?php } ?>
										</tbody>
									</table>
									<div class="pagination">
										<?php echo $archivedlinks; ?>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	</div>
</body>
</html>
