
$(document).ready(() => {
  // Function to inject + button
  function addQuickEntryButtons() {
    document.querySelectorAll('.awesomplete').forEach(wrapper => {
      const input = wrapper.querySelector('input[data-fieldtype="Link"]');
      if (!input) return;

      // Avoid adding duplicate buttons
      if (wrapper.querySelector('.link-add-btn')) return;

      // Create button
      const btn = document.createElement('button');
      btn.innerHTML = '+';
      btn.type = 'button';
      btn.className = 'link-add-btn btn btn-xs btn-default';
      btn.style.marginLeft = '4px';

      // Handle click -> open Quick Entry for the target doctype
      btn.addEventListener('click', () => {
        const doctype = input.getAttribute('data-target');
        if (doctype) {
          frappe.new_doc(doctype); // opens quick entry modal
        }
      });

      // Insert button after input
      wrapper.appendChild(btn);
    });
  }

  // Run once at load
  addQuickEntryButtons();

  // Also re-run whenever forms/fields refresh
  frappe.ui.form.on('*', {
    refresh() {
      console.log('Refreshing form - adding quick entry buttons if needed');
      addQuickEntryButtons();
    }
  });
});
