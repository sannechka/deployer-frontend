import { Button, Flex, Grid, Input, Text } from '@chakra-ui/react';
import EnvsTable from '../features/environment/envs-table';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetEnvsByProjectQuery } from '../store/endpoints/be.endpoints';
import { skipToken } from '@reduxjs/toolkit/query';
import { useState } from 'react';
import { ArrowLeftIcon } from '@chakra-ui/icons';

export type EnvRouteParams = {
    projectId: string
}
const EnvsPage = () => {
    const { projectId } = useParams<EnvRouteParams>();
    const [search, setSearch] = useState<string>('');
    const navigate = useNavigate();

    const { data = [] } = useGetEnvsByProjectQuery(projectId ?? skipToken);

    const filteredEnvs = search ? data.filter(it => JSON.stringify(it).includes(search)) : data;

    return (
        <Grid gap={10} width={'100%'}>
            <Flex h="12" alignItems="center" justifyContent="space-between">
                <Flex alignItems="center" gap={4}>
                    <Button onClick={()=>navigate('/')} background={'transparent'} color={'teal.500'} leftIcon={<ArrowLeftIcon />}>
                        Back
                    </Button>
                    <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                        Environments
                    </Text>
                </Flex>
                <Flex justify={'flex-end'}>
                    <Input value={search} onChange={(e) => setSearch(e.target.value)} width={300} height={30}
                           placeholder="Search" />
                </Flex>
            </Flex>
            <EnvsTable envs={filteredEnvs} />
        </Grid>
    );
};

export default EnvsPage;


