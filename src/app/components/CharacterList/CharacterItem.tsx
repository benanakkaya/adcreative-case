"use client"
import { Character, setSelectedCharacters } from '@/redux/Character/CharacterSlice'
import { AppDispatch, RootState } from '@/redux/store'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

interface PropTypes {
  character: Character
}

const CharacterItem = ({ character }: PropTypes) => {

  const dispatch = useDispatch<AppDispatch>();

  const { selectedCharacters, searchValues } = useSelector((state: RootState) => state.character)
  const [checked, setChecked] = useState<boolean>(false)
  const [formattedName, setFormattedName] = useState<string>("");

  //Seçilen karakterler değiştikçe inputun checked durumunu kontrol ediyoruz
  useEffect(() => {
    const isSelected = selectedCharacters.some((item: Character) => item.id === character.id)
    setChecked(isSelected)
  }, [selectedCharacters])

  //Aranan kelimeye sahip karakterler listede varsa aranan kelimeyi koyulaştırıyoruz.
  const formatName = (formattedStyle: any) => {
    var regex = new RegExp(searchValues.name, "gi");
    var yeniMetin = character.name.replace(regex, formattedStyle);
    setFormattedName(yeniMetin)
  }

  //Arama kriteri değiştikçe biçimlendirmeye devam ediyoruz
  useEffect(() => {
    formatName("<strong>$&</strong>")
  }, [searchValues])


  //Seçilen karakteri, seçilen karakterler arasına ekliyoruz
  const handleChange = () => {
    dispatch(setSelectedCharacters(character))
  }

  return (
    <li className='flex items-center gap-2'>
      <input checked={checked} onChange={handleChange} type='checkbox' className='w-5 h-5 accent-blue-500' />
      <Image src={character.image} alt={character.name} width={60} height={60} />
      <div className='flex flex-col gap-1'>
        <small dangerouslySetInnerHTML={{ __html: formattedName }} />
        <small>{character.episode.length} Episodes</small>
      </div>
    </li>
  )
}

export default CharacterItem

