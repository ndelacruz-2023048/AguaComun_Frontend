import { NavLink } from "react-router"
import {LinksArraySidebarAdmin} from "../../utils/dataEstatica"
import { Icon } from '@iconify/react/dist/iconify.js'
export const SidebarAdmin = () => {
  

  return (
    <section className="w-1/7">
      {
        LinksArraySidebarAdmin.map(({ label, icon, to }) => (
          <div className="LinkContainer">

            <NavLink to={to} key={label} className={({ isActive }) => `Links${isActive ? " active" : ""}`}>
              <section>
                <Icon icon={icon} className="text-2xl" />
              </section>
            </NavLink>
          </div>
        ))
      }
    </section>
  )
}
