import { useState } from "react";
// import { ChevronDown } from "lucide-react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);


    // window.frappe.call({
    //     method: "frappe.desk.desktop.get_desktop_page",
    //     type: "POST",
    //     args: {
    //         page:{"name":"Quality","title":"Quality"}
    //     },
    //     // success: function (r) { },
    //     // error: function (r) { },
    //     // always: function (r) { },
    //     // btn: opts.btn,
    //     // freeze: false,
    //     // freeze_message: "",
    //     // async: true,
    //     // url: "" || frappe.request.url,
    // });

    return (
        <nav className="bg-white shadow-md px-0 py-2">
            <div className="container mx-auto flex justify-start items-center">
                {/* Logo */}
                {/* <div className="text-xl font-bold text-gray-800">MyBrand</div> */}

                {/* Links */}
                <ul className="flex items-center space-x-6">
                    <li>
                        <a href="#" className="text-gray-700 hover:text-black">
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="#" className="text-gray-700 hover:text-black">
                            About
                        </a>
                    </li>

                    {/* Dropdown */}
                    <li className="relative">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="flex items-center text-gray-700 hover:text-black focus:outline-none"
                        >
                            Services {/* <ChevronDown size={18} className="ml-1" /> */}
                        </button>

                        {isOpen && (
                            <ul className="absolute mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-999999999">
                                <li>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    >
                                        Web Development
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    >
                                        App Development
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    >
                                        SEO Optimization
                                    </a>
                                </li>
                            </ul>
                        )}
                    </li>

                    <li>
                        <a
                            href="#"
                            className="text-gray-700 hover:text-black transition"
                        >
                            Contact
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
