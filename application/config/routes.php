<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	https://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There are three reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router which controller/method to use if those
| provided in the URL cannot be matched to a valid route.
|
|	$route['translate_uri_dashes'] = FALSE;
|
| This is not exactly a route, but allows you to automatically route
| controller and method names that contain dashes. '-' isn't a valid
| class or method name character, so it requires translation.
| When you set this option to TRUE, it will replace ALL dashes in the
| controller and method URI segments.
|
| Examples:	my-controller/index	-> my_controller/index
|		my-controller/my-method	-> my_controller/my_method
*/
$route['default_controller'] = 'admin';
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;



/***************  admin route********************/
$route['login']                 = 'admin/index';
$route['signup']                 = 'admin/signup';
$route['signupSubmit']                 = 'admin/signupSubmit';
$route['logout']          = 'admin/logout';
$route['dashboard']       = 'admin/dashboard';
$route['dashboard/(:any)']       = 'admin/dashboard/$1';
$route['idea-details/(:any)']       = 'admin/idea_details/$1';
$route['submit-idea-details/(:any)/(:any)']       = 'admin/submit_idea_details/$1/$2';
$route['SaveIdeaDetail']       = 'admin/SaveIdeaDetail';
$route['SaveIdeaDetail']       = 'admin/SaveIdeaDetail';
$route['quicksubmit']       = 'admin/quicksubmit';
$route['account']       = 'admin/account';
$route['company']       = 'admin/company';
$route['team-members']       = 'admin/team';
$route['teamSave']       = 'admin/teamSave';
$route['teamDelete']       = 'admin/teamDelete';
$route['teamUpdate']       = 'admin/teamUpdate';
$route['actions']       = 'admin/actions';
$route['actions/(:any)']       = 'admin/actions/$1';
$route['actionDelete']       = 'admin/actionDelete';
$route['accountUpdate']       = 'admin/accountUpdate';
$route['submit-idea']       = 'admin/submit_idea';
$route['actionSave']       = 'admin/actionSave';
$route['ActionUpdate']       = 'admin/ActionUpdate';
$route['forgot-password']       = 'admin/forgotPassword';
$route['forgotSubmit']       = 'admin/forgotcheckemail';
