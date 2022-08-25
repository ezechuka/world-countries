import { Box, Grid } from "@chakra-ui/react"
import SearchFilter from "../components/SearchFilter"
import { fetchApi } from "../utils/fetchApi"

import { FaGlobe } from 'react-icons/fa'

import belgium from '../assets/images/belgium.png'
import { CountryCard } from "../components/CountryCard"
import { useState } from "react"

const Home = ({ countries }) => {

    const [allCountry, setAllCountry] = useState(countries)

    const displaySearchResults = (results) => {
        setAllCountry(results)
    }

    return (
        <Box>
            <SearchFilter countries={countries} setCountry={displaySearchResults} />
            <Grid
                maxWidth={'container.xl'}
                mx={'auto'}
                paddingX={{ base: 4, md: 16 }}
                paddingTop={4}
                paddingBottom={{ base: 14, md: 10 }}
                gridTemplateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
                gridGap={10}>

                {allCountry.map((country) => (
                    <CountryCard
                        key={country.name.common}
                        countryName={country.name.common}
                        population={country.population}
                        region={country.region}
                        capital={country.capital}
                        flag={country.flags.svg}
                    />
                ))}

                {allCountry.length === 0 && <FaGlobe />}

            </Grid>
        </Box>
    )
}

export async function getStaticProps() {
    const { data } = await fetchApi().get('/all?fields=name,capital,population,region,flags')
    const countries = data
    // const countries = [{
    //     'name': { common: 'Belgium' },
    //     'population': '11,319,511',
    //     'region': 'Europe',
    //     'capital': 'Brussels',
    //     'flags': { svg: { belgium } }
    // },
    // {
    //     'name': { common: 'Moldova' },
    //     'population': '11,319,511',
    //     'region': 'Europe',
    //     'capital': 'Brussels',
    //     'flags': { svg: { belgium } }
    // },
    // {
    //     'name': { common: 'Canada' },
    //     'population': '11,319,511',
    //     'region': 'Americas',
    //     'capital': 'Brussels',
    //     'flags': { svg: { belgium } }
    // },
    // {
    //     'name': { common: 'Germany' },
    //     'population': '11,319,511',
    //     'region': 'Europe',
    //     'capital': 'Brussels',
    //     'flags': { svg: { belgium } }
    // }, {
    //     'name': { common: 'Brazil' },
    //     'population': '11,319,511',
    //     'region': 'Americas',
    //     'capital': 'Brussels',
    //     'flags': { svg: { belgium } }
    // },
    // {
    //     'name': { common: 'Japan' },
    //     'population': '11,319,511',
    //     'region': 'Asia',
    //     'capital': 'Brussels',
    //     'flags': { svg: { belgium } }
    // },
    // {
    //     'name': { common: 'Kuwait' },
    //     'population': '11,319,511',
    //     'region': 'Asia',
    //     'capital': 'Brussels',
    //     'flags': { svg: { belgium } }
    // },
    // {
    //     'name': { common: 'Nigeria' },
    //     'population': '11,319,511',
    //     'region': 'Africa',
    //     'capital': 'Brussels',
    //     'flags': { svg: { belgium } }
    // },]

    return {
        props: {
            countries
        }
    }
}

export default Home