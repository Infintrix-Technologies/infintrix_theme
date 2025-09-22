import frappe

def after_install():
    """
    Function to execute after the theme is installed.
    Add any setup or initialization logic here.
    """
    print("Infintrix Theme has been successfully installed.")
    # Add your custom setup logic here
    # Set the Navbar Settings Doctype field value
    navbar_settings = frappe.get_single("Navbar Settings")
    website_settings = frappe.get_single("Website Settings")
    navbar_settings.app_logo = "/assets/infintrix_theme/images/erpleaf-logo.png"
    website_settings.app_logo = "/assets/infintrix_theme/images/erpleaf-logo.png"
    website_settings.banner_image = "/assets/infintrix_theme/images/erpleaf-logo.png"
    website_settings.splash_image = "/assets/infintrix_theme/images/erpleaf-logo.png"
    website_settings.favicon = "/assets/infintrix_theme/images/erpleaf-logo.png"
    navbar_settings.save()
    website_settings.save()


def before_uninstall():
    """
    Function to execute before the theme is uninstalled.
    Add any cleanup logic here.
    """
    print("Infintrix Theme is being uninstalled.")
    # Add your custom cleanup logic here

    navbar_settings = frappe.get_single("Navbar Settings")
    website_settings = frappe.get_single("Website Settings")
    navbar_settings.app_logo = ""
    website_settings.app_logo = ""
    website_settings.banner_image = ""
    website_settings.splash_image = ""
    website_settings.favicon = ""
    navbar_settings.save()
    website_settings.save()