import { useEffect, useRef } from 'react';
import { Sidebar } from '../components/Sidebar';


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
  );
};

export default App;