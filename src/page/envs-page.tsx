import {Flex, Input, Text} from '@chakra-ui/react'
import EnvsTable from "../features/environment/envs-table";
import {useParams} from "react-router-dom";
import {useGetEnvsByProjectQuery} from "../store/endpoints/be.endpoints";
import {skipToken} from "@reduxjs/toolkit/query";

export type EnvRouteParams = {
    projectId: string
}
const EnvsPage = () => {
    const {projectId} = useParams<EnvRouteParams>()
    console.log(projectId)
    const {data = []} = useGetEnvsByProjectQuery(projectId ?? skipToken)

    return (
        <Flex direction={'column'} width={'100%'} gap={5}>
            <Flex h="12" alignItems="center" mx="8" justifyContent="space-between">
                <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                    Environments
                </Text>
                <Flex justify={'flex-end'}>
                    <Input width={300} height={30} placeholder='Search'/>
                </Flex>
            </Flex>
            <EnvsTable envs={data}/>
        </Flex>
    )
}

export default EnvsPage;


