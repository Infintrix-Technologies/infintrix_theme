from __future__ import unicode_literals
import os, re, json
import frappe
from frappe.utils import flt, cint, get_time, make_filter_tuple, get_filter, add_to_date, cstr, get_timespan_date_range, nowdate, add_days, getdate, add_months, get_datetime
from frappe import _
from frappe.desk.reportview import get_filters_cond
from frappe.cache_manager import clear_user_cache
from six import string_types


@frappe.whitelist()
def get_module_name_from_doctype(doc_name, current_module=""):
    # frappe.msgprint("======"+str(doc_name))
    condition = ""
    if doc_name:
        if current_module:
            condition = "and  w.`name` = {current_module} ".format(current_module=current_module)

        list_od_dicts = frappe.db.sql("""
            select *
                    from (
                            select  w.`name` `module`,
                                 (select restrict_to_domain from `tabModule Def` where `name` = w.module ) restrict_to_domain
                                             from  tabWorkspace w
                                             inner join
                                                        `tabWorkspace Link` l
                                                        on w.`name` = l.parent
                                                         where link_to = '{doc_name}'
                                                          %s
                                )	T
        """.format(doc_name=doc_name), (condition), as_dict=True, debug=False)
        if list_od_dicts:
            return [{"module": list_od_dicts[0]["module"]}]
        else:
            list_od_dicts = frappe.db.sql("""
                select *
                        from (
                                select  w.`name` `module`,
                                     (select restrict_to_domain from `tabModule Def` where `name` = w.module ) restrict_to_domain
                                                 from  tabWorkspace w
                                                 inner join
                                                            `tabWorkspace Link` l
                                                            on w.`name` = l.parent
                                                             where link_to = '{doc_name}'
                                    )	T
            """.format(doc_name=doc_name), as_dict=True, debug=False)
        if list_od_dicts:
            return [{"module": list_od_dicts[0]["module"]}]


@frappe.whitelist()
def change_language(language):
    frappe.db.set_value("User", frappe.session.user, "language", language)
    clear()
    return True


@frappe.whitelist()
def get_current_language():
    return frappe.db.get_value("User", frappe.session.user, "language")


@frappe.whitelist()
def get_company_logo():
    logo_path = ""
    current_company = frappe.defaults.get_user_default("company")
    if current_company:
        logo_path = frappe.db.get_value("Company", current_company, "company_logo")

    return logo_path


@frappe.whitelist(allow_guest=True)
def get_theme_settings():
    slideshow_photos = []
    settings_list = {}
    settings = frappe.db.sql("""
                       SELECT * FROM tabSingles WHERE doctype = 'Theme Settings';
    """, as_dict=True, debug=False)

    for setting in settings:
        settings_list[setting['field']] = setting['value']

    if (("background_type" in settings_list) and settings_list['background_type'] == 'Slideshow'):
        slideshow_photos = frappe.db.sql("""
                               SELECT `photo` FROM `tabSlideshow Photos` WHERE `parent` = 'Theme Settings';
            """, as_dict=True, debug=False)

    return {
        'enable_background': settings_list['enable_background'] if ("enable_background" in settings_list) else '',
        'background_photo': settings_list['background_photo'] if ("background_photo" in settings_list) else '',
        'background_type': settings_list['background_type'] if ("background_type" in settings_list) else '',
        'full_page_background': settings_list['full_page_background'] if ("full_page_background" in settings_list) else '',
        'transparent_background': settings_list['transparent_background'] if ("transparent_background" in settings_list) else '',
        'slideshow_photos': slideshow_photos,
        'dark_view': settings_list['dark_view'] if ("dark_view" in settings_list) else '',
        'theme_color': settings_list['theme_color'] if ("theme_color" in settings_list) else '',
        'open_workspace_on_mobile_menu': settings_list['open_workspace_on_mobile_menu'] if ("open_workspace_on_mobile_menu" in settings_list) else '',
        'show_icon_label': settings_list['show_icon_label'] if ("show_icon_label" in settings_list) else '',
        'hide_icon_tooltip': settings_list['hide_icon_tooltip'] if ("hide_icon_tooltip" in settings_list) else '',
        'always_close_sub_menu': settings_list['always_close_sub_menu'] if ("always_close_sub_menu" in settings_list) else '',
        'menu_opening_type': settings_list['menu_opening_type'] if ("menu_opening_type" in settings_list) else '',
        'loading_image': settings_list['loading_image'] if ("loading_image" in settings_list) else ''
    }


