export interface NavbarItem {
    name: string;
    path: string;
  }
  
  export const navbarItems = [
    { name: "Home", path: "/" },
    { name: "Manga", path: "/manga" },
    { name: "Profiles", path: "/profiles" },
    { name: "Login", path: "/auth/login" },
    { name: "Forum", path: "/forum" },
    { name: "Genre", path: "/genre" },
    { name: "Leaderboard", path: "/leaderboard" },
    { name: "Search", path: "/search" },
  ];