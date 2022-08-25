import { Flex, useColorModeValue, Box, Text, VStack } from "@chakra-ui/react"
import Image from "next/image"
import Link from "next/link"

export const SubInfoText = ({ title, text }) => {
    return (
        <Text
            fontWeight={'semibold'}
            fontSize={'base'}
            marginY={1}>
            {title}
            <span style={{ fontWeight: 'normal' }}>
                {text}
            </span>
        </Text>
    )
}

export const CountryCard = ({ countryName, population, region, capital, flag }) => {

    const cardBg = useColorModeValue('white', 'dark-blue')
    const cardColor = useColorModeValue('very-dark-blue-2', 'white')

    return (
        <Link href={`/countries/${countryName}`}>
            <Flex
                flexDirection={'column'}
                rounded={'md'}
                overflow={'hidden'}
                boxShadow={'lg'}
                backgroundColor={cardBg}
                color={cardColor}
                position={'relative'}
                marginX={{ base: 8, md: 0 }}
                cursor={'pointer'}>

                <Image
                    src={flag}
                    objectFit={'cover'}
                    objectPosition={'50% 50%'}
                    width='400%'
                    height='250%'
                    placeholder={'blur'}
                    blurDataURL={flag}
                    alt={`${countryName} flag`} />

                <Box 
                    padding={6}>

                    <Text
                        fontWeight={'bold'}
                        fontSize={'lg'}
                        marginBottom={4}>
                        {countryName}
                    </Text>

                    <SubInfoText title={'Population: '} text={Number(population).toLocaleString('en-US')} />
                    <SubInfoText title={'Region: '} text={region} />
                    <SubInfoText title={'Capital: '} text={capital} />
                </Box>
            </Flex>
        </Link>
    )
}