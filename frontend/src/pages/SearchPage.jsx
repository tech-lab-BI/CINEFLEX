import { useState } from "react";
import { useContentStore } from "../store/content";
import Navbar from "../components/Navbar";
import { Search } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { ORIGINAL_IMG_BASE_URL } from "../utils/constants";
import { Link } from "react-router-dom";

const SearchPage = () => {
  const [activeTab, setActiveTab] = useState("movie");
  const [searchTerm, setSearchTerm] = useState("");

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const [recentSearches, setRecentSearches] = useState(
    JSON.parse(localStorage.getItem("recentSearches")) || [],
  );
  const { setContentType } = useContentStore();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    tab === "movie" ? setContentType("movie") : setContentType("tv");
    setResults([]);
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchTerm.trim()) {
      toast.error("Please enter a search term");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.get(`/api/v1/search/${activeTab}/${searchTerm}`);

      setResults(res.data.content);

      const updatedSearches = [
        searchTerm,
        ...recentSearches.filter(
          (item) => item.toLowerCase() !== searchTerm.toLowerCase(),
        ),
      ].slice(0, 5);

      setRecentSearches(updatedSearches);

      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
    } catch (error) {
      if (error.response?.status === 404) {
        toast.error("Nothing found, try another search");
      } else {
        toast.error("An error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center gap-3 mb-4">
          <button
            className={`py-2 px-4 rounded ${
              activeTab === "movie" ? "bg-red-600" : "bg-gray-800"
            } hover:bg-red-700`}
            onClick={() => handleTabClick("movie")}
          >
            Movies
          </button>
          <button
            className={`py-2 px-4 rounded ${
              activeTab === "tv" ? "bg-red-600" : "bg-gray-800"
            } hover:bg-red-700`}
            onClick={() => handleTabClick("tv")}
          >
            TV Shows
          </button>
          <button
            className={`py-2 px-4 rounded ${
              activeTab === "person" ? "bg-red-600" : "bg-gray-800"
            } hover:bg-red-700`}
            onClick={() => handleTabClick("person")}
          >
            Person
          </button>
        </div>

        <form
          className="flex gap-2 items-stretch mb-8 max-w-2xl mx-auto"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={"Search for a " + activeTab}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
          <button className="bg-red-600 hover:bg-red-700 text-white p-2 rounded">
            <Search className="size-6" />
          </button>
        </form>

        {recentSearches.length > 0 && (
          <div className="max-w-2xl mx-auto mb-6">
            <h3 className="text-gray-400 mb-2">Recent Searches</h3>

            <div className="flex flex-wrap gap-2">
              {recentSearches.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSearchTerm(item)}
                  className="bg-gray-800 px-3 py-1 rounded-full text-sm hover:bg-red-600 transition"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        {loading && (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          </div>
        )}

        {results.length > 0 && (
          <p className="text-gray-400 mb-4">Found {results.length} results</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map((result) => {
            if (!result.poster_path && !result.profile_path) return null;

            return (
              <div
                key={result.id}
                className="bg-gray-800 p-4 rounded transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/20"
              >
                {activeTab === "person" ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={ORIGINAL_IMG_BASE_URL + result.profile_path}
                      alt={result.name}
                      className="max-h-96 rounded mx-auto"
                    />
                    <h2 className="mt-2 text-xl font-bold">{result.name}</h2>
                  </div>
                ) : (
                  <Link
                    to={"/watch/" + result.id}
                    onClick={() => {
                      setContentType(activeTab);
                    }}
                  >
                    <img
                      src={ORIGINAL_IMG_BASE_URL + result.poster_path}
                      alt={result.title || result.name}
                      className="w-full h-auto rounded"
                    />
                    <h2 className="mt-2 text-xl font-bold">
                      {result.title || result.name}
                    </h2>
                    <div className="flex justify-between mt-2 text-sm text-gray-400">
                      <span>⭐ {result.vote_average?.toFixed(1) || "N/A"}</span>

                      <span>
                        {(
                          result.release_date ||
                          result.first_air_date ||
                          ""
                        ).slice(0, 4)}
                      </span>
                    </div>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default SearchPage;
