import { Grid, Flex, Input, Text } from '@chakra-ui/react';
import ProjectsTable from '../features/project/projects-table';
import { useGetProjectsQuery } from '../store/endpoints/be.endpoints';
import { useState } from 'react';


const ProjectsPage = () => {
    const [search, setSearch] = useState<string>('');
    const { data = [], isLoading } = useGetProjectsQuery();

    const filteredProjects = search ? data.filter(it => JSON.stringify(it).includes(search)) : data;
    return (
        <Grid gap={10} width={'100%'}>
            <Flex h="12" alignItems="center" mx="8" justifyContent="space-between">
                <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                    Projects
                </Text>
                <Flex justify={'flex-end'}>
                    <Input value={search} onChange={(e) => setSearch(e.target.value)} width={300} height={30}
                           placeholder="Search" />
                </Flex>
            </Flex>
            <ProjectsTable projects={filteredProjects} />
        </Grid>
    );
};

export default ProjectsPage;


