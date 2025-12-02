import React from 'react';

const Footers = () => {
    return (
        <footer className="footer-section bg-neutral-900 text-gray-400 py-10 text-xs">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-8 border-b border-gray-700 pb-8">
                    <div>
                        <h3 className="font-semibold text-gray-100 mb-2">Shop and Learn</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:underline">Store</a></li>
                            <li><a href="#" className="hover:underline">Mac</a></li>
                            <li><a href="#" className="hover:underline">iPad</a></li>
                            <li><a href="#" className="hover:underline">iPhone</a></li>
                            <li><a href="#" className="hover:underline">Watch</a></li>
                            <li><a href="#" className="hover:underline">Vision</a></li>
                            <li><a href="#" className="hover:underline">AirPods</a></li>
                            <li><a href="#" className="hover:underline">TV & Home</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-100 mb-2">Account</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:underline">Manage Your Apple ID</a></li>
                            <li><a href="#" className="hover:underline">Apple Store Account</a></li>
                            <li><a href="#" className="hover:underline">iCloud.com</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-100 mb-2">Entertainment</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:underline">Apple One</a></li>
                            <li><a href="#" className="hover:underline">Apple TV+</a></li>
                            <li><a href="#" className="hover:underline">Apple Music</a></li>
                            <li><a href="#" className="hover:underline">Apple Arcade</a></li>
                            <li><a href="#" className="hover:underline">Apple Fitness+</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-100 mb-2">Apple Values</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:underline">Accessibility</a></li>
                            <li><a href="#" className="hover:underline">Education</a></li>
                            <li><a href="#" className="hover:underline">Environment</a></li>
                            <li><a href="#" className="hover:underline">Inclusion and Diversity</a></li>
                            <li><a href="#" className="hover:underline">Privacy</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-100 mb-2">About Apple</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:underline">Newsroom</a></li>
                            <li><a href="#" className="hover:underline">Apple Leadership</a></li>
                            <li><a href="#" className="hover:underline">Career Opportunities</a></li>
                            <li><a href="#" className="hover:underline">Investors</a></li>
                            <li><a href="#" className="hover:underline">Ethics & Compliance</a></li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-4">
                    <div className="mb-4 md:mb-0">
                        <p>Copyright &copy; 2025 Apple Inc. All rights reserved.</p>
                    </div>
                    <div className="flex space-x-4">
                        <a href="#" className="hover:underline">Privacy Policy</a>
                        <span className="border-r border-gray-600"></span>
                        <a href="#" className="hover:underline">Terms of Use</a>
                        <span className="border-r border-gray-600"></span>
                        <a href="#" className="hover:underline">Sales and Refunds</a>
                        <span className="border-r border-gray-600"></span>
                        <a href="#" className="hover:underline">Legal</a>
                        <span className="border-r border-gray-600"></span>
                        <a href="#" className="hover:underline">Site Map</a>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <a href="#" className="hover:underline">United States</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footers;