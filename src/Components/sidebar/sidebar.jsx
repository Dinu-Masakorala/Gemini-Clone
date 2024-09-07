// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from 'react'
import './sidebar.css'
import { assets } from '../../Assests/assets'
import { Context } from '../../context/context'


const Sidebar = () => {

    const [extended, setExtended] = useState(false)
    const { onSent, prevPrompts, setrecentPrompt, newChat } = useContext(Context)

    const loadPrompt = async (prompt) => {
        setrecentPrompt(prompt);
        await onSent(prompt);
    }
    return (
        <div className='sidebar'>
            <div className="top">
                <img onClick={() => setExtended(prev => !prev)} className='Menu' src={assets.menu_icon} alt='' />
                <div onClick={() => newChat()} className='New-Chat'>
                    <img src={assets.plus_icon} alt="" />
                    {extended ? <p>New Chat</p> : null}
                </div>
                {extended ?
                    <div className="recent">
                        <p className="recent-title">Recent</p>
                        {prevPrompts.map((item, index) => (
                            <div onClick={() => loadPrompt(item)} key={index} className="recent-entry">
                                <img src={assets.message_icon} alt="" />
                                <p>{item}...</p>
                            </div>
                        ))}
                    </div> : null}
            </div>
            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="" />
                    {extended ? <p>Help</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="" />
                    {extended ? <p>Activity</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="" />
                    {extended ? <p>Settings</p> : null}
                </div>
            </div>
        </div>
    )
}
export default Sidebar
