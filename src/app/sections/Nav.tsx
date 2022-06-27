import { useEffect } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { useRecoilState, useSetRecoilState } from "recoil"
import classNames from "classnames/bind"
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"
import { mobileIsMenuOpenState } from "components/layout"
import { useNav } from "../routes"
import styles from "./Nav.module.scss"
import LogoImage from "styles/images/flash-logo.png"
import { useTranslation } from "react-i18next"
import { ExternalLink } from "components/general"

const cx = classNames.bind(styles)

const Nav = () => {
  useCloseMenuOnNavigate()
  const { menu } = useNav()
  const [isOpen, setIsOpen] = useRecoilState(mobileIsMenuOpenState)
  const toggle = () => setIsOpen(!isOpen)
  const { t } = useTranslation()

  return (
    <nav>
      <header className={styles.header}>
        <NavLink to="/" className={classNames(styles.item, styles.logo)}>
          <img src={LogoImage} alt={t("Logo")}></img>
          <strong>Flash</strong>Station
        </NavLink>

        <button className={styles.toggle} onClick={toggle}>
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </header>

      {menu.map(({ path, pathname, title, icon }) => (
        !pathname ? <NavLink
          to={path}
          className={({ isActive }) =>
            cx(styles.item, styles.link, { active: isActive })
          }
          key={path}
        >
          {icon}
          {title}
        </NavLink> :
          <a
            href={pathname}
            className={
              cx(styles.item, styles.link)
            }
            key={path} target="_blank"
          >
            {icon}
            {title}
          </a>
      ))}
    </nav>
  )
}

export default Nav

/* hooks */
const useCloseMenuOnNavigate = () => {
  const { pathname } = useLocation()
  const setIsOpen = useSetRecoilState(mobileIsMenuOpenState)

  useEffect(() => {
    setIsOpen(false)
  }, [pathname, setIsOpen])
}
