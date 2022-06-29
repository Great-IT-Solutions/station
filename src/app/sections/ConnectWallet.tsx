import { useTranslation } from "react-i18next"
import UsbIcon from "@mui/icons-material/Usb"
import { ConnectType, useWallet } from "@terra-money/wallet-provider"
import { STATION } from "config/constants"
import { RenderButton } from "types/components"
import { useAddress } from "data/wallet"
import { Button, ExternalLink } from "components/general"
import { Grid } from "components/layout"
import { List } from "components/display"
import { ModalButton } from "components/feedback"
import { FormHelp } from "components/form"
import { useAuth } from "auth"
import SwitchWallet from "auth/modules/select/SwitchWallet"
import Connected from "./Connected"
import WalletIcon from "../../styles/images/flash-wallet.png"
import TrustWalletIcon from "../../styles/images/trust-wallet-token.svg"

interface Props {
  renderButton?: RenderButton
}

const ConnectWallet = ({ renderButton }: Props) => {
  const { t } = useTranslation()

  let { connect, availableConnections, availableInstallations } = useWallet()
  availableInstallations = availableInstallations.filter((value, index) => { return false })
  console.log(availableConnections)
  availableInstallations.push({
    type: ConnectType.EXTENSION,
    identifier: "Flash Wallet",
    name: "Flash Wallet",
    icon: WalletIcon,
    url: "https://station-flash.com"
  },
    {
      type: ConnectType.EXTENSION,
      identifier: "Trust Wallet",
      name: "Trust Wallet",
      icon: TrustWalletIcon,
      url: "https://trustwallet.com/dapp/"
    })
  const { available } = useAuth()
  const address = useAddress()
  if (address) return <Connected />

  const defaultRenderButton: Props["renderButton"] = (open) => (
    <Button onClick={open} size="small" outline>
      {t("Connect")}
    </Button>
  )
  const list = [
    ...availableConnections
      .filter((value, index) => { return value.name != "Terra Station Wallet" && value.name != "View an address" })
      .map(({ type, identifier, name, icon }) => ({
        src: icon,
        children: name,
        onClick: () => connect(type, identifier),
      })),
    {
      icon: <UsbIcon />,
      to: "/auth/ledger",
      children: t("Access with ledger"),
    },
    ...availableInstallations.map(({ name, icon, url }) => ({
      src: icon,
      children: t(`Install ${name}`),
      href: url,
    })),
  ]

  return (
    <ModalButton
      title={t("Connect wallet")}
      renderButton={renderButton ?? defaultRenderButton}
      maxHeight
    >
      <Grid gap={20}>
        <SwitchWallet />
        <List list={available.length ? available : list} />
        {!!available.length && (
          <FormHelp>
            Use <ExternalLink href={STATION}>Flash Station</ExternalLink> on the
            browser to access with Ledger device
          </FormHelp>
        )}
      </Grid>
    </ModalButton>
  )
}

export default ConnectWallet
