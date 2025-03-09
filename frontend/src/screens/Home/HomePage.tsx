import { useEffect } from "react";
export default function HomePage(){
    useEffect(() => {
        console.log("HomePage is rendered");
      }, []);
    return (
        <div>
            <h1>Home Page</h1>
        </div>
    );
};