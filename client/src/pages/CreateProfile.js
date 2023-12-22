import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

function CreateProfile() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [anonymous, setAnonymous] = useState(false);

    const navigate = useNavigate();

    const { user, dispatch } = useAuthContext();

    const handleCreateProfile = async () => {

        // TEMP CODE:
        // handle empty values
        // handle this in backend
        if (!firstName || !lastName || !linkedin) {
            return;
        }
        
        const profile = {
            'firstName': firstName,
            'lastName': lastName,
            'linkedin': linkedin,
            'anonymous': anonymous,
            'created': true
        };

        fetch(`http://localhost:4000/api/profile/${user.profileId}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json' // Specify the content type as JSON
            },
            body: JSON.stringify(profile)
        })
        .then((res) => {
            if (!res.ok) {
                // Check if the response has JSON content
                if (res.headers.get('content-type')?.includes('application/json')) {
                    return res.json().then((errorData) => {
                        throw new Error(`${errorData.error}`);
                    });
                } else {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
            }

            // set user data
            dispatch({ type: 'CREATED' });
        })
        .catch((error) => {
            console.error(error.message);
        });
    }

    return (
        <>
        
            <div className="flex justify-center items-center w-full h-full bg-gray-100">
                <div className="flex flex-col justify-center items-center w-1/3 h-2/3 bg-white shadow-md gap-10">
                    <h1 className="text-black font-semibold text-2xl tracking-wide uppercase">Profile</h1>

                    <div className="flex flex-col gap-3">
                        <div className="flex flex-row gap-3">
                            <div className="flex flex-col gap-1">
                                <label className="text-medium">First Name</label>
                                <input 
                                    className="px-4 py-2 text-gray-800 bg-gray-100 rounded-full outline-none" 
                                    placeholder="John"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-medium">Last Name</label>
                                <input 
                                    className="px-4 py-2 text-gray-800 bg-gray-100 rounded-full outline-none" 
                                    placeholder="Doe"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </div>
                        <label className="text-medium">Linkedin</label>
                        <input 
                            className="px-4 py-2 text-gray-800 bg-gray-100 rounded-full outline-none" 
                            placeholder="https://www.linkedin.com/john-doe"
                            value={linkedin}
                            onChange={(e) => setLinkedin(e.target.value)}
                        />

                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" onChange={() => setAnonymous((prev) => !prev)} className="sr-only peer"/>
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Anonymous</span>
                        </label>
                    </div>
                    
                    <button 
                        className="bg-black px-12 py-2 rounded-full"
                        onClick={handleCreateProfile}
                    >
                        <h1 className="text-white">Create</h1>
                    </button>
                </div>
            </div>
        
        </>
    )
}

export default CreateProfile;