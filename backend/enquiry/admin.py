from django.contrib import admin
from django.contrib import admin
from .models import Enquiry

@admin.register(Enquiry)
class EnquiryAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'course', 'created_at')
    search_fields = ('name', 'email')
# Register your models here.
