import React from 'react';

const Footer = () => {
    return (
        <footer className="flex justify-center items-center p-4 bg-background text-accent">
            <div className="text-center">
                <p className="mb-2">© {new Date().getFullYear()} My Website. All rights reserved.</p>
                <nav>
                    <ul className="flex space-x-4">
                        <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
                        <li><a href="/terms" className="hover:underline">Terms of Service</a></li>
                    </ul>
                </nav>
            </div>
        </footer>
    );
};

export default Footer; 