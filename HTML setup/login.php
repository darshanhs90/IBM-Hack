<?php 
    session_start();
    require("config.php"); 
    $submitted_username = ''; 
    if(!empty($_POST)){ 
        $query = " 
            SELECT 
                id, 
                email, 
                stud_rec,
                password, 
                salt
            FROM users 
            WHERE 
                email = :email 
        "; 
        $query_params = array( 
            ':email' => $_POST['email'] 
        ); 
         
        $_SESSION['user'] = $_POST['email'] ;
        try{ 
            $stmt = $db->prepare($query); 
            $result = $stmt->execute($query_params); 
        } 
        catch(PDOException $ex){ die("Failed to run query: " . $ex->getMessage()); } 
        $login_ok = false; 
        $row = $stmt->fetch(); 
        $studrec=$row['stud_rec'];
       // $_SESSION['user'] = $row['email'];

        if($row){ 
            $check_password = hash('sha256', $_POST['password'] . $row['salt']); 
            for($round = 0; $round < 65536; $round++){
                $check_password = hash('sha256', $check_password . $row['salt']);
            } 
            if($check_password === $row['password']){
                $login_ok = true;
            } 
        } 

        if($login_ok){ 
            unset($row['salt']); 
            unset($row['password']); 
           // $_SESSION['user'] = $row['email'];
            session_write_close();
            if($studrec==1){


            header("Location: ./php/student/studentPostLoginHome.php"); 
            die("Redirecting to: ./php/student/studentPostLoginHome.php"); 
        }
        else if($studrec==0){
            header("Location: ./php/employer/employerPostLoginHome.php"); 
            die("Redirecting to: ./php/employer/employerPostLoginHome.php");
        }
        } 
        else{ 
            print("Login Failed."); 
            $submitted_username = htmlentities($_POST['email'], ENT_QUOTES, 'UTF-8'); 
        } 
    } 
?>

<!DOCTYPE html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<title></title>
<link href='http://fonts.googleapis.com/css?family=Ropa+Sans' rel='stylesheet'>
<link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel='stylesheet'>
<script type="text/javascript" src="./js/jquery.min.js"></script>
<script type="text/javascript">
    $(document).ready(function(){
            $("input[type='radio']").on('change', function() {
            if ( this.value == '0')
            {
            $("#company").show();
            $("#student").hide();
            $("#reslink").hide();
            }
            else if ( this.value == '1')
            {
            $("#company").hide();
            $("#student").show();
            $("#reslink").show();
            }
            else
            {
            $("#company").hide();
            }
            });
            });
