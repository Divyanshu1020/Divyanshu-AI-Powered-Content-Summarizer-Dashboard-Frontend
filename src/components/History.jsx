import React, { useState } from 'react'
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { FaHistory } from "react-icons/fa"


export default function History({user}) {
    const [userhistory, setUserHistory] = useState([])
    const getUserHistory = () => {
        try {
            const userhistoryfromlocalstorage = JSON.parse(localStorage.getItem(`user-${user}-history`) || '[]');
            console.log(userhistoryfromlocalstorage);
            setUserHistory(userhistoryfromlocalstorage); // Set directly as an array
        } catch (error) {
            alert("Something went wrong");
            console.error(error);
        }
    };

    return (

        <Sheet>
            <SheetTrigger>
                <FaHistory onClick={()=>getUserHistory()}  size={20} className=' my-auto cursor-pointer' />
            </SheetTrigger>
            <SheetContent className = 'pt-12 flex flex-col gap-4 '>

                {userhistory.length > 0  ? userhistory.map((history, index) => (
                    <Card key={index} className=" cursor-pointer">
                        <CardHeader>
                            <CardTitle>{history.timestamp}</CardTitle>
                            <CardDescription className=" line-clamp-3 text-clip overflow-hidden ">{history.title}</CardDescription>
                        </CardHeader>
                    </Card>
                )):(
                    <p className='text-center'>No history found</p>
                )}

                
            </SheetContent>
        </Sheet>

    )
}
