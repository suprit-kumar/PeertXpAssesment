import re

from django.http import JsonResponse, HttpResponseRedirect
from django.shortcuts import render

# Create your views here.
from django.views.decorators.csrf import csrf_exempt
from ticket_app import models
from ticket_app.utils import *


def index(request):
    context = {}
    return render(request, 'login.html', context)


@csrf_exempt
def login_operation(request):
    try:
        useremail = request.POST.get('useremail')
        password = request.POST.get('password')
        u_name = re.search(r'\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b', useremail, re.I)
        if u_name:
            try:
                validate_user = models.User.objects.get(useremail=useremail,
                                                        password=encrypt_password(password),
                                                        status__iexact='active')
                if validate_user is not None:
                    request.session['usercode'] = validate_user.user_code
                    response_msg = {"result": "success",
                                    'u_code': validate_user.user_code}
                    print(response_msg)
                else:
                    response_msg = {"result": "failed", "msg": "Invalid User credentials"}
            except models.User.DoesNotExist:
                response_msg = {"result": "failed", "msg": "Invalid User credentials"}
            return JsonResponse(response_msg)
        else:
            return JsonResponse({"result": "Invalid", "msg": "Invalid Username."})


    except Exception as e:
        print("Exception in login_operation views.py-->", e)
        return JsonResponse({"result": "error", "msg": "Opps!, Server error while login"})


def logout(request):
    try:
        # Remove the authenticated user's ID from the request and flush their session data.Add details to UserLogs table.
        if 'usercode' in request.session:
            user_code = request.session['usercode']
            print('LOGOUT - ---- > ', user_code)
            request.session.flush()
        return HttpResponseRedirect('/')
    except Exception as e:
        print('Exception in logout --> ', e)
        request.session.flush()
        return HttpResponseRedirect('/')


def user_dashboard(request):
    if 'usercode' in request.session:
        user_code = request.session['usercode']
        user_details = list(
            models.User.objects.filter(user_code=user_code).values('username', 'useremail'))
        return render(request, 'user_dashboard.html', {'user_code': user_code, 'details': user_details})


@csrf_exempt
def register_new_user(request):
    try:
        if request.method == 'POST':

            customerName = request.POST['customerName']
            customerEmail = request.POST['customerEmail']
            customerPass = request.POST['customerPass']

            if customerName != '':
                unique_code = getUniqueUserCode()
                try:
                    models.User.objects.create(user_code=unique_code, useremail=customerEmail, username=customerName,
                                               password=encrypt_password(customerPass),
                                               )
                    return JsonResponse({'result': 'success', 'msg': 'Registration successfull'})
                except:
                    return JsonResponse({"result": "failed", "msg": "Unable to register at this moment! Try again"})

    except Exception as e:
        print("Exception in register_new_user views.py-->", e)
        return JsonResponse({"result": "failed", "msg": "Unable to register at this moment! Try again"})


@csrf_exempt
def fetch_ticketform_select_field_details(request):
    try:
        if 'usercode' in request.session:
            if request.method == 'POST':
                ticketform_details = list(
                    models.TicketDetails.objects.values('departments', 'categories',
                                                                                      'priorities'))
                return JsonResponse({'result': 'success', 'ticketform_details': ticketform_details})
    except Exception as e:
        print("Exception in fetch_ticketform_select_field_details views.py-->", e)
        return JsonResponse(
            {"result": "failed", "msg": "Unable to fetch ticket select field details! Refresh the page Try again"})
