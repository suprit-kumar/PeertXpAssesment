from django.db import models


# Create your models here.
# class Role(models.Model):
#     role_id = models.AutoField(primary_key=True)
#     role_name = models.CharField(max_length=100, null=True, default="")
#     role_code = models.CharField(max_length=100, null=True, default="")
#     role_status = models.CharField(max_length=50, null=True, default="")
#     user_created_time = models.DateTimeField(auto_now_add=True, blank=True)
#
#     class Meta:
#         db_table = "role"
#
#     def __unicode__(self):
#         return u'%s' % [self.role_id]

class TicketDetails(models.Model):
    id = models.AutoField(primary_key=True)
    departments = models.CharField(max_length=250, null=True, default="")
    categories = models.CharField(max_length=250, null=True, default="")
    priorities = models.CharField(max_length=250, null=True, default="")

    class Meta:
        db_table = "ticket_details"

    def __unicode__(self):
        return f'{[self.id]}'

class User(models.Model):
    u_id = models.AutoField(primary_key=True)
    user_code = models.CharField(max_length=250, null=True, default="")
    username = models.CharField(max_length=250, null=True, default="")
    useremail = models.CharField(max_length=250, null=True, default="")
    password = models.CharField(max_length=250, null=True, default="")
    status = models.CharField(max_length=50, null=True, default="active")
    user_created_time = models.DateTimeField(auto_now_add=True, blank=True)

    class Meta:
        db_table = "user"

    def __unicode__(self):
        return f'{[self.u_id]}'
