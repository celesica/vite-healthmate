import { Tab } from '@headlessui/react';
import React, { useState } from 'react';
import TodoContextProvider from "./TodoContext.jsx";
import TodoList from "./TodoList.jsx";

const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ');
};

const MyTabs = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [hoverTab, setHoverTab] = useState(null);

    return (
        <Tab.Group>
            <Tab.List className="flex border-b border-gray-20 bg-white">
                <Tab
                    className={classNames(
                        'p-4 text-darkTeal text-sm font-medium leading-5 py-4 px-3 focus:outline-none focus:text-gray-800 focus:border-gray-400 transition-colors duration-300',
                        activeTab === 0 ? 'bg-superLightTeal text-darkTeal' : 'text-darkTeal hover:text-gray-800',
                        hoverTab === 0 && 'bg-lightTeal',
                    )}
                    onClick={() => setActiveTab(0)}
                    onMouseEnter={() => setHoverTab(0)}
                    onMouseLeave={() => setHoverTab(null)}
                >
                    Goals This Week
                </Tab>
                <Tab
                    className={classNames(
                        'p-4 text-darkTeal text-sm font-medium leading-5 py-4 px-3 focus:outline-none focus:text-gray-800 focus:border-gray-400 transition-colors duration-300',
                        activeTab === 1 ? 'bg-superLightTeal text-darkTeal' : 'text-darkTeal hover:text-gray-800',
                        hoverTab === 1 && 'bg-lightTeal',
                    )}
                    onClick={() => setActiveTab(1)}
                    onMouseEnter={() => setHoverTab(1)}
                    onMouseLeave={() => setHoverTab(null)}
                >
                    Notes From Coach
                </Tab>
            </Tab.List>
            <Tab.Panels className="mt-2 p-4">
                <Tab.Panel>
                    <TodoContextProvider>
                        <TodoList />
                    </TodoContextProvider>
                </Tab.Panel>
                <Tab.Panel>
                    Root Cause Healthcare is a medical practice that focuses on the root cause of your health issues.
                </Tab.Panel>
            </Tab.Panels>
        </Tab.Group>
    );
};

export default MyTabs;
