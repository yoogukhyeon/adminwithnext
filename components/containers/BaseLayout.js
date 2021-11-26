import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { getAuth} from "firebase/auth";
import firbaseApp from "../../net/firebaseApp"
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import SignIn from '../views/SignIn';
import Loading from '../views/Loading'
import Link from 'next/link'
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

export default function BaseLayout({ children }) {
    const auth = getAuth(firbaseApp)
    const router = useRouter();
    const [loaded , setLoaded] = useState(false);
    const [credential , setCredential] = useState(null);


    useEffect(() => {
        auth.onAuthStateChanged(credential => {
            // TODO: 허용된 사용자만 로그인 유지 
            
            if(credential){
                switch(credential.email){
                    case "rnrgus5897@gmail.com":
                        setCredential(credential)
                        console.log('관리자로그인 성공')
                        break;
                    default:
                        alert('관리자만 로그인 할 수 있습니다.')
                }
            }else{
                setCredential(null)
            }
            setLoaded(true)
        })
    }, []);

    if(!loaded){
        return <Loading />;
    }

    if(!credential){
        return <SignIn />;
    }

  return (
    <Layout style={{minHeight: '100vh'}}>
    <Header className="header">
      <div className="logo" 
        style={{
          float : 'left',
          width: 120,
          height: 31,
          margin: '16px 24px 16px 0',
          background: 'rgba(255,255,255,0.3)'
        }}
      />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
        <Menu.Item key="sign-out" onClick={() => {
                
                if(!confirm('정말로 로그아웃 하실건가요?')){
                    return false
                }else{
                    auth.signOut();
                }
               
        }}>로그아웃</Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
        <Sider className="site-layout-background" width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%' }}
          >
            <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
            <Link href="/articles" passHref>
                <a style={{width: "100%"}}>
                <Menu.Item key="1">직원정보 CRUD</Menu.Item>
                </a>
            </Link>
               
             
            <Link href="/portfolios" passHref>
                <a style={{width: "100%"}}>
                <Menu.Item key="2">option2</Menu.Item>
                </a>
            </Link>
             
            <Link href="/" passHref>
                <a style={{width: "100%"}}>
                <Menu.Item key="3">option3</Menu.Item>
                </a>
            </Link>
              
              
              <Link href="/" passHref>
                <a style={{width: "100%"}}>
                <Menu.Item key="4">option4</Menu.Item>
                </a>
            </Link>
            

            </SubMenu>
          </Menu>
        </Sider>

        <Content style={{ padding: '0 24px', minHeight: 280 , background : '#fff' }}>

            {children}

        </Content>
        
      </Layout>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>
  )
}
