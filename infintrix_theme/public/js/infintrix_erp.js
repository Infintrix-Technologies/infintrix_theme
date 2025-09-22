// $(document).ready(() => {
//   // Function to inject + button
//   function addQuickEntryButtons() {
//     document.querySelectorAll('.awesomplete').forEach(wrapper => {
//       const input = wrapper.querySelector('input[data-fieldtype="Link"]');
//       if (!input) return;

//       // Avoid adding duplicate buttons
//       if (wrapper.querySelector('.link-add-btn')) return;

//       // Create button
//       const btn = document.createElement('button');
//       btn.innerHTML = '+';
//       btn.type = 'button';
//       btn.className = 'link-add-btn btn btn-xs btn-default';
//       btn.style.marginLeft = '4px';

//       // Handle click -> open Quick Entry for the target doctype
//       btn.addEventListener('click', () => {
//         const doctype = input.getAttribute('data-target');
//         if (doctype) {
//           frappe.new_doc(doctype); // opens quick entry modal
//         }
//       });

//       // Insert button after input
//       wrapper.appendChild(btn);
//     });
//   }

//   // Run once at load
//   addQuickEntryButtons();

//   // Also re-run whenever forms/fields refresh
//   frappe.ui.form.on('*', {
//     refresh() {
//       console.log('Refreshing form - adding quick entry buttons if needed');
//       addQuickEntryButtons();
//     }
//   });
// });

