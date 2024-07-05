import React, { useRef, useEffect, useState } from "react";
import SidebarLogo from "./Logo";
import Navmenu from "./Navmenu";
import { menuItems as initialMenuItems} from "@/constant/data";
import SimpleBar from "simplebar-react";
import useSidebar from "@/hooks/useSidebar";
import useSemiDark from "@/hooks/useSemiDark";
import useSkin from "@/hooks/useSkin";
import svgRabitImage from "@/assets/images/svg/rabit.svg";
import { NavLink } from "react-router-dom";
import { getContent } from "../../../api/content";

const Sidebar = () => {
  const scrollableNodeRef = useRef();
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollableNodeRef.current.scrollTop > 0) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };
    scrollableNodeRef.current.addEventListener("scroll", handleScroll);
  }, [scrollableNodeRef]);

  const [collapsed, setMenuCollapsed] = useSidebar();
  const [menuHover, setMenuHover] = useState(false);
  const [menuItems, setMenuItems] = useState(initialMenuItems);

  // semi dark option
  const [isSemiDark] = useSemiDark();
  // skin
  const [skin] = useSkin();

  const fetchContent = async () => {
    try {
      const content = await getContent();
      const contentData = content?.data || [];

      const newChildItems = contentData.map(item => ({
        childtitle: item.content_title,
        childlink: `chat/${item.content_id}`, 
      }));

      const updatedMenuItems = menuItems.map(menuItem => {
        if (menuItem.title === "Courses") {
          return {
            ...menuItem,
            child: [...newChildItems],
          };
        }
        return menuItem;
      });

      setMenuItems(updatedMenuItems);
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };

  useEffect(() => { fetchContent() }, []);
  return (
    <div className={isSemiDark ? "dark" : ""}>
      <div
        className={`sidebar-wrapper bg-white dark:bg-slate-800     ${collapsed ? "w-[72px] close_sidebar" : "w-[248px]"
          }
      ${menuHover ? "sidebar-hovered" : ""}
      ${skin === "bordered"
            ? "border-r border-slate-200 dark:border-slate-700"
            : "shadow-base"
          }
      `}
        onMouseEnter={() => {
          setMenuHover(true);
        }}
        onMouseLeave={() => {
          setMenuHover(false);
        }}
      >
        <SidebarLogo menuHover={menuHover} />
        {/* create couse button */}
        <div
          className={`h-[60px] absolute top-[80px] nav-shadow z-[1] w-full transition-all duration-200 pl-4 ${collapsed ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
            }`}
        >
          <NavLink to="create/course">
            <button className="bg-blue-600 text-white rounded-md px-3 p-1">
              Create Course
            </button>
          </NavLink>
        </div>

        <div
          className={`h-[60px]  absolute top-[80px] nav-shadow z-[1] w-full transition-all duration-200 pointer-events-none ${scroll ? " opacity-100" : " opacity-0"
            }`}
        ></div>
        {/* create courses button */}
        {/* <button
        className="bg-blue-700 text-white"
        >
          Create Courses
        </button> */}

        <SimpleBar
          className="sidebar-menu px-4 h-[calc(100%-80px)]"
          scrollableNodeProps={{ ref: scrollableNodeRef }}
        >
          <Navmenu menus={menuItems} />
        </SimpleBar>
      </div>
    </div>
  );
};

export default Sidebar;
