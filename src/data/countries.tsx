import React from 'react';
import { CountryData } from '../components/inputs/CountryFlagSelector';

// --- SVG Flag Components ---
const NigeriaFlag = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="18" viewBox="0 0 3 2"><rect width="3" height="2" fill="#fff"/><rect width="1" height="2" fill="#008751"/><rect x="2" width="1" height="2" fill="#008751"/></svg> );
const USFlag = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="18" viewBox="0 0 780 400" ><path fill="#b22234" d="M0 0h780v400H0z"/><path fill="#fff" d="M0 40h780v40H0zm0 80h780v40H0zm0 80h780v40H0zm0 80h780v40H0z"/><path fill="#3c3b6e" d="M0 0h390v240H0z"/><g fill="#fff"><g id="s18"><g id="s9"><path id="s" d="M24 0l5 18-14-11h18z"/><use href="#s" x="48"/><use href="#s" x="96"/><use href="#s" x="144"/><use href="#s" x="192"/><use href="#s" x="240"/></g><use href="#s9" y="48"/></g><use href="#s18" y="96"/><use href="#s18" y="192"/></g></svg> );
const UKFlag = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="18" viewBox="0 0 60 30" ><clipPath id="a"><path d="M0 0v30h60V0z"/></clipPath><clipPath id="b"><path d="M30 15h30v15zn-30-15h-30v-15z"/></clipPath><g clipPath="url(#a)"><path d="M0 0v30h60V0z" fill="#012169"/><path d="M0 0l60 30m-60 0L60 0" stroke="#fff" strokeWidth="6"/><path d="M0 0l60 30m-60 0L60 0" clipPath="url(#b)" stroke="#c8102e" strokeWidth="4"/><path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10"/><path d="M30 0v30M0 15h60" stroke="#c8102e" strokeWidth="6"/></g></svg> );

export const countriesWithFlags: readonly CountryData[] = [
  { name: 'Nigeria', code: '+234', flag: <NigeriaFlag /> },
  { name: 'United States', code: '+1', flag: <USFlag /> },
  { name: 'United Kingdom', code: '+44', flag: <UKFlag /> },
];