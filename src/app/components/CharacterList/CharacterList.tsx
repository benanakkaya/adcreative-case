"use client"
import { Character, setSearchValues } from '@/redux/Character/CharacterSlice'
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ReactPaginate from 'react-paginate'
import { AppDispatch } from '@/redux/store'
import CharacterItem from './CharacterItem'


const CharacterList = () => {

    const { characterList, listStatus, searchValues } = useSelector((state: any) => state.character)

    const dispatch = useDispatch<AppDispatch>();

    //Sayfa değişimi yapmamızı sağlayan fonksiyon
    const handlePageChange = (page: any) => {
        dispatch(setSearchValues({ name: "page", value: page.selected + 1 }))
    }


    return (
        <div className='p-1'>
            {listStatus === "ready" ?
                <>
                    <ul className='flex flex-col gap-1 rounded-md border border-blue-400 px-2 py-1 h-72 overflow-y-auto'>
                        {characterList.results?.map((character: Character) => (
                            <CharacterItem key={character.id} character={character} />
                        ))}
                    </ul>
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel=">"
                        className='flex items-center gap-2 w-full justify-between mt-3 px-2'
                        pageClassName=''
                        onPageChange={handlePageChange}
                        pageCount={characterList.info.pages}
                        previousLabel="<"
                        activeClassName='text-blue-400'
                        renderOnZeroPageCount={null}
                        forcePage={searchValues.page - 1}
                    />
                </>
                :
                listStatus === "pending" ?
                    <div className='flex items-center justify-center w-full rounded-md border border-blue-400 px-2 py-1 h-72 overflow-y-auto'>
                        <AiOutlineLoading3Quarters className="text-3xl animate-spin delay-300" />
                    </div>
                    :
                    <div className='flex items-center justify-center w-full rounded-md border border-blue-400 px-2 py-1 h-72 overflow-y-auto'>
                        Character not found
                    </div>
            }
        </div>
    )
}

export default CharacterList