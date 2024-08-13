import React from 'react';
import './App.css';
import {Flex, Link, useColorModeValue} from '@chakra-ui/react'
import {Box, Text} from '@chakra-ui/react'
import {Deployment, useGetDeploymentsQuery} from "./store/endpoints/be.endpoints";


const DeploymentsList = () => {

    const {data: deployments = [], isLoading} = useGetDeploymentsQuery();
    const deployments1 = [{name: "deploy 1. ", status: "TEMP"}, {
        name: "deploy 1. ",
        status: "TEMP"
    }, {name: "deploy 1. ", status: "TEMP"}]
    return (
        <Box
            transition="1s ease"
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{md: 60}}
            h="full"
        >
            <Flex h="12" alignItems="center" mx="8" justifyContent="space-between">
                <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                    Deployments
                </Text>
            </Flex>
            <Flex direction={"column"} gap={2} padding={5} paddingTop={0}>
                {deployments.map((deployment: Deployment) => (
                    <Flex gap={5} justifyContent={'space-between'}>
                        <Link href={deployment.gitlabLink} isExternal>
                            {deployment.projectName}
                        </Link>
                        <div>{deployment.state}</div>
                    </Flex>
                ))}
            </Flex>
        </Box>)
}

export default DeploymentsList;
