import { useNavigate } from "react-router-dom"
import style from './login.module.scss'
import LogoImg from '../../assets/images/logo.svg'
import { Layout, Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons'

const username = 'admin'
const password = 'admin'

export const LoginPage = () => {
    const navigate = useNavigate()

    const onSubmit = (values: any) => {
        if (values.user === username && values.password === password) {
            navigate('/home')
        } else {
            alert('Usuário ou senha incorretos')
        }
    }

    return (
        <Layout className={style.container}>
            <Form className={style.form} onFinish={onSubmit}>
                <div className={style.logo}>
                    <img src={LogoImg} />
                </div>
                <Form.Item
                    name="user" rules={[{ required: true, message: 'Digite o seu usuario' }]}>
                    <Input prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="Username" />
                </Form.Item>

                <Form.Item name="password" rules={[{ required: true, message: 'Digite a sua senha' }]}>
                    <Input prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password" placeholder="Password" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className={style.button}>
                        Log in <LoginOutlined />
                    </Button>
                </Form.Item>
            </Form>
        </Layout>
    )
}