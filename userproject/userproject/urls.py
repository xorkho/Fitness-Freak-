from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Store and cart API routes
    path('api/store/', include('store.urls')),  # Store app ke API URLs
    path('api/cart/', include('cart.urls')),  # Cart app ke API URLs

    # Home app APIs under /api/
    path('api/', include('home.urls')),  # Home app ke API URLs
]

# Static files ko serve karna during development
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
