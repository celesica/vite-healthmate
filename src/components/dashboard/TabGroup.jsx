import { Tab } from '@headlessui/react';
import { useState } from 'react';

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
                        'text-gray-600 text-sm font-medium leading-5 py-4 px-3 focus:outline-none focus:text-gray-800 focus:border-gray-400 transition-colors duration-300',
                        activeTab === 0 ? 'bg-gray-100 text-gray-800' : 'text-gray-500 hover:text-gray-800',
                        hoverTab === 0 && 'bg-gray-200',
                    )}
                    onClick={() => setActiveTab(0)}
                    onMouseEnter={() => setHoverTab(0)}
                    onMouseLeave={() => setHoverTab(null)}
                >
                    Tab 1
                </Tab>
                <Tab
                    className={classNames(
                        'text-gray-600 text-sm font-medium leading-5 py-4 px-3 focus:outline-none focus:text-gray-800 focus:border-gray-400 transition-colors duration-300',
                        activeTab === 1 ? 'bg-gray-100 text-gray-800' : 'text-gray-500 hover:text-gray-800',
                        hoverTab === 1 && 'bg-gray-200',
                    )}
                    onClick={() => setActiveTab(1)}
                    onMouseEnter={() => setHoverTab(1)}
                    onMouseLeave={() => setHoverTab(null)}
                >
                    Tab 2
                </Tab>
                <Tab
                    className={classNames(
                        'text-gray-600 text-sm font-medium leading-5 py-4 px-3 focus:outline-none focus:text-gray-800 focus:border-gray-400 transition-colors duration-300',
                        activeTab === 2 ? 'bg-gray-100 text-gray-800' : 'text-gray-500 hover:text-gray-800',
                        hoverTab === 2 && 'bg-gray-200',
                    )}
                    onClick={() => setActiveTab(2)}
                    onMouseEnter={() => setHoverTab(2)}
                    onMouseLeave={() => setHoverTab(null)}
                >
                    Tab 3
                </Tab>
            </Tab.List>
            <Tab.Panels className="mt-2">
                <Tab.Panel>
                    1
                </Tab.Panel>
                <Tab.Panel>
                    Content 2
                </Tab.Panel>
                <Tab.Panel>
                    Content 3
                </Tab.Panel>
            </Tab.Panels>
        </Tab.Group>
    );
};

export default MyTabs;