$(document).ready(() => {
	function addFullscreenToggleButton() {
		const maximize_icon_svg =
			'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-maximize"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>';
		const minimize_icon_svg =
			'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minimize"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path></svg>';
		const fullscreenButton = document.createElement("li");
		fullscreenButton.id = "fullscreenToggleButton";
		fullscreenButton.innerHTML = maximize_icon_svg; // Use the SVG icon instead of text
		fullscreenButton.classList.add("nav-item", "toggle-fullscreen");

		fullscreenButton.style.color = "#fff";
		fullscreenButton.style.border = "none";
		fullscreenButton.style.cursor = "pointer";

		function tryAddingButton() {
			const navbarNav = document.querySelector(".dropdown-notifications");
			if (navbarNav) {
				if (!document.getElementById("fullscreenToggleButton")) {
					navbarNav.parentNode.insertBefore(fullscreenButton, navbarNav);
				}

				fullscreenButton.addEventListener("click", () => {
					if (!document.fullscreenElement) {
						document.documentElement
							.requestFullscreen()
							.then(() => {
								fullscreenButton.innerHTML = minimize_icon_svg;
							})
							.catch((err) => {
								console.error(
									`Error attempting to enable fullscreen mode: ${err.message}`
								);
							});
					} else {
						document
							.exitFullscreen()
							.then(() => {
								fullscreenButton.innerHTML = maximize_icon_svg;
							})
							.catch((err) => {
								console.error(
									`Error attempting to exit fullscreen mode: ${err.message}`
								);
							});
					}
				});
			} else {
				// Retry after a short delay if .navbar-nav is not available yet
				setTimeout(tryAddingButton, 500);
			}
		}

		tryAddingButton();
	}

	function getCurrentTheme() {
		return document.documentElement.getAttribute("data-theme") || "light";
	}
	function addThemeToggleButton() {
		const icon_svg = frappe.utils.icon("arrows");

		const currentTheme = getCurrentTheme();

		const moon_icon_svg =
			'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
		const sun_icon_svg =
			'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sun"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';

		const themeToggleButton = document.createElement("li");
		themeToggleButton.id = "themeToggleButton";
		themeToggleButton.innerHTML = currentTheme === "light" ? moon_icon_svg : sun_icon_svg;
		themeToggleButton.classList.add("nav-item", "toggle-theme");

		themeToggleButton.style.color = "#fff";
		themeToggleButton.style.border = "none";
		themeToggleButton.style.cursor = "pointer";

		function tryAddingButton() {
			const fullscreenButton = document.querySelector("#fullscreenToggleButton");
			if (fullscreenButton) {
				if (!document.getElementById("themeToggleButton")) {
					fullscreenButton.parentNode.insertBefore(
						themeToggleButton,
						fullscreenButton.nextSibling
					);
				}

				themeToggleButton.addEventListener("click", () => {
					const currentTheme = getCurrentTheme();
					console.log("Current theme:", currentTheme);
					const theme_to_switch = currentTheme === "light" ? "Dark" : "Light";
					frappe.call({
						method: "frappe.core.doctype.user.user.switch_theme",
						args: { theme: theme_to_switch },
						callback: function (response) {
							document.documentElement.setAttribute(
								"data-theme",
								theme_to_switch.toLowerCase()
							);
							themeToggleButton.innerHTML =
								theme_to_switch === "Light" ? moon_icon_svg : sun_icon_svg;
						},
						error: function (error) {
							console.error("Error switching theme:", error);
							frappe.msgprint(__("Failed to switch theme."));
						},
					});
				});
			} else {
				// Retry after a short delay if #fullscreenToggleButton is not available yet
				setTimeout(tryAddingButton, 500);
			}
		}

		tryAddingButton();
	}

	function addLanguageSwitchButton() {

		const currentTheme = getCurrentTheme();

		const icon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-globe"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>'

		const languageSwitchButton = document.createElement("li");
		languageSwitchButton.id = "languageSwitchButton";
		languageSwitchButton.innerHTML = icon;
		languageSwitchButton.classList.add("nav-item", "toggle-language");

		languageSwitchButton.style.color = "#fff";
		languageSwitchButton.style.border = "none";
		languageSwitchButton.style.cursor = "pointer";

		function tryAddingButton() {
			const fullscreenButton = document.querySelector("#fullscreenToggleButton");
			if (fullscreenButton) {
				if (!document.getElementById("languageSwitchButton")) {
					fullscreenButton.parentNode.insertBefore(
						languageSwitchButton,
						fullscreenButton.nextSibling
					);
				}

				languageSwitchButton.addEventListener("click", () => {
					frappe.call({
						method: "frappe.client.get_list",
						args: {
							doctype: "Language",
							fields: ["language_name"],
							limit_page_length: 0,
						},
						callback: function (response) {
							if (response.message) {
								const languages = response.message.map(lang => lang.language_name);

								frappe.prompt(
									[
										{
											label: __("Select Language"),
											fieldname: "language",
											fieldtype: "Select",
											options: languages,
											reqd: 1,
										},
									],
									(values) => {
										const selectedLanguage = values.language;
										console.log("Selected Language:", selectedLanguage);

										frappe.call({
											method: "frappe.core.doctype.user.user.set_language",
											args: { language: selectedLanguage },
											callback: function () {
												frappe.msgprint(__("Language switched to " + selectedLanguage));
												location.reload(); // Reload the page to apply the language change
											},
											error: function () {
												frappe.msgprint(__("Failed to switch language. Please ensure the method exists."));
											},
										});
									},
									__("Switch Language"),
									__("Submit")
								);
							} else {
								frappe.msgprint(__("No languages found."));
							}
						},
						error: function (error) {
							console.error("Error fetching languages:", error);
							frappe.msgprint(__("Failed to fetch languages."));
						},
					});
					// const currentTheme = getCurrentTheme();
					// console.log("Current theme:", currentTheme);
					// const theme_to_switch = currentTheme === "light" ? "Dark" : "Light";
					// frappe.call({
					// 	method: "frappe.core.doctype.user.user.switch_theme",
					// 	args: { theme: theme_to_switch },
					// 	callback: function (response) {
					// 		document.documentElement.setAttribute(
					// 			"data-theme",
					// 			theme_to_switch.toLowerCase()
					// 		);
					// 		themeToggleButton.innerHTML =
					// 			theme_to_switch === "Light" ? moon_icon_svg : sun_icon_svg;
					// 	},
					// 	error: function (error) {
					// 		console.error("Error switching theme:", error);
					// 		frappe.msgprint(__("Failed to switch theme."));
					// 	},
					// });
				});
			} else {
				// Retry after a short delay if #fullscreenToggleButton is not available yet
				setTimeout(tryAddingButton, 500);
			}
		}

		tryAddingButton();
	}

	addFullscreenToggleButton();
	addThemeToggleButton();
	addLanguageSwitchButton()
});
