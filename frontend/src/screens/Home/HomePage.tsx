import Navbar from "../../components/Navbarapi.ts";
const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto text-center py-10">
        <h2 className="text-3xl font-bold text-gray-800">Welcome to My Manga</h2>
        <p className="text-gray-600 mt-4">Explore thousands of manga now!</p>
      </div>
    </div>
  );
};

export default HomePage;

