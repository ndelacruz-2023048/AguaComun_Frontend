import { Icon } from "@iconify/react/dist/iconify.js"
import { LinksButtonsHome } from "../../utils/dataEstatica"
import { NavLink } from "react-router"

export const HomeTemplate = () => {
  return (
    <div className='w-6/7'>
      {LinksButtonsHome.map(({ label, icon, to }) => (
          <div className="LinkContainer">

            <NavLink to={to} key={label} className={({ isActive }) => `Links${isActive ? " active" : ""}`}>
              <section>
                <Icon icon={icon} className="text-2xl" />
              </section>
            </NavLink>
          </div>
        ))}
    </div>
  )
}