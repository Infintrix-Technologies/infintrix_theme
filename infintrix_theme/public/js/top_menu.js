// --- Utility Functions ---

/**
 * Clears the content of the header container (#top_menu).
 */
function deleteNavbar() {
  const headerContainer = document.querySelector("#top_menu");
  if (headerContainer) {
    headerContainer.innerHTML = '';
  }
}

/**
 * Fetches the card and shortcut information for a given workspace name.
 * @param {string} name - The name of the workspace.
 * @returns {Promise<object|null>} The page info (cards, shortcuts) or null on error.
 */
async function getPageInfo(name) {
  try {
    const response = await frappe.call({
      method: "frappe.desk.desktop.get_desktop_page",
      args: {
        page: JSON.stringify({ name: name, title: name }),
      },
    });
    return response.message;
  } catch (error) {
    console.error("Error fetching desktop page info:", error);
    return null;
  }
}

/**
 * Fetches the module name associated with a given DocType.
 * @param {string} name - The name of the DocType.
 * @returns {Promise<string|null>} The module name or null.
 */
async function getModuleNameFromDoctype(name) {
  try {
    const response = await frappe.call({
      method: "infintrix_theme.api.get_module_name_from_doctype",
      args: {
        doc_name: name,
      },
    });
    // Assuming the API returns an array, and we need the 'module' property of the first item
    return response.message && response.message.length > 0
      ? response.message[0].module || null
      : null;
  } catch (error) {
    console.error("Error fetching module name from DocType:", error);
    return null;
  }
}

/**
 * Determines the client-side route (URL fragment) for a given workspace entry.
 * @param {object} entry - The workspace link or shortcut object.
 * @returns {string|null} The route string or null if not determined.
 */
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

// --- Navbar Generation and Rendering ---

/**
 * Generates the HTML string for the horizontal navbar based on workspace data.
 * @param {object} response - The workspace data containing shortcuts and cards.
 * @returns {string} The complete HTML string for the navbar.
 */
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


/**
 * Renders the generated navbar HTML into the #top_menu container.
 * @param {object} response - The workspace data.
 */
function renderNavbar(response) {
    const html = generateNavbar(response);
    const headerContainer = document.querySelector("#top_menu");

    if (headerContainer) {
        // Clear previous content and insert the new navbar
        headerContainer.innerHTML = '';
        headerContainer.innerHTML = html;
    }
}

// --- Router Change Listener for Navbar Update ---

frappe.router.on("change", async () => {
  deleteNavbar();
  const route = frappe.get_route();
  const [type, page] = route;

  // Only attempt to load navbar if it's an app view and not the main Workspaces page
  if (page && type !== "Workspaces") {
    try {
      // 1. Get the module name (the workspace name) from the current DocType/Page
      const page_to_pass = await getModuleNameFromDoctype(page);

      // 2. If we found a module name, fetch the content for that workspace
      if (page_to_pass) {
          const response = await getPageInfo(page_to_pass);

          // 3. Render the navbar if we have shortcuts or cards
          if (response && (response.shortcuts || response.cards)) {
              renderNavbar(response);
          }
      }
    } catch (error) {
      console.error("Error processing route change for Navbar:", error);
    }
  }
});

// --- Window Load Initialization ---

window.onload = async () => {

  // --- 1. Custom Sidebar Toggle Behavior ---

  // Disable default behavior of the sidebar toggle button
  // Using jQuery as it seems to be available in the Frappe/ERPNext environment
  // $('.page-title .sidebar-toggle-btn').off('click');

  // // Add custom behavior
  // $('.page-title .sidebar-toggle-btn').on('click', function (e) {
  //     e.preventDefault(); // Prevent default if any exists
  //     frappe.ui.toolbar.toggle_sidebar(true); // Re-use standard frappe toggle
  // });

  // --- 2. Workspace Dropdown Menu Creation ---
  

  let pages = [];
  try {
    const response = await frappe.call({
      method: "frappe.desk.desktop.get_workspace_sidebar_items",
    });
    pages = response?.message?.pages || [];
  } catch (error) {
    console.error("Error fetching workspace sidebar items:", error);
    // Proceed with empty pages array if fetch fails
  }

  // Create dropdown container
  const dropdownContainer = document.createElement("div");
  dropdownContainer.className = "infintrix-workspace-dropdown-container";

  // HTML structure with the button and menu wrapper
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
  if (brand && brand.parentNode) {
    brand.parentNode.insertBefore(dropdownContainer, brand);
  } else {
    console.warn("Navbar brand link not found, skipping workspace dropdown injection.");
    return; // Exit if necessary components aren't found
  }

  // References
  const bodyWrapper = document.querySelector("div#body");
  const top_menu = document.querySelector("#top_menu");
  const dropdownButton = dropdownContainer.querySelector("#dropdownButton");
  const dropdownMenu = dropdownContainer.querySelector("#dropdownMenu");
  const workspaceList = dropdownContainer.querySelector("#workspaceList");

  // Helper functions to open/close the menu and manage body scroll/blur
  const openMenu = () => {
    // Set display to 'flex' immediately so the element is visible for transition
    dropdownMenu.style.display = "flex";
    
    // Add 'open' class after a brief delay to trigger the CSS transform transition
    setTimeout(() => {
        dropdownMenu.classList.add('open'); 
    }, 10); 

    document.body.style.overflow = "hidden"; // Prevent background scrolling

    if (bodyWrapper) {
      bodyWrapper.style.filter = "blur(5px)";
    }
    if (top_menu) {
      top_menu.style.filter = "blur(5px)";
    }
  };

  const closeMenu = () => {
    // Remove 'open' class to trigger the CSS transform transition (slide out)
    dropdownMenu.classList.remove('open'); 

    // Use a timeout matching the CSS transition duration (0.4s) before setting display: none
    setTimeout(() => {
        dropdownMenu.style.display = "none";
        document.body.style.overflow = ""; // Restore scrolling
        if (bodyWrapper) {
          bodyWrapper.style.filter = "";
        }
        if (top_menu) {
          top_menu.style.filter = "";
        }
    }, 400); // 400ms matches the CSS transition duration

  };

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    // Check for the presence of the 'open' class
    if (dropdownMenu.classList.contains('open') && !dropdownContainer.contains(e.target)) {
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
    // Fallback to a default icon if page.icon is missing
    iconSpan.innerHTML = `<svg class="icon icon-md" aria-hidden="true"><use href="#icon-${page.icon || 'folder'}"></use></svg>`;
    li.prepend(iconSpan);

    li.onclick = () => {
      // Slugs route to the main workspace page
      const slug = page.name.toLowerCase().replace(/ /g, "-");
      frappe.set_route(slug);
      closeMenu();
    };
    workspaceList.appendChild(li);
  });

  // Event listener for the open button
  dropdownButton.addEventListener("click", (e) => {
    e.stopPropagation();
    // Check for the presence of the 'open' class
    if (dropdownMenu.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });
};