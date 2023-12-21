"use client"
import { Character, setSelectedCharacters } from '@/redux/Character/CharacterSlice'
import { AppDispatch, RootState } from '@/redux/store'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

const SelectedCharacters = () => {

  const dispatch = useDispatch<AppDispatch>();

  const { selectedCharacters } = useSelector((state: RootState) => state.character)

  //Seçilen karakteri sil
  const handleDelete = (character: Character) => {
    dispatch(setSelectedCharacters(character))
  }

  

  return (
    <ul className='flex flex-wrap gap-x-2 gap-y-1 h-[95px] overflow-y-auto'>
      {selectedCharacters.length > 0 ?
        selectedCharacters.map((character: Character) => (
          <li className='px-2 py-1 bg-blue-400 text-white rounded-md h-[32px]'>
            {character.name} <button onClick={() => handleDelete(character)} className='font-bold text-red-500 cursor-pointer'>X</button>
          </li>
        ))
        :
        <div className='italic flex items-center justify-center w-full'>
          No character has been chosen yet
        </div>
      }
    </ul>
  )
}

export default SelectedCharacters