import React from 'react';
import { FaHistory } from "react-icons/fa";
import { Button } from './ui/button';
import History from './History';

export default function Navbar({ logout, user }) {
    return (
        <nav className=' py-4  '>
            <div className=' mx-auto flex flex-row justify-between items-center'>
                <a href="#" className=' text-xl font-bold flex flex-row '>
                    AI Summarizer
                </a>
                <div className='flex flex-row items-center gap-7'>
                    <History user={user} />
                    
                    <Button onClick={() => logout()}>Logout</Button>
                </div>
            </div>
        </nav>
    )
}
