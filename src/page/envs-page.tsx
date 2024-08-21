import { Flex, Grid, Input, Text } from '@chakra-ui/react';
import EnvsTable from '../features/environment/envs-table';
import { useParams } from 'react-router-dom';
import { useGetEnvsByProjectQuery } from '../store/endpoints/be.endpoints';
import { skipToken } from '@reduxjs/toolkit/query';
import { useState } from 'react';

export type EnvRouteParams = {
    projectId: string
}
const EnvsPage = () => {
    const { projectId } = useParams<EnvRouteParams>();
    const [search, setSearch] = useState<string>('');

    const { data = [] } = useGetEnvsByProjectQuery(projectId ?? skipToken);

    const filteredEnvs = search ? data.filter(it => JSON.stringify(it).includes(search)) : data;

    return (
        <Grid gap={10} width={'100%'}>
            <Flex h="12" alignItems="center" mx="8" justifyContent="space-between">
                <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                    Environments
                </Text>
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


