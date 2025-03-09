import { useParams } from "react-router-dom";
export default function UserProfilePage() {
    const {userId} = useParams();
    const profiles = [1,2,3,4];
    if (!profiles.includes(Number(userId))) {
        throw new Error("Profile not found");
    }   
    return (
        <div>
            <h1>Profile</h1>
            <p>Profile {userId}</p>
        </div>
    )
}