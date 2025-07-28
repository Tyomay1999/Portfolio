'use client';
import React, { useState } from 'react';
import StorySectionWrapper from '../../../HOC/storySectionWrapper';
import clsx from 'clsx';

export default function ContactSection() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [sending, setSending] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, message } = form;
        if (!name || !email || !message) {
            alert('Please fill in all fields.');
            return;
        }
        setSending(true);

        setTimeout(() => {
            alert("Thank you for your message! I'll get back to you soon.");
            setForm({ name: '', email: '', message: '' });
            setSending(false);
        }, 1500);
    };

    return (
        <StorySectionWrapper sectionId={4} innerClassName="max-w-2xl mx-auto text-center px-4">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-6xl font-light text-slate-900 dark:text-slate-100 mb-8 md:mb-12">
                Let's Connect
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 mb-8 md:mb-12">
                <div>
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        type="text"
                        placeholder="Your Name"
                        className="w-full px-0 py-3 md:py-4 border-0 border-b border-slate-300 dark:border-slate-600 bg-transparent focus:border-slate-600 dark:focus:border-slate-400 focus:outline-none text-base md:text-lg placeholder-slate-400 dark:placeholder-slate-500 font-sans"
                    />
                </div>
                <div>
                    <input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        type="email"
                        placeholder="Your Email"
                        className="w-full px-0 py-3 md:py-4 border-0 border-b border-slate-300 dark:border-slate-600 bg-transparent focus:border-slate-600 dark:focus:border-slate-400 focus:outline-none text-base md:text-lg placeholder-slate-400 dark:placeholder-slate-500 font-sans"
                    />
                </div>
                <div>
          <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="4"
              className="w-full px-0 py-3 md:py-4 border-0 border-b border-slate-300 dark:border-slate-600 bg-transparent focus:border-slate-600 dark:focus:border-slate-400 focus:outline-none text-base md:text-lg placeholder-slate-400 dark:placeholder-slate-500 resize-none font-sans"
          />
                </div>
                <button
                    type="submit"
                    disabled={sending}
                    className="font-sans bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-6 md:px-8 py-3 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors duration-300 mt-6 md:mt-8"
                >
                    {sending ? 'Sending...' : 'Send Message'}
                </button>
            </form>

            <div className="flex justify-center space-x-6 md:space-x-8 mb-8 md:mb-12">
                {[
                    { href: '#', icon: 'M24 4.557c-...' }, // Twitter
                    { href: '#', icon: 'M20.447 20.452h...' }, // LinkedIn
                    { href: '#', icon: 'M12 0c-6.626 0-...' }  // GitHub
                ].map((item, i) => (
                    <a
                        key={i}
                        href={item.href}
                        className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors duration-300"
                    >
                        <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d={item.icon} />
                        </svg>
                    </a>
                ))}
            </div>

            <div className="w-12 h-0.5 bg-slate-400 dark:bg-slate-500 mx-auto"></div>
            <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm mt-6 md:mt-8 font-sans pb-8">
                © 2024 Davit. All rights reserved.
            </p>
        </StorySectionWrapper>
    );
}
