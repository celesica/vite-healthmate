import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
    auth,} from '../config/firebase';
import { updateProfile } from 'firebase/auth';
import {ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { AiOutlineEdit } from 'react-icons/ai';
import { RiUserLine, RiImageAddLine } from 'react-icons/ri';
import LetterAvatar from 'react-lettered-avatar';
import  { useAppContext } from '../context/AppContext';

const EditDetails = () => {
    const { userData } = useAuth();
    const { state } = useAppContext();
    const currentUser = auth.currentUser;
    const [editEmail, setEditEmail] = useState(false);
    const [editName, setEditName] = useState(false);
    const [newEmail, setNewEmail] = useState(currentUser.email);
    const [newDisplayName, setNewDisplayName] = useState(currentUser.displayName);
    const [newProfilePicture, setNewProfilePicture] = useState(currentUser.photoURL);
    const [newPassword, setNewPassword] = useState('');


    const handleEmailEdit = () => {
        setEditEmail(!editEmail);
    };

    const handleEmailSave = async () => {
        try {
            const password = prompt('Please enter your password to confirm the email change:');
            if (password) {
                await reauthenticateWithPassword(currentUser.email, password);
                await updateUserEmail(newEmail);
                setEditEmail(false);
            } else {
                alert('No password provided. Email update failed.');
            }
        } catch (error) {
            console.error('Error updating email:', error);
        }
    };

    const handleEmailChange = (event) => {
        setNewEmail(event.target.value);
    };

    const handleNameEdit = () => {
        setEditName(!editName);
    };

    const handleDisplayNameChange = (event) => {
        setNewDisplayName(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setNewPassword(event.target.value);
    };


    const handleSaveDisplayName = async () => {
        try {
            await updateProfile(auth.currentUser, {
                displayName: newDisplayName,
                photoURL: currentUser.photoURL,
            });
        } catch (error) {
            console.error('Error updating display name:', error);
        }
    };

    const handleSaveProfilePicture = async () => {
        try {
            const profilePictureRef = ref(storage, 'profilePictures/' + currentUser.uid);
            const snapshot = await uploadBytes(profilePictureRef, newProfilePicture, 'data_url');
            const profilePictureURL = await getDownloadURL(snapshot.ref);
            await updateProfile(auth.currentUser, {
                displayName: currentUser.displayName,
                photoURL: profilePictureURL,
            });
        } catch (error) {
            console.error('Error updating profile picture:', error);
        }
    };

    const handleProfilePictureChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewProfilePicture(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpdatePassword = async () => {
        try {
            await auth.currentUser.updatePassword(newPassword);
            alert('Password updated successfully!');
        } catch (error) {
            console.error('Error updating password:', error);
        }
    };

    console.log(storage);


    return (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center">
                <div className="rounded-full overflow-hidden h-32 w-32 bg-gray-200">
                    {newProfilePicture ? (
                        <img src={currentUser.photoURL} alt="Profile"
                             className="h-full w-full object-cover"/>
                    ) : (
                        <LetterAvatar
                            name={newDisplayName || currentUser.displayName}
                            size={128}
                            color={state.randomColor}
                        />
                    )}
                </div>
                <div className="mt-4">
                    {editName ? (
                        <div className="flex items-center">
                            <input
                                type="text"
                                className="border rounded p-1 mr-2"
                                value={newDisplayName}
                                onChange={handleDisplayNameChange}
                            />
                            <RiUserLine
                                onClick={handleSaveDisplayName}
                                className="text-blue-500 cursor-pointer"
                            />
                        </div>
                    ) : (
                        <>
                            <h1 className="text-2xl font-bold">{currentUser.displayName}</h1>
                        </>
                    )}
                    {editEmail ? (
                        <div className="flex items-center mt-2">
                            <input
                                type="email"
                                className="border rounded p-1 mr-2"
                                value={newEmail}
                                onChange={handleEmailChange}
                            />
                            <AiOutlineEdit onClick={handleEmailSave} className="text-blue-500 cursor-pointer" />
                        </div>
                    ) : (
                        <p className="mt-2 text-gray-600">{currentUser.email}</p>
                    )}
                </div>
                <div className="mt-2">
                    <input
                        type="file"
                        className="mt-2"
                        onChange={handleProfilePictureChange}
                        accept="image/*"
                    />
                    <RiImageAddLine onClick={handleSaveProfilePicture} className="text-blue-500 cursor-pointer mt-2" />
                </div>
                <div className="mt-8 flex justify-center space-x-4">
                    <a href="#" className="text-gray-600 hover:text-gray-900" onClick={handleNameEdit}>
                        <AiOutlineEdit className="inline-block mr-1" /> Edit Name
                    </a>
                    <a href="#" className="text-gray-600 hover:text-gray-900" onClick={handleEmailEdit}>
                        {editEmail ? 'Cancel' : <AiOutlineEdit className="inline-block mr-1" />} Edit Email
                    </a>
                    <a href="#" className="text-gray-600 hover:text-gray-900" onClick={handleEmailEdit}>
                        {editEmail ? 'Cancel' : <AiOutlineEdit className="inline-block mr-1" />} Edit Password
                    </a>
                </div>
            </div>
        </div>
    );
};

export default EditDetails;