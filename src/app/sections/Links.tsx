import { useTranslation } from "react-i18next"
import DescriptionIcon from "@mui/icons-material/Description"
import { TUTORIAL } from "config/constants"
import { ExternalLink } from "components/general"
import { Contacts } from "components/layout"
import styles from "./Links.module.scss"

const community = {
  linktree: "https://linktr.ee/FlashTechnologies",
  website: "https://www.instagram.com/flash_token_off/",
  // medium: "https://linktr.ee/FlashTechnologies",
  discord: "https://discord.com/invite/kkGDbGtTFz",
  telegram: "https://t.me/flashtokenenglish",
  twitter: "https://twitter.com/Flash_Techno_Of",
  github: "https://github.com/FlashTechnologiesOff",
}

const Links = () => {
  const { t } = useTranslation()

  return (
    <div className={styles.links}>
      <div className={styles.tutorial}>
        <ExternalLink href={TUTORIAL} className={styles.link}>
          <DescriptionIcon style={{ fontSize: 18 }} />
          {t("Tutorial")}
        </ExternalLink>
      </div>

      <div className={styles.community}>
        <Contacts contacts={community} menu />
      </div>
    </div>
  )
}

export default Links
