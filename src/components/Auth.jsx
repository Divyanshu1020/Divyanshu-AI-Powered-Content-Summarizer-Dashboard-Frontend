import { Button } from "@/components/ui/button";
import {
    Card,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import React, { useState } from 'react';

export default function Auth({ setUser }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [key] = useState('users');

    const createUser = (e) => {
        e.preventDefault();
        try {
            const data = {
                "username": username,
                "password": password
            };
            const value = window.localStorage.getItem('users');
            if (value) {
                const array = JSON.parse(value);
                const updatedArray = [data, ...array,];
                window.localStorage.setItem(key, JSON.stringify(updatedArray));
            } else {

                window.localStorage.setItem(key, JSON.stringify([data]));
            }
        } catch (error) {
            alert(error);
        }

        setUser(username);
    };

    const login = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem('users'));
        console.log(users);
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            setUser(username);
        } else {
            alert("Invalid username or password");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">

            <Tabs defaultValue="account" className="w-[400px]">
                <TabsList className="w-full h-10">
                    <TabsTrigger className="w-full h-8 " value="account">Login</TabsTrigger>
                    <TabsTrigger className="w-full h-8" value="password">Create Account </TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                    <Card className=" p-5">
                        <form className=" flex flex-col gap-2 w-full max-w-sm text-start" onSubmit={login}>
                            <Label className="sm:text-lg">UserName</Label>
                            <Input onChange={(e) => setUsername(e.target.value)} value={username} type="text" placeholder="UserName" />
                            <Label className="sm:text-lg">Password</Label>
                            <Input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Password" />
                            <Button type="submit">login</Button>
                        </form>
                    </Card>
                </TabsContent>
                <TabsContent value="password">
                    <Card className=" p-5">
                        <form className=" flex flex-col gap-2 w-full max-w-sm text-start" onSubmit={createUser}>
                            <Label className="sm:text-lg">UserName</Label>
                            <Input onChange={(e) => setUsername(e.target.value)} value={username} type="text" placeholder="UserName" />
                            <Label className="sm:text-lg">Password</Label>
                            <Input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Password" />
                            <Button type="submit">submit</Button>
                        </form>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}

