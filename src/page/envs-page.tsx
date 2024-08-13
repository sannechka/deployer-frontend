import {Flex, Input, Text} from '@chakra-ui/react'
import EnvsTable from "../envs-table";


const EnvsPage = () => {
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
            <EnvsTable/>
        </Flex>
    )
}

export default EnvsPage;


