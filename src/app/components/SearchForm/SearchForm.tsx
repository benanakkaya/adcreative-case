"use client"
import React, { useEffect, useRef } from 'react'
import SelectBox from './components/SelectBox'
import SelectedCharacters from './components/SelectedCharacters'
import { useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { getCharacters, resetPage, setSearchValues } from '@/redux/Character/CharacterSlice'
import { useSelector } from 'react-redux'



const SearchForm = () => {

    const dispatch = useDispatch<AppDispatch>();

    const textInputRef = useRef(null);
    const selectInput1Ref = useRef(null);
    const selectInput2Ref = useRef(null);
    const { searchValues } = useSelector((state: RootState) => state.character)

    //Arama verileri değiştikçe yeni verileri set ediyoruz ve sayfayı sıfırlıyoruz
    const handleChange = async (e: any) => {
        dispatch(setSearchValues({ name: e.target.name, value: e.target.value }));
        dispatch(resetPage());
    }

    //Arama verileri her değiştikçe bu fonksiyonu çağırıyoruz ve karakterleri fetch ediyoruz
    const fetchCharacters = () => {
        dispatch(getCharacters(searchValues))
    }

    //Arama değerleri değiştikçe karakterleri sürekli fetch ediyoruz
    useEffect(() => {
        fetchCharacters();
    }, [searchValues])


    return (
        <form className='p-1'>
            <div className='flex flex-col gap-2'>
                <SelectedCharacters />
                <label className='flex flex-col gap-1'>
                    Name:
                    <input onChange={(e) => handleChange(e)} name='name' className='flex-1 px-2 py-1 outline-none border border-blue-400 rounded-md ' />
                </label>
                <SelectBox
                    handleChange={handleChange}
                    title="Status"
                    name="status"
                    options={[
                        { title: "All", value: "" },
                        { title: "Alive", value: "alive" },
                        { title: "Dead", value: "dead" },
                        { title: "Unknown", value: "unknown" },
                    ]} />
                <SelectBox
                    handleChange={handleChange}
                    title="Gender"
                    name="gender"
                    options={[
                        { title: "All", value: "" },
                        { title: "Female", value: "female" },
                        { title: "Male", value: "male" },
                        { title: "Genderless", value: "genderless" },
                        { title: "Unknown", value: "unknown" },
                    ]} />
            </div>


        </form>
    )
}

export default SearchForm