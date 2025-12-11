# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
# License: MIT. See LICENSE
import os

no_cache = 1

import json
import re
from urllib.parse import urlencode

import frappe
import frappe.sessions
from frappe import _
from frappe.utils.jinja_globals import is_rtl
from pprint import pprint

SCRIPT_TAG_PATTERN = re.compile(r"\<script[^<]*\</script\>")
CLOSING_SCRIPT_TAG_PATTERN = re.compile(r"</script\>")


def get_context(context):
	if frappe.session.user == "Guest":
		frappe.response["status_code"] = 403
		frappe.msgprint(_("Log in to access this page."))
		frappe.redirect(f"/login?{urlencode({'redirect-to': frappe.request.path})}")
	elif frappe.db.get_value("User", frappe.session.user, "user_type", order_by=None) == "Website User":
		frappe.throw(_("You are not permitted to access this page."), frappe.PermissionError)

	hooks = frappe.get_hooks()
	try:
		boot = frappe.sessions.get()
	except Exception as e:
		raise frappe.SessionBootFailed from e

	# this needs commit
	csrf_token = frappe.sessions.get_csrf_token()

	frappe.db.commit()


	desk_theme = frappe.db.get_value("User", frappe.session.user, "desk_theme")


	theme_settings_list = {}
	theme_settings = frappe.db.sql(""" SELECT * FROM tabSingles WHERE doctype = 'Theme Settings'; """, as_dict=True)
	for theme_setting in theme_settings:
		theme_settings_list[theme_setting['field']] = theme_setting['value']

	light_logo = theme_settings_list.get('light_logo')
	dark_logo = theme_settings_list.get('dark_logo')
	default_light_logo = boot.app_logo_url or "/assets/frappe/images/frappe-logo.png"
	
	if desk_theme == 'Dark' and dark_logo:
		boot.app_logo_url = dark_logo
	elif light_logo:
		boot.app_logo_url = light_logo
	else:
		boot.app_logo_url = default_light_logo

	boot.light_logo = light_logo or default_light_logo
	boot.dark_logo = dark_logo or default_light_logo


	boot_json = frappe.as_json(boot, indent=None, separators=(",", ":"))
	# remove script tags from boot
	boot_json = SCRIPT_TAG_PATTERN.sub("", boot_json)

	# TODO: Find better fix
	boot_json = CLOSING_SCRIPT_TAG_PATTERN.sub("", boot_json)

	include_js = hooks.get("app_include_js", []) + frappe.conf.get("app_include_js", [])
	include_css = hooks.get("app_include_css", []) + frappe.conf.get("app_include_css", [])
	include_icons = hooks.get("app_include_icons", [])
	frappe.local.preload_assets["icons"].extend(include_icons)

	if frappe.get_system_settings("enable_telemetry") and os.getenv("FRAPPE_SENTRY_DSN"):
		include_js.append("sentry.bundle.js")


	theme = 'light'
	if (desk_theme == 'Dark'):
		theme = 'dark'

	context.update(
		{
			"no_cache": 1,
			"build_version": frappe.utils.get_build_version(),
			"include_js": include_js,
			"include_css": include_css,
			"include_icons": include_icons,
			"layout_direction": "rtl" if is_rtl() else "ltr",
			"lang": frappe.local.lang,
			"sounds": hooks["sounds"],
			"boot": boot if context.get("for_mobile") else json.loads(boot_json),
			"desk_theme": boot.get("desk_theme") or "Light",
			"csrf_token": csrf_token,
			"google_analytics_id": frappe.conf.get("google_analytics_id"),
			"google_analytics_anonymize_ip": frappe.conf.get("google_analytics_anonymize_ip"),
			"app_name": (
				frappe.get_website_settings("app_name") or frappe.get_system_settings("app_name") or "Frappe"
			),
			"dark_theme": theme,
			"theme_settings": theme_settings_list,
			"disable_splash" : bool(int(theme_settings_list.get('disable_splash', 0))),
			"theme_color": (theme_settings_list['color'] or 'Blue').lower() if 'color' in theme_settings_list else 'blue',
		}
	)

	# pprint(context)

	return context
