<?php
//session_start();
defined('BASEPATH') OR exit('No direct script access allowed');

class Admin extends CI_Controller {

  public function __construct() {
    parent::__construct();


    $this->load->model('common');
    $this->load->library("pagination");
    $this->load->library('email');
    $this->load->library('session');
    $this->load->library('upload');
    $this->load->helper(array('form', 'url'));

  }



  public function index()
  {
    ////dsdsdds
    if(!empty($_POST))
    {
      $data = array(
        'email' =>$_POST['email'],
        'password' => md5($_POST['password']),
      );
      $result = $this->common->getrow('users',$data);

      if ($result == TRUE)
      {

        $session_data = array(
          'id' => $result->userId,
          'email' => $result->email,
          'name' =>$result->name,
          'role' =>$result->role,
          'parent' =>$result->parent,
        );

        $this->session->set_userdata('adminloggedin', $session_data);


        $output['url'] = base_url().'admin/dashboard';

        $output['success'] ="true";
        $output['success_message'] ="Login Successfully";
        $output['delayTime'] ='3000';

      }
      else
      {
        $output['formErrors'] = "true";
        $output['errors'] = 'Invalid Username or Password.';
      }

      echo json_encode($output);
      exit;
    }
    else
    {

      $this->load->view('admin/login');

    }
  }

  public function signup()
  {
    $this->load->view('admin/signup');
  }

  public function signupSubmit()
  {

    $check = $this->common->getrow('users',array("email"=>$_POST['email']));
    if(!empty($check))
    {
      $output['formErrors'] ="true";
      $output['errors'] ="Email  is Already Exist.";
    }
    else
    {
     $_POST['password'] = md5($_POST['password']);
     $_POST['role'] = 1;
     unset($_POST['confirm_password']);
    $insert = $this->common->insert('users',$_POST);

    if($insert)
    {
      $output['success'] ="true";
      $output['success_message'] ="Signup  Successfully";
      $output['url'] = base_url();
      $output['delayTime'] ='3000';
      $output['resetform'] ='true';
    }
    else
    {
      $output['formErrors'] ="true";
      $output['errors'] ="Signup is not Successful";
    }
  }

    echo json_encode($output);
    exit;
  }



  public function logout()
  {
    $this->session->sess_destroy();
    redirect('admin');
  }

  public function dashboard()
  {
    // ******Open*********
    $data['opencount'] = $this->common->count_all_results('quick',array("userId"=>$this->session->userdata['adminloggedin']['id'],"status"=>0));
    $config = array();
    $config["base_url"] = base_url() . 'dashboard/';
    $config["opentotal_rows"] = $this->common->count_all_results("quick",array("userId"=>$this->session->userdata['adminloggedin']['id'],"status"=>0));
    $config["per_page"] = 10;
    $config["uri_segment"] = 2;
    $this->pagination->initialize($config);
    $page = ($this->uri->segment(2)) ? $this->uri->segment(2) : 0;
    if( $page <= 0 )
    {
      $page = 1;
    }
    $start = ($page-1) * $config["per_page"];
    $data['openresult'] = $this->common->getbypaginationWhere('quick',array("userId"=>$this->session->userdata['adminloggedin']['id'],"status"=>0),'id',$start,$config["per_page"]);
    $data["openlinks"] = getPaginationlink($config["per_page"],$config["opentotal_rows"],$config["base_url"],$config["uri_segment"],1);
    // ******Open*********

    // ******* Approved**********
    $data['approvedcount'] = $this->common->count_all_results('quick',array("userId"=>$this->session->userdata['adminloggedin']['id'],"status"=>1));
    $config = array();
    $config["base_url"] = base_url() . 'dashboard/';
    $config["approvedtotal_rows"] = $this->common->count_all_results("quick",array("userId"=>$this->session->userdata['adminloggedin']['id'],"status"=>1));
    $config["per_page"] = 10;
    $config["uri_segment"] = 2;
    $this->pagination->initialize($config);
    $page = ($this->uri->segment(2)) ? $this->uri->segment(2) : 0;
    if( $page <= 0 )
    {
      $page = 1;
    }
    $start = ($page-1) * $config["per_page"];
    $data['approvedresult'] = $this->common->getbypaginationWhere('quick',array("userId"=>$this->session->userdata['adminloggedin']['id'],"status"=>1),'id',$start,$config["per_page"]);
    $data["approvedlinks"] = getPaginationlink($config["per_page"],$config["approvedtotal_rows"],$config["base_url"],$config["uri_segment"],1);

    // ******* Approved**********
    // ******* Aprchived**********
    $data['archivedcount'] = $this->common->count_all_results('quick',array("userId"=>$this->session->userdata['adminloggedin']['id'],"status"=>2));
    $config = array();
    $config["base_url"] = base_url() . 'dashboard/';
    $config["archivedtotal_rows"] = $this->common->count_all_results("quick",array("userId"=>$this->session->userdata['adminloggedin']['id'],"status"=>2));
    $config["per_page"] = 10;
    $config["uri_segment"] = 2;
    $this->pagination->initialize($config);
    $page = ($this->uri->segment(2)) ? $this->uri->segment(2) : 0;
    if( $page <= 0 )
    {
      $page = 1;
    }
    $start = ($page-1) * $config["per_page"];
    $data['archivedresult'] = $this->common->getbypaginationWhere('quick',array("userId"=>$this->session->userdata['adminloggedin']['id'],"status"=>2),'id',$start,$config["per_page"]);
    $data["archivedlinks"] = getPaginationlink($config["per_page"],$config["archivedtotal_rows"],$config["base_url"],$config["uri_segment"],1);

    // ******* Aprchived**********

    $this->load->view('admin/header');
    $this->load->view('admin/dashboard',$data);
  }

