import React from 'react';
import { Button } from './ui/button';

const Sidebar = ({
    setActiveState,
    activeState
}: any) => {

    const items = [
        {
            id: 1,
            title: "Profile",
        },
        {
            id: 2,
            title: "Account",
        }
    ]



    return (
        <div className='flex flex-col gap-4'>

            {items.map((item) => (
                <Button
                    key={item.id}
                    variant={'ghost'}
                    onClick={() => setActiveState(item.id)}
                    className={activeState === item.id ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline"}
                >
                    {item.title}
                </Button>
            ))}


            {/* <Button variant={'ghost'}>Overview</Button>
            <Button variant={'ghost'}>Logs</Button>
            <Button variant={'ghost'}></Button> */}

        </div>
    );
};

export default Sidebar;