import { useAuth } from '../context/AuthContext';

function ProfilePage() {
    const { currentUser, userData } = useAuth();
    console.log(currentUser);

    return (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center">
                <div className="rounded-full overflow-hidden h-32 w-32 bg-gray-200">
                    <img src={currentUser.photoURL} alt="Profile" className="h-32 w-32 object-cover" />
                </div>
                <div className="mt-4">
                    <h1 className="text-2xl font-bold">{currentUser.displayName}</h1>
                    <p className="mt-2 text-gray-600">{currentUser.email}</p>
                </div>
                <div className="mt-8 flex justify-center space-x-4">
                    <a href="#" className="text-gray-600 hover:text-gray-900">
                        Edit Name
                    </a>
                    <a href="#" className="text-gray-600 hover:text-gray-900">
                        Edit Email
                    </a>
                    <a href="#" className="text-gray-600 hover:text-gray-900">
                        Update Password
                    </a>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