</script>
<style>
body{font-family: 'Ropa Sans', sans-serif; color:#666; font-size:14px; color:#333}
li,ul,body,input{margin:0; padding:0; list-style:none}
#login-form{width:350px; background:#FFF; margin:0 auto; margin-top:70px; background:#f8f8f8; overflow:hidden; border-radius:7px}
.form-header{display:table; clear:both}
.form-header label{display:block; cursor:pointer; z-index:999}
.form-header li{margin:0; line-height:60px; width:175px; text-align:center; background:#eee; font-size:18px; float:left; transition:all 600ms ease}

/*sectiop*/
.section-out{width:700px; float:left; transition:all 600ms ease}
.section-out:after{content:''; clear:both; display:table}
.section-out section{width:350px; float:left}

.login{padding:20px}
.ul-list{clear:both; display:table; width:100%}
.ul-list:after{content:''; clear:both; display:table}
.ul-list li{ margin:0 auto; margin-bottom:12px}
.input{background:#fff; transition:all 800ms; width:247px; border-radius:3px 0 0 3px; font-family: 'Ropa Sans', sans-serif; border:solid 1px #ccc; border-right:none; outline:none; color:#999; height:40px; line-height:40px; display:inline-block; padding-left:10px; font-size:16px}
.input,.login span.icon{vertical-align:top}
.login span.icon{width:50px; transition:all 800ms; text-align:center; color:#999; height:40px; border-radius:0 3px 3px 0; background:#e8e8e8; height:40px; line-height:40px; display:inline-block; border:solid 1px #ccc; border-left:none; font-size:16px}
.input:focus:invalid{border-color:red}
.input:focus:invalid+.icon{border-color:red}
.input:focus:valid{border-color:green}
.input:focus:valid+.icon{border-color:green}
#check,#check1{top:1px; position:relative}
.btn{border:none; outline:none; background:#0099CC; border-bottom:solid 4px #006699; font-family: 'Ropa Sans', sans-serif; margin:0 auto; display:block; height:40px; width:100%; padding:0 10px; border-radius:3px; font-size:16px; color:#FFF}

.social-login{padding:15px 20px; background:#f1f1f1; border-top:solid 2px #e8e8e8; text-align:right}
.social-login a{display:inline-block; height:35px; text-align:center; line-height:35px; width:35px; margin:0 3px; text-decoration:none; color:#FFFFFF}
.form a i.fa{line-height:35px}
.fb{background:#305891} .tw{background:#2ca8d2} .gp{background:#ce4d39} .in{background:#006699}
.remember{width:50%; display:inline-block; clear:both; font-size:14px}
.remember:nth-child(2){text-align:right}
.remember a{text-decoration:none; color:#666}

.hide{display:none}

/*swich form*/
#signup:checked~.section-out{margin-left:-350px}
#login:checked~.section-out{margin-left:0px}
#login:checked~div .form-header li:nth-child(1),#signup:checked~div .form-header li:nth-child(2){background:#e8e8e8}
</style>
</head>
<body>
<div id="login-form">

<input type="radio" checked id="login" name="switch" class="hide">
<input type="radio" id="signup" name="switch" class="hide">

<div>
<ul class="form-header">
<li><label for="login"><i class="fa fa-lock"></i> LOGIN<label for="login"></li>
<li><label for="signup"><i class="fa fa-credit-card"></i> REGISTER</label></li>
</ul>
</div>

<div class="section-out">
<section class="login-section">
<div class="login">
<form action="login.php" method="post">
<ul class="ul-list">
<li><input type="email" required class="input" placeholder="Your Email" name="email" value="<?php echo $submitted_username; ?>"/><span class="icon"><i class="fa fa-user"></i></span></li>
<li><input type="password" required class="input" placeholder="Password" name="password" value=""/><span class="icon"><i class="fa fa-lock"></i></span></li>
<li><span class="remember"><input type="checkbox" id="check"> <label for="check">Remember Me</label></span><span class="remember"><a href="">Forget Password</a></span></li>
<li><input type="submit" value="SIGN IN" class="btn" value="Login"></li>
</ul>
</form>
</div>

<div class="social-login">Or sign in with &nbsp;
<a href="" class="fb"><i class="fa fa-facebook"></i></a>
<a href="" class="tw"><i class="fa fa-twitter"></i></a>
<a href="" class="gp"><i class="fa fa-google-plus"></i></a>
<a href="" class="in"><i class="fa fa-linkedin"></i></a>
</div>
</section>

<section class="signup-section">
<div class="login">
<form action="./php/registerme.php" method="post">
<ul class="ul-list">
<li><input type="text" required class="input" placeholder="First Name" name="fname" value=""/><span class="icon"></i></span></li>
<li><input type="text" required class="input" placeholder="Last Name" name="lname" value=""/><span class="icon"></i></span></li>
<li><label class="radio-inline" id="usertype" name="usertype">
<input type="radio" name="stud_rec"  value="1" checked="checked" >Student</label>
<input type="radio" name="stud_rec" value="0">Recruiter</label></li>
<li id="student"><input type="text" class="input" placeholder="University Name" name="univname" value=""/><span class="icon"></i></span></li>
<li style="display:none;" id="company"><input type="text" class="input" placeholder="Company Name" name="companyname" value=""/><span class="icon"></i></span></li>
<li><input type="text" required class="input" placeholder="Phone Number" name="pnumber" value=""/><span class="icon"></i></span></li>
<li id="reslink"><input type="text" class="input" placeholder="Resume Link" name="resumelink" value=""/><span class="icon"></i></span></li>
<li><input type="email" required class="input" placeholder="Your Email" name="email" value=""/><span class="icon"><i class="fa fa-user"></i></span></li>
<li><input type="password" required class="input" placeholder="Password" name="password" value=""/><span class="icon"><i class="fa fa-lock"></i></span></li>
<li><input type="checkbox" id="check1"> <label for="check1">I accept terms and conditions</label></li>
<li><input type="submit" value="Register" class="btn"></li>
</ul>
</form>
</div>

<div class="social-login">Or sign up with &nbsp;
<a href="" class="fb"><i class="fa fa-facebook"></i></a>
<a href="" class="tw"><i class="fa fa-twitter"></i></a>
<a href="" class="gp"><i class="fa fa-google-plus"></i></a>
<a href="" class="in"><i class="fa fa-linkedin"></i></a>
</div>
</section>
</div>

</div>

</body>
</html>