import {
    Box,
    Flex,
    Avatar,
    HStack,
    IconButton,
    Button,
    useDisclosure,
    useColorModeValue,
    Stack,
    useToast,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Text,
    Image,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, SearchIcon } from '@chakra-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../Redux/Auth/actions';
import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { getLocalData } from '../../Utils/LocalStorage';
import Avidus from '../../Images/avidus_logo.png';
import SearchPage from '../Search/SearchPage';

const Navbar = () => {
    const [userName, setUserName] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();
    const finalRef = useRef(null);
    let isAuth = useSelector((state) => state.AuthReducer.isAuth);
    const toast = useToast();
    const dispatch = useDispatch();
    const logoutHandler = () => {
        localStorage.removeItem('token');
        dispatch(logout());
        toast({
            title: 'Log Out Successful 👋',
            description: 'Visit again 🙏',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top',
        });
    };
    const navigate = useNavigate();
    const headingHandle = () => {
        navigate('/');
    };

    useEffect(() => {
        if (isAuth) {
            const storedData = getLocalData('token');
            let userData = JSON.parse(storedData);
            setUserName(userData.user.name);
        }
    }, [isAuth]);
    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <Box paddingLeft="20px">
                            <Image
                                onClick={headingHandle}
                                cursor={'pointer'}
                                src={Avidus}
                                width={'100px'}
                            ></Image>
                        </Box>
                        <HStack
                            as={'nav'}
                            spacing={4}
                            display={{ base: 'none', md: 'flex' }}
                        >
                            {isAuth ? (
                                <NavLink to="propertyform" px={2} py={1}>
                                    <Button colorScheme="gray">Add Property</Button>
                                </NavLink>
                            ) : (
                                ''
                            )}
                            {isAuth ? (
                                <Box
                                    style={{
                                        width: '250px',
                                        height: '2rem',
                                        border: '.1px solid white',
                                        borderRadius: '15px',
                                        display: 'flex',
                                        justifyContent: 'centre',
                                        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                                    }}
                                    onClick={onOpen}
                                >
                                    {/* <Button mt={2} > */}
                                    <Text
                                        textAlign={'center'}
                                        paddingLeft={5}
                                        paddingTop={'1.5px'}
                                    >
                                        Anywhere | Any Week |
                                    </Text>
                                    <SearchIcon marginLeft={5} marginTop={2} />
                                    {/* </Button> */}
                                </Box>
                            ) : (
                                ''
                            )}
                            <Modal
                                size={'4xl'}
                                finalFocusRef={finalRef}
                                isOpen={isOpen}
                                onClose={onClose}
                            >
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader>Search Properties</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        <SearchPage onClose={onClose} />
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                                            Close
                                        </Button>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal>
                        </HStack>
                    </HStack>
                    <Flex alignItems={'center'}>
                        {isAuth ? (
                            <NavLink to="/userProfile">
                                <Button
                                    as={Button}
                                    rounded={'full'}
                                    variant={'link'}
                                    cursor={'pointer'}
                                    minW={0}
                                    marginRight="20px"
                                >
                                    <Avatar size={'sm'} name={userName} />
                                </Button>
                            </NavLink>
                        ) : null}
                        <Box marginRight="20px">
                            {isAuth ? (
                                <Button colorScheme="blue" onClick={logoutHandler}>
                                    Sign Out
                                </Button>
                            ) : (
                                <NavLink to="/signin">
                                    <Button colorScheme="blue">Sign In</Button>
                                </NavLink>
                            )}
                        </Box>
                    </Flex>
                </Flex>
                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            {isAuth ? (
                                <NavLink to="propertyform" px={2} py={1}>
                                    <Button colorScheme="gray">Add Property</Button>
                                </NavLink>
                            ) : (
                                ''
                            )}
                        </Stack>
                    </Box>
                ) : null}
            </Box>
        </>
    );
};
export default Navbar;
