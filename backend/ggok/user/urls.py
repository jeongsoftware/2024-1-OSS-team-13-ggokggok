from django.urls import path
from user.views import LoginView, LogoutView, JoinView, UserPostSearch, putRegion
app_name = 'user'
urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('join/', JoinView.as_view(), name='join'),
    path('', UserPostSearch, name='post_search'),
    path('<int:id>/', putRegion, name='put_region'), #지역등록
]
