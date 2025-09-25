function deleteNavbar() {
	const headerContainer = document.querySelector("#top_menu");
	if (headerContainer) {
		headerContainer.innerHTML = '';
	}
}
async function getPageInfo(name) {
	const response = await frappe.call({
		method: "frappe.desk.desktop.get_desktop_page",
		args: {
			page: JSON.stringify({ name: name, title: name }),
		},
	});
	return response.message;
}
async function getModuleNameFromDoctype(name) {
	const response = await frappe.call({
		method: "infintrix_theme.api.get_module_name_from_doctype",
		args: {
			doc_name: name,
		},
	});
	return response.message[0].module || null;
}

function getAppRoute(entry) {
  // Handle Workspace Link
  if (entry.doctype === "Workspace Link") {
    switch (entry.link_type) {
      case "DocType":
        return "/app/" + frappe.router.slug(entry.link_to);
      case "Report":
        return "/app/query-report/" + entry.link_to;
      case "Dashboard":
        return "/app/dashboard/" + entry.link_to;
      case "Route":
        return entry.link_to;
      default:
        return null;
    }
  }

  // Handle Workspace Shortcut
  if (entry.doctype === "Workspace Shortcut") {
    switch (entry.type) {
      case "DocType":
        let base = "/app/" + frappe.router.slug(entry.link_to);
        if (entry.doc_view) {
          return `${base}/view/${frappe.router.slug(entry.doc_view)}`;
        }
        return base;
      case "Report":
        return "/app/query-report/" + entry.link_to;
      case "Dashboard":
        return "/app/dashboard/" + entry.link_to;
      case "Page":
        return "/app/" + frappe.router.slug(entry.link_to);
      case "URL":
        return entry.url || null;
      default:
        return null;
    }
  }

  return null;
}

function generateNavbar(response) {
    // Note: All styling, including z-index for submenu visibility,
    // is handled by the 'infintrix-navbar.css' file.
    let html = `<nav class="infintrix-navbar">
  <ul class="infintrix-navbar-menu">\n`;

    // 1. Create the "Shortcuts" parent menu
    if (response.shortcuts && response.shortcuts.items && response.shortcuts.items.length > 0) {
        html += '    <li class="infintrix-navbar-item">\n';
        html += '      <a class="infintrix-navbar-link">Shortcuts</a>\n';
        html += '      <ul class="infintrix-navbar-submenu">\n';

        response.shortcuts.items.forEach((shortcut) => {
            const href = getAppRoute(shortcut) || '#';
            html += `        <li class="infintrix-navbar-item"><a class="infintrix-navbar-link" href="${href}">${shortcut.label}</a></li>\n`;
        });

        html += "      </ul>\n    </li>\n";
    }

    // 2. Create parent menus from the cards data
    if (response.cards && response.cards.items) {
        response.cards.items.forEach((card) => {
            if (card.type === "Card Break" && card.links && card.links.length > 0) {
                html += '    <li class="infintrix-navbar-item">\n';
                html += `      <a class="infintrix-navbar-link">${card.label}</a>\n`;
                html += '      <ul class="infintrix-navbar-submenu">\n';

                card.links.forEach((link) => {
                    const href = getAppRoute(link) || '#';
                    html += `        <li class="infintrix-navbar-item"><a class="infintrix-navbar-link" href="${href}">${link.label}</a></li>\n`;
                });

                html += "      </ul>\n    </li>\n";
            }
        });
    }

    html += "  </ul>\n</nav>";
    return html;
}


function renderNavbar(response) {
    const html = generateNavbar(response);
    const headerContainer = document.querySelector("#top_menu");

    if (headerContainer) {
        // Clear previous content and insert the new navbar
        headerContainer.innerHTML = '';
        headerContainer.innerHTML = html;
    }
}

frappe.router.on("change", async () => {
    deleteNavbar();
	const [type, page, name] = frappe.get_route();
	if (page && type !== "Workspaces") {
		page_to_pass = await getModuleNameFromDoctype(page);
        const response = await getPageInfo(page_to_pass);
        if (response.shortcuts || response.cards) {
            renderNavbar(response);
        }
	}
});

window.onload = async () => {

  // $('.page-title .sidebar-toggle-btn').off('click');

  //   // Add your custom behavior
  //   $('.page-title .sidebar-toggle-btn').on('click', function (e) {
  //       e.preventDefault(); // stop any default link behavior if present
  //       console.log("Custom sidebar toggle clicked!");

  //       // Example: custom toggle logic
  //       $('#my-sidebar').toggleClass('open');
  //   });



	const response = await frappe.call({
		method: "frappe.desk.desktop.get_workspace_sidebar_items",
	});
	const pages = response?.message?.pages || [];
	// Create dropdown container
	const dropdownContainer = document.createElement("div");
	dropdownContainer.className = "infintrix-workspace-dropdown-container";

	// HTML structure with the close button and prefixed classes
	dropdownContainer.innerHTML = `
    <button id="dropdownButton" class="infintrix-dropdown-button" aria-label="Toggle workspaces menu">
     <svg class="icon icon-md infintrix-workspace-menu-icon" aria-hidden="true"><use href="#icon-image-view"></use></svg>
    </button>
    <div class="infintrix-dropdown-menu" id="dropdownMenu">
      <ul id="workspaceList"></ul>
    </div>
  `;

	// Insert before the brand link
	const brand = document.querySelector("a.navbar-brand.navbar-home");
	brand.parentNode.insertBefore(dropdownContainer, brand);

	// References
	const bodyWrapper = document.querySelector("div#body");
    const top_menu = document.querySelector("#top_menu");
	const dropdownButton = dropdownContainer.querySelector("#dropdownButton");
	const dropdownMenu = dropdownContainer.querySelector("#dropdownMenu");
	const workspaceList = dropdownContainer.querySelector("#workspaceList");

	// Helper functions to open/close the menu and manage body scroll
	const openMenu = () => {
		dropdownMenu.style.display = "flex";
		document.body.style.overflow = "hidden";

		if (bodyWrapper) {
			bodyWrapper.style.filter = "blur(5px)";
		}
        if (top_menu) {
            top_menu.style.filter = "blur(5px)";
        }
	};

	const closeMenu = () => {
		dropdownMenu.style.display = "none";
		document.body.style.overflow = "";
		if (bodyWrapper) {
			bodyWrapper.style.filter = "";
		}
        if (top_menu) {
            top_menu.style.filter = "";
        }
	};

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
        if (!dropdownContainer.contains(e.target)) {
            closeMenu();
        }
    });

	// Populate list items
	pages.forEach((page) => {
		const li = document.createElement("li");
		li.className = "infintrix-dropdown-item";
		li.textContent = page.title;

		const iconSpan = document.createElement("span");
		iconSpan.className = "infintrix-dropdown-item-icon";
		iconSpan.innerHTML = `<svg class="icon icon-md" aria-hidden="true"><use href="#icon-${page.icon}"></use></svg>`;
		li.prepend(iconSpan);

		li.onclick = () => {
			const slug = page.name.toLowerCase().replace(/ /g, "-");
			frappe.set_route(slug);
			closeMenu();
		};
		workspaceList.appendChild(li);
	});

	// Event listener for the open button
	dropdownButton.addEventListener("click", (e) => {
		e.stopPropagation();
		if (dropdownMenu.style.display === "flex") {
			closeMenu();
		} else {
			openMenu();
		}
	});
};
