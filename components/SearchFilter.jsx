import { Flex, InputGroup, InputLeftElement, Input, Menu, MenuButton, Button, MenuList, MenuItem, useColorModeValue } from '@chakra-ui/react'

import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import { useState } from 'react';

const SearchFilter = ({ countries, setCountry }) => {

    const [searchTerm, setSearchTerm] = useState('')
    const inputBg = useColorModeValue('white', 'dark-blue')
    const inputColor = useColorModeValue('dark-gray', 'white')
    const buttonColor = useColorModeValue('very-dark-blue-2', 'white')

    const handleChange = (e) => {
        let value = e.target.value
        setSearchTerm(value)

        let filterCountries = []
        if (value.length > 0) {
            filterCountries = countries.filter(country => (
                country.name.common.toLowerCase().includes(value.toLowerCase())
            ))

            setCountry(filterCountries)
        } else if (value.length === 0) {
            setCountry(countries)
        }
    }

    const handleFilter = (e, region) => {
        console.log(e)
        console.log(region)
        let filterCountries = []
        if (region.toLowerCase() === 'all') {
            setCountry(countries)
            return
        }
        
        filterCountries = countries.filter(country => (
            country.region.toLowerCase().startsWith(region.toLowerCase())
        ))

        setCountry(filterCountries)
    }

    return (
        <Flex
            flexDirection={{ base: 'column', md: 'row' }}
            justifyContent={'space-between'}
            alignItems={'center'}
            maxWidth={'container.xl'}
            mx={'auto'}
            paddingX={{ base: 4, md: 16 }}
            paddingY={{ base: 6, md: 8 }}>

            <InputGroup
                size={'lg'}
                width={{ base: '100%', md: '40%' }}
                boxShadow={'md'}>
                <InputLeftElement
                    pointerEvents={'none'}
                    children={<SearchIcon color={inputColor} />}
                />

                <Input
                    variant={'solid'}
                    backgroundColor={inputBg}
                    fontWeight={'semibold'}
                    fontSize={'sm'}
                    value={searchTerm}
                    placeholder={'Search for a country...'}
                    _placeholder={{ opacity: 0.8, color: inputColor }}
                    focusBorderColor={'none'}
                    onChange={handleChange}
                />
            </InputGroup>

            <Menu>
                <MenuButton
                    as={Button}
                    backgroundColor={inputBg}
                    color={buttonColor}
                    fontSize={'sm'}
                    boxShadow={'md'}
                    size={'lg'}
                    marginTop={{ base: 10, md: 0 }}
                    _expanded={{ bg: 'blue.700' }}
                    rightIcon={<ChevronDownIcon boxSize={5} />}>
                    Filter by Region
                </MenuButton>
                <MenuList
                    border={'none'}
                    boxShadow={'base'}>
                    <MenuItem
                        fontSize={'sm'}
                        fontWeight={'semibold'}
                        onClick={(e) => handleFilter(e, 'Africa')}>
                        Africa
                    </MenuItem>
                    <MenuItem
                        fontSize={'sm'}
                        fontWeight={'semibold'}
                        onClick={(e) => handleFilter(e, 'Asia')}>
                        Asia
                    </MenuItem>
                    <MenuItem
                        fontSize={'sm'}
                        fontWeight={'semibold'}
                        onClick={(e) => handleFilter(e, 'America')}>
                        America
                    </MenuItem>
                    <MenuItem
                        fontSize={'sm'}
                        fontWeight={'semibold'}
                        onClick={(e) => handleFilter(e, 'Europe')}>
                        Europe
                    </MenuItem>
                    <MenuItem
                        fontSize={'sm'}
                        fontWeight={'semibold'}
                        onClick={(e) => handleFilter(e, 'Oceania')}>
                        Oceania
                    </MenuItem>
                    <MenuItem
                        fontSize={'sm'}
                        fontWeight={'semibold'}
                        onClick={(e) => handleFilter(e, 'All')}>
                        All
                    </MenuItem>
                </MenuList>
            </Menu>

        </Flex>
    )
}

export default SearchFilter