  public function account()
  {
    $data['result'] = $this->common->getrow('users',array("userId"=>$this->session->userdata['adminloggedin']['id']));
    $this->load->view('admin/header');
    $this->load->view('admin/account-details',$data);

  }

  public function accountUpdate()
  {
     if(!empty($_POST['password']))
     {
       $_POST['password'] = md5($_POST['password']);
     }
     else
     {
       unset($_POST['password']);
     }
    $insert = $this->common->update(array("userId"=>$this->session->userdata['adminloggedin']['id']),$_POST,'users');
    if($insert)
    {
      $output['success'] ="true";
      $output['success_message'] ="Account Update Successfully";
      $output['delayTime'] ='3000';
      $output['resetform'] ='true';
    }
    else
    {
      $output['formErrors'] ="true";
      $output['errors'] ="Account Is Not Update";
    }

    echo json_encode($output);
    exit;
  }

  public function company()
  {
    $this->load->view('admin/header');
    $this->load->view('admin/company');

  }

  public function team()
  {
    $data['pcount'] = $this->common->count_all_results('users',array("parent"=>$this->session->userdata['adminloggedin']['id']));
    $config = array();
    $config["base_url"] = base_url() . 'team-members/';
    $config["total_rows"] = $this->common->count_all_results("users",array("parent"=>$this->session->userdata['adminloggedin']['id']));
    $config["per_page"] = 10;
    $config["uri_segment"] = 2;
    $this->pagination->initialize($config);
    $page = ($this->uri->segment(2)) ? $this->uri->segment(2) : 0;
    if( $page <= 0 )
    {
      $page = 1;
    }
    $start = ($page-1) * $config["per_page"];
    $data['start'] = $start;
    $data['result'] = $this->common->getbypaginationWhere('users',array("parent"=>$this->session->userdata['adminloggedin']['id']),'userId',$start,$config["per_page"]);
    $data["links"] = getPaginationlink($config["per_page"],$config["total_rows"],$config["base_url"],$config["uri_segment"],1);

    $this->load->view('admin/header');
    $this->load->view('admin/team-members',$data);

  }

