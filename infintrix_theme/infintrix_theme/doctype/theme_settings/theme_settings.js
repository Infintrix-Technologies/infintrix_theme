// Copyright (c) 2025, Muqeet Mughal and contributors
// For license information, please see license.txt

frappe.ui.form.on("Theme Settings", {
   refresh(frm) {
        // render preview initially
        frm.trigger("render_font_preview");
    },

    font_family(frm) {
        // re-render preview on font change
        frm.trigger("render_font_preview");
    },

    render_font_preview(frm) {
        if (!frm.doc.font_family) return;



        const font = frm.doc.font_family;

        // Build preview HTML
        frm.fields_dict.font_preview.$wrapper.html(`
            <iframe srcdoc='
              <!doctype html>
              <html>
              <head>
              	<link type="text/css" rel="stylesheet" href="https://fonts.googleapis.com/css?family=${frm.doc.font_family}:300,400,500,600,700,800,900">

                <style>
                  body { margin:0; padding:16px; font-family:${font}; font-size:15px; line-height:1.5; }
                  h3 { margin-top:0; font-size:18px; }
                  .sample { border:1px solid #ddd; padding:12px; border-radius:6px; margin-bottom:12px; }
                  .mono { font-family: monospace; }
                </style>
              </head>
              <body>
                <h3>${font} Preview</h3>
                <div class="sample">
                  Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn<br>
                  0123456789 ! @ # $ % ^ & * ( )<br>
                  Customer Invoice #INV-2025-0914<br>
                  PO-3489 / Sales Order SO-1204<br>
                  Payment Received: $12,450.50 (via Stripe)<br>
                  <span class="mono">Item Code: PRD-XL-2025 @ Warehouse A1</span>
                </div>
                <div class="sample">
                  <strong>Dashboard</strong><br>
                  Customers · Suppliers · Items · Inventory · Accounting · HR<br>
                </div>
              </body>
              </html>
            ' style="width:100%;height:300px;border:0"></iframe>
        `);
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