@frappe.whitelist()
def update_theme_settings(**data):
    data = frappe._dict(data)
    doc = frappe.get_doc("Theme Settings")
    doc.theme_color = data.theme_color
    doc.apply_on_menu = data.apply_on_menu
    doc.apply_on_dashboard = data.apply_on_dashboard
    doc.apply_on_workspace = data.apply_on_workspace
    doc.apply_on_navbar = data.apply_on_navbar
    doc.save(ignore_permissions=True)
    return doc


@frappe.whitelist()
def get_events(start=getdate(), end=getdate().year, user=None, for_reminder=False, filters=None):
    end = str(getdate().year) + "-12-31"
    if not user:
        user = frappe.session.user

    if isinstance(filters, string_types):
        filters = json.loads(filters)

    filter_condition = get_filters_cond('Event', filters, [])

    tables = ["`tabEvent`"]
    if "`tabEvent Participants`" in filter_condition:
        tables.append("`tabEvent Participants`")

    events = frappe.db.sql("""
        SELECT `tabEvent`.name,
                `tabEvent`.subject,
                `tabEvent`.description,
                `tabEvent`.color,
                `tabEvent`.starts_on,
                `tabEvent`.ends_on,
                `tabEvent`.owner,
                `tabEvent`.all_day,
                `tabEvent`.event_type,
                `tabEvent`.repeat_this_event,
                `tabEvent`.repeat_on,
                `tabEvent`.repeat_till,
                `tabEvent`.monday,
                `tabEvent`.tuesday,
                `tabEvent`.wednesday,
                `tabEvent`.thursday,
                `tabEvent`.friday,
                `tabEvent`.saturday,
                `tabEvent`.sunday
        FROM {tables}
        WHERE (
                (
                    (date(`tabEvent`.starts_on) BETWEEN date(%(start)s) AND date(%(end)s))
                    OR (date(`tabEvent`.ends_on) BETWEEN date(%(start)s) AND date(%(end)s))
                    OR (
                        date(`tabEvent`.starts_on) <= date(%(start)s)
                        AND date(`tabEvent`.ends_on) >= date(%(end)s)
                    )
                )
                OR (
                    date(`tabEvent`.starts_on) <= date(%(start)s)
                    AND `tabEvent`.repeat_this_event=1
                    AND coalesce(`tabEvent`.repeat_till, '3000-01-01') > date(%(start)s)
                )
            )
        {reminder_condition}
        {filter_condition}
        AND (
                `tabEvent`.event_type='Public'
                OR `tabEvent`.owner=%(user)s
                OR EXISTS(
                    SELECT `tabDocShare`.name
                    FROM `tabDocShare`
                    WHERE `tabDocShare`.share_doctype='Event'
                        AND `tabDocShare`.share_name=`tabEvent`.name
                        AND `tabDocShare`.user=%(user)s
                )
            )
        AND `tabEvent`.status='Open'
        ORDER BY `tabEvent`.starts_on""".format(
        tables=", ".join(tables),
        filter_condition=filter_condition,
        reminder_condition="AND coalesce(`tabEvent`.send_reminder, 0)=1" if for_reminder else ""
    ), {
        "start": start,
        "end": end,
        "user": user,
    }, as_dict=1)

    return events


@frappe.whitelist()
def update_menu_modules(modules):
    modules_list = json.loads(modules)
    for module in modules_list:
        if frappe.db.exists("Workspace", module["name"]):
            if (module["_is_deleted"] == 'true'):
                frappe.delete_doc("Workspace", module["name"], force=True)
            else:
                frappe.db.set_value("Workspace", module["name"], {
                    "title": module['title'],
                    "label": module["title"],
                    "icon": module["icon"],
                    "sequence_id": int(module["sequence_id"])
                })
        else:
            if (module["_is_new"] == 'true'):
                workspace = frappe.new_doc("Workspace")
                workspace.title = module["title"]
                workspace.icon = module["icon"]
                workspace.content = module["content"]
                workspace.label = module["label"]
                workspace.sequence_id = int(module["sequence_id"])
                workspace.for_user = ""
                workspace.public = 1
                workspace.save(ignore_permissions=True)

    return True


def clear():
    frappe.local.session_obj.update(force=True)
    frappe.local.db.commit()
    clear_user_cache(frappe.session.user)
    frappe.response['message'] = _("Cache Cleared")
