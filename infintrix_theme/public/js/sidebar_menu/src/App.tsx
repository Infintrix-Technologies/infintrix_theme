import { useEffect, useRef } from 'react';
import { Sidebar } from './components/Sidebar';


// ---------------- MAIN APP COMPONENT ----------------
const App = () => {

  // const [activeMenu, setActiveMenu] = useState<string>('');
  // const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const mainSectionRef = useRef<HTMLDivElement | null>(null);

  // ---------------- ICON MAP ----------------
  // const iconMap: { [key: string]: string } = {
  //   "retail": "fa-shopping-bag",
  //   "sort": "fa-sort",
  //   "getting-started": "fa-home",
  //   "accounting": "fa-calculator",
  //   "buying": "fa-shopping-cart",
  //   "sell": "fa-tags",
  //   "stock": "fa-warehouse",
  //   "assets": "fa-boxes",
  //   "organization": "fa-industry",
  //   "quality": "fa-award",
  //   "project": "fa-tasks",
  //   "support": "fa-life-ring",
  //   "users": "fa-users",
  //   "website": "fa-globe",
  //   "crm": "fa-address-book",
  //   "tool": "fa-toolbox",
  //   "setting": "fa-cog",
  //   "integration": "fa-link"
  // };

  // ---------------- COMPUTED ----------------
  // const topLevelPages = pages.filter((page: IPage) => page.parent_page === "");

  // ---------------- METHODS ----------------
  // const setActive = async (name: string) => {
  //   // setIsCollapsed(false);
  //   const slug = name.toLowerCase().replace(/ /g, "-");
  //   console.log("Navigating to:", slug);
  //   setActiveMenu(slug);
  //   // await renderRightSidebar(name);
  //   // if (frappe && frappe.set_route) {
  //   //   frappe.set_route(slug);
  //   // }
  // };

  // const toggleSidebar = () => {
  //   setIsCollapsed(prevState => !prevState);
  // };

  

  useEffect(() => {
    const handleResize = () => {
      if (mainSectionRef.current) {
        mainSectionRef.current.style.minHeight = `${innerHeight}px`;
      }
    };
    addEventListener('resize', handleResize);
    handleResize(); // Initial call
    return () => removeEventListener('resize', handleResize);
  }, []);

  return (
    <Sidebar />
    //  <div className="flex h-screen box-border font-sans antialiased" style={{ '--navbar-dark-primary': '#18283b', '--navbar-dark-secondary': '#2c3e50', '--navbar-light-primary': '#f5f6fa', '--navbar-light-secondary': '#8392a5', '--background': '#9c88ff' } as React.CSSProperties}>
    //   {/* LEFT SIDEBAR */}
    //   <aside className="w-[80px] bg-[var(--navbar-dark-primary)] flex flex-col items-center py-4 text-[var(--navbar-light-primary)] flex-shrink-0 box-border">
    //     <div className={`w-[50px] h-[50px] my-[10px] flex items-center justify-center text-xl text-[var(--navbar-light-secondary)] rounded-xl cursor-pointer transition-all duration-300 ease-in-out user-select-none ${isCollapsed ? 'rotate-180' : ''} hover:bg-[rgba(245,246,250,0.95)] hover:text-[var(--navbar-dark-primary)] hover:-translate-y-[1px]` } onClick={toggleSidebar}>
    //       <i className="fas fa-chevron-left"></i>
    //     </div>
    //     {pages.map((page: IPage) => (
    //       <div
    //         key={page.name}
    //         className={`w-[50px] h-[50px] my-[10px] flex items-center justify-center text-2xl text-[var(--navbar-light-secondary)] rounded-xl cursor-pointer transition-all duration-300 ease-in-out user-select-none hover:bg-[rgba(245,246,250,0.95)] hover:text-[var(--navbar-dark-primary)] hover:-translate-y-[1px] ${activeMenu === page.name ? 'bg-[var(--navbar-light-primary)] text-[var(--navbar-dark-primary)] scale-108' : ''}`}
    //         onClick={() => setActive(page.name)}
    //       >
    //         <i className={`fas ${iconMap[page.icon || ''] || 'fa-question-circle'}`}></i>
    //       </div>
    //     ))}
    //   </aside>

    //   {/* RIGHT SIDEBAR */}
    //   <aside className={`w-[280px] bg-[var(--navbar-dark-secondary)] text-[var(--navbar-light-primary)] flex flex-col p-4 transition-all duration-300 ease-in-out flex-shrink-0 overflow-x-hidden box-border ${isCollapsed ? 'w-0 p-0 opacity-0 pointer-events-none' : ''}`}>
    //       <div className="flex flex-col gap-2 flex-grow whitespace-nowrap box-border">
    //     <ul>
    //       {(subpages_query?.data?.cards?.items || []).map((card: ICard, idx: number) => {
    //         const [isExpanded, setIsExpanded] = useState(false);

    //         return (
    //       <li key={idx} className="mb-4">
    //         <h4
    //           className="text-[1.05rem] font-semibold mb-2 cursor-pointer"
    //           onClick={() => setIsExpanded(!isExpanded)}
    //         >
    //           {card.label}
    //           <span className="ml-2 text-sm">
    //         {isExpanded ? '▲' : '▼'}
    //           </span>
    //         </h4>
    //         {isExpanded && (
    //           <ul>
    //         {card.links && card.links.map((link: ILink, linkIdx: number) => (
    //           <li key={linkIdx}>
    //             <a
    //           href="#"
    //           className="text-[var(--navbar-light-secondary)] text-[0.95rem] py-2 px-3 rounded-lg transition-all duration-300 ease-in-out inline-block hover:bg-[var(--navbar-light-primary)] hover:text-[var(--navbar-dark-primary)] hover:translate-x-1"
    //             >
    //           {link.label}
    //             </a>
    //           </li>
    //         ))}
    //           </ul>
    //         )}
    //       </li>
    //         );
    //       })}
    //     </ul>
    //       </div>
    //   </aside>

    // </div>
  );
};

export default App;