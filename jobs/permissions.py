from rest_framework import permissions

# is_superuser is Admin,  is_staff for staff
#https://docs.djangoproject.com/en/3.1/ref/contrib/auth/

class IsClientOrReadOnly(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True
        if request.method == "POST":
            return True
        else:
            return False
