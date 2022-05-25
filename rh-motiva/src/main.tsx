import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LoginPage } from './pages/login/login'
import { HomePage } from './pages/home/home'
import { CandidatePage } from './pages/candidate/candidate'
import './assets/css/_resets.scss'
import './assets/css/_utils.scss'
import './assets/css/_variables.scss'
import "antd/dist/antd.css";
import { Dashboard } from './containers/dashboard/dashboard'
import { SchedulesPage } from './pages/schedules/schedules'

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/home" element={<Dashboard><HomePage /></Dashboard>} />
                <Route path="/schedules" element={<Dashboard><SchedulesPage /></Dashboard>} />
                <Route path="/candidate" element={<Dashboard><CandidatePage /></Dashboard>} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
)
