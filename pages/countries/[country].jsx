import { Box, Button, Flex, Grid, HStack, Spacer, Text, useColorModeValue } from "@chakra-ui/react"
import { BsArrowLeft } from "react-icons/bs"

import Image from "next/image"
import { useRouter } from "next/router"

import { fetchApi } from "../../utils/fetchApi"
import { SubInfoText } from '../../components/CountryCard'
import belgium from '../../assets/images/belgium.png'
import { useEffect, useState } from "react"

const Country = (props) => {
    const country = props.country[0]
    const countryName = country.name.common
    const flagSvg = country.flags.svg
    const population = Number(country.population).toLocaleString('en-US')
    const region = country.region
    const subRegion = country.subregion
    const capital = country.capital[0]
    const tld = country.tld[0]

    const currencies = Object.values(country.currencies)
    const currency = currencies[0].name

    const languages = Object.values(country.languages).toString().replaceAll(',', ', ')

    const nativeNames = Object.values(country.name.nativeName)
    const nativeName = nativeNames[0].common

    const borders = props.borders
 
    const router = useRouter()
    const buttonBg = useColorModeValue('white', 'dark-blue')
    const buttonColor = useColorModeValue('very-dark-blue-2', 'white')

    // useEffect(() => {
    //     setBorders([])
    // }, [router.query.slug])

    return (
        <Box
            maxWidth={'container.xl'}
            mx={'auto'}
            paddingX={{ base: 4, md: 16 }}
            paddingTop={16}>
            <Button
                paddingX={{ base: 4, md: 8 }}
                boxShadow={'md'}
                variant={'solid'}
                backgroundColor={buttonBg}
                color={buttonColor}
                leftIcon={<BsArrowLeft />}
                onClick={() => router.back()}>
                Back
            </Button>

            <Flex
                flexDirection={{ base: 'column', xl: 'row' }}
                justifyContent={{ base: 'center', xl: 'space-between' }}
                alignItems={{ base: 'flex-start', xl: 'center' }}
                position={'relative'}
                paddingTop={{ base: 10, xl: 16 }}
                paddingBottom={36}>

                <Image
                    src={flagSvg}
                    layout={'intrinsic'}
                    objectFit={'contain'}
                    objectPosition={'top left'}
                    width='550%'
                    height='400%'
                    placeholder={'blur'}
                    blurDataURL={flagSvg}
                    alt={`${countryName} flag`}
                />

                <Flex
                    marginStart={8}
                    flexDirection={'column'}>

                    <Text
                        fontWeight={'bold'}
                        fontSize={'2xl'}
                        marginTop={{ base: 12, xl: 0 }}>
                        {countryName}
                    </Text>

                    <Grid
                        gridTemplateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
                        marginTop={{ base: 3, lg: 6 }}
                        columnGap={{ base: 0, lg: 20 }}>

                        {/* COLUMN 1 */}
                        <Flex
                            flexDirection={'column'}
                            justifyContent={'flex-start'}
                            alignItems={'flex-start'}>

                            <SubInfoText title={'Native name: '} text={nativeName} />
                            <SubInfoText title={'Population: '} text={population} />
                            <SubInfoText title={'Region: '} text={region} />
                            <SubInfoText title={'Sub Region: '} text={subRegion} />
                            <SubInfoText title={'Capital: '} text={capital} />

                        </Flex>

                        {/* COLUMN 2 */}
                        <Flex
                            flexDirection={'column'}
                            justifyContent={'flex-start'}
                            alignItems={'flex-start'}
                            marginTop={{ base: 10, lg: 0 }}>

                            <SubInfoText title={'Top Level Domain: '} text={tld} />
                            <SubInfoText title={'Currencies: '} text={currency} />
                            <SubInfoText title={'Languages: '} text={languages} />

                        </Flex>

                    </Grid>

                    <Flex
                        marginTop={12}
                        flexDirection={{ base: 'column', lg: 'row' }}
                        alignItems={{ base: 'flex-start', lg: 'center' }}>

                        <Text
                            fontWeight={'bold'}
                            fontSize={{ base: 'lg', lg: 'md' }}
                            marginEnd={'4'}>
                            Border Countries:
                        </Text>

                        <Grid
                            gridTemplateColumns={'repeat(3, 1fr)'}
                            gap={2}>

                            {borders.map(border => (
                                <Button
                                    key={border}
                                    paddingX={{ base: 4, lg: 8 }}
                                    boxShadow={'md'}
                                    variant={'solid'}
                                    backgroundColor={buttonBg}
                                    color={buttonColor}
                                    onClick={() => {
                                        router.push(border)
                                    }}>
                                    {border}
                                </Button>
                            ))}

                        </Grid>
                    </Flex>
                </Flex>

            </Flex>
        </Box>
    )
}

async function getBorderCountryName(borders) {

    const borderNames = []
    for (const i in borders) {
        const { data } = await fetchApi().get(`/alpha/${borders[i]}?fields=name`)
        borderNames.push(data.name.common)
    }

    return borderNames
    // setBorders(borderNames)
}

export async function getStaticProps({ params }) {
    let country = null
    let borderNames = []
    await fetchApi().get(`/name/${params.country}?fullText=true?fields=name,capital,population,region,flags,subregion,tld,currencies,languages,borders`)
        .then(res => {
            country = res.data
            borderNames = country[0].borders
        })

    let borders = []
    for (const i in borderNames) {
        const { data } = await fetchApi().get(`/alpha/${borderNames[i]}?fields=name`)
        borders.push(data.name.common)
    }

    return {
        props: {
            country,
            borders
        }
    }
}

export async function getStaticPaths() {
    const { data } = await
        fetchApi().get('/all?fields=name')
    const countries = data
    const allCountryNames = countries.map((country) => country.name.common)
    const paths = allCountryNames.map(name => ({ params: { country: name } }))

    return {
        paths,
        fallback: true
    }

}

export default Country