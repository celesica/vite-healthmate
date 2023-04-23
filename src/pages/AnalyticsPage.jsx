import React, { useState } from 'react';
import Sidenav from '../components/dashboard/Sidenav';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import {IoInformationCircle} from "react-icons/io5";
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

const Card = ({ onClick, title, content }) => {
    return (
        <div
            className="bg-white shadow-md p-6 rounded-lg cursor-pointer"
            onClick={onClick}
        >
            <h3 className="font-bold text-xl mb-2">{title}</h3>
            <p>{content}</p>
        </div>
    );
};

const AnalyticsPage = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', content: '' });

    const openModal = (title, content) => {
        setModalContent({ title, content });
        setModalIsOpen(true);
    };
    const closeModal = () => setModalIsOpen(false);

    const cards = [
        {
            title: 'Pillar Assessment Chart',
            content: 'Contains the health scores of Pillar Assessments'
        },
        {
            title: 'Card 2',
            content: 'Random text content for Card 2'
        },
        {
            title: 'Card 3',
            content: 'Random text content for Card 3'
        }
    ];

    return (
        <div className="flex h-screen p-5">
            <div className="navbar w-1/5 bg-darkTeal flex-shrink-0 min-h-full z-10 p-4 rounded-lg shadow-lg">
                <Sidenav />
            </div>
            <div className="main w-4/5 ml-auto py-4 px-8">
                <DashboardHeader title="Take Charge of Your Health!" />
                <div className="p-4 mb-4 text-lg text-darkTeal rounded-lg bg-superLightTeal dark:bg-gray-800 dark:text-blue-400 border-t-4 border-ownTeal flex items-start" role="alert">
                    <div className="flex-none">
                        <IoInformationCircle className="text-3xl text-ownTeal" />
                    </div>
                    <div className="flex-grow pl-4">
                        <p className="font-bold">This page contains a collection of all the evaluation and assessment forms</p>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4 w-full max-w-screen-lg">
                    {cards.map((card, i) => (
                        <Card
                            key={i}
                            title={card.title}
                            content={card.content}
                            onClick={() => openModal(card.title, card.content)}
                        />
                    ))}
                </div>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    className="fixed inset-0 flex items-center justify-center p-6 overflow-auto text-center align-middle transition-all transform bg-gray-500 bg-opacity-50"
                    overlayClassName="fixed inset-0 z-50 overflow-y-auto"
                >
                    <div className="inline-block w-11/12 md:max-w-3xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                        <h2 className="text-2xl font-bold mb-4">{modalContent.title}</h2>
                        <p>{modalContent.content}</p>
                        <button
                            className="mt-8 bg-blue-500 text-white px-4 py-2 rounded"
                            onClick={closeModal}
                        >
                            Close
                        </button>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default AnalyticsPage;
