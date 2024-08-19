import './App.css';
import {ChakraProvider, Flex, useColorModeValue} from '@chakra-ui/react'
import {Box, Text} from '@chakra-ui/react'
import DeploymentsList from "./deployments-list";
import {Suspense, StrictMode} from "react";
import {PersistGate} from "redux-persist/integration/react";
import {Persistor, store} from "./store/store";
import {Provider} from "react-redux";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProjectsPage from "./page/projects-page";
import EnvsPage from "./page/envs-page";


function App() {
    return (
        <StrictMode>
            <Provider store={store}>
                <Suspense fallback={<div></div>}>
                    <PersistGate persistor={Persistor}>
                        <ChakraProvider>
                            <Box>
                                <Flex
                                    bg={useColorModeValue('white', 'gray.800')}
                                    color={useColorModeValue('gray.600', 'white')}
                                    minH={'60px'}
                                    py={{base: 2}}
                                    px={{base: 4}}
                                    borderBottom={1}
                                    borderStyle={'solid'}
                                    borderColor={useColorModeValue('gray.200', 'gray.900')}
                                    align={'center'}>
                                    <Flex flex={{base: 1}} justify={{base: 'center', md: 'start'}}>
                                        <Text
                                            fontFamily={'heading'}
                                            color={useColorModeValue('gray.800', 'white')}>
                                            Logo
                                        </Text>

                                    </Flex>
                                </Flex>
                            </Box>
                            <Flex>
                                <DeploymentsList onClose={() => {
                                }}/>
                                <BrowserRouter>
                                    <Routes>
                                        <Route path="/">
                                            <Route index element={<ProjectsPage/>}/>
                                            <Route path=":projectId/envs" element={<EnvsPage/>}/>
                                        </Route>
                                    </Routes>
                                </BrowserRouter>
                            </Flex>
                        </ChakraProvider>
                    </PersistGate>
                </Suspense>
            </Provider>
        </StrictMode>
    );
}

export default App;