  public function actions()
  {
    $data['pcount'] = $this->common->count_all_results('actions',array("userId"=>$this->session->userdata['adminloggedin']['id']));
    $config = array();
    $config["base_url"] = base_url() . 'actions/';
    $config["total_rows"] = $this->common->count_all_results("actions",array("userId"=>$this->session->userdata['adminloggedin']['id']));
    $config["per_page"] = 10;
    $config["uri_segment"] = 2;
    $this->pagination->initialize($config);
    $page = ($this->uri->segment(2)) ? $this->uri->segment(2) : 0;
    if( $page <= 0 )
    {
      $page = 1;
    }
    $start = ($page-1) * $config["per_page"];
    $data['start'] = $start;
    $data['result'] = $this->common->getbypaginationWhere('actions',array("userId"=>$this->session->userdata['adminloggedin']['id']),'id',$start,$config["per_page"]);
    $data["links"] = getPaginationlink($config["per_page"],$config["total_rows"],$config["base_url"],$config["uri_segment"],1);

    $this->load->view('admin/header');
    $this->load->view('admin/admin-actions',$data);

  }

  public function submit_idea()
  {
    $this->load->view('admin/header');
    $this->load->view('admin/submit-idea-main');

  }
  public function submit_idea_details($id)
  {
    $data['result'] = $this->common->getrow('quick',array("id"=>$id));
    $this->load->view('admin/header');
    $this->load->view('admin/new-idea-details',$data);

  }

  public function idea_details(){
      $this->load->view('admin/header');
      $this->load->view('admin/idea-details');
  }

  public function securite()
  {
    if(!isset($this->session->userdata['adminloggedin']['id']))
    {
      redirect('admin');
    }
  }

  public function actionSave()
  {
      $_POST['userId'] = $this->session->userdata['adminloggedin']['id'];
      $insert = $this->common->insert('actions',$_POST);
      if($insert)
      {
        $output['success'] ="true";
        $output['success_message'] ="Action Added Successfully";
        $output['delayTime'] ='3000';
        $output['resetform'] ='true';
        $output['reload'] ='true';
      }
      else
      {
        $output['formErrors'] ="true";
        $output['errors'] ="Action not Added ";
      }

      echo json_encode($output);
      exit;

  }

  public function actionDelete()
  {
    $insert = $this->common->delete('actions',array("id"=>$_POST['id']));
    if($insert)
    {
      $output['success'] ="true";
      $output['success_message'] ="Action Deleted Successfully";
      $output['delayTime'] ='3000';
      $output['resetform'] ='true';
      $output['reload'] ='true';
      $output['url'] = base_url().'actions';
    }
    else
    {
      $output['formErrors'] ="true";
      $output['errors'] ="Action not Deletes ";
    }

    echo json_encode($output);
    exit;
  }

  public function ActionUpdate()
  {
    $a['name'] = $_POST['name'];
    $a['description'] = $_POST['description'];
    $insert = $this->common->update(array("id"=>$_POST['id']),$a,'actions');
    if($insert)
    {
      $output['success'] ="true";
      $output['success_message'] ="Account Update Successfully";
      $output['delayTime'] ='3000';
      $output['resetform'] ='true';
    }
    else
    {
      $output['formErrors'] ="true";
      $output['errors'] ="Account Is Not Update";
    }

    echo json_encode($output);
    exit;
  }

  public function teamSave()
  {
      $_POST['parent'] = $this->session->userdata['adminloggedin']['id'];
      $check = $this->common->getrow('users',array("email"=>$_POST['email']));
      if(!empty($check))
      {
        $output['formErrors'] ="true";
        $output['errors'] ="Email  is Already Exist.";
      }
      else
      {
        $length           = 8;
        $characters       = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $random           = rand();
        for ($i = 0; $i < $length; $i++)
        {
        $random .= $characters[rand(0, $charactersLength - 1)];
        }


        $_POST['password'] = md5($random);
       $insert = $this->common->insert('users',$_POST);
       if($insert)
       {
         $detail['name'] = $_POST['name'];
         $detail['email'] = $_POST['email'];
         $detail['password'] = $random;
        $msg = $this->load->view('email/team',$detail,true);
        $mail =  $this->mailsend('Register',$_POST['email'],$msg);
       }
       if($insert)
      {
        $output['success'] ="true";
        $output['success_message'] ="Team Member Added Successfully";
        $output['delayTime'] ='3000';
        $output['resetform'] ='true';
        $output['reload'] ='true';
      }
      else
      {
        $output['formErrors'] ="true";
        $output['errors'] ="Team member not Added ";
      }
    }

      echo json_encode($output);
      exit;

  }

