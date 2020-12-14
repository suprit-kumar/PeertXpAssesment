$(document).ready(function () {

    //On Load Fetch
    fetchTicketFormSelectFieldDetails();
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
            console.log("Error in fetchTicketFormSelectFieldDetails function --->", error);
        }
    });
}

function createTicket() {
    const auth_token = '9446933330c7f886fbdf16782906a9e0';
    const org_id = 60001280952;
    const ticket_data = '{"subCategory" : "Sub General", "productId" : "", "contactId" : "", "subject" : "Welcome to Zoho Support. Youve got a sample Request!", "customFields" : { "MyDateTime" : "", "datetime" : "", "MyInteger" : "", "MyPickList" : "asdadada", "Date" : "", "qqweq" : "false" }, "dueDate" : "2016-06-21T16:16:16.000Z", "departmentId" : "", "channel" : "Email", "description" : "Hai This is Description", "priority" : "High", "classification" : "", "assigneeId" : null, "phone" : "1 888 900 9646", "category" : "manoj", "email" : "example@example.com", "status" : "Open"}';
    $.ajax({
        type: 'POST',
        url: 'https://desk.zoho.in/api/v1/tickets',
        headers: {
            "Authorization": auth_token,
            "orgId": org_id,
            contentType: "application/json; charset=utf-8",
        },
        data: ticket_data,
        success: function (response) {
            console.log(response)
        }, error: function (error) {
            console.log("Error in fetchTicketFormSelectFieldDetails function --->", error);
        }
    });
}