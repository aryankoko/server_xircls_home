
urlpatterns = [
  path('', TemplateView.as_view(template_name = "index.html")),
  path('whatsapp/business_view/', views.Business_view, name = "Business_view"),
  path('getBusinessProfile/', views.get_business_profile, name = 'GetBusinessProfile'),
  path('projectCreation/', views.projectCreation, name = 'projectCreation'),
  path('getProjects/', views.get_projects, name = 'GetProjects'),
  // # path('partner_webhook/',views.partner_webhook, name="PartnerWebhook"),
  // # path('direct_webhook/',views.direct_webhook, name = "DirectAPIWebhook"),
  path('fbVerification/', views.fbStatus, name = "FbBusinessManagerVerificationStatus"),
  path('sendMessage/', views.sendMessage, name = 'sendMessage'),
  path('import_customer/', views.import_customer, name = 'import_customer'),
  path('embeddedSignup/', views.embeddedSignup, name = 'embeddedSignup'),
]


path('editTemplate/', views.editTemplate, name = 'editTemplate')
path('getTemplates/', views.getTemplates, name = 'GetAllTemplates'),
path('createTemplate/', views.createTemplate, name = 'CreateTemplate'),
path('getTemplateById/', views.getTemplateById, name = 'getTemplateById'),