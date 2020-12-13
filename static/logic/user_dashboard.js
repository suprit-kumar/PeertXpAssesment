$(document).ready(function () {

    //On Load Fetch
    fetchTicketFormSelectFieldDetails()

});

function fetchTicketFormSelectFieldDetails() {
    let departmentList, categoryList, prirorityList;
    $.ajax({
        type: 'POST',
        url: '/fetch_ticketform_select_field_details/',
        async: true,
        success: function (response) {
            if (response.result === 'success') {
                $('#ticket_department,#ticket_category,#ticket_priority').empty();
                $('#ticket_department').prepend("<option value=''>-None-</option>");
                $('#ticket_category').prepend("<option value=''>-None-</option>");
                $('#ticket_priority').prepend("<option value=''>-None-</option>");

                response.ticketform_details.forEach(function (details) {
                    if (details.departments !== '') {
                        departmentList = "<option value='" + details.departments + "'>" + details.departments + "</option>";
                        $('#ticket_department').append(departmentList);
                    }
                    if (details.categories !== '') {
                        categoryList = "<option value='" + details.categories + "'>" + details.categories + "</option>";
                        $('#ticket_category').append(categoryList);
                    }
                    if (details.priorities !== '') {
                        prirorityList = "<option value='" + details.priorities + "'>" + details.priorities + "</option>";
                        $('#ticket_priority').append(prirorityList);
                    }

                });
            } else if (response.result === 'failed') {
                swal(response.msg)
            }
        }, error: function (error) {
            console.log("Error in fetchClientsToCreateUser function --->", error);
        }
    });
}

