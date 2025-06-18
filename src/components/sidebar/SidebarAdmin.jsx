import { NavLink } from "react-router"
import {LinksArraySidebarAdmin} from "../../utils/dataEstatica"
import { Icon } from '@iconify/react/dist/iconify.js'

export const SidebarAdmin = () => {
  return (
    <section className="w-1/7 bg-gray-50 p-4">
      {LinksArraySidebarAdmin.map(({ label, icon, to }) => (
        <div key={to} className="mb-2">
          <NavLink 
            to={to} 
            className={({ isActive }) => 
              `flex items-center p-2 rounded-lg ${isActive ? "bg-[#E8F0F2] text-black" : "hover:bg-gray-200"}`
            }>
            <Icon icon={icon} className="text-2xl mr-3" />
            <span>{label}</span>
          </NavLink>
        </div>
      ))}
    </section>
  )
}