import headerStyle from './header.module.scss'
import {
  UserOutlined,
} from '@ant-design/icons';

export default function HeaderComp() {
  return (
    <div className={headerStyle.header}>
      <div className={headerStyle.logo}></div>
      <div className={headerStyle.menu}>数据管理平台</div>
      <UserOutlined className={headerStyle.account}/>
    </div>
  )
}
