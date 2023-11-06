'use client';

import { useEffect } from "react";

export default function Reload() {



    useEffect(() => {

        window.location.href = '/search'

    }, [])

    return <></>

}