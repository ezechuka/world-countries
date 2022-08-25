import { Box, Button, Flex, Text, useColorMode } from "@chakra-ui/react"
import { TbMoon } from "react-icons/tb";
import { FaMoon } from "react-icons/fa";

const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <Box boxShadow={'md'}>
            <Flex
                justifyContent={'space-between'}
                alignItems={'center'}
                maxWidth={'container.xl'}
                mx={'auto'}
                paddingX={{ base: 4, md: 16 }}
                paddingY={6}>

                <Text
                    fontWeight={'bold'}
                    fontSize={{ base: 'sm', md: 'xl' }}>
                    Where in the world?
                </Text>

                <Button
                    variant={'ghost'}
                    leftIcon={colorMode === 'light' ? <TbMoon size={'1.2rem'} /> : <FaMoon />}
                    fontSize={'lg'}
                    fontSize={{ base: 'sm', md: 'md' }}
                    onClick={toggleColorMode}>
                    {colorMode === 'light' ? 'Dark' : 'Light'} Mode
                </Button>

            </Flex>
        </Box>
    )
}

export default Navbar