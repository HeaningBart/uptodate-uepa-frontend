'use client';

import { useRef } from 'react'
import store from '@/store';
import { User } from '@/types';
import { setUser } from '@/store/userSlice';


export default function Preloader({ user }: { user: User }) {
    const loaded = useRef(false);
    if (!loaded.current) {
        store.dispatch(setUser(user));
        loaded.current = true
    }
    return null;
}