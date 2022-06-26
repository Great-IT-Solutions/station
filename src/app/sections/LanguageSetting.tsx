import { useTranslation } from "react-i18next"
import { Languages } from "config/lang"
import { RadioGroup } from "components/form"

const LanguageSetting = () => {
  const { i18n } = useTranslation()
console.log("language setting loaded")
  return (
    <RadioGroup
      options={Object.values(Languages)}
      value={i18n.language}
      onChange={(language) => i18n.changeLanguage(language)}
    />
  )
}

export default LanguageSetting
