// ** Icon imports
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'

// ** Type import
import {VerticalNavItemsType} from 'src/@core/layouts/types'
import Dashboard from "../../pages";
import AccountSettings from "../../pages/account-settings";
import TypographyPage from "../../pages/typography";
import Icons from "../../pages/icons";
import CardBasic from "../../pages/cards";
import MUITable from "../../pages/tables";
import FormLayouts from "../../pages/form-layouts";

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/',
      component: Dashboard
    },
    {
      title: 'Account Settings',
      icon: AccountCogOutline,
      path: '/account-settings',
      component: AccountSettings
    },
    {
      sectionTitle: 'Pages'
    },
    {
      sectionTitle: 'User Interface'
    },
    {
      title: 'Typography',
      icon: FormatLetterCase,
      path: '/typography',
      component: TypographyPage
    },
    {
      title: 'Icons',
      path: '/icons',
      icon: GoogleCirclesExtended,
      component: Icons
    },
    {
      title: 'Cards',
      icon: CreditCardOutline,
      path: '/cards',
      component : CardBasic
    },
    {
      title: 'Tables',
      icon: Table,
      path: '/tables',
      component: MUITable
    },
    {
      icon: CubeOutline,
      title: 'Form Layouts',
      path: '/form-layouts',
      component: FormLayouts
    }
  ]
}

export default navigation
