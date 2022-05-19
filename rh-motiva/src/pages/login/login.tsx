import { useNavigate } from "react-router-dom"
import style from './login.module.scss'
import Mascote from '../../assets/images/mascote.svg'
import LogoImg from '../../assets/images/logo.svg'
import { Dashboard } from "../../containers/dashboard/dashboard"
import { Layout, Form, Input, Button, Checkbox} from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

export const LoginPage = () => {
    const navigate = useNavigate()

    const onSubmit = (values: any) => {
        console.log(values)
        navigate('/home')
    }

    return (
        <Layout className={style.container}>
            <Form className={style.form} onFinish={onSubmit}>
                <div className={style.logo}>
                    <img src={LogoImg} />
                </div>
                <Form.Item 
                    name="user" 
                    rules={[{ required: true, message: 'Digite o seu usuario.' }]}>
                    <Input 
                        prefix={<UserOutlined className="site-form-item-icon" />} 
                        placeholder="Username" />
                </Form.Item>
                <Form.Item 
                    name="password" 
                    rules={[{ required: true, message: 'Digite a sua senha.' }]}>
                    <Input 
                        prefix={<LockOutlined className="site-form-item-icon" />} 
                        type="password"
                        placeholder="Username" />
                </Form.Item>
                <Form.Item>
                    <Button 
                        type="primary" 
                        htmlType="submit" 
                        className={style.button}>
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        </Layout>
    )
}