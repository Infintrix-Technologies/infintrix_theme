const { createApp, ref } = Vue;


const App = {
  setup() {
    const menuOpen = ref(false);
    const toggleMenu = () => (menuOpen.value = !menuOpen.value);
    return { menuOpen, toggleMenu };
  },
  template: `
    <div>
      <!-- Floating Button -->
      <button 
        @click="toggleMenu" 
        class="menu-button"
      >
        <span v-if="!menuOpen">☰</span>
        <span v-else>✕</span>
      </button>

      <!-- Fullscreen Menu -->
      <transition name="fade">
        <div v-if="menuOpen" class="menu-overlay">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Services</a>
          <a href="#">Contact</a>
        </div>
      </transition>
    </div>
  `
};

// Add CSS directly
const style = document.createElement("style");
style.textContent = `
  body {
    margin: 0;
    font-family: Arial, sans-serif;
  }
  .menu-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: none;
    background: #2563eb;
    color: white;
    font-size: 24px;
    cursor: pointer;
    transition: background 0.3s ease;
    z-index: 1001;
  }
  .menu-button:hover {
    background: #1d4ed8;
  }
  .menu-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.95);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    font-size: 2rem;
    color: white;
    z-index: 1000;
  }
  /* Transition */
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
`;
document.head.appendChild(style);

// createApp(App).mount("#infintrixerp-menu");



// frappe.router.render = function () {
//     if (this.current_route[0]) {
//         this.render_page();
//     } else {
//         // Show our menu page
//         frappe.set_route(['app', 'infintrixerp']);
//     }
// }

// frappe.templates["page"] = `
// <div class="page-head flex">
// 	<div class="container">
// 		<div class="row flex align-center page-head-content justify-between">
// 			<div class="col-md-4 col-sm-6 col-xs-7 page-title">
// 				<!-- <div class="title-image hide hidden-md hidden-lg"></div> -->
// 				<!-- title -->
// 				<button class="btn-reset sidebar-toggle-btn">
// 					<svg class="es-icon icon-md sidebar-toggle-placeholder">
// 						<use href="#es-line-align-justify"></use>
// 					</svg>
// 					<span class="sidebar-toggle-icon">
// 						<svg class="es-icon icon-md">
// 							<use href="#es-line-sidebar-collapse">
// 							</use>
// 						</svg>
// 					</span>
// 				</button>
// 				<button class="btn-reset menu-open-btn hide-side-section">
// 					<svg class="es-icon icon-md sidebar-toggle-placeholder">
// 						<use href="#es-line-align-justify"></use>
// 					</svg>
// 				</button>
// 				<div class="flex fill-width title-area">
// 					<div>
// 						<div class="flex">
// 							<h3 class="ellipsis title-text"></h3>
// 							<span class="indicator-pill whitespace-nowrap"></span>
// 						</div>
// 						<div class="ellipsis sub-heading hide text-muted"></div>
// 					</div>
// 					<button class="btn btn-default more-button hide">
// 						<svg class="icon icon-sm">
// 							<use href="#icon-dot-horizontal">
// 							</use>
// 						</svg>
// 					</button>
// 				</div>
// 			</div>
// 			<div class="flex col page-actions justify-content-end">
// 				<!-- buttons -->
// 				<div class="custom-actions hide hidden-xs hidden-md"></div>
// 				<div class="standard-actions flex">
// 					<span class="page-icon-group hide hidden-xs hidden-sm"></span>
// 					<div class="menu-btn-group hide">
// 						<button type="button" class="btn btn-default icon-btn" data-toggle="dropdown" aria-expanded="false" aria-label="{{ __("Menu") }}">
// 							<span>
// 								<span class="menu-btn-group-label">
// 									<svg class="icon icon-sm">
// 										<use href="#icon-dot-horizontal">
// 										</use>
// 									</svg>
// 								</span>
// 							</span>
// 						</button>
// 						<ul class="dropdown-menu dropdown-menu-right" role="menu"></ul>
// 					</div>
// 					<button class="btn btn-secondary btn-default btn-sm hide"></button>
// 					<div class="actions-btn-group hide">
// 						<button type="button" class="btn btn-primary btn-sm" data-toggle="dropdown" aria-expanded="false">
// 							<span>
// 								<span class="hidden-xs actions-btn-group-label">{%= __("Actions") %}</span>
// 								<svg class="icon icon-xs">
// 									<use href="#icon-select">
// 									</use>
// 								</svg>
// 							</span>
// 						</button>
// 						<ul class="dropdown-menu dropdown-menu-right" role="menu">
// 						</ul>
// 					</div>
// 					<button class="btn btn-primary btn-sm hide primary-action"></button>
// 				</div>
// 			</div>
// 		</div>
// 	</div>
// </div>
// <div class="container page-body">
// 	<div class="page-toolbar hide">
// 		<div class="container">
// 		</div>
// 	</div>
// 	<div class="page-wrapper">
// 		<div class="page-content">
// 			<div class="workflow-button-area btn-group pull-right hide"></div>
// 			<div class="clearfix"></div>
// 		</div>
// 	</div>
// </div>
// `;


// frappe.ui.Page = class CustomPage extends frappe.ui.Page{
// 	constructor(opts){
// 		super(opts);
// 	}

// 	make() {
// 		// Call parent's make and setup whatever it must
// 		super.make();
// 		// As an extra add our menu button action
// 		this.setup_menupage_view();
// 	}

// 	setup_menupage_view(){
// 		let menupage_view = $(".page-head").find(".menu-open-btn");
// 		menupage_view.click(() => {
// 			frappe.set_route(['app', 'infintrixerp']);
// 		});
// 	}
// }


// frappe.views.Workspace = class CustomWorkspace extends frappe.views.Workspace {
//     constructor(wrapper) {
//         super(wrapper);
//     }
//     show() {
//         // hide side bar for particular view
//         if (frappe.router?.current_route &&
//             frappe.router.current_route.length > 1 &&
//             frappe.router.current_route[0].toLowerCase() === "workspaces") {
//             // side bar
//             let elements = document.querySelectorAll('.layout-side-section');
//             elements.forEach(element => {
//                 if (element) element.classList.add('hide-side-section');
//             });

//             // Toggle button
//             let elements2 = document.querySelectorAll('div[data-page-route]:not([data-page-route="menu"]) .sidebar-toggle-btn');
//             elements2.forEach(element2 => {
//                 if (element2) element2.classList.add('hide-side-section');
//             });

//             // button to navigate to menu
//             let elements3 = document.querySelectorAll('div[data-page-route]:not([data-page-route="menu"]) .menu-open-btn');
//             elements3.forEach(element3 => {
//                 if (element3) element3.classList.remove('hide-side-section');
//             });
//         } else {
//             // side bar
//             let elements = document.querySelectorAll('.layout-side-section');
//             elements.forEach(element => {
//                 if (element) element.classList.remove('hide-side-section');
//             });

//             // Toggle button
//             let elements2 = document.querySelectorAll('div[data-page-route]:not([data-page-route="menu"]) .sidebar-toggle-btn');
//             elements2.forEach(element2 => {
//                 if (element2) element2.classList.remove('hide-side-section');
//             });

//             // button to navigate to menu
//             let elements3 = document.querySelectorAll('div[data-page-route]:not([data-page-route="menu"]) .menu-open-btn');
//             elements3.forEach(element3 => {
//                 if (element3) element3.classList.add('hide-side-section');
//             });
//         }

//         // call the parent's show
//         super.show();
//     }
// }


