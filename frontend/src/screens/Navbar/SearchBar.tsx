const SearchBar = () => {
  return (
    <div className="hidden lg:block w-full max-w-md">
      <input 
        type="text" 
        placeholder="Hôm nay Người đẹp muốn đọc gì..." 
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
      />
    </div>
  );
};

export default SearchBar;
