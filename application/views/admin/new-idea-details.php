<main id="main">
    <section class="branding-area">
        <div class="container-fluid">
          <form action="<?php echo base_url(); ?>SaveIdeaDetail" enctype="multipart/form-data" class="reset" method="post" id="ideadetailsubmitform">

            <div class="holder">
                <h1><span>Here's my idea about </span><?php if($id == 1){ echo "Branding"; } else if($id == 2){ echo "Product &amp; Technology"; } else if($id == 3){ echo "Process &amp; Operations"; } else if($id == 3){ echo "Creative"; } ?> and <?php if($subcate == 1){ echo "Company Image"; } else if($subcate == 2){ echo "Our Services"; } else if($subcate == 3){ echo "Product Names &amp; Branding"; } else if($subcate == 4){ echo "Product Packaging"; } else if($subcate == 5){ echo "Customer Experience"; } else if($subcate == 6){ echo "Something Else.."; } ?></h1>
                <div class="input-holder">
                    <input type="text" class="form-control" id="idea" name="idea" placeholder="Write a short title here...">
                    <input type="hidden" value="<?php echo $id; ?>" name="category">
                </div>
                    <div class="row mb-5">
                        <div class="col-lg-6 col-xl-4 mb-5">
                            <h2>This is what I'm thinking.</h2>
                            <textarea name="thinking" id="thinking" placeholder="Type here…"></textarea>
                        </div>
                        <div class="col-lg-6 col-xl-4 mb-5">
                            <h2>Who is helping you with this idea?</h2>
                            <div class="checkbox-holder">
                                <div class="checkbox-wrap jcf-scrollable">
                                    <ul class="checkbox-list">
                                      <?php if(!empty($team))
                                      {
                                        foreach($team as $t)
                                        {
                                         ?>
                                        <li>
                                            <label>
                                                <input value="<?php echo $t->userId; ?>" name="userId[]" type="checkbox">
                                                <span class="fake-input"></span>
                                                <span class="detail-box">
																<span class="img-box">
																	<img src="<?php echo base_url(); ?>assets/images/user.svg" alt="img">
																</span>
																<span class="text"><?php echo $t->name; ?></span>
															</span>
                                            </label>
                                        </li>
                                      <?php } } ?>

                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6 col-xl-4">
                            <h2>Upload Files</h2>
                            <ul class="upload-list d-flex flex-wrap">
                                <li>
                                    <label>
                                        <input class="first" type="file" name="image[]">
                                        <span class="firstshow fake-file d-flex justify-content-center align-items-center">
                            <span class="ico icon-upload"></span>
                          </span>
                                    </label>
                                </li>
                                <li>
                                    <label>
                                        <input type="file" name="image[]">
                                        <span class="firstshow fake-file d-flex justify-content-center align-items-center">
                            <span class="ico icon-upload"></span>
                          </span>
                                    </label>
                                </li>
                                <li>
                                    <label>
                                        <input type="file" name="image[]">
                                        <span class="firstshow fake-file d-flex justify-content-center align-items-center">
														<span class="ico icon-upload"></span>
													</span>
                                    </label>
                                </li>
                                <li>
                                    <label>
                                        <input class="firstshow fake-file" type="file" name="image[]">
                                        <span class="firstshow fake-file d-flex justify-content-center align-items-center">
                            <span class="ico icon-upload"></span>
                          </span>
                                    </label>
                                </li>
                                <li>
                                    <label>
                                        <input type="file" name="image[]">
                                        <span class="firstshow fake-file d-flex justify-content-center align-items-center">
														<span class="ico icon-upload"></span>
													</span>
                                    </label>
                                </li>
                                <li>
                                    <label>
                                        <input type="file" name="image[]">
                                        <span class="fake-file d-flex justify-content-center align-items-center">
														<span class="ico icon-upload"></span>
													</span>
                                    </label>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="btn-holder d-flex justify-content-center">
                        <button class="btn-submit" type="submit">Submit My Idea</button>
                    </div>
            </div>
          </form>

        </div>
    </section>
</main>
