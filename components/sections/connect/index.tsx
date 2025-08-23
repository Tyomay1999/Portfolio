'use client';

import React, { useState, JSX } from 'react';
import axios from 'axios';
import { useTranslations } from 'next-intl';
import StorySectionWrapper from '@/HOC/storySectionWrapper';
import ContactIcons from '@/components/contact/contactIcons';
import { useToast } from '@/hooks/useToast';
import SelectListbox, { SelectOption } from './selectListBox';

type ContactForm = {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  contactType: string;
};

export default function ContactSection(): JSX.Element {
  const t = useTranslations('contactSection');
  const { showToast, ToastComponent } = useToast();

  const [form, setForm] = useState<ContactForm>({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    contactType: '',
  });

  const [touched, setTouched] = useState<Record<keyof ContactForm, boolean>>({
    name: false,
    lastName: false,
    email: false,
    phone: false,
    contactType: false,
  });

  const [sending, setSending] = useState<boolean>(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[+0-9\s()-]{6,20}$/;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (!touched[name as keyof ContactForm]) {
      setTouched(prev => ({ ...prev, [name]: true }));
    }
  };

  const hasError = (field: keyof ContactForm): boolean => {
    if (!touched[field]) return false;
    switch (field) {
      case 'name':
      case 'lastName':
        return form[field].trim() === '';
      case 'email':
        return !emailRegex.test(form.email);
      case 'phone':
        return !phoneRegex.test(form.phone);
      case 'contactType':
        return form.contactType.trim() === '';
      default:
        return false;
    }
  };
  const isFieldValid = (field: keyof ContactForm): boolean => touched[field] && !hasError(field);

  const inputClass = (field: keyof ContactForm): string => {
    if (hasError(field)) {
      return 'border-red-500 focus:border-red-600 dark:border-red-500 dark:focus:border-red-400';
    }
    if (isFieldValid(field)) {
      return 'border-green-500 focus:border-green-600 dark:border-green-500 dark:focus:border-green-400';
    }
    return 'border-slate-300 focus:border-slate-600 dark:border-slate-600 dark:focus:border-slate-400';
  };

  const isFormValid = (): boolean =>
    (Object.keys(form) as (keyof ContactForm)[]).every(k => form[k].trim() !== '' && !hasError(k));

  // options для селекта контактного типа
  const contactOptions: SelectOption[] = [
    { value: 'consulting', label: t('contactTypes.consulting') },
    { value: 'development', label: t('contactTypes.development') },
    { value: 'design', label: t('contactTypes.design') },
    { value: 'other', label: t('contactTypes.other') },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTouched({ name: true, lastName: true, email: true, phone: true, contactType: true });

    const errorFields = (Object.keys(form) as (keyof ContactForm)[]).filter(key => hasError(key));
    if (errorFields.length > 0) {
      showToast(t('fill') + ': ' + errorFields.map(key => t(`placeholders.${key}`)).join(', '));
      return;
    }

    const langPath = window.location.pathname.split('/')[1];
    const language = langPath === 'hy' ? 'am' : langPath;

    setSending(true);
    try {
      const res = await axios.post(process.env.NEXT_PUBLIC_CONTACT_API as string, {
        ...form,
        language,
      });
      if (res.status === 200 || res.status === 201) {
        showToast('thankYou');
        setForm({ name: '', lastName: '', email: '', phone: '', contactType: '' });
        setTouched({
          name: false,
          lastName: false,
          email: false,
          phone: false,
          contactType: false,
        });
      } else {
        showToast('error');
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        if (status === 409) showToast('emailExists');
        else if (status === 500) showToast('error');
        else showToast('networkError');
      } else {
        showToast('error');
      }
    } finally {
      setSending(false);
    }
  };

  return (
    <StorySectionWrapper sectionId={4} innerClassName="max-w-2xl mx-auto text-center px-4">
      <h2 className="mb-8 font-serif text-3xl font-light text-slate-900 dark:text-slate-100 md:mb-12 md:text-4xl lg:text-6xl">
        {t('title')}
      </h2>

      <form onSubmit={handleSubmit} className="mb-8 space-y-4 md:mb-12 md:space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            type="text"
            placeholder={t('placeholders.name')}
            className={`w-full border-0 border-b bg-transparent px-0 py-3 font-sans text-base placeholder-slate-400 focus:outline-none md:py-4 md:text-lg ${inputClass('name')}`}
          />
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            type="text"
            placeholder={t('placeholders.lastName')}
            className={`w-full border-0 border-b bg-transparent px-0 py-3 font-sans text-base placeholder-slate-400 focus:outline-none md:py-4 md:text-lg ${inputClass('lastName')}`}
          />
        </div>

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          type="email"
          placeholder={t('placeholders.email')}
          className={`w-full border-0 border-b bg-transparent px-0 py-3 font-sans text-base placeholder-slate-400 focus:outline-none md:py-4 md:text-lg ${inputClass('email')}`}
        />

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          type="tel"
          placeholder={t('placeholders.phone')}
          className={`w-full border-0 border-b bg-transparent px-0 py-3 font-sans text-base placeholder-slate-400 focus:outline-none md:py-4 md:text-lg ${inputClass('phone')}`}
        />

        {/* Кастомный селект вместо <select> */}
        <SelectListbox
          value={form.contactType || null}
          onChange={v => {
            setForm(prev => ({ ...prev, contactType: v }));
            if (!touched.contactType) setTouched(prev => ({ ...prev, contactType: true }));
          }}
          options={contactOptions}
          placeholder={t('placeholders.contactType')}
          disabled={sending}
          invalid={hasError('contactType')}
          className="mt-2"
        />

        <button
          type="submit"
          disabled={!isFormValid() || sending}
          className={`mt-6 rounded-lg px-6 py-3 font-sans transition-colors duration-300 md:mt-8 md:px-8 ${
            isFormValid()
              ? 'bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200'
              : 'cursor-not-allowed bg-slate-300 text-slate-500 dark:bg-slate-700 dark:text-slate-400'
          }`}
        >
          {sending ? t('button.sending') : t('button.send')}
        </button>
      </form>

      <ContactIcons />
      <div className="mx-auto h-0.5 w-12 bg-slate-400 dark:bg-slate-500" />
      <p className="mt-6 pb-8 font-sans text-xs text-slate-500 dark:text-slate-400 md:mt-8 md:text-sm">
        {t('footer')}
      </p>

      {ToastComponent}
    </StorySectionWrapper>
  );
}
