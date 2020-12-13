$(document).ready(function () {

    $("#signInBtn").click(function () {
        validateFields();
    });

    $('#signUpBtn').click(function () {
        registerNewUser();
    });

});


function validateFields() {
    var useremail = $("#email_input").val();
    var password = $("#pwd_input").val();
    if (useremail === '' || useremail === undefined) {
        swal("Please enter login email");
        return false;
    } else if (password === '' || password === undefined) {
        swal("Please enter password");
        return false;
    } else if (!checkuser(useremail, password)) {
        return false;
    } else {

    }
}


function checkuser(useremail, password) {
    $('#signInBtn').prop('disabled', true);

    const flag = false;
    const UserDetails = {
        "useremail": useremail,
        "password": password
    };
    $.ajax({
        type: "POST",
        url: "/login_operation/",
        data: UserDetails,
        async: false,
        success: function (data) {
            if (data.result === "success") {
                gotoRespectiveLogin( data.u_code);
            } else if (data.result === "failed") {
                resetLoginButtonAndInputs();
                swal(data.msg);
            } else if (data.result === "error") {
                resetLoginButtonAndInputs();
                swal(data.msg);
            }
        },
        error: function (error) {
            console.log("Error in checkuser function", error);
        }
    });
    return flag;
}


function gotoRespectiveLogin(user_code) {
    if (user_code !== '') {
        window.location.href = '/user_dashboard/';
    }
}


function resetLoginButtonAndInputs() {
    $("#email_input, #pwd_input").val('');
    $('#signInBtn').prop('disabled', false);
}


function registerNewUser() {
    const customerName = $('#reg_name_input').val();
    const customerEmail = $('#reg_email_input').val();
    const customerPass = $('#reg_pass_input').val();
    const emailadd = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!customerName) {
        swal('Enter your name');
        return false;
    } else if (!customerEmail) {
        swal('Enter your email id');
        return false;
    } else if (!(emailadd.test(customerEmail))) {
        swal("Enter Valid Email Id");
        return false;
    } else if (customerPass.length < 5) {
        swal("Enter minimum 5 characters for password.");
        return false;
    } else {
        const details = {'customerName': customerName, 'customerEmail': customerEmail, 'customerPass': customerPass};
        $('#signUpBtn').prop('disabled', true);
        $.ajax({
            type: 'POST',
            url: '/register_new_user/',
            data: details,
            success: function (response) {
                if (response.result === 'success') {
                    swal(response.msg);
                    $('#signUpBtn').prop('disabled', false);
                    setTimeout(function () {
                        window.location.reload();
                    }, 2000);
                } else if (response.result === 'failed') {
                    $('#signUpBtn').prop('disabled', false);
                    swal(response.msg);
                }
            }, error: function (error) {
                console.log('Error in registerNewUser function ->', error)
            }
        });
    }
}