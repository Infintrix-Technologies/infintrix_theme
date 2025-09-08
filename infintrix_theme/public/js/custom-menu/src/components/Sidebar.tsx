import React, { useState } from 'react';

// --- Icon Components --- //
// Using SVG components is a common and efficient practice in React
const LogoIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 17L12 22L22 17" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12L12 17L22 12" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const DashboardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const LayoutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>;

// --- Sub-components for clarity --- //

interface SidebarHeaderProps {
    onHide: () => void;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ onHide }) => (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4 sticky top-0 z-10 flex items-center justify-between">
        <a href="index.html" className="flex items-center gap-2">
            <LogoIcon />
            <span className="font-bold text-gray-900 dark:text-white text-xl">
                Trezo
            </span>
        </a>
        <button 
            type="button" 
            className="text-gray-500 hover:text-indigo-600 dark:hover:text-white transition-colors"
            onClick={onHide}
        >
            <CloseIcon />
        </button>
    </div>
);

interface NavSectionTitleProps {
    title: string;
}

const NavSectionTitle: React.FC<NavSectionTitleProps> = ({ title }) => (
    <span className="block font-medium uppercase text-gray-400 dark:text-gray-500 mb-2 text-xs px-4">
        {title}
    </span>
);

const NavLink: React.FC<{ href: string; children: React.ReactNode; active?: boolean }> = ({ href, children, active = false }) => (
    <li>
        <a 
            href={href} 
            className={`flex items-center p-2 text-sm rounded-md transition-all font-medium w-full text-left
                ${active 
                    ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400' 
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                }`
            }
        >
            {children}
        </a>
    </li>
);

interface AccordionItemProps {
    icon?: React.ReactNode;
    title: string;
    badge?: string | null;
    children?: React.ReactNode;
    defaultOpen?: boolean;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ icon, title, badge, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="mb-1">
            <button 
                className="flex items-center w-full text-left p-2 text-sm rounded-md font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                onClick={() => setIsOpen(!isOpen)}
            >
                {icon && <span className="mr-2 text-gray-500 dark:text-gray-400">{icon}</span>}
                <span className="flex-grow">{title}</span>
                {badge && (
                     <span className="ml-auto text-xs font-semibold text-center px-2 py-0.5 rounded-full bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400">
                        {badge}
                    </span>
                )}
            </button>
            {isOpen && (
                <div className="pt-1 pl-5">
                    <ul className="space-y-1 border-l border-gray-200 dark:border-gray-700 ml-2">
                       <div className="pl-4 mt-1 space-y-1">
                         {children}
                       </div>
                    </ul>
                </div>
            )}
        </div>
    );
};


// --- Main Sidebar Component --- //

const Sidebar = () => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    
    // In a real app, this data would likely come from a config file or API
    const dashboardLinks = [
        { href: 'index.html', label: 'eCommerce', active: true },
        { href: 'crm-index.html', label: 'CRM' },
        { href: 'project-management-index.html', label: 'Project Management' },
        { href: 'lms-index.html', label: 'LMS' },
        { href: 'helpdesk-index.html', label: 'HelpDesk', tag: 'Hot' },
    ];
    
    const layoutLinks = [
        { href: 'https://...', label: 'Dark Mode' },
        { href: 'https://...', label: 'Sidebar Dark' },
    ];

    if (!isSidebarVisible) {
        return (
            <button 
                onClick={() => setIsSidebarVisible(true)}
                className="fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-md shadow-lg"
            >
                {/* A simple hamburger icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            </button>
        );
    }
    
    return (
        <aside className="bg-white dark:bg-gray-900 fixed top-0 h-screen w-64 z-20 transition-transform transform rounded-r-md shadow-lg flex flex-col">
            <SidebarHeader onHide={() => setIsSidebarVisible(false)} />
            
            <div className="flex-grow overflow-y-auto p-4 space-y-6">
                <nav className="space-y-4">
                    <div>
                        <NavSectionTitle title="Main" />
                        <AccordionItem icon={<DashboardIcon />} title="Dashboard" badge="30" defaultOpen>
                            {dashboardLinks.map(link => (
                                <NavLink key={link.href} href={link.href} active={link.active}>
                                    {link.label}
                                    {link.tag && <span className="ml-auto text-[10px] font-medium py-0.5 px-2 bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400 rounded-sm">{link.tag}</span>}
                                </NavLink>
                            ))}
                        </AccordionItem>
                    </div>

                    <div>
                         <AccordionItem icon={<LayoutIcon />} title="Layout" badge={null}>
                            {layoutLinks.map(link => (
                                <NavLink key={link.href} href={link.href}>
                                    {link.label}
                                </NavLink>
                            ))}
                        </AccordionItem>
                    </div>

                    {/* Add other sections similarly */}
                    <div>
                        <NavSectionTitle title="Apps & Pages" />
                        {/* ... more NavLink and AccordionItem components */}
                    </div>
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;
