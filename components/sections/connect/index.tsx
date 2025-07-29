'use client';
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import StorySectionWrapper from '../../../HOC/storySectionWrapper';

export default function ContactSection() {
  const t = useTranslations('contactSection');
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { name, email, message } = form;
    if (!name || !email || !message) {
      alert(t('alerts.fill'));
      return;
    }
    setSending(true);

    setTimeout(() => {
      alert(t('alerts.thankYou'));
      setForm({ name: '', email: '', message: '' });
      setSending(false);
    }, 1500);
  };

  return (
    <StorySectionWrapper sectionId={4} innerClassName="max-w-2xl mx-auto text-center px-4">
      <h2 className="font-serif text-3xl md:text-4xl lg:text-6xl font-light text-slate-900 dark:text-slate-100 mb-8 md:mb-12">
        {t('title')}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 mb-8 md:mb-12">
        <div>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            type="text"
            placeholder={t('placeholders.name')}
            className="w-full px-0 py-3 md:py-4 border-0 border-b border-slate-300 dark:border-slate-600 bg-transparent focus:border-slate-600 dark:focus:border-slate-400 focus:outline-none text-base md:text-lg placeholder-slate-400 dark:placeholder-slate-500 font-sans"
          />
        </div>
        <div>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            placeholder={t('placeholders.email')}
            className="w-full px-0 py-3 md:py-4 border-0 border-b border-slate-300 dark:border-slate-600 bg-transparent focus:border-slate-600 dark:focus:border-slate-400 focus:outline-none text-base md:text-lg placeholder-slate-400 dark:placeholder-slate-500 font-sans"
          />
        </div>
        <div>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder={t('placeholders.message')}
            rows={4}
            className="w-full px-0 py-3 md:py-4 border-0 border-b border-slate-300 dark:border-slate-600 bg-transparent focus:border-slate-600 dark:focus:border-slate-400 focus:outline-none text-base md:text-lg placeholder-slate-400 dark:placeholder-slate-500 resize-none font-sans"
          />
        </div>
        <button
          type="submit"
          disabled={sending}
          className="font-sans bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-6 md:px-8 py-3 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors duration-300 mt-6 md:mt-8"
        >
          {sending ? t('button.sending') : t('button.send')}
        </button>
      </form>

      <div className="w-12 h-0.5 bg-slate-400 dark:bg-slate-500 mx-auto" />
      <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm mt-6 md:mt-8 font-sans pb-8">
        {t('footer')}
      </p>
    </StorySectionWrapper>
  );
}
