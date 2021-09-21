

        <main id="main">
            <div class="detail-area style">
                <div class="btn-back-holder">
                    <a class="btn-back" href="#">Back</a>
                </div>
                <h1 class="style">Change Website Pictures <span class="sub-text">#B0021</span></h1>
                <div class="website-info-holder">
                    <div class="holder">
                        <div class="text-box">
                            <h2>Overview</h2>
                            <div class="text-frame jcf-scrollable">
                                <p><?php echo $result->idea; ?></p>

                            </div>
                        </div>
                        <div class="images-box">
                            <h2>Images</h2>
                            <div class="wrap-images">
                                <ul class="images-list jcf-scrollable">
                                  <?php if(!empty($images))
                                  {
                                    foreach($images as $m)
                                    ?>
                                    <li>
                                        <div class="img-box" style="background-image: url(<?php echo base_url(); ?>assets/ideaimages/<?php echo $m->image; ?>);"></div>
                                    </li>
                                  <?php } ?>

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="comments-info-holder">
                    <div class="box">
                        <div class="comment-info">
                            <h2>Comments</h2>
                            <div class="comment-box">
                                <div class="comments-wrap jcf-scrollable">
                                    <ul class="comment-list">
                                        <li>
                                            <label for="text-input" class="wrap">
                                                <div class="icon" style="background-image: url(images/img19.jpg);"></div>
                                                <div class="comment-text">
                                                    <span class="number">12</span>
                                                    <strong class="title-name">Mick Grimsley</strong>
                                                    <span class="comment">I like this concept.</span>
                                                    <span class="txt-response">Respond</span>
                                                </div>
                                            </label>
                                            <label for="text-input" class="wrap">
                                                <div class="icon" style="background-image: url(images/img19.jpg);"></div>
                                                <div class="comment-text">
                                                    <span class="number">12</span>
                                                    <strong class="title-name">Mick Grimsley</strong>
                                                    <span class="comment">I like this concept.</span>
                                                    <span class="txt-response">Respond</span>
                                                </div>
                                            </label>

                                        </li>
                                        <li class="respond">
                                            <label for="text-input" class="wrap">
                                                <div class="icon" style="background-image: url(images/img20.jpg);"></div>
                                                <div class="comment-text">
                                                    <span class="number ">12</span>
                                                    <strong class="title-name">Latoyia Hoy</strong>
                                                    <span class="comment">That makes two of us.</span>
                                                    <span class="txt-response">Respond</span>
                                                </div>
                                            </label>
                                            <label for="text-input" class="wrap">
                                                <div class="icon" style="background-image: url(images/img20.jpg);"></div>
                                                <div class="comment-text">
                                                    <span class="number">12</span>
                                                    <strong class="title-name">Latoyia Hoy</strong>
                                                    <span class="comment">That makes two of us.</span>
                                                    <span class="txt-response">Respond</span>
                                                </div>
                                            </label>
                                            <label for="text-input" class="wrap">
                                                <div class="icon" style="background-image: url(images/img20.jpg);"></div>
                                                <div class="comment-text">
                                                    <span class="number">12</span>
                                                    <strong class="title-name">Latoyia Hoy</strong>
                                                    <span class="comment">That makes two of us.</span>
                                                    <span class="txt-response">Respond</span>
                                                </div>
                                            </label>
                                        </li>
                                        <li>
                                            <label for="text-input" class="wrap">
                                                <div class="icon" style="background-image: url(images/img21.jpg);"></div>
                                                <div class="comment-text">
                                                    <span class="number">12</span>
                                                    <strong class="title-name">Renaldo Holmer Smith</strong>
                                                    <span class="comment">Interesting...</span>
                                                    <span class="txt-response">Respond</span>
                                                </div>
                                            </label>
                                        </li>
                                        <li>
                                            <label for="text-input" class="wrap">
                                                <div class="icon" style="background-image: url(images/img19.jpg);"></div>
                                                <div class="comment-text">
                                                    <span class="number">12</span>
                                                    <strong class="title-name">Mick Grimsley</strong>
                                                    <span class="comment">I like this concept.</span>
                                                    <span class="txt-response">Respond</span>
                                                </div>
                                            </label>
                                        </li>
                                        <li class="respond">
                                            <label for="text-input" class="wrap">
                                                <div class="icon" style="background-image: url(images/img20.jpg);"></div>
                                                <div class="comment-text">
                                                    <span class="number">12</span>
                                                    <strong class="title-name">Latoyia Hoy</strong>
                                                    <span class="comment">That makes two of us.</span>
                                                    <span class="txt-response">Respond</span>
                                                </div>
                                            </label>
                                        </li>
                                        <li>
                                            <label for="text-input" class="wrap">
                                                <div class="icon" style="background-image: url(images/img21.jpg);"></div>
                                                <div class="comment-text">
                                                    <span class="number">12</span>
                                                    <strong class="title-name">Renaldo Holmer Smith</strong>
                                                    <span class="comment">Interesting...</span>
                                                    <span class="txt-response">Respond</span>
                                                </div>
                                            </label>
                                        </li>
                                    </ul>
                                </div>
                                <form class="comment-form" action="#">
                                    <input id="text-input" type="text" class="form-control" placeholder="">
                                    <button class="btn-send" type="submit">Send</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="box">
                        <div class="info-box">
                            <div class="info-row">
                                <div class="info-wrap">
                                    <h2>Status <a class="ico icon-edit" href="#"></a></h2>
                                    <span class="title-pending">Pending</span>
                                </div>
                                <div class="info-wrap">
                                    <h2>Team <a class="ico icon-edit" href="#"></a></h2>
                                    <div class="img-wrap">
                                      <?php if(!empty($team))
                                         {
                                           foreach($team as $t)
                                           {
                                           ?>
                                        <div class="img-box" style="background-image: url(<?php echo base_url(); ?>assets/images/img3.jpg);"></div>
                                      <?php } } ?>
                                    </div>
                                </div>
                            </div>
                            <div class="info-row">
                                <div class="info-wrap">
                                    <h2>Admin <a class="ico icon-edit" href="#"></a></h2>
                                    <div class="img-wrap">
                                        <div class="img-box" style="background-image: url(images/img5.jpg);"></div>
                                    </div>
                                </div>
                                <div class="info-wrap">
                                    <h2>Admin Notes <a class="ico icon-edit" href="#"></a></h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                </div>
                            </div>
                            <div class="action-box">
                                <h2>Actions</h2>
                                <div class="btn-action-holder">
                                    <div class="btn-hold">
                                        <a class="btn bg-green dropdown-toggle"    >Approve</a>
                                        <!-- <div class="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                                            <a class="dropdown-item" href="#">Dropdown</a>
                                            <a class="dropdown-item" href="#">Dropdown</a>
                                        </div> -->
                                    </div>
                                    <div class="btn-hold style">
                                        <a class="btn bg-purple" >Review</a>
                                    </div>
                                    <div class="btn-hold style">
                                        <a class="btn bg-red" >Archive</a>
                                    </div>
                                    <!-- <div class="btn-hold">
                                        <a class="ico icon-dots dropdown-toggle" href="#" id="dropdownMenuButton3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></a>
                                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton3">
                                            <a class="dropdown-item" href="#">Dropdown</a>
                                            <a class="dropdown-item" href="#">Dropdown</a>
                                        </div>
                                    </div> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

</body>
</html>
