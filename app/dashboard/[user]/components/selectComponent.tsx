'use client';

import { useEffect, useState } from "react";

export default function SelectComponent({ data, onChange, value }: { data: { ID: string, name: string, slug: string }[], onChange: (data: { ID: string, name: string, slug: string }) => void, value?: { ID: string, name: string, slug: string } }) {
    const [select, setSelect] = useState<{ ID: string, name: string, slug: string } | undefined>(value)
    const [openList, setOpentList] = useState(false)
    const handleClick = () => {
        setOpentList(!openList)
    }

    useEffect(() => {
        if (select !== undefined) onChange(select);
        else onChange({
            "ID": "0000000-0000-0000-0000000",
            "name": "vide",
            "slug": "vide"
        })
    }, [select?.name])

    return (
        <div className="relative">
            <input onClick={handleClick} type="text" className="h-[42px] border rounded-md w-full px-3 shadow-sm disabled:bg-white" value={select === undefined ? 'Sélectionnez la rubrique' : select?.name} readOnly />
            {
                openList && (<div className="liste-select w-full absolute bottom-12 shadow-lg max-h-[300px] bg-white border rounded-md overflow-y-auto overflow-x-hidden z-[3]">
                    {
                        data.map((el, key) => (<button onClick={() => { setSelect(el); setOpentList(false); onChange(el) }} className="w-full px-3 py-2 text-left" key={key}>{el.name}</button>))
                    }
                </div>)
            }
        </div>
    )
}