  public function teamDelete()
  {
    $insert = $this->common->delete('users',array("userId"=>$_POST['id']));
    if($insert)
    {
      $output['success'] ="true";
      $output['success_message'] ="Team Member Deleted Successfully";
      $output['delayTime'] ='3000';
      $output['resetform'] ='true';
      $output['reload'] ='true';
      $output['url'] = base_url().'team-members';
    }
    else
    {
      $output['formErrors'] ="true";
      $output['errors'] ="team member not Deletes ";
    }

    echo json_encode($output);
    exit;
  }

  public function teamUpdate()
  {
    $a['name'] = $_POST['name'];
    $a['phone'] = $_POST['phone'];
    $a['role'] = $_POST['role'];
    $insert = $this->common->update(array("userId"=>$_POST['id']),$a,'users');
    if($insert)
    {
      $output['success'] ="true";
      $output['success_message'] ="Team member Updated Successfully";
      $output['delayTime'] ='3000';
      $output['resetform'] ='true';
    }
    else
    {
      $output['formErrors'] ="true";
      $output['errors'] ="Team Member Is Not Update";
    }

    echo json_encode($output);
    exit;
  }

  public function forgotPassword()
  {
    $this->load->view('admin/forgotpassword.php');
  }

public function forgotcheckemail()
{
  $mail ='';
  $res = $this->common->getrow('users',array("email"=>$_POST['email']));

 if(!empty($res))
{
     $length           = 8;
     $characters       = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
     $charactersLength = strlen($characters);
     $random           = rand();
     for ($i = 0; $i < $length; $i++)
     {
     $random .= $characters[rand(0, $charactersLength - 1)];
     }

     $detail['password'] = $random;
     $detail['name'] = $res->name;
      $res = $this->common->update(array("userId"=>$res->userId),array("password"=>md5($random)),'users');
     $msg = $this->load->view('email/forgotPassword',$detail,true);
     $mail =  $this->mailsend('Reset Password',$_POST['email'],$msg);
    if($mail)
  {
    $output['success'] ="true";
    $output['success_message'] ="Password sent to your email. Please check your email. ";
    $output['resetform'] ='true';
    $output['url'] = base_url();
    $output['delayTime'] ='3000';
  }
 else
 {
   $output['formErrors'] ="true";
  $output['errors'] ="Error in Email Sending.";
 }
}
else
{
 $output['formErrors'] ="true";
 $output['errors'] ="Email does not exists.";
}
echo json_encode($output);
}

  public function mailsend($sub,$to,$msg)
  {
    $ci = & get_instance();
    $ci->email_var = array(
      'site_title' => $ci->config->item('site_title'), 'site_url' => site_url()
    );

    $ci->config_email = Array (
      'protocol' => "mail",
     'smtp_host' => "mail.dashboardip.com",
     'smtp_port' => '465',
       'smtp_user' => 'hello@dashboardip.com',
      'smtp_pass' => 'OH1RuG7txyUH',
      'mailtype' => "html",
      'wordwrap' => TRUE,
      'crlf' => '\r\n',
      'charset' => "utf-8"
    );


    $ci->email->initialize($ci->config_email);
    $ci->email->set_newline("\r\n");
    $ci->email->from('hello@dashboardip.com', 'Dashboard ip');
    $ci->email->to($to);
    $ci->email->subject($sub);
    $ci->email->message($msg);
    if ($ci->email->send()) {
      $ci->email->clear(TRUE);

     return TRUE;

    }
    else
    {
      //echo "no";
      //echo $ci->email->print_debugger();
     return FALSE;
    }
  }

  public function quicksubmit()
  {
    $nowUtc = new DateTime( 'now',  new DateTimeZone( 'UTC' ) );
    $date =  $nowUtc->format('Y-m-d');
    $_POST['date'] = $date;
     $insert = $this->common->insert('quick',$_POST);
     if($insert)
    {
      $output['success'] ="true";
      $output['success_message'] ="Quick Sumitted Successfully";
      $output['delayTime'] ='3000';
      $output['resetform'] ='true';
      $output['reload'] ='true';
    }
    else
    {
      $output['formErrors'] ="true";
      $output['errors'] ="Team member not Added ";
    }


    echo json_encode($output);
    exit;
  }







}
