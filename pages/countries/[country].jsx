import { Box, Button, Flex, Grid, Text, useColorModeValue } from "@chakra-ui/react"
import { BsArrowLeft } from "react-icons/bs"

import Image from "next/image"
import { useRouter } from "next/router"

import { fetchApi } from "../../utils/fetchApi"
import { SubInfoText } from '../../components/CountryCard'

const Country = (props) => {
    const country = props.country
    const countryName = country.name.common
    const flagSvg = country.flags.svg
    const population = Number(country.population).toLocaleString('en-US')
    const region = country.region
    const subregion = country.subregion || ''

    let capital = ''
    let currencies = []
    let currency = ''
    let languages = []
    let nativeNames = []
    let nativeName = ''
    let tld = ''
    if ('capital' in country)
        capital = country.capital[0] || ''

    if (Object.keys(country.currencies).length > 0 && 'currencies' in country) {
        currencies = Object.values(country.currencies)
        currency = currencies[0].name
    }

    if (Object.keys(country.languages) && 'languages' in country)
        languages = Object.values(country.languages).toString().replaceAll(',', ', ')

    if ('tld' in country)
        tld = country.tld[0] || ''

    if ('nativeName' in country) {
        nativeNames = Object.values(country.name.nativeName)
        nativeName = nativeNames[0].common
    } else {
        nativeName = country.name.common
    }

    const borders = props.borders || []

    const router = useRouter()
    const buttonBg = useColorModeValue('white', 'dark-blue')
    const buttonColor = useColorModeValue('very-dark-blue-2', 'white')

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
                            {subregion.length > 0 && <SubInfoText title={'Sub Region: '} text={subregion} />}
                            {capital.length > 0 && <SubInfoText title={'Capital: '} text={capital} />}

                        </Flex>

                        {/* COLUMN 2 */}
                        <Flex
                            flexDirection={'column'}
                            justifyContent={'flex-start'}
                            alignItems={'flex-start'}
                            marginTop={{ base: 10, lg: 0 }}>

                            {tld.length > 0 && <SubInfoText title={'Top Level Domain: '} text={tld} />}
                            {currency.length > 0 && <SubInfoText title={'Currencies: '} text={currency} />}
                            {languages.length > 0 && <SubInfoText title={'Languages: '} text={languages} />}

                        </Flex>

                    </Grid>

                    <Flex
                        marginTop={12}
                        flexDirection={{ base: 'column', lg: 'row' }}
                        alignItems={{ base: 'flex-start', lg: 'center' }}>

                        {borders.length > 0 && <Text
                            fontWeight={'bold'}
                            fontSize={{ base: 'lg', lg: 'md' }}
                            marginEnd={'4'}>
                            Border Countries:
                        </Text>
                        }

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

export async function getStaticProps({ params }) {
    let country = null
    let borderNames = []

    await fetchApi().get(`/alpha/${params.country}?fields=name,capital,population,region,flags,subregion,tld,currencies,languages,borders`)
        .then(res => {
            country = res.data
            borderNames = country.borders
        }).catch(err => {
            console.log(err.response.data)
        })

    let borders = []
    for (const i in borderNames) {
        const { data } = await fetchApi().get(`/alpha/${borderNames[i]}?fields=name`)
        if (data.name !== undefined)
            borders.push(data.name.common)
    }

    console.log(country)
    return {
        props: {
            country,
            borders
        }
    }
}

export async function getStaticPaths() {
    const { data } = await
        fetchApi().get('/all?fields=cca3')
    const countries = data.filter(d => d.cca3 !== 'BRN')  // BRN code returns JSON Syntax error
    const allCountryNames = countries.map((country) => country.cca3)
    const paths = allCountryNames.map(name => ({ params: { country: name } }))

    return {
        paths,
        fallback: false
    }

}

export default Country