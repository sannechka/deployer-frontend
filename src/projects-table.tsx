import './App.css';
import {
    IconButton, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr,
} from '@chakra-ui/react'
import {Project, useGetProjectsQuery} from "./store/endpoints/be.endpoints";
import {EditIcon, SearchIcon, SettingsIcon} from '@chakra-ui/icons'
import {useNavigate} from "react-router-dom";


type TableColumn = {
    key: string;
    label: string;
}
const columns: TableColumn[] = [
    {
        key: 'name',
        label: 'Name'
    },
    {
        key: 'description',
        label: 'Description'
    },
    {
        key: 'gitConfigRepository',
        label: 'Config Repository'
    },
    {
        key: 'artifactoryDeploymentDescriptorFolder',
        label: 'Artifactory Descriptor Folder'
    },
    {
        key: 'services',
        label: 'Services'
    },
    {
        key: 'updatedAt',
        label: 'Updated at'
    },
    {
        key: 'createdAt',
        label: 'Created at'
    },
]

const actionColumn: TableColumn[] = [{
    key: 'action',
    label: ''
}]

const ProjectsTable = () => {
    const navigate = useNavigate();
    const {data = [], isLoading} = useGetProjectsQuery()
    const navigateToEnvs = () => navigate('/envs');

    const projects = data as Project[];
    return (
        <TableContainer whiteSpace="pre-line">
            <Table variant='simple' size={'sm'} borderColor={'gray'} border={1}>
                <Thead>
                    <Tr>
                        <>
                            {columns.map(it => <Th key={it.key}>{it.label}</Th>)}
                            {actionColumn.map(it => <Th key={it.key}>{it.label}</Th>)}
                        </>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        <>
                            {projects?.map(project => <Tr>
                                {columns.map(column => <Td
                                    key={project.id + column.key}>{project[column.key as keyof Project]}</Td>)}
                                <Stack direction='row' spacing={2}>
                                    <IconButton icon={<EditIcon/>}/>
                                    <IconButton icon={<SearchIcon/>} onClick={navigateToEnvs}/>
                                    <IconButton icon={<SettingsIcon/>} colorScheme='red' variant='outline'/>
                                </Stack>
                            </Tr>)}
                        </>

                    }
                </Tbody>
            </Table>
        </TableContainer>)
}

export default ProjectsTable;


