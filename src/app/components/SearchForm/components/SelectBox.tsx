import React from 'react'

type Option = {
    title: string,
    value: string
}

interface PropTypes {
    title: string,
    name: string,
    options: Option[],
    handleChange: Function,
}

const SelectBox = ({ title, name, options,handleChange }: PropTypes) => {
    return (
        <label className='flex flex-col gap-1 '>
            {title}:
            <select onChange={(e) => handleChange(e)} name={name} className='flex-1 px-2 py-1 outline-none border border-blue-400 rounded-md text-base' >
                {options.map((item: Option, ind: number) => (
                    <option key={ind} value={item.value}>
                        {item.title}
                    </option>
                ))}
            </select>
        </label>
    )
}

export default SelectBox