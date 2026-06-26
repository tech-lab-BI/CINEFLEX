import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { VscGithubInverted } from "react-icons/vsc";
import { SiKingstontechnology } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-800 text-gray-400">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>

            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  About Us
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Browse */}
          <div>
            <h3 className="text-white font-semibold mb-4">Browse</h3>

            <ul className="space-y-2 text-sm">
              <li>Movies</li>
              <li>TV Shows</li>
              <li>Trending</li>
              <li>Search History</li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-white font-semibold mb-4">Need Help?</h3>

            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  Help Center
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white">
                  Feedback
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-semibold mb-4">Connect With Us</h3>

            <div className="flex gap-4">
              <a href="#">
                <FaFacebook className="size-8 cursor-pointer hover:text-white" />
              </a>
              <a href="#">
                <FaSquareInstagram className="size-8 cursor-pointer hover:text-white" />
              </a>
              <a href="https://github.com/Syanx24/Cineflex">
                <VscGithubInverted className="size-8 cursor-pointer hover:text-white" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <p className="text-sm">
              © {new Date().getFullYear()} CineFlex. All Rights Reserved.
            </p>

            <div className="flex gap-4 mt-2 text-xs">
              <a href="#" className="hover:text-white">
                Terms of Use
              </a>

              <a href="#" className="hover:text-white">
                Privacy Policy
              </a>

              <a href="#" className="hover:text-white">
                FAQ
              </a>
            </div>
          </div>

          <div className="text-xs text-gray-500 text-center md:text-right">
            <p>Built with Tech 99</p>
            <SiKingstontechnology size={30} />
            <p>Movie data powered by TMDB API</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
