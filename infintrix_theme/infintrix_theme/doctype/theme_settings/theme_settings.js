// Copyright (c) 2025, Muqeet Mughal and contributors
// For license information, please see license.txt

frappe.ui.form.on("Theme Settings", {
    refresh(frm) {

    },
    after_save(frm) {
        frappe.call({
            method: "frappe.sessions.clear",
            type: "POST",
            callback: function(r) {
                location.reload();
            }
        });

        
    }
